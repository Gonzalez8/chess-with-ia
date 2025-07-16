"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Brain, RotateCcw, Home } from "lucide-react"
import Link from "next/link"

interface GameSummaryProps {
  moveHistory: string[]
  difficulty: string
  attitude: string
}

export default function GameSummary({ moveHistory, difficulty, attitude }: GameSummaryProps) {
  // Simulate game analysis
  const gameResult = Math.random() > 0.5 ? "victory" : "defeat"
  const analysisPoints = [
    "Excelente control del centro del tablero",
    "Desarrollo de piezas bien coordinado",
    "Algunas oportunidades tácticas perdidas",
    "Buen manejo del final de partida",
  ]

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Resumen de la Partida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Game Result */}
        <div className="text-center">
          <div className={`text-6xl mb-4 ${gameResult === "victory" ? "text-yellow-400" : "text-gray-400"}`}>
            {gameResult === "victory" ? "🏆" : "⚔️"}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${gameResult === "victory" ? "text-yellow-400" : "text-gray-300"}`}>
            {gameResult === "victory" ? "¡Victoria!" : "Derrota Honorable"}
          </h3>
          <p className="text-gray-300">
            {gameResult === "victory"
              ? "¡Excelente partida! Has demostrado gran habilidad estratégica."
              : "Una partida reñida. Cada derrota es una oportunidad de aprender."}
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{moveHistory.length}</div>
            <div className="text-xs text-gray-400">Movimientos</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{difficulty}</div>
            <div className="text-xs text-gray-400">Dificultad IA</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">15:30</div>
            <div className="text-xs text-gray-400">Duración</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">85%</div>
            <div className="text-xs text-gray-400">Precisión</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h4 className="text-white font-semibold">Análisis de la IA</h4>
            <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
              {attitude}
            </Badge>
          </div>
          <ul className="space-y-2">
            {analysisPoints.map((point, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Nueva Partida
          </Button>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
