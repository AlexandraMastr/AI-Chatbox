
# AI Chatbox

A full-stack chat application with integrated OpenAI GPT for automated conversational responses. Built using Wasp, React, Node.js, and Prisma.

## Project Overview

This project demonstrates practical skills in secure full-stack development, modern frontend design, RESTful backend integration, and API communication with external services (OpenAI GPT). Features include user authentication, real-time messaging, AI-powered replies, and best practices in environment variable management.

## Tech Stack

- Framework: [Wasp](https://wasp-lang.dev/)
- Frontend: React
- Backend: Node.js (Wasp actions and queries)
- Database: Prisma ORM (SQLite or PostgreSQL)
- AI: OpenAI GPT API (gpt-3.5-turbo or gpt-4o)
- Authentication: Wasp built-in auth
- Styling: Tailwind CSS

## Features

- User sign-up and login
- Send and receive messages
- Automated responses using OpenAI GPT
- Secure handling of API keys via environment variables
- Responsive UI for desktop and mobile

## Skills Demonstrated

- End-to-end web application development
- Third-party API integration (OpenAI)
- Database design and data modeling with Prisma
- Secure authentication flows
- Environment variable management and security best practices
- Clean, user-friendly interface design

## Challenges & Learning

During development, I addressed several practical challenges:

- **API Security:** Implemented secure handling of API keys using `.env.server`, ensuring no sensitive information is exposed in version control or client-side code.
- **External Service Integration:** Learned to work with OpenAI's API, including handling rate limits, quotas, and error management.
- **Full-stack Data Flow:** Built end-to-end data flows from the React frontend through Wasp server actions to the database and external APIs.
- **Debugging & Deployment:** Solved compilation and dependency issues, and learned best practices for setting up and deploying Wasp projects.
- **User Experience:** Improved the chat interface for responsiveness, accessibility, and clarity, providing a seamless user experience.

These experiences strengthened my skills in secure web development, troubleshooting, and integrating modern technologies into practical applications.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlexandraMastr/AI-Chatbox.git
   cd AI-Chatbox
2. **Install dependencies**
   ```bash
    npm install
3. **Configure environment variables**
   
  Create a file named .env.server in the root directory:
  OPENAI_API_KEY=your_openai_api_key
  Never commit your real API key to version control.

4.  **Start the development server**
   
   wasp start
   Open http://localhost:3000 in your browser.





