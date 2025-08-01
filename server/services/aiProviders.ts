import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIProvider } from "@shared/schema";

export interface AIResponse {
  content: string;
  provider: AIProvider;
}

export class AIProviderService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;

  constructor() {
    // Initialize providers if API keys are available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  }

  async generateResponse(
    provider: AIProvider,
    messages: Array<{ role: string; content: string }>,
    apiKey?: string
  ): Promise<AIResponse> {
    switch (provider) {
      case "openai":
        return this.generateOpenAIResponse(messages, apiKey);
      case "gemini":
        return this.generateGeminiResponse(messages, apiKey);
      case "openrouter":
        return this.generateOpenRouterResponse(messages, apiKey);
      case "github":
        return this.generateGitHubResponse(messages, apiKey);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  private async generateOpenAIResponse(
    messages: Array<{ role: string; content: string }>,
    apiKey?: string
  ): Promise<AIResponse> {
    const client = apiKey ? new OpenAI({ apiKey }) : this.openai;
    if (!client) {
      throw new Error("OpenAI API key not provided");
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: messages.map(msg => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content
      })),
    });

    return {
      content: response.choices[0].message.content || "Sorry, I couldn't generate a response.",
      provider: "openai"
    };
  }

  private async generateGeminiResponse(
    messages: Array<{ role: string; content: string }>,
    apiKey?: string
  ): Promise<AIResponse> {
    const client = apiKey ? new GoogleGenerativeAI(apiKey) : this.gemini;
    if (!client) {
      throw new Error("Gemini API key not provided");
    }

    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Convert messages to Gemini format
    const prompt = messages.map(msg => 
      `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`
    ).join("\n\n");

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      content: response.text() || "Sorry, I couldn't generate a response.",
      provider: "gemini"
    };
  }

  private async generateOpenRouterResponse(
    messages: Array<{ role: string; content: string }>,
    apiKey?: string
  ): Promise<AIResponse> {
    if (!apiKey) {
      throw new Error("OpenRouter API key required");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.REPLIT_DOMAINS?.split(',')[0] || "http://localhost:5000",
        "X-Title": "AI Chat Application"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content || "Sorry, I couldn't generate a response.",
      provider: "openrouter"
    };
  }

  private async generateGitHubResponse(
    messages: Array<{ role: string; content: string }>,
    apiKey?: string
  ): Promise<AIResponse> {
    if (!apiKey) {
      throw new Error("GitHub API key required");
    }

    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content || "Sorry, I couldn't generate a response.",
      provider: "github"
    };
  }
}

export const aiProviderService = new AIProviderService();
