import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { move, gameState, possibleMoves } = body;

    if (!move || !gameState || !possibleMoves) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const explanation = generateMoveExplanation(move, gameState, possibleMoves);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Error in explain-illegal-move:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateMoveExplanation(move: any, gameState: any, possibleMoves: any[]) {
    // This is a simplified version. In a real scenario, you'd use a chess library.
    const piece = gameState.board.find((p:any) => p.position === move.from);

    if (!piece) {
        return `No piece found at ${move.from}.`;
    }

    if (piece.color !== gameState.turn) {
        return `It's not your turn to move the ${piece.color} pieces.`;
    }

    const isCapture = gameState.board.some((p:any) => p.position === move.to);
    const moveType = isCapture ? "capture" : "move";

    if (possibleMoves.length === 0) {
        return `The ${piece.type} at ${move.from} has no legal moves.`;
    }

    return `A ${piece.type} cannot ${moveType} from ${move.from} to ${move.to}. Legal moves are: ${possibleMoves.join(', ')}`;
}
