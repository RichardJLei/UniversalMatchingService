#!/bin/bash

# Create necessary directories
mkdir -p backend/logs
mkdir -p frontend/src/config

# Install backend dependencies
python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# Install frontend dependencies
cd frontend
npm install

# Create config files from templates
cp .env.example .env
cp src/config/config.example.ts src/config/config.ts

echo "Please update the following configuration files with your credentials:"
echo "1. backend/.env"
echo "2. frontend/src/config/config.ts" 