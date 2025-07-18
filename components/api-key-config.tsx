"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Key, Info, ExternalLink } from "lucide-react"
import { Language, useTranslation } from "@/lib/i18n"

interface ApiKeyConfigProps {
  userApiKey: string
  useCustomKey: boolean
  onApiKeyChange: (key: string) => void
  onUseCustomKeyChange: (use: boolean) => void
  gameStarted: boolean
  language: Language
}

export default function ApiKeyConfig({ 
  userApiKey, 
  useCustomKey, 
  onApiKeyChange, 
  onUseCustomKeyChange,
  gameStarted,
  language 
}: ApiKeyConfigProps) {
  const { t } = useTranslation(language);
  const [showKey, setShowKey] = useState(false)

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="w-5 h-5" />
          {t.apiConfiguration}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info */}
        <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-600/30">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-blue-300 text-xs">
              <p className="mb-1">{t.apiKeyInfo}</p>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
              >
                {t.getApiKey}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Switch */}
        <div className="flex items-center justify-between">
          <Label htmlFor="use-custom-key" className="text-white text-sm">
            {t.useCustomKey}
          </Label>
          <Switch
            id="use-custom-key"
            checked={useCustomKey}
            onCheckedChange={onUseCustomKeyChange}
            disabled={gameStarted}
          />
        </div>

        {/* API Key Input */}
        {useCustomKey && (
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-white text-sm">
              {t.geminiApiKey}
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={userApiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="AIzaSy..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-20"
                disabled={gameStarted}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 px-2 text-gray-400 hover:text-white"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? t.hide : t.show}
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              {t.apiKeyPrivacy}
            </p>
          </div>
        )}

        {/* Status */}
        <div className="text-xs text-gray-400">
          {useCustomKey ? (
            userApiKey ? (
              <span className="text-green-400">{t.customKeyConfigured}</span>
            ) : (
              <span className="text-yellow-400">{t.enterApiKey}</span>
            )
          ) : (
            <span className="text-blue-400">{t.usingSharedKey}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}