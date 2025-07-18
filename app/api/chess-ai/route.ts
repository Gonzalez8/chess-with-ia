import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { gameState, playerMove, moveHistory, difficulty, attitude, language = 'es', customApiKey } = await request.json();
    
    console.log('API Request received:', { gameState, playerMove, moveHistory, difficulty, attitude, language, customApiKey: customApiKey ? 'PROVIDED' : 'NOT_PROVIDED' });

    // Use custom API key if provided, otherwise use default
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('No API key available - either provide your own or configure GEMINI_API_KEY');
    }

    const clientGenAI = customApiKey ? new GoogleGenerativeAI(customApiKey) : genAI;
    const model = clientGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = createChessPrompt(gameState, playerMove, moveHistory, difficulty, attitude, language);
    
    console.log('=== PROMPT ENVIADO A GEMINI ===');
    console.log(prompt);
    console.log('=== FIN PROMPT ===');

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('=== RESPUESTA RAW DE GEMINI ===');
    console.log(text);
    console.log('=== FIN RESPUESTA RAW ===');

    // Clean the response to extract JSON
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('=== RESPUESTA LIMPIA ===');
    console.log(cleanedText);
    console.log('=== FIN RESPUESTA LIMPIA ===');

    // Parse the JSON response from Gemini
    const aiResponse = JSON.parse(cleanedText);
    
    console.log('=== JSON PARSEADO ===');
    console.log('Jugada:', aiResponse.jugada);
    console.log('Comentario:', aiResponse.comentario);
    console.log('=== FIN JSON PARSEADO ===');

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function formatMoveHistory(moveHistory: string[], language: string = 'es'): string {
  const isSpanish = language === 'es';
  
  if (!moveHistory || moveHistory.length === 0) {
    return isSpanish ? 'Ninguno (inicio de partida)' : 'None (game start)';
  }
  
  const formattedMoves = moveHistory.map((move, index) => {
    const isPlayerMove = index % 2 === 0; // Even moves are player moves (white)
    const moveNumber = Math.floor(index / 2) + 1;
    
    if (isPlayerMove) {
      return isSpanish 
        ? `${moveNumber}. Jugador-blancas: ${move}`
        : `${moveNumber}. Player-white: ${move}`;
    } else {
      return isSpanish 
        ? `${moveNumber}... IA-negras: ${move}`
        : `${moveNumber}... AI-black: ${move}`;
    }
  });
  
  return formattedMoves.join(', ');
}

