#!/usr/bin/env bash

# Setup Node Version Manager (NVM) and compatible Node.js version for the monorepo
# This script ensures the correct Node.js version is installed and used for Strapi compatibility

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Required Node.js version for Strapi compatibility
REQUIRED_NODE_VERSION="22.11.0"
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Node.js Version Setup for Monorepo${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check if NVM is installed
check_nvm_installed() {
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    return 0
  elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
    NVM_DIR="/usr/local/opt/nvm"
    return 0
  else
    return 1
  fi
}

# Function to install NVM
install_nvm() {
  echo -e "${YELLOW}NVM (Node Version Manager) is not installed.${NC}"
  echo -e "${YELLOW}NVM is required to manage Node.js versions for this project.${NC}"
  echo ""
  echo -e "Do you want to install NVM now? (y/n): "
  read -r response

  if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Installing NVM...${NC}"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

    # Source NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    echo -e "${GREEN}✓ NVM installed successfully!${NC}"
    echo -e "${YELLOW}Please restart your terminal or run: source ~/.bashrc (or ~/.zshrc)${NC}"
    echo -e "${YELLOW}Then run this script again.${NC}"
    exit 0
  else
    echo -e "${RED}✗ NVM installation cancelled.${NC}"
    echo -e "${YELLOW}You can install NVM manually from: https://github.com/nvm-sh/nvm${NC}"
    exit 1
  fi
}

# Function to load NVM
load_nvm() {
  export NVM_DIR="$NVM_DIR"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
}

# Check if NVM is installed
if ! check_nvm_installed; then
  install_nvm
fi

# Load NVM
load_nvm

# Check current Node.js version
CURRENT_NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' || echo "none")

echo -e "${BLUE}Current Node.js version:${NC} ${CURRENT_NODE_VERSION}"
echo -e "${BLUE}Required Node.js version:${NC} ${REQUIRED_NODE_VERSION}"
echo ""

# Check if the required version is already installed
if nvm list | grep -q "v${REQUIRED_NODE_VERSION}"; then
  echo -e "${GREEN}✓ Node.js ${REQUIRED_NODE_VERSION} is already installed.${NC}"
else
  echo -e "${YELLOW}Node.js ${REQUIRED_NODE_VERSION} is not installed.${NC}"
  echo -e "Do you want to install Node.js ${REQUIRED_NODE_VERSION} now? (y/n): "
  read -r response

  if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Installing Node.js ${REQUIRED_NODE_VERSION}...${NC}"
    nvm install "${REQUIRED_NODE_VERSION}"
    echo -e "${GREEN}✓ Node.js ${REQUIRED_NODE_VERSION} installed successfully!${NC}"
  else
    echo -e "${RED}✗ Node.js installation cancelled.${NC}"
    exit 1
  fi
fi

# Switch to the required version
echo -e "${BLUE}Switching to Node.js ${REQUIRED_NODE_VERSION}...${NC}"
nvm use "${REQUIRED_NODE_VERSION}"

# Verify the switch
NEW_VERSION=$(node -v | sed 's/v//')
if [ "$NEW_VERSION" = "$REQUIRED_NODE_VERSION" ]; then
  echo -e "${GREEN}✓ Successfully switched to Node.js ${REQUIRED_NODE_VERSION}${NC}"
else
  echo -e "${RED}✗ Failed to switch Node.js version${NC}"
  exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo -e "${YELLOW}pnpm is not installed.${NC}"
  echo -e "Do you want to install pnpm now? (y/n): "
  read -r response

  if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Installing pnpm...${NC}"
    npm install -g pnpm
    echo -e "${GREEN}✓ pnpm installed successfully!${NC}"
  fi
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}To make this change permanent for this project:${NC}"
echo -e "  • The .nvmrc file will auto-load when you cd into this directory"
echo -e "  • Or add this to your shell profile (~/.zshrc or ~/.bashrc):"
echo -e "    ${BLUE}alias use-project='nvm use'${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Install dependencies: ${BLUE}pnpm install${NC}"
echo -e "  2. Rebuild native modules: ${BLUE}pnpm rebuild better-sqlite3${NC}"
echo -e "  3. Start development: ${BLUE}pnpm dev${NC}"
echo ""

# Ask if user wants to continue with installation
echo -e "Do you want to install dependencies and rebuild now? (y/n): "
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
  echo -e "${BLUE}Installing dependencies...${NC}"
  pnpm install

  echo -e "${BLUE}Rebuilding better-sqlite3...${NC}"
  pnpm rebuild better-sqlite3

  echo -e "${GREEN}✓ All dependencies installed and native modules rebuilt!${NC}"
  echo ""
  echo -e "${GREEN}You can now run: ${BLUE}pnpm dev${NC}"
fi
