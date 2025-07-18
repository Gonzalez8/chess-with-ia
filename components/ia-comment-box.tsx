"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Bot } from "lucide-react"
import { Language, useTranslation } from "@/lib/i18n"

interface IACommentBoxProps {
  comment: string
  attitude: string
  gameStarted: boolean
  language: Language
}

export default function IACommentBox({ comment, attitude, gameStarted, language }: IACommentBoxProps) {
  const { t } = useTranslation(language);
  const getAttitudeColor = (attitude: string) => {
    switch (attitude) {
      case "friendly":
        return "from-green-500 to-blue-500"
      case "sarcastic":
        return "from-purple-500 to-pink-500"
      case "technical":
        return "from-blue-500 to-cyan-500"
      case "epic":
        return "from-red-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getAttitudeEmoji = (attitude: string) => {
    switch (attitude) {
      case "friendly":
        return "😊"
      case "sarcastic":
        return "😏"
      case "technical":
        return "🤓"
      case "epic":
        return "⚔️"
      default:
        return "🤖"
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {t.aiComments}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!gameStarted ? (
          <div className="text-center text-gray-400 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">{t.aiCommentsWaiting}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* AI Avatar */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-r ${getAttitudeColor(attitude)} flex items-center justify-center text-white font-bold`}
              >
                {getAttitudeEmoji(attitude)}
              </div>
              <div>
                <p className="text-white font-medium">ChessIA</p>
                <p className="text-gray-400 text-xs capitalize">{t.attitudes[attitude as keyof typeof t.attitudes] || attitude}</p>
              </div>
            </div>

            {/* Comment */}
            <div className={`bg-gradient-to-r ${getAttitudeColor(attitude)} p-0.5 rounded-lg`}>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-white text-sm leading-relaxed">{comment || t.waitingNextMove}</p>
              </div>
            </div>

            {/* Typing indicator when AI is "thinking" */}
            {!comment && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span>{t.aiThinking}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
