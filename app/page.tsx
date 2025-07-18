"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSelector from "@/components/language-selector"

export default function HomePage() {
  const { t } = useLanguage();
  const [titleText, setTitleText] = useState("")
  const fullTitle = "ChessWithIA"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Language selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-white/20 -rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-white/20 rotate-45 animate-bounce"></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
        </div>

        {/* Animated title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono">
          {titleText}
          <span className="animate-pulse text-yellow-400">|</span>
        </h1>

        {/* Subtitle with gradient */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
          {t.landingSubtitle.includes('IA que comenta') ? (
            <>
              Juega al ajedrez contra una{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                IA que comenta cada jugada
              </span>
            </>
          ) : (
            <>
              Play chess against an{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                AI that comments on every move
              </span>
            </>
          )}
        </p>

        {/* CTA Button */}
        <Link href="/game">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {t.startGameButton}
          </Button>
        </Link>

        {/* Features preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-white font-semibold mb-2">{t.adjustableDifficulty}</h3>
            <p className="text-gray-300 text-sm">{t.difficultyDescription}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-white font-semibold mb-2">{t.aiCommentsTitle}</h3>
            <p className="text-gray-300 text-sm">{t.aiCommentsDescription}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-white font-semibold mb-2">{t.completeAnalysis}</h3>
            <p className="text-gray-300 text-sm">{t.completeAnalysisDescription}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-400 text-sm">{t.developedWith}</p>
      </footer>
    </div>
  )
}
