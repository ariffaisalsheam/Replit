import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { useChatContext } from "@/contexts/ChatContext";

export function ChatArea() {
  const { messages, isTyping } = useChatContext();
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <main ref={chatAreaRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 rounded-xl px-6 py-4 max-w-md text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Welcome to AI Chat</h3>
            <p className="text-sm text-slate-600">
              Select your preferred AI provider and start chatting. Your conversations are private and secure.
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </>
      )}
    </main>
  );
}
