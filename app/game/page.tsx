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

export default function GamePage() {
  const [difficulty, setDifficulty] = useState("5")
  const [attitude, setAttitude] = useState("amistosa")
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [currentComment, setCurrentComment] = useState("")
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const handleGameStart = () => {
    setGameStarted(true)
    setCurrentComment("¡Excelente! Comencemos esta partida. Tienes las blancas, ¡haz tu primer movimiento!")
  }

  const handleGameEnd = () => {
    setGameEnded(true)
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
              Volver al inicio
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-white">ChessWithIA</h1>

          <Badge variant="secondary" className="bg-purple-600 text-white">
            <Brain className="w-4 h-4 mr-1" />
            IA Activa
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <SettingsPanel
              difficulty={difficulty}
              attitude={attitude}
              onDifficultyChange={setDifficulty}
              onAttitudeChange={setAttitude}
              gameStarted={gameStarted}
              onGameStart={handleGameStart}
              onGameReset={handleGameReset}
            />
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Tablero de Ajedrez</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <GameBoard
                  gameStarted={gameStarted}
                  onMove={(move) => {
                    setMoveHistory([...moveHistory, move])

                    // Comentarios más específicos según la actitud y el movimiento
                    setTimeout(() => {
                      const moveResponses = {
                        amistosa: [
                          "¡Excelente movimiento! Me gusta tu estilo 😊",
                          "Interesante estrategia, veamos cómo continúas 👍",
                          "Buen desarrollo de piezas, sigues mejorando 🎯",
                          "Ese movimiento muestra que estás pensando bien ✨",
                        ],
                        sarcástica: [
                          "¿En serio? Bueno, he visto movimientos peores... 😏",
                          "Interesante elección... aunque yo habría jugado mejor 🙄",
                          "Veo que sigues mi consejo de jugar de forma... creativa 😈",
                          "Ah, la clásica jugada de 'veamos qué pasa' 🤨",
                        ],
                        técnica: [
                          "Movimiento sólido. Controlas el centro efectivamente.",
                          "Desarrollo correcto según los principios de apertura.",
                          "Buena coordinación de piezas en el flanco de rey.",
                          "Estructura de peones mejorada con esa jugada.",
                        ],
                        épica: [
                          "¡El destino del reino se decide con cada jugada! ⚔️",
                          "¡Valiente guerrero! Pero la batalla apenas comienza 🛡️",
                          "¡Por el honor del tablero! Tu coraje es admirable 👑",
                          "¡Las fuerzas del ajedrez se agitan con tu movimiento! ⚡",
                        ],
                      }

                      const responses = moveResponses[attitude as keyof typeof moveResponses]
                      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
                      setCurrentComment(randomResponse)
                    }, 1000)
                  }}
                  onGameEnd={handleGameEnd}
                />
              </CardContent>
            </Card>
          </div>

          {/* AI Comments */}
          <div className="lg:col-span-1">
            <IACommentBox comment={currentComment} attitude={attitude} gameStarted={gameStarted} />
          </div>
        </div>

        {/* Game Summary */}
        {gameEnded && (
          <div className="mt-8">
            <GameSummary moveHistory={moveHistory} difficulty={difficulty} attitude={attitude} />
          </div>
        )}
      </div>
    </div>
  )
}
