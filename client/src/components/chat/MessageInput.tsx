import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/hooks/useChat";
import { useChatContext } from "@/contexts/ChatContext";
import { useToast } from "@/hooks/use-toast";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading } = useChat();
  const { currentProvider, apiKeys } = useChatContext();
  const { toast } = useToast();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    const apiKey = apiKeys[currentProvider];
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: `Please set your ${currentProvider.toUpperCase()} API key to continue.`,
        variant: "destructive"
      });
      return;
    }

    try {
      await sendMessage(message);
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <footer className="p-6 bg-white/95 backdrop-blur-sm border-t border-slate-200">
      <div className="flex space-x-4 items-end">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm placeholder-slate-400 bg-white shadow-sm transition-all duration-200 min-h-[48px] max-h-[120px]"
            disabled={isLoading}
          />
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md min-w-[48px] h-[48px]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-slate-500">Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
