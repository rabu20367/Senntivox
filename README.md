<div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 1.5rem 1rem; margin: -1rem -1rem 1.5rem -1rem; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
  <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 100%; display: flex; justify-content: center; overflow: hidden; padding: 10px 0;">
        <img 
          src=".github/images/sentivox-logo.png" 
          alt="Sentivox Logo" 
          style="
            max-width: 200px;
            height: auto;
            object-fit: contain;
            margin: -10% 0; /* This will crop the top and bottom */
            transform: scale(0.8); /* Adjust this value to zoom in/out */
          "/>
      </div>
      <div style="padding: 0 1rem;">
        <h1 style="
          font-size: 2rem; 
          margin: 0 0 0.3rem 0;
          color: #2c3e50;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        ">Sentivox</h1>
        <p style="
          font-size: 1.1rem; 
          margin: 0 0 0.5rem 0;
          color: #34495e;
          font-weight: 500;
        ">
          AI Companion for Senior Well-being
        </p>
        <p style="
          font-style: italic; 
          font-size: 1rem; 
          color: #7f8c8d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.4;
        ">
          "Empowering seniors through meaningful AI companionship"
        </p>
      </div>
    </div>
  </div>
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
