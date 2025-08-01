import { format } from "date-fns";
import { CheckCheck, Bot } from "lucide-react";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = message.timestamp ? format(new Date(message.timestamp), "h:mm a") : "";

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-indigo-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex items-center justify-end mt-1 space-x-1">
            <span className="text-xs text-slate-500">{timestamp}</span>
            <CheckCheck className="w-3 h-3 text-indigo-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-slide-up">
      <div className="flex space-x-3 max-w-xs lg:max-w-md">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="flex items-center mt-1 space-x-1">
            <span className="text-xs text-slate-500">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
