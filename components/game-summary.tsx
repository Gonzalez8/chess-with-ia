"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Brain, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { Language, useTranslation } from "@/lib/i18n"

interface GameSummaryProps {
  moveHistory: string[]
  difficulty: string
  attitude: string
  gameResult: string
  finalFen: string
  customApiKey?: string
  language: Language
}

export default function GameSummary({ moveHistory, difficulty, attitude, gameResult, finalFen, customApiKey, language }: GameSummaryProps) {
  const { t } = useTranslation(language);
  const [aiAnalysis, setAiAnalysis] = useState<string>("")
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true)
  const [gameDuration, setGameDuration] = useState("0:00")

  useEffect(() => {
    // Calculate game duration (placeholder)
    const minutes = Math.floor(moveHistory.length / 2)
    const seconds = (moveHistory.length % 2) * 30
    setGameDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    
    // Get AI analysis
    generateGameAnalysis()
  }, [])

  const generateGameAnalysis = async () => {
    try {
      const response = await fetch('/api/analyze-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moveHistory,
          difficulty,
          attitude,
          gameResult,
          finalFen,
          customApiKey,
          language
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiAnalysis(data.analysis)
      } else {
        setAiAnalysis(t.analyzingGame)
      }
    } catch (error) {
      console.error('Error getting game analysis:', error)
      setAiAnalysis(t.error)
    } finally {
      setIsLoadingAnalysis(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          {t.gameSummary}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Game Result */}
        <div className="text-center">
          <div className={`text-6xl mb-4 ${gameResult === "victory" ? "text-yellow-400" : gameResult === "defeat" ? "text-red-400" : "text-gray-400"}`}>
            {gameResult === "victory" ? "🏆" : gameResult === "defeat" ? "💀" : "🤝"}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${gameResult === "victory" ? "text-yellow-400" : gameResult === "defeat" ? "text-red-400" : "text-gray-300"}`}>
            {gameResult === "victory" ? t.victory : gameResult === "defeat" ? t.defeat : t.draw}
          </h3>
          <p className="text-gray-300">
            {gameResult === "victory"
              ? (language === 'es' ? "¡Excelente partida! Has demostrado gran habilidad estratégica." : "Excellent game! You've shown great strategic skill.")
              : gameResult === "defeat"
              ? (language === 'es' ? "Una partida reñida. Cada derrota es una oportunidad de aprender." : "A hard-fought game. Every defeat is an opportunity to learn.")
              : (language === 'es' ? "Un empate honorable. Ambos jugadores demostraron gran nivel." : "An honorable draw. Both players showed great skill.")}
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{moveHistory.length}</div>
            <div className="text-xs text-gray-400">{t.moves}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{difficulty}</div>
            <div className="text-xs text-gray-400">{t.aiDifficulty}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{gameDuration}</div>
            <div className="text-xs text-gray-400">{t.duration}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{Math.floor(moveHistory.length / 2)}</div>
            <div className="text-xs text-gray-400">{t.plays}</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h4 className="text-white font-semibold">{t.aiAnalysis}</h4>
            <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
              {t.attitudes[attitude as keyof typeof t.attitudes] || attitude}
            </Badge>
          </div>
          <div className="text-gray-300 text-sm leading-relaxed">
            {isLoadingAnalysis ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <span>{t.analyzingGame}</span>
              </div>
            ) : (
              <p>{aiAnalysis}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t.newGame}
          </Button>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              {t.home}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
