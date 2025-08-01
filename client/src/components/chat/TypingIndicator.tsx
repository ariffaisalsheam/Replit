import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex space-x-3 max-w-xs lg:max-w-md">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
