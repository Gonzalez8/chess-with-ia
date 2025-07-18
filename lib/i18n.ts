export type Language = 'en' | 'es';

export interface Translations {
  // Navigation
  backToHome: string;
  home: string;
  
  // Game Page
  title: string;
  aiActive: string;
  chessBoard: string;
  aiComments: string;
  gameSettings: string;
  apiConfiguration: string;
  
  // Settings
  settings: string;
  difficulty: string;
  attitude: string;
  startGame: string;
  resetGame: string;
  restartGame: string;
  newGame: string;
  aiDifficulty: string;
  aiAttitude: string;
  level: string;
  easy: string;
  medium: string;
  hard: string;
  gameInProgress: string;
  
  // Difficulties
  difficulties: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
  };
  
  // Attitudes
  attitudes: {
    friendly: string;
    sarcastic: string;
    technical: string;
    epic: string;
  };
  
  // Game Status
  yourTurn: string;
  aiTurn: string;
  aiThinking: string;
  check: string;
  checkmate: string;
  draw: string;
  gameOver: string;
  victory: string;
  defeat: string;
  whitesWin: string;
  blacksWin: string;
  
  // Game Board
  boardWaiting: string;
  configureGame: string;
  pressStart: string;
  
  // API Configuration
  useCustomKey: string;
  geminiApiKey: string;
  getApiKey: string;
  show: string;
  hide: string;
  customKeyConfigured: string;
  enterApiKey: string;
  usingSharedKey: string;
  apiKeyPrivacy: string;
  apiKeyInfo: string;
  
  // Game Summary
  gameSummary: string;
  moves: string;
  duration: string;
  plays: string;
  aiAnalysis: string;
  analyzingGame: string;
  
  // Move Explanations
  noPieceAt: string;
  notYourPiece: string;
  inCheck: string;
  validMoves: string;
  cannotMoveFrom: string;
  cannotCaptureOwn: string;
  cannotMoveTo: string;
  
  // Piece Names
  pieces: {
    p: string;
    r: string;
    n: string;
    b: string;
    q: string;
    k: string;
  };
  
  // AI Personality Comments
  startGameComment: string;
  
  // Common
  loading: string;
  error: string;
  ok: string;
  cancel: string;
  
  // Landing Page
  landingSubtitle: string;
  startGameButton: string;
  adjustableDifficulty: string;
  difficultyDescription: string;
  aiCommentsTitle: string;
  aiCommentsDescription: string;
  completeAnalysis: string;
  completeAnalysisDescription: string;
  developedWith: string;
  aiCommentsWaiting: string;
  waitingNextMove: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    backToHome: "Back to Home",
    home: "Home",
    
    // Game Page
    title: "ChessWithIA",
    aiActive: "AI Active",
    chessBoard: "Chess Board",
    aiComments: "AI Comments",
    gameSettings: "Game Settings",
    apiConfiguration: "API Configuration",
    
    // Settings
    settings: "Settings",
    difficulty: "Difficulty",
    attitude: "Attitude",
    startGame: "Start Game",
    resetGame: "Reset Game",
    restartGame: "Restart Game",
    newGame: "New Game",
    aiDifficulty: "AI Difficulty",
    aiAttitude: "AI Attitude",
    level: "Level",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    gameInProgress: "Game in Progress",
    
    // Difficulties
    difficulties: {
      1: "Absolute Beginner",
      2: "Beginner",
      3: "Low Amateur",
      4: "Amateur",
      5: "Low Intermediate",
      6: "Intermediate",
      7: "High Intermediate",
      8: "Advanced",
      9: "Expert",
      10: "Master"
    },
    
    // Attitudes
    attitudes: {
      friendly: "Friendly",
      sarcastic: "Sarcastic",
      technical: "Technical",
      epic: "Epic"
    },
    
    // Game Status
    yourTurn: "Your Turn (White)",
    aiTurn: "AI Turn (Black)",
    aiThinking: "AI thinking...",
    check: "Check!",
    checkmate: "Checkmate!",
    draw: "Draw!",
    gameOver: "Game Over!",
    victory: "Victory!",
    defeat: "Defeat",
    whitesWin: "White wins",
    blacksWin: "Black wins",
    
    // Game Board
    boardWaiting: "Board waiting",
    configureGame: "Configure the game",
    pressStart: "and press \"Start Game\"",
    
    // API Configuration
    useCustomKey: "Use my own API key",
    geminiApiKey: "Gemini API Key",
    getApiKey: "Get free API key",
    show: "Show",
    hide: "Hide",
    customKeyConfigured: "✓ Custom API key configured",
    enterApiKey: "⚠ Enter your API key to continue",
    usingSharedKey: "ℹ Using shared API key (with limits)",
    apiKeyPrivacy: "Your API key is stored only in your browser and is not sent to any external server.",
    apiKeyInfo: "You can use your own Gemini API key to play without limits.",
    
    // Game Summary
    gameSummary: "Game Summary",
    moves: "Moves",
    duration: "Duration",
    plays: "Plays",
    aiAnalysis: "AI Analysis",
    analyzingGame: "Analyzing your game...",
    
    // Move Explanations
    noPieceAt: "There is no piece at {square}. Select a square that has one of your pieces.",
    notYourPiece: "That piece is not yours. You can only move white pieces.",
    inCheck: "You are in check! You must move your king, block the attack, or capture the threatening piece. Valid moves: {moves}",
    validMoves: "Valid moves",
    cannotMoveFrom: "Your {piece} at {from} cannot move from that position.",
    cannotCaptureOwn: "You cannot capture your own pieces. Your {piece} at {from} cannot go to {to}.",
    cannotMoveTo: "Your {piece} at {from} cannot go to {to}. Valid moves from {from}: {moves}",
    
    // Piece Names
    pieces: {
      p: "pawn",
      r: "rook",
      n: "knight",
      b: "bishop",
      q: "queen",
      k: "king"
    },
    
    // AI Personality Comments
    startGameComment: "Excellent! Let's start this game. You have the white pieces, make your first move!",
    
    // Common
    loading: "Loading...",
    error: "Error",
    ok: "OK",
    cancel: "Cancel",
    
    // Landing Page
    landingSubtitle: "Play chess against an AI that comments on every move",
    startGameButton: "Start Game",
    adjustableDifficulty: "Adjustable Difficulty",
    difficultyDescription: "Levels 1 to 10 for all players",
    aiCommentsTitle: "AI Comments",
    aiCommentsDescription: "The AI comments on every move with personality",
    completeAnalysis: "Complete Analysis",
    completeAnalysisDescription: "Detailed summary of your playing style",
    developedWith: "Developed with Next.js, Tailwind and Gemini AI",
    aiCommentsWaiting: "The AI will comment your moves here",
    waitingNextMove: "Waiting for your next move..."
  },
  
  es: {
    // Navigation
    backToHome: "Volver al inicio",
    home: "Inicio",
    
    // Game Page
    title: "ChessWithIA",
    aiActive: "IA Activa",
    chessBoard: "Tablero de Ajedrez",
    aiComments: "Comentarios IA",
    gameSettings: "Configuración",
    apiConfiguration: "Configuración API",
    
    // Settings
    settings: "Configuración",
    difficulty: "Dificultad",
    attitude: "Actitud",
    startGame: "Iniciar Juego",
    resetGame: "Reiniciar Juego",
    restartGame: "Reiniciar Partida",
    newGame: "Nueva Partida",
    aiDifficulty: "Dificultad IA",
    aiAttitude: "Actitud IA",
    level: "Nivel",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    gameInProgress: "Partida en curso",
    
    // Difficulties
    difficulties: {
      1: "Principiante Absoluto",
      2: "Principiante",
      3: "Amateur Bajo",
      4: "Amateur",
      5: "Intermedio Bajo",
      6: "Intermedio",
      7: "Intermedio Alto",
      8: "Avanzado",
      9: "Experto",
      10: "Maestro"
    },
    
    // Attitudes
    attitudes: {
      friendly: "Amistosa",
      sarcastic: "Sarcástica",
      technical: "Técnica",
      epic: "Épica"
    },
    
    // Game Status
    yourTurn: "Tu turno (Blancas)",
    aiTurn: "Turno de la IA (Negras)",
    aiThinking: "IA pensando...",
    check: "¡Jaque!",
    checkmate: "¡Jaque mate!",
    draw: "¡Empate!",
    gameOver: "¡Juego terminado!",
    victory: "¡Victoria!",
    defeat: "Derrota",
    whitesWin: "Blancas ganan",
    blacksWin: "Negras ganan",
    
    // Game Board
    boardWaiting: "Tablero en espera",
    configureGame: "Configura la partida",
    pressStart: "y presiona \"Iniciar Juego\"",
    
    // API Configuration
    useCustomKey: "Usar mi propia API key",
    geminiApiKey: "Gemini API Key",
    getApiKey: "Obtener API key gratuita",
    show: "Mostrar",
    hide: "Ocultar",
    customKeyConfigured: "✓ API key personalizada configurada",
    enterApiKey: "⚠ Ingresa tu API key para continuar",
    usingSharedKey: "ℹ Usando API key compartida (con límites)",
    apiKeyPrivacy: "Tu API key se almacena solo en tu navegador y no se envía a ningún servidor externo.",
    apiKeyInfo: "Puedes usar tu propia API key de Gemini para jugar sin límites.",
    
    // Game Summary
    gameSummary: "Resumen de la Partida",
    moves: "Movimientos",
    duration: "Duración",
    plays: "Jugadas",
    aiAnalysis: "Análisis de la IA",
    analyzingGame: "Analizando tu partida...",
    
    // Move Explanations
    noPieceAt: "No hay ninguna pieza en {square}. Selecciona una casilla que tenga una de tus piezas.",
    notYourPiece: "Esa pieza no es tuya. Solo puedes mover las piezas blancas.",
    inCheck: "¡Estás en jaque! Debes mover tu rey, bloquear el ataque o capturar la pieza que te amenaza. Movimientos válidos: {moves}",
    validMoves: "Movimientos válidos",
    cannotMoveFrom: "Tu {piece} en {from} no puede moverse desde esa posición.",
    cannotCaptureOwn: "No puedes capturar tus propias piezas. Tu {piece} en {from} no puede ir a {to}.",
    cannotMoveTo: "Tu {piece} en {from} no puede ir a {to}. Movimientos válidos desde {from}: {moves}",
    
    // Piece Names
    pieces: {
      p: "peón",
      r: "torre",
      n: "caballo",
      b: "alfil",
      q: "dama",
      k: "rey"
    },
    
    // AI Personality Comments
    startGameComment: "¡Excelente! Comencemos esta partida. Tienes las blancas, ¡haz tu primer movimiento!",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    ok: "Aceptar",
    cancel: "Cancelar",
    
    // Landing Page
    landingSubtitle: "Juega al ajedrez contra una IA que comenta cada jugada",
    startGameButton: "Empezar partida",
    adjustableDifficulty: "Dificultad Ajustable",
    difficultyDescription: "Niveles del 1 al 10 para todos los jugadores",
    aiCommentsTitle: "Comentarios IA",
    aiCommentsDescription: "La IA comenta cada jugada con personalidad",
    completeAnalysis: "Análisis Completo",
    completeAnalysisDescription: "Resumen detallado de tu estilo de juego",
    developedWith: "Desarrollado con Next.js, Tailwind y Gemini AI",
    aiCommentsWaiting: "La IA comentará tus jugadas aquí",
    waitingNextMove: "Esperando tu próximo movimiento..."
  }
};

export function useTranslation(language: Language) {
  const t = translations[language];
  
  const translate = (key: string, variables?: Record<string, string>) => {
    let translation = key.split('.').reduce((obj, k) => (obj as any)?.[k], t);
    
    if (!translation || typeof translation !== 'string') {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        translation = (translation as string).replace(`{${varKey}}`, value);
      });
    }
    
    return translation as string;
  };
  
  return { t, translate };
}