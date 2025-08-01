import { useState } from "react";
import { Bot, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatArea } from "@/components/chat/ChatArea";
import { MessageInput } from "@/components/chat/MessageInput";
import { ProviderSelector } from "@/components/providers/ProviderSelector";
import { ApiKeyModal } from "@/components/providers/ApiKeyModal";
import { useChatContext } from "@/contexts/ChatContext";

const providers = {
  openai: "OpenAI GPT-4",
  gemini: "Google Gemini",
  openrouter: "OpenRouter",
  github: "GitHub Copilot"
};

export default function Home() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const { currentProvider } = useChatContext();

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-2xl bg-white/90 backdrop-blur-sm">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">AI Chat Assistant</h1>
            <p className="text-sm text-slate-500">{providers[currentProvider]}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ProviderSelector />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsApiKeyModalOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <Key className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <ChatArea />

      {/* Message Input */}
      <MessageInput />

      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
      />
    </div>
  );
}