function createChessPrompt(gameState: string, playerMove: string, moveHistory: string[], difficulty: string, attitude: string, language: string): string {
  const isSpanish = language === 'es';
  
  const difficultyDescriptions = isSpanish ? {
    "1": "principiante absoluto, cometes errores básicos ocasionalmente, pero repetando las reglas",
    "2": "principiante, juegas movimientos simples",
    "3": "amateur bajo, entiendes conceptos básicos",
    "4": "amateur, tienes conocimientos básicos de aperturas",
    "5": "intermedio bajo, desarrollas piezas correctamente",
    "6": "intermedio, conoces tácticas básicas",
    "7": "intermedio alto, planificas a medio plazo",
    "8": "avanzado, juegas con estrategia sólida",
    "9": "experto, dominas tácticas complejas",
    "10": "maestro, juegas al más alto nivel"
  } : {
    "1": "absolute beginner, makes basic errors occasionally, but respects rules",
    "2": "beginner, plays simple moves",
    "3": "low amateur, understands basic concepts",
    "4": "amateur, has basic opening knowledge",
    "5": "low intermediate, develops pieces correctly",
    "6": "intermediate, knows basic tactics",
    "7": "high intermediate, plans medium-term",
    "8": "advanced, plays with solid strategy",
    "9": "expert, masters complex tactics",
    "10": "master, plays at the highest level"
  };

  const attitudeDescriptions = isSpanish ? {
    "friendly": "amigable, alentadora y positiva",
    "sarcastic": "irónica, burlona pero divertida",
    "technical": "analítica, precisa y educativa",
    "epic": "dramática, grandilocuente y heroica"
  } : {
    "friendly": "friendly, encouraging and positive",
    "sarcastic": "ironic, mocking but fun",
    "technical": "analytical, precise and educational",
    "epic": "dramatic, grandiloquent and heroic"
  };

  if (isSpanish) {
    return `Eres un jugador de ajedrez de nivel ${difficulty} (${difficultyDescriptions[difficulty as keyof typeof difficultyDescriptions]}).

INFORMACIÓN CRÍTICA - LEE ESTO CUIDADOSAMENTE:
- TÚ ERES LA IA Y JUEGAS CON LAS PIEZAS NEGRAS (color: black)
- EL JUGADOR HUMANO JUEGA CON LAS PIEZAS BLANCAS (color: white)
- SOLO PUEDES MOVER PIEZAS NEGRAS (minúsculas en FEN: r, n, b, q, k, p)
- NUNCA MUEVAS PIEZAS BLANCAS (mayúsculas en FEN: R, N, B, Q, K, P)
- IMPORTANTE: En el historial "Jugador-blancas" son SUS movimientos, "IA-negras" son TUS movimientos

Estado actual del juego (FEN): ${gameState}
Último movimiento del jugador (piezas blancas): ${playerMove}
Historial completo de movimientos: ${moveHistory && moveHistory.length > 0 ? formatMoveHistory(moveHistory, language) : 'Ninguno (inicio de partida)'}

Tu personalidad es ${attitude}: ${attitudeDescriptions[attitude as keyof typeof attitudeDescriptions]}.

Instrucciones:
1. Analiza la posición actual del tablero y el historial de movimientos
2. Elige un movimiento válido apropiado para tu nivel de dificultad
3. Comenta brevemente la partida teniendo en cuenta el movimiento del jugador y tu movimiento con tu personalidad
4. Responde ÚNICAMENTE en formato JSON válido

Formato de respuesta:
{
  "jugada": "formato algebraico (ejemplo: e2e4)",
  "comentario": "tu comentario sobre el movimiento del jugador"
}

REGLAS CRÍTICAS PARA LA JUGADA:
- NUNCA uses el mismo cuadro de origen y destino (ejemplo: f4f4 es INVÁLIDO)
- La jugada debe ser en formato algebraico simple: casilla_origen + casilla_destino
- Ejemplos válidos: e2e4, g1f3, d1h5, a7a8q (para promoción)
- NO uses notación con "x" para capturas, usa formato simple: c6d5 (no c6xd5)
- VERIFICA que el movimiento sea legal antes de responder

IMPORTANTE: 
- Responde ÚNICAMENTE con JSON válido, sin markdown ni texto adicional
- NO uses \`\`\`json ni otros formateos
- La jugada debe ser en formato algebraico (ejemplo: e2e4, g1f3, etc.)
- El comentario debe ser breve (máximo 50 palabras)
- Adapta tu nivel de juego al número de dificultad
- Ejemplo de respuesta correcta: {"jugada": "e2e4", "comentario": "Apertura clásica"}`;
  } else {
    return `You are a chess player at level ${difficulty} (${difficultyDescriptions[difficulty as keyof typeof difficultyDescriptions]}).

CRITICAL INFORMATION - READ THIS CAREFULLY:
- YOU ARE THE AI AND PLAY WITH BLACK PIECES (color: black)
- THE HUMAN PLAYER PLAYS WITH WHITE PIECES (color: white)
- YOU CAN ONLY MOVE BLACK PIECES (lowercase in FEN: r, n, b, q, k, p)
- NEVER MOVE WHITE PIECES (uppercase in FEN: R, N, B, Q, K, P)
- IMPORTANT: In the history "Player-white" are THEIR moves, "AI-black" are YOUR moves

Current game state (FEN): ${gameState}
Last player move (white pieces): ${playerMove}
Complete move history: ${moveHistory && moveHistory.length > 0 ? formatMoveHistory(moveHistory, language) : 'None (game start)'}

Your personality is ${attitude}: ${attitudeDescriptions[attitude as keyof typeof attitudeDescriptions]}.

Instructions:
1. Analyze the current board position and move history
2. Choose a valid move appropriate for your difficulty level
3. Comment briefly on the game considering the player's move and your move with your personality
4. Respond ONLY in valid JSON format

Response format:
{
  "jugada": "algebraic format (example: e2e4)",
  "comentario": "your comment about the player's move"
}

CRITICAL RULES FOR MOVES:
- NEVER use the same origin and destination square (example: f4f4 is INVALID)
- The move must be in simple algebraic format: origin_square + destination_square
- Valid examples: e2e4, g1f3, d1h5, a7a8q (for promotion)
- DON'T use "x" notation for captures, use simple format: c6d5 (not c6xd5)
- VERIFY the move is legal before responding

IMPORTANT: 
- Respond ONLY with valid JSON, no markdown or additional text
- DON'T use \`\`\`json or other formatting
- The move must be in algebraic format (example: e2e4, g1f3, etc.)
- The comment should be brief (maximum 50 words)
- Adapt your play level to the difficulty number
- Example correct response: {"jugada": "e2e4", "comentario": "Classic opening"}`;
  }
}