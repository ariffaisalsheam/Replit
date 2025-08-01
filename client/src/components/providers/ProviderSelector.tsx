import { useState } from "react";
import { ArrowUpDown, ChevronDown, Brain, Gem, Route, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatContext } from "@/contexts/ChatContext";
import type { AIProvider } from "@shared/schema";

const providers = [
  {
    id: "openai" as const,
    name: "OpenAI",
    description: "GPT-4, GPT-3.5 Turbo",
    icon: Brain,
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: "gemini" as const,
    name: "Google Gemini",
    description: "Gemini Pro, Ultra",
    icon: Gem,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: "openrouter" as const,
    name: "OpenRouter",
    description: "Multiple Models",
    icon: Route,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    id: "github" as const,
    name: "GitHub Copilot",
    description: "Code-focused AI",
    icon: Github,
    bgColor: "bg-gray-100",
    iconColor: "text-gray-700"
  }
];

export function ProviderSelector() {
  const { currentProvider, setCurrentProvider } = useChatContext();
  const currentProviderData = providers.find(p => p.id === currentProvider);

  const handleProviderSelect = (provider: AIProvider) => {
    setCurrentProvider(provider);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 border border-slate-200"
        >
          <ArrowUpDown className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Switch Provider</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <DropdownMenuItem
              key={provider.id}
              onClick={() => handleProviderSelect(provider.id)}
              className="w-full p-3 hover:bg-slate-50 flex items-center space-x-3 transition-colors duration-150 cursor-pointer"
            >
              <div className={`w-8 h-8 ${provider.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${provider.iconColor}`} />
              </div>
              <div>
                <div className="font-medium text-slate-800">{provider.name}</div>
                <div className="text-xs text-slate-500">{provider.description}</div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
