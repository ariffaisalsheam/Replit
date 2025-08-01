import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiProviderService } from "./services/aiProviders";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  provider: z.enum(["openai", "gemini", "openrouter", "github"]),
  apiKey: z.string().optional(),
  conversationId: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get conversation messages
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getMessagesByConversationId(id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send chat message and get AI response
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, provider, apiKey, conversationId } = chatRequestSchema.parse(req.body);
      
      let conversation;
      
      // Create new conversation if none provided
      if (!conversationId) {
        conversation = await storage.createConversation({
          userId: null, // For now, not using user authentication
          title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
          provider
        });
      } else {
        conversation = await storage.getConversation(conversationId);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
        }
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: message
      });

      // Get conversation history for context
      const messages = await storage.getMessagesByConversationId(conversation.id);
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Generate AI response
      const aiResponse = await aiProviderService.generateResponse(
        provider,
        chatHistory,
        apiKey
      );

      // Save AI response
      const assistantMessage = await storage.createMessage({
        conversationId: conversation.id,
        role: "assistant",
        content: aiResponse.content
      });

      res.json({
        conversation,
        userMessage,
        assistantMessage,
        response: aiResponse.content
      });

    } catch (error) {
      console.error("Chat error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to process chat message" });
      }
    }
  });

  // Get conversation by ID
  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
