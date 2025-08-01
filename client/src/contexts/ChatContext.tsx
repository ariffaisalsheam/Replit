import { createContext, useContext, useState, ReactNode } from "react";
import type { AIProvider, Conversation, Message } from "@shared/schema";

interface ChatContextType {
  currentProvider: AIProvider;
  setCurrentProvider: (provider: AIProvider) => void;
  apiKeys: Record<AIProvider, string>;
  setApiKey: (provider: AIProvider, key: string) => void;
  currentConversation: Conversation | null;
  setCurrentConversation: (conversation: Conversation | null) => void;
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentProvider, setCurrentProvider] = useState<AIProvider>("openai");
  const [apiKeys, setApiKeysState] = useState<Record<AIProvider, string>>(() => {
    // Load API keys from sessionStorage
    const stored = sessionStorage.getItem("aiChatApiKeys");
    return stored ? JSON.parse(stored) : {
      openai: "",
      gemini: "",
      openrouter: "",
      github: ""
    };
  });
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const setApiKey = (provider: AIProvider, key: string) => {
    const newApiKeys = { ...apiKeys, [provider]: key };
    setApiKeysState(newApiKeys);
    sessionStorage.setItem("aiChatApiKeys", JSON.stringify(newApiKeys));
  };

  return (
    <ChatContext.Provider value={{
      currentProvider,
      setCurrentProvider,
      apiKeys,
      setApiKey,
      currentConversation,
      setCurrentConversation,
      messages,
      setMessages,
      isTyping,
      setIsTyping
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
