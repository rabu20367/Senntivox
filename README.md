<div align="center">
  <img src="frontend/public/logo512.png" alt="Sentivox Logo" width="200"/>
  
  # Sentivox - AI Companion for Senior Well-being
</div>


Sentivox is an AI-powered companion designed to combat senior loneliness through engaging conversations, memory stimulation, and daily support.

## Features

- **Natural Conversations**: AI-powered chat with voice and text support
- **Memory Lane**: AI-generated memory prompts and reminiscence therapy
- **Mood Analysis**: Real-time sentiment tracking and empathetic responses
- **Daily Check-ins**: Medication and appointment reminders
- **Cognitive Activities**: Brain games and news summaries
- **Family Connect**: Secure way for family members to stay updated

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: OpenAI API (GPT-4), Sentiment Analysis
- **Database**: MongoDB (for user data)
- **Authentication**: JWT
- **Deployment**: Docker, AWS/Azure

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentivox.git
   cd sentivox
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your configuration
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Update .env with your configuration
   ```

4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory
   npm start
   ```

## License

MIT
