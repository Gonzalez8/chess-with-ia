"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain } from "lucide-react"
import GameBoard from "@/components/game-board"
import IACommentBox from "@/components/ia-comment-box"
import SettingsPanel from "@/components/settings-panel"
import GameSummary from "@/components/game-summary"
import ApiKeyConfig from "@/components/api-key-config"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function GamePage() {
  const { t, language } = useLanguage();
  const [difficulty, setDifficulty] = useState("5")
  const [attitude, setAttitude] = useState("friendly")
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [currentComment, setCurrentComment] = useState("")
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [userApiKey, setUserApiKey] = useState("")
  const [useCustomKey, setUseCustomKey] = useState(false)

  const handleGameStart = () => {
    setGameStarted(true)
    setCurrentComment(t.startGameComment)
  }
 
  const handleGameEnd = () => {
    setGameEnded(true)
  }

  const handleAIComment = (comment: string) => {
    console.log('📝 Recibiendo comentario en GamePage:', comment);
    setCurrentComment(comment)
    console.log('📝 Estado currentComment actualizado a:', comment);
  }

  const handleGameReset = () => {
    setGameStarted(false)
    setGameEnded(false)
    setCurrentComment("")
    setMoveHistory([])
    // Forzar re-render del componente GameBoard
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">{t.title}</h1>
            <LanguageSelector />
          </div>

          <Badge variant="secondary" className="bg-purple-600 text-white">
            <Brain className="w-4 h-4 mr-1" />
            {t.aiActive}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-4">
            <SettingsPanel
              difficulty={difficulty}
              attitude={attitude}
              onDifficultyChange={setDifficulty}
              onAttitudeChange={setAttitude}
              gameStarted={gameStarted}
              onGameStart={handleGameStart}
              onGameReset={handleGameReset}
              canStart={!useCustomKey || (useCustomKey && userApiKey.length > 0)}
              language={language}
            />
            
            <ApiKeyConfig
              userApiKey={userApiKey}
              useCustomKey={useCustomKey}
              onApiKeyChange={setUserApiKey}
              onUseCustomKeyChange={setUseCustomKey}
              gameStarted={gameStarted}
              language={language}
            />
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">{t.chessBoard}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <GameBoard
                  gameStarted={gameStarted}
                  difficulty={difficulty}
                  attitude={attitude}
                  language={language}
                  onMove={(move) => {
                    setMoveHistory([...moveHistory, move])
                  }}
                  onGameEnd={handleGameEnd}
                  onAIComment={handleAIComment}
                  customApiKey={useCustomKey ? userApiKey : undefined}
                />
              </CardContent>
            </Card>
          </div>

          {/* AI Comments */}
          <div className="lg:col-span-1">
            <IACommentBox comment={currentComment} attitude={attitude} gameStarted={gameStarted} language={language} />
          </div>
        </div>

        {/* Game Summary */}
        {gameEnded && (
          <div className="mt-8">
            <GameSummary 
              moveHistory={moveHistory} 
              difficulty={difficulty} 
              attitude={attitude}
              gameResult="victory"
              finalFen=""
              customApiKey={useCustomKey ? userApiKey : undefined}
              language={language}
            />
          </div>
        )}
      </div>
    </div>
  )
}
