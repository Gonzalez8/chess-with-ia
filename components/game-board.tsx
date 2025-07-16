"use client"

import { useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

interface GameBoardProps {
  gameStarted: boolean
  onMove: (move: string) => void
  onGameEnd: () => void
}

export default function GameBoard({ gameStarted, onMove, onGameEnd }: GameBoardProps) {
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())

  function makeAMove(move: any) {
    const gameCopy = new Chess(game.fen())
    const result = gameCopy.move(move)

    if (result) {
      setGame(gameCopy)
      setGamePosition(gameCopy.fen())

      // Notify parent component about the move
      onMove(`${result.from}${result.to}`)

      // Check if game is over
      if (gameCopy.isGameOver()) {
        onGameEnd()
        return
      }

      // Simulate AI move after a delay
      setTimeout(() => {
        makeRandomMove(gameCopy)
      }, 1000)
    }

    return result
  }

  function makeRandomMove(currentGame: Chess) {
    const possibleMoves = currentGame.moves()

    if (possibleMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length)
      const move = possibleMoves[randomIndex]

      const result = currentGame.move(move)
      if (result) {
        setGame(new Chess(currentGame.fen()))
        setGamePosition(currentGame.fen())

        // Check if game is over after AI move
        if (currentGame.isGameOver()) {
          onGameEnd()
        }
      }
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (!gameStarted) return false

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for simplicity
    })

    return move !== null
  }

  if (!gameStarted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center border-4 border-amber-800">
          <div className="text-center text-amber-800">
            <div className="text-6xl mb-4">♔</div>
            <p className="text-lg font-semibold">Configura la partida</p>
            <p className="text-sm">y presiona "Iniciar Juego"</p>
          </div>
        </div>
        <p className="text-center text-gray-300 text-sm mt-2">Tablero en espera</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden shadow-2xl">
        <Chessboard
          position={gamePosition}
          onPieceDrop={onDrop}
          boardWidth={400}
          customBoardStyle={{
            borderRadius: "8px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          customDarkSquareStyle={{ backgroundColor: "#8B4513" }}
          customLightSquareStyle={{ backgroundColor: "#F5DEB3" }}
          customDropSquareStyle={{
            boxShadow: "inset 0 0 1px 6px rgba(255,255,0,0.75)",
          }}
          promotionToSquare={null}
          showPromotionDialog={true}
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-300 text-sm">
          {game.turn() === "w" ? "Tu turno (Blancas)" : "Turno de la IA (Negras)"}
        </p>

        {game.isCheck() && <p className="text-red-400 text-sm font-semibold mt-1">¡Jaque!</p>}

        {game.isGameOver() && (
          <div className="mt-2 p-2 bg-blue-600/20 rounded-lg border border-blue-600/30">
            <p className="text-blue-400 font-semibold">
              {game.isCheckmate()
                ? `¡Jaque mate! ${game.turn() === "w" ? "Negras" : "Blancas"} ganan`
                : game.isDraw()
                  ? "¡Empate!"
                  : "¡Juego terminado!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
