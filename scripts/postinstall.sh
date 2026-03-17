#!/bin/sh
# Patch @github/copilot-sdk to fix ESM import resolution for vscode-jsonrpc
# This fixes: Cannot find module 'vscode-jsonrpc/node' (needs 'vscode-jsonrpc/node.js')
SESSION_FILE="node_modules/@github/copilot-sdk/dist/session.js"
if [ -f "$SESSION_FILE" ]; then
  sed -i '' 's|from "vscode-jsonrpc/node"|from "vscode-jsonrpc/node.js"|g' "$SESSION_FILE" 2>/dev/null || \
  sed -i 's|from "vscode-jsonrpc/node"|from "vscode-jsonrpc/node.js"|g' "$SESSION_FILE" 2>/dev/null
  echo "Patched @github/copilot-sdk for ESM compatibility"
fi
