#!/bin/bash
# Remove any pnpm files that might interfere
echo "🧹 Cleaning any pnpm files..."
rm -f pnpm-lock.yaml
rm -f pnpm-workspace.yaml
rm -rf .pnpm-store
rm -rf node_modules/.pnpm
echo "✅ Cleaned pnpm files"