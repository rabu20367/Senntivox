<div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 1.5rem 1rem; margin: -1rem -1rem 1.5rem -1rem; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
  <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 100%; display: flex; justify-content: center; padding: 20px 0 30px 0;">
        <img 
          src=".github/images/logo.png" 
          alt="Senntivox Logo"
          style="width: 500px; max-width: 100%; height: auto; display: block;"
        />
      </div>
      <div style="padding: 0 1rem;">
        <h1 style="
          font-size: 2rem; 
          margin: 0 0 0.3rem 0;
          color: #2c3e50;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        ">Senntivox</h1>
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


Senntivox is an AI-powered companion designed to combat senior loneliness through engaging conversations, memory stimulation, and daily support.

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
  **Note:** `npm install` in the backend only installs Husky if a `.git`
  directory exists and the `HUSKY` environment variable is not set to `0`.
  If you plan to use Git hooks, make sure the project is inside a Git
  repository (run `git init` if needed).

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
   ```
   The frontend currently requires no environment variables.

4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev

   # In frontend directory
   npm start
   ```

5. Run tests:
   ```bash
   cd backend && npm install
   npm test
   ```

   For the frontend:
   ```bash
cd frontend && npm install
   npm test
   ```

## Customizing Email Templates

Email notifications in the backend are rendered using [Pug](https://pugjs.org/).
Template files live in `backend/src/views/emails`. You can modify the provided
templates or add new ones to match your branding. After editing a template,
restart the backend server so the changes are picked up.

## License

MIT
