#!/bin/bash
# Force npm usage in Vercel
echo "🔧 Forcing npm usage..."
echo "🧹 Cleaning any pnpm files..."
rm -f pnpm-lock.yaml
rm -f pnpm-workspace.yaml
rm -rf .pnpm-store
rm -rf node_modules/.pnpm
echo "✅ Cleaned pnpm files"
echo "📦 Installing dependencies with npm..."
npm ci
echo "🏗️ Building project..."
npm run build