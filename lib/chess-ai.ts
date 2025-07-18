import { Chess } from 'chess.js';

export interface AIResponse {
  jugada: string;
  comentario: string;
}

export interface ChessAIRequest {
  gameState: string;
  playerMove: string;
  moveHistory: string[];
  difficulty: string;
  attitude: string;
  language: string;
  customApiKey?: string;
}

export async function getAIMove(request: ChessAIRequest): Promise<AIResponse> {
  try {
    const response = await fetch('/api/chess-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting AI move:', error);
    // Fallback to random move if AI fails
    return getFallbackMove(request.gameState, request.attitude, request.language);
  }
}

function getFallbackMove(gameState: string, attitude: string, language: string = 'es'): AIResponse {
  const game = new Chess(gameState);
  const possibleMoves = game.moves({ verbose: true });
  const isSpanish = language === 'es';
  
  if (possibleMoves.length === 0) {
    return {
      jugada: '',
      comentario: isSpanish ? 'No hay movimientos disponibles.' : 'No moves available.'
    };
  }

  const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  
  const fallbackComments = isSpanish ? {
    friendly: "¡Sigamos jugando! 😊",
    sarcastic: "Bueno, algo tengo que mover... 😏",
    technical: "Movimiento de respaldo seleccionado.",
    epic: "¡La batalla continúa! ⚔️"
  } : {
    friendly: "Let's keep playing! 😊",
    sarcastic: "Well, I have to move something... 😏",
    technical: "Fallback move selected.",
    epic: "The battle continues! ⚔️"
  };

  return {
    jugada: `${randomMove.from}${randomMove.to}`,
    comentario: fallbackComments[attitude as keyof typeof fallbackComments] || (isSpanish ? "Continúo la partida." : "Continuing the game.")
  };
}

export function validateMove(gameState: string, move: string): boolean {
  try {
    const game = new Chess(gameState);
    const { from, to } = parseMove(move);
    
    // Check if the piece at the source square is black (AI should only move black pieces)
    const piece = game.get(from as any);
    if (!piece || piece.color !== 'b') {
      console.log('❌ AI tried to move a non-black piece:', piece);
      return false;
    }
    
    // Check if it's black's turn
    if (game.turn() !== 'b') {
      console.log('❌ AI tried to move when it\'s not black\'s turn');
      return false;
    }
    
    const result = game.move({ from, to });
    return result !== null;
  } catch (error) {
    return false;
  }
}

export function parseMove(move: string): { from: string; to: string } {
  // Remove 'x' if present (for captures like "c6xd5")
  const cleanMove = move.replace('x', '');
  
  const from = cleanMove.substring(0, 2);
  const to = cleanMove.substring(2, 4);
  
  // Validate that from and to are different
  if (from === to) {
    throw new Error(`Invalid move: same source and destination (${from})`);
  }
  
  return { from, to };
}