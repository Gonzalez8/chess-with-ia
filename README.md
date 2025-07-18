# ChessWithIA 🏆

An advanced, multilingual web-based chess application where users can play against a sophisticated AI opponent powered by Google's Gemini AI. This project leverages a modern tech stack to deliver a seamless, interactive, and educational chess experience. The AI provides real-time commentary, move analysis, and personalized feedback in both English and Spanish, making it a great tool for both new and experienced players.

![Screenshot of the application gameplay](public/placeholder.jpg)
*(Note: Replace `public/placeholder.jpg` with an actual screenshot of the application.)*

## ✨ Features

- **🌍 Multilingual Support:** Complete internationalization with English and Spanish support. Switch languages instantly!
- **🎯 Interactive Chess Board:** A smooth, responsive, and intuitive chessboard interface built with React and react-chessboard.
- **🤖 Powered by Gemini AI:** Play against Google's advanced Gemini AI with configurable difficulty levels (1-10) and personality attitudes.
- **💬 Real-time AI Commentary:** The AI provides live commentary with 4 different personalities:
  - 😊 **Friendly:** Encouraging and positive
  - 😏 **Sarcastic:** Witty and playful
  - 🤓 **Technical:** Analytical and educational
  - ⚔️ **Epic:** Dramatic and heroic
- **✅ Local Move Validation:** Instant feedback for illegal moves with detailed explanations in your preferred language.
- **🔍 Post-Game Analysis:** Comprehensive AI-powered game analysis highlighting key moments, mistakes, and brilliant moves.
- **🔑 Custom API Key Support:** Use your own Gemini API key for unlimited gameplay or use the shared key with limits.
- **📱 Responsive Design:** Modern, glassmorphism UI with Tailwind CSS and shadcn/ui components.
- **🎮 Game Features:**
  - Move history tracking
  - Real-time game state updates
  - Checkmate and draw detection
  - Game summary with statistics

## 🛠️ Tech Stack

- **Framework:** [Next.js 15.2.4](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Chess Board:** [react-chessboard](https://github.com/Clariity/react-chessboard)
- **Chess Logic:** [chess.js](https://github.com/jhlywa/chess.js)
- **AI Integration:** [Google Gemini AI](https://ai.google.dev/) (@google/generative-ai)
- **Backend:** Next.js API Routes
- **Internationalization:** Custom i18n system with React Context
- **State Management:** React Context + localStorage

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v20.11.0 or later)
- pnpm (or npm/yarn)

**Note:** This project includes an `.nvmrc` file. If you use [nvm](https://github.com/nvm-sh/nvm), you can run `nvm use` in the project root to automatically switch to the correct Node.js version.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/chess-with-ia.git
    cd chess-with-ia
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    *Or using npm/yarn:*
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```env
    # Required: Get your free API key from https://aistudio.google.com/app/apikey
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
    
    **Note:** The application also supports users bringing their own API keys through the UI, so this step is optional if you want users to configure their own keys.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http.localhost:3000) in your browser to see the application.

## 📂 Project Structure

The project is organized into several key directories:

- **/app**: Contains the core application logic and routing (Next.js App Router).
  - **/app/api**: Backend API endpoints for AI interactions.
    - `/chess-ai`: Handles AI move requests with bilingual prompts.
    - `/analyze-game`: Provides post-game analysis in the user's language.
  - **/app/game**: The main chess game interface.
  - `/page.tsx`: Landing page with language selector.
  - `/layout.tsx`: Root layout with language provider.
- **/components**: Reusable React components.
  - **/components/ui**: Auto-generated components from shadcn/ui.
  - `game-board.tsx`: Main chessboard with move validation.
  - `ia-comment-box.tsx`: AI commentary display with personality support.
  - `settings-panel.tsx`: Game configuration (difficulty, attitude).
  - `api-key-config.tsx`: Custom API key management.
  - `game-summary.tsx`: Post-game analysis and statistics.
  - `language-selector.tsx`: Language toggle component.
- **/contexts**: React Context providers.
  - `language-context.tsx`: Manages language state and persistence.
- **/lib**: Shared utilities and core logic.
  - `chess-ai.ts`: AI interaction functions and move validation.
  - `i18n.ts`: Complete internationalization system.
  - `utils.ts`: General utility functions.
- **/public**: Static assets like images and logos.

## 🤖 API Endpoints

The backend is handled by Next.js API Routes with full multilingual support.

- `POST /api/chess-ai`
  - **Purpose:** Gets the next AI move with personality-based commentary.
  - **Request Body:** 
    ```json
    {
      "gameState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "playerMove": "e2e4",
      "moveHistory": ["e2e4", "e7e5"],
      "difficulty": "5",
      "attitude": "friendly",
      "language": "en",
      "customApiKey": "optional_user_api_key"
    }
    ```
  - **Response:** 
    ```json
    {
      "jugada": "e7e5",
      "comentario": "A classic response! The Sicilian Defense is always exciting."
    }
    ```

- `POST /api/analyze-game`
  - **Purpose:** Provides comprehensive post-game analysis.
  - **Request Body:**
    ```json
    {
      "moveHistory": ["e2e4", "e7e5", "Nf3", "Nc6"],
      "difficulty": "5",
      "attitude": "technical",
      "gameResult": "victory",
      "finalFen": "final_position_fen",
      "language": "es",
      "customApiKey": "optional_user_api_key"
    }
    ```
  - **Response:**
    ```json
    {
      "analysis": "Detailed multilingual analysis of the game..."
    }
    ```

## 🌍 Internationalization

The application features a complete internationalization system:

- **Languages:** English (en) and Spanish (es)
- **Scope:** All UI elements, AI prompts, error messages, and game content
- **Persistence:** Language preference saved in localStorage
- **Dynamic:** Switch languages instantly without page reload
- **AI Integration:** AI responses adapt to the selected language

## 🎮 Game Personalities

The AI opponent features 4 distinct personalities:

| Personality | Description | Example Comment |
|-------------|-------------|-----------------|
| 😊 **Friendly** | Encouraging and supportive | "Great opening! You're developing your pieces well." |
| 😏 **Sarcastic** | Witty and playful | "Oh, hanging your queen? Bold strategy!" |
| 🤓 **Technical** | Analytical and educational | "This move improves your pawn structure and controls the center." |
| ⚔️ **Epic** | Dramatic and heroic | "A legendary battle unfolds! Your knights charge into glory!" |

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting provider.

### Environment Variables for Production:
```env
GEMINI_API_KEY=your_production_gemini_api_key
```

### Vercel Deployment:
```bash
npm run build
# Deploy to Vercel
vercel --prod
```

## 🔧 Configuration

### Difficulty Levels:
- **1-3:** Beginner (makes occasional mistakes)
- **4-6:** Intermediate (balanced play)
- **7-10:** Advanced to Master (strong strategic play)

### API Key Options:
- **Shared Key:** Use the configured `GEMINI_API_KEY` (with rate limits)
- **Custom Key:** Users can input their own Gemini API key for unlimited play

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

### Development Guidelines:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Follow the existing code style and patterns
4. Add translations for any new UI text in both English and Spanish
5. Test multilingual functionality
6. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the Branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

**Made with ❤️ using Next.js, TypeScript, and Google Gemini AI**