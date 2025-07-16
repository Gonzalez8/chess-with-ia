# ChessWithIA

Una aplicación web moderna de ajedrez que permite jugar contra una IA que comenta cada jugada.

## Características

- 🎯 **Dificultad Ajustable**: Niveles del 1 al 10
- 💬 **Comentarios IA**: La IA comenta cada jugada con diferentes actitudes
- 📊 **Análisis Completo**: Resumen detallado del estilo de juego
- 🎨 **Diseño Moderno**: Interfaz limpia con efectos glassmorphism
- 📱 **Responsive**: Compatible con escritorio y móvil

## Tecnologías

- **Next.js 15** - Framework React
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático
- **shadcn/ui** - Componentes UI
- **Gemini AI** - Inteligencia artificial (preparado para integración)

## Estructura del Proyecto

\`\`\`
app/
├── page.tsx              # Landing page
├── game/
│   └── page.tsx         # Página de juego
├── layout.tsx           # Layout principal
└── globals.css          # Estilos globales

components/
├── game-board.tsx       # Tablero de ajedrez
├── ia-comment-box.tsx   # Panel de comentarios IA
├── settings-panel.tsx   # Panel de configuración
└── game-summary.tsx     # Resumen de partida
\`\`\`

## Integración IA (Preparada)

El proyecto está preparado para integrar Gemini AI con el siguiente prompt:

\`\`\`
Simula ser un jugador de ajedrez de nivel {nivel}.
Recibes el siguiente movimiento del jugador: {jugada}.
Tu tarea es:
1. Responder con una jugada válida y razonable
2. Comentar brevemente el movimiento del jugador, usando una actitud {actitud}

Formato de respuesta esperado:
{
  "jugada": "e7e5",
  "comentario": "Has abierto con valentía... pero eso no te salvará. 😏"
}
\`\`\`

## Instalación

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Ejecuta el servidor: `npm run dev`
4. Abre http://localhost:3000

## Próximos Pasos

- [ ] Integrar react-chessboard
- [ ] Conectar con Gemini AI
- [ ] Implementar lógica de ajedrez
- [ ] Añadir sistema de puntuación
- [ ] Guardar historial de partidas
