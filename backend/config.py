"""Configuration for the LLM Council."""

import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API key (fallback for local dev, users provide their own in production)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Database configuration (Supabase PostgreSQL)
DATABASE_URL = os.getenv("DATABASE_URL")

# JWT Authentication
JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production")

# API Key Encryption (required for production)
API_KEY_ENCRYPTION_KEY = os.getenv("API_KEY_ENCRYPTION_KEY")

# OAuth Configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
OAUTH_REDIRECT_BASE = os.getenv("OAUTH_REDIRECT_BASE", "http://localhost:5173")

# CORS origins (comma-separated list)
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

# Available models - list of OpenRouter model identifiers
AVAILABLE_MODELS = [
    "openai/gpt-5.1",
    "google/gemini-3-pro-preview",
    "anthropic/claude-sonnet-4.5",
]

# Default models used for new conversations
DEFAULT_MODELS = list(AVAILABLE_MODELS)

# Lead model - synthesizes final response
DEFAULT_LEAD_MODEL = "google/gemini-3-pro-preview"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
