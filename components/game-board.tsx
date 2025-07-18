"use client"

import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { getAIMove, validateMove, parseMove } from "@/lib/chess-ai"
import { Language, useTranslation } from "@/lib/i18n"

interface GameBoardProps {
  gameStarted: boolean
  difficulty: string
  attitude: string
  language: Language
  onMove: (move: string) => void
  onGameEnd: () => void
  onAIComment: (comment: string) => void
  customApiKey?: string
}

export default function GameBoard({ gameStarted, difficulty, attitude, language, onMove, onGameEnd, onAIComment, customApiKey }: GameBoardProps) {
  const { t, translate } = useTranslation(language);
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  // Reset game when gameStarted changes
  useEffect(() => {
    if (gameStarted) {
      const newGame = new Chess()
      setGame(newGame)
      setGamePosition(newGame.fen())
      setIsAIThinking(false)
      setMoveHistory([])
    }
  }, [gameStarted])

  function makeAMove(move: any) {
    try {
      // Check if it's the same square (invalid move)
      if (move.from === move.to) {
        console.log('❌ Invalid move: same source and destination');
        return null;
      }

      const gameCopy = new Chess(game.fen())
      
      // Validate the move before attempting it
      const possibleMoves = gameCopy.moves({ verbose: true })
      const isLegalMove = possibleMoves.some(m => 
        m.from === move.from && m.to === move.to
      )
      
      if (!isLegalMove) {
        console.log('❌ Move is not legal:', move)
        console.log('Possible moves from', move.from, ':', possibleMoves.filter(m => m.from === move.from).map(m => `${m.from}→${m.to}`))
        
        // Generate local explanation for illegal move
        const explanation = generateLocalMoveExplanation(move, gameCopy, possibleMoves)
        onAIComment(explanation)
        
        return null
      }

      const result = gameCopy.move(move)

      if (result) {
        setGame(gameCopy)
        setGamePosition(gameCopy.fen())

        // Notify parent component about the move
        onMove(`${result.from}${result.to}`)

        // Check if game is over
        if (gameCopy.isGameOver()) {
          onGameEnd()
          return result
        }

        // Add player move to history
        const playerMove = `${result.from}${result.to}`
        const newMoveHistory = [...moveHistory, playerMove]
        setMoveHistory(newMoveHistory)

        // Get AI move after a delay
        setTimeout(() => {
          console.log('🔄 Pasando historial a makeAIMove:', newMoveHistory);
          makeAIMove(gameCopy, playerMove, newMoveHistory)
        }, 1000)
      }

      return result
    } catch (error) {
      console.error('Error making move:', error);
      return null;
    }
  }

  async function makeAIMove(currentGame: Chess, playerMove: string, currentMoveHistory: string[]) {
    setIsAIThinking(true)
    
    try {
      console.log('🤖 Solicitando movimiento IA...');
      console.log('Estado del juego:', currentGame.fen());
      console.log('Último movimiento del jugador:', playerMove);
      console.log('Historial de movimientos:', currentMoveHistory);
      console.log('Dificultad:', difficulty);
      console.log('Actitud:', attitude);
      
      const aiResponse = await getAIMove({
        gameState: currentGame.fen(),
        playerMove: playerMove,
        moveHistory: currentMoveHistory,
        difficulty: difficulty,
        attitude: attitude,
        language: language,
        customApiKey: customApiKey
      })
      
      console.log('🤖 Respuesta recibida de la IA:', aiResponse);

      // Validate AI move
      console.log('🔍 Validando movimiento IA:', aiResponse.jugada);
      
      if (aiResponse.jugada) {
        try {
          const { from, to } = parseMove(aiResponse.jugada)
          console.log('🔍 Parsed move:', { from, to });
          
          const isValid = validateMove(currentGame.fen(), aiResponse.jugada);
          console.log('🔍 Resultado validación:', isValid);
          
          if (isValid) {
            const result = currentGame.move({ from, to })
        
            if (result) {
              setGame(new Chess(currentGame.fen()))
              setGamePosition(currentGame.fen())
              
              // Add AI move to history
              const aiMove = `${result.from}${result.to}`
              setMoveHistory([...currentMoveHistory, aiMove])
              
              // Send AI comment to parent
              console.log('✅ Enviando comentario IA:', aiResponse.comentario);
              const commentToSend = aiResponse.comentario || "Movimiento realizado";
              console.log('✅ Comentario que se va a enviar:', commentToSend);
              onAIComment(commentToSend)
              
              // Check if game is over after AI move
              if (currentGame.isGameOver()) {
                onGameEnd()
              }
            } else {
              console.log('❌ chess.js rejected the move, using random move');
              makeRandomMove(currentGame)
            }
          } else {
            console.log('❌ Movimiento IA inválido, usando movimiento aleatorio');
            makeRandomMove(currentGame)
          }
        } catch (error) {
          console.log('❌ Error parsing AI move:', error);
          console.log('❌ Using random move instead');
          makeRandomMove(currentGame)
        }
      } else {
        console.log('❌ No move received from AI, using random move');
        makeRandomMove(currentGame)
      }
    } catch (error) {
      console.error('Error getting AI move:', error)
      // Fallback to random move if AI fails
      makeRandomMove(currentGame)
    } finally {
      setIsAIThinking(false)
    }
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

  function generateLocalMoveExplanation(move: any, gameCopy: Chess, possibleMoves: any[]) {
    const piece = gameCopy.get(move.from as any)
    const targetPiece = gameCopy.get(move.to as any)
    const movesFromSquare = possibleMoves.filter(m => m.from === move.from)
    
    // Check if there's no piece at the source square
    if (!piece) {
      return translate('noPieceAt', { square: move.from })
    }
    
    // Check if it's not the player's piece
    if (piece.color !== 'w') {
      return t.notYourPiece
    }
    
    // Check if the player is in check
    if (gameCopy.isCheck()) {
      return translate('inCheck', { moves: possibleMoves.map(m => `${m.from}→${m.to}`).join(', ') })
    }
    
    // Check if the piece has no legal moves
    if (movesFromSquare.length === 0) {
      return translate('cannotMoveFrom', { 
        piece: t.pieces[piece.type as keyof typeof t.pieces], 
        from: move.from 
      })
    }
    
    // Check if trying to capture own piece
    if (targetPiece && targetPiece.color === 'w') {
      return translate('cannotCaptureOwn', { 
        piece: t.pieces[piece.type as keyof typeof t.pieces], 
        from: move.from, 
        to: move.to 
      })
    }
    
    // General invalid move explanation
    const validMoves = movesFromSquare.map(m => `${m.from}→${m.to}`).join(', ')
    return translate('cannotMoveTo', { 
      piece: t.pieces[piece.type as keyof typeof t.pieces], 
      from: move.from, 
      to: move.to, 
      moves: validMoves 
    })
  }

  function onDrop(dropInfo: any) {
    if (!gameStarted) return false

    // Only allow moves when it's white's turn (player's turn)
    if (game.turn() !== 'w') return false

    const { sourceSquare, targetSquare } = dropInfo
    
    // Don't allow moving to the same square
    if (sourceSquare === targetSquare) return false
    
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
            <p className="text-lg font-semibold">{t.configureGame}</p>
            <p className="text-sm">{t.pressStart}</p>
          </div>
        </div>
        <p className="text-center text-gray-300 text-sm mt-2">{t.boardWaiting}</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden shadow-2xl">
        <Chessboard
          options={{
            position: gamePosition,
            onPieceDrop: onDrop,
          }}
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-300 text-sm">
          {game.turn() === "w" ? t.yourTurn : isAIThinking ? t.aiThinking : t.aiTurn}
        </p>

        {game.isCheck() && <p className="text-red-400 text-sm font-semibold mt-1">{t.check}</p>}

        {game.isGameOver() && (
          <div className="mt-2 p-2 bg-blue-600/20 rounded-lg border border-blue-600/30">
            <p className="text-blue-400 font-semibold">
              {game.isCheckmate()
                ? `${t.checkmate} ${game.turn() === "w" ? t.blacksWin : t.whitesWin}`
                : game.isDraw()
                  ? t.draw
                  : t.gameOver}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
