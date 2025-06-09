# Sentivox Frontend

This directory contains the React client for the Sentivox project.

## Development

Install dependencies and start the development server:

```bash
npm install
npm start
```

The application runs at `http://localhost:3000` by default. On Windows you can
use the `start-frontend.ps1` script which starts the server on port `3001` and
prevents the browser from opening:

```powershell
./start-frontend.ps1
```

## Build

Create a production build with:

```bash
npm run build
```

The optimized files are output to the `build` directory.

## Environment

No environment variables are required at this time. The PowerShell script sets
`PORT` and `BROWSER` when running on Windows.

## Project Setup

Refer to the [root README](../README.md) for overall project setup and backend
instructions.
