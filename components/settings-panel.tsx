"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Settings, Play, Brain, RotateCcw } from "lucide-react"

interface SettingsPanelProps {
  difficulty: string
  attitude: string
  onDifficultyChange: (value: string) => void
  onAttitudeChange: (value: string) => void
  gameStarted: boolean
  onGameStart: () => void
  onGameReset?: () => void // Nueva prop opcional
}

export default function SettingsPanel({
  difficulty,
  attitude,
  onDifficultyChange,
  onAttitudeChange,
  gameStarted,
  onGameStart,
  onGameReset,
}: SettingsPanelProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuración
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Difficulty Selector */}
        <div className="space-y-2">
          <Label className="text-white font-medium">Dificultad IA</Label>
          <Select value={difficulty} onValueChange={onDifficultyChange} disabled={gameStarted}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Nivel {i + 1} {i < 3 ? "(Fácil)" : i < 7 ? "(Medio)" : "(Difícil)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Attitude Selector */}
        <div className="space-y-2">
          <Label className="text-white font-medium">Actitud IA</Label>
          <Select value={attitude} onValueChange={onAttitudeChange} disabled={gameStarted}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amistosa">😊 Amistosa</SelectItem>
              <SelectItem value="sarcástica">😏 Sarcástica</SelectItem>
              <SelectItem value="técnica">🤓 Técnica</SelectItem>
              <SelectItem value="épica">⚔️ Épica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Game Button */}
        {!gameStarted && (
          <Button
            onClick={onGameStart}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Juego
          </Button>
        )}

        {gameStarted && onGameReset && (
          <Button
            onClick={onGameReset}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Partida
          </Button>
        )}

        {/* Game Status */}
        {gameStarted && (
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-400">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">Partida en curso</span>
            </div>
            <p className="text-xs text-green-300 mt-1">
              Dificultad: {difficulty} | Actitud: {attitude}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
