import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { moveHistory, difficulty, attitude, gameResult, finalFen, customApiKey, language = 'es' } = await request.json();
    
    console.log('Game analysis request:', { moveHistory, difficulty, attitude, gameResult, customApiKey: customApiKey ? 'PROVIDED' : 'NOT_PROVIDED' });

    // Use custom API key if provided, otherwise use default
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('No API key available - either provide your own or configure GEMINI_API_KEY');
    }

    const clientGenAI = customApiKey ? new GoogleGenerativeAI(customApiKey) : genAI;
    const model = clientGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = createGameAnalysisPrompt(moveHistory, difficulty, attitude, gameResult, finalFen, language);
    
    console.log('=== PROMPT PARA ANÁLISIS DE PARTIDA ===');
    console.log(prompt);
    console.log('=== FIN PROMPT ===');

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('=== RESPUESTA DE ANÁLISIS ===');
    console.log(text);
    console.log('=== FIN RESPUESTA ===');

    // Clean the response to extract JSON
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse the JSON response from Gemini
    const aiResponse = JSON.parse(cleanedText);
    
    console.log('=== ANÁLISIS PARSEADO ===');
    console.log('Análisis:', aiResponse.analysis);
    console.log('=== FIN ANÁLISIS ===');

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Error analyzing game:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    
    return NextResponse.json(
      { error: 'Failed to analyze game', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function formatMoveHistoryForAnalysis(moveHistory: string[], language: string = 'es'): string {
  const isSpanish = language === 'es';
  
  if (!moveHistory || moveHistory.length === 0) {
    return isSpanish ? 'Ninguno (inicio de partida)' : 'None (game start)';
  }
  
  const formattedMoves = moveHistory.map((move, index) => {
    const isPlayerMove = index % 2 === 0; // Even moves are player moves (white)
    const playerLabel = isPlayerMove ? (isSpanish ? 'JUGADOR' : 'PLAYER') : (isSpanish ? 'YO' : 'I');
    const colorLabel = isPlayerMove ? (isSpanish ? 'blancas' : 'white') : (isSpanish ? 'negras' : 'black');
    const moveNumber = Math.floor(index / 2) + 1;
    
    if (isPlayerMove) {
      return `${moveNumber}. ${playerLabel} (${colorLabel}): ${move}`;
    } else {
      return `${moveNumber}... ${playerLabel} (${colorLabel}): ${move}`;
    }
  });
  
  return formattedMoves.join(', ');
}

function createGameAnalysisPrompt(moveHistory: string[], difficulty: string, attitude: string, gameResult: string, finalFen: string, language: string = 'es'): string {
  const isSpanish = language === 'es';
  
  const attitudeDescriptions = isSpanish ? {
    "friendly": "amigable, alentadora y constructiva",
    "sarcastic": "irónica, burlona pero divertida",
    "technical": "analítica, precisa y educativa",
    "epic": "dramática, grandilocuente y heroica"
  } : {
    "friendly": "friendly, encouraging and constructive",
    "sarcastic": "ironic, mocking but fun",
    "technical": "analytical, precise and educational",
    "epic": "dramatic, grandiloquent and heroic"
  };

  const resultDescriptions = isSpanish ? {
    "victory": "el jugador ganó la partida",
    "defeat": "el jugador perdió la partida",
    "draw": "la partida terminó en empate"
  } : {
    "victory": "the player won the game",
    "defeat": "the player lost the game",
    "draw": "the game ended in a draw"
  };

  if (isSpanish) {
    return `Eres un maestro de ajedrez experto que analiza partidas completas. Tu personalidad es ${attitude}: ${attitudeDescriptions[attitude as keyof typeof attitudeDescriptions]}.

INFORMACIÓN DE LA PARTIDA:
- Historial completo de movimientos: ${formatMoveHistoryForAnalysis(moveHistory, language)}
- Posición final (FEN): ${finalFen}
- Resultado: ${resultDescriptions[gameResult as keyof typeof resultDescriptions]}
- Dificultad de la IA: ${difficulty}/10
- Total de movimientos: ${moveHistory.length}

INSTRUCCIONES:
1. Analiza toda la partida desde el inicio hasta el final
2. Evalúa los principales momentos: apertura, medio juego, final
3. Identifica las mejores jugadas y los errores clave del jugador
4. Comenta sobre el desarrollo de piezas, control del centro, seguridad del rey
5. Menciona oportunidades perdidas y buenos movimientos tácticos
6. Adapta tu análisis a tu personalidad ${attitude}
7. Sé específico pero accesible, evita jerga muy técnica
8. HABLA EN PRIMERA PERSONA como si fueras el oponente que jugó contra él
9. Responde ÚNICAMENTE en formato JSON válido

IMPORTANTE - HABLA EN PRIMERA PERSONA:
- Usa "Has jugado..." en lugar de "El jugador ha jugado..."
- Usa "Te permití..." o "No pude aprovechar..." en lugar de "La IA permitió..."
- Usa "Luchamos por..." en lugar de "Ambos jugadores lucharon por..."
- Ejemplos: "Has tenido una excelente apertura, pero yo logré..." 
- Ejemplos: "Te vi dudar en el medio juego cuando yo presioné con..."

Formato de respuesta:
{
  "analysis": "tu análisis completo de la partida (150-200 palabras)"
}

IMPORTANTE: 
- Responde ÚNICAMENTE con JSON válido, sin markdown ni texto adicional
- NO uses \`\`\`json ni otros formateos
- El análisis debe ser constructivo y educativo
- Menciona movimientos específicos del historial cuando sea relevante
- Adapta tu tono a la personalidad ${attitude}
- Ejemplo de respuesta correcta: {"analysis": "Análisis de la partida aquí..."}`;
  } else {
    return `You are an expert chess master who analyzes complete games. Your personality is ${attitude}: ${attitudeDescriptions[attitude as keyof typeof attitudeDescriptions]}.

GAME INFORMATION:
- Complete move history: ${formatMoveHistoryForAnalysis(moveHistory, language)}
- Final position (FEN): ${finalFen}
- Result: ${resultDescriptions[gameResult as keyof typeof resultDescriptions]}
- AI difficulty: ${difficulty}/10
- Total moves: ${moveHistory.length}

INSTRUCTIONS:
1. Analyze the entire game from start to finish
2. Evaluate key moments: opening, middle game, endgame
3. Identify the player's best moves and key mistakes
4. Comment on piece development, center control, king safety
5. Mention missed opportunities and good tactical moves
6. Adapt your analysis to your personality ${attitude}
7. Be specific but accessible, avoid overly technical jargon
8. SPEAK IN FIRST PERSON as if you were the opponent who played against them
9. Respond ONLY in valid JSON format

IMPORTANT - SPEAK IN FIRST PERSON:
- Use "You played..." instead of "The player played..."
- Use "I allowed you..." or "I couldn't capitalize..." instead of "The AI allowed..."
- Use "We fought for..." instead of "Both players fought for..."
- Examples: "You had an excellent opening, but I managed to..." 
- Examples: "I saw you hesitate in the middle game when I pressed with..."

Response format:
{
  "analysis": "your complete game analysis (150-200 words)"
}

IMPORTANT: 
- Respond ONLY with valid JSON, no markdown or additional text
- DON'T use \`\`\`json or other formatting
- The analysis should be constructive and educational
- Mention specific moves from the history when relevant
- Adapt your tone to the personality ${attitude}
- Example correct response: {"analysis": "Game analysis here..."}`;
  }
}