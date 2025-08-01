import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AIProvider, Message, Conversation } from "@shared/schema";
import { useChatContext } from "@/contexts/ChatContext";

interface ChatRequest {
  message: string;
  provider: AIProvider;
  apiKey?: string;
  conversationId?: string;
}

interface ChatResponse {
  conversation: Conversation;
  userMessage: Message;
  assistantMessage: Message;
  response: string;
}

export function useChat() {
  const queryClient = useQueryClient();
  const { 
    currentProvider, 
    apiKeys, 
    currentConversation, 
    setCurrentConversation,
    messages,
    setMessages,
    isTyping,
    setIsTyping
  } = useChatContext();

  const sendMessageMutation = useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", request);
      return response.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: (data) => {
      setIsTyping(false);
      
      // Update current conversation if it's new
      if (!currentConversation) {
        setCurrentConversation(data.conversation);
      }
      
      // Add both user and assistant messages
      setMessages(prev => [...prev, data.userMessage, data.assistantMessage]);
      
      // Invalidate conversations cache
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
    onError: () => {
      setIsTyping(false);
    }
  });

  const sendMessage = async (message: string) => {
    const apiKey = apiKeys[currentProvider];
    
    if (!apiKey && !process.env.VITE_API_KEY) {
      throw new Error(`API key required for ${currentProvider}`);
    }

    await sendMessageMutation.mutateAsync({
      message,
      provider: currentProvider,
      apiKey: apiKey || undefined,
      conversationId: currentConversation?.id
    });
  };

  return {
    sendMessage,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
    isTyping
  };
}

export function useConversationMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["/api/conversations", conversationId, "messages"],
    enabled: !!conversationId,
  });
}
