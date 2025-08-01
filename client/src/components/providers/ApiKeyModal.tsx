import { useState } from "react";
import { X, Eye, EyeOff, Shield, Info, Brain, Gem, Route, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChatContext } from "@/contexts/ChatContext";
import { useToast } from "@/hooks/use-toast";
import type { AIProvider } from "@shared/schema";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const providers = [
  {
    id: "openai" as const,
    name: "OpenAI",
    icon: Brain,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    instructions: "Visit platform.openai.com, go to API Keys section, and create a new secret key. Keep it secure and never share it."
  },
  {
    id: "gemini" as const,
    name: "Gemini",
    icon: Gem,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    instructions: "Visit ai.google.dev, create a new project, and generate an API key. Enable the Generative AI API for your project."
  },
  {
    id: "openrouter" as const,
    name: "OpenRouter",
    icon: Route,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    instructions: "Visit openrouter.ai, sign up for an account, and generate an API key from your dashboard. Add credits to your account to use models."
  },
  {
    id: "github" as const,
    name: "GitHub",
    icon: Github,
    bgColor: "bg-gray-100",
    iconColor: "text-gray-700",
    instructions: "Visit github.com/settings/tokens, create a personal access token with the necessary permissions for GitHub Copilot API access."
  }
];

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const { currentProvider, setCurrentProvider, apiKeys, setApiKey } = useChatContext();
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(currentProvider);
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const currentProviderData = providers.find(p => p.id === selectedProvider);

  const handleProviderSelect = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setApiKeyValue(apiKeys[provider] || "");
  };

  const handleSave = () => {
    if (!apiKeyValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive"
      });
      return;
    }

    setApiKey(selectedProvider, apiKeyValue.trim());
    setCurrentProvider(selectedProvider);
    
    toast({
      title: "Success",
      description: `${currentProviderData?.name} API key saved successfully`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-800">
            API Key Configuration
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Configure your AI provider API keys for secure access
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Provider Selection */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-3 block">
              Select Provider
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((provider) => {
                const Icon = provider.icon;
                const isSelected = selectedProvider === provider.id;
                return (
                  <Button
                    key={provider.id}
                    variant="outline"
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`p-3 h-auto flex flex-col items-center space-y-2 transition-colors duration-200 ${
                      isSelected 
                        ? "border-indigo-300 bg-indigo-50" 
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className={`w-10 h-10 ${provider.bgColor} rounded-lg flex items-center justify-center transition-colors duration-200`}>
                      <Icon className={`w-5 h-5 ${provider.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{provider.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* API Key Input */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              API Key
            </Label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKeyValue}
                onChange={(e) => setApiKeyValue(e.target.value)}
                placeholder="Enter your API key..."
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Instructions */}
          {currentProviderData && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex space-x-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">
                    How to get your API key:
                  </h4>
                  <p className="text-sm text-blue-600">
                    {currentProviderData.instructions}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Notice */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex space-x-2">
              <Shield className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-1">Security Notice</h4>
                <p className="text-sm text-amber-600">
                  API keys are stored locally in your browser's session storage and are never sent to our servers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600"
            >
              Save API Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
