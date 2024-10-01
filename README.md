# HelpForTrauma.ai

HelpForTrauma.ai is an innovative platform designed to assist individuals in their trauma healing journey through interactive tools, AI-driven insights, and a safe digital environment. Our app provides guided exercises, grounding techniques, and personalized support to help users manage their trauma symptoms and foster healing.

## Overview

HelpForTrauma.ai leverages state-of-the-art technologies such as AI-powered chatbots, personalized tools, and trauma-informed resources to create a supportive environment for users. The platform includes modules such as:

- **Safe Place**: A dedicated area where users can feel secure and grounded.
- **Grounding Techniques**: Interactive exercises designed to help users stay present during moments of distress.
- **Parts Mapping**: A visual tool to help users identify and work through different parts of themselves affected by trauma, powered by [Excalidraw](https://github.com/excalidraw/excalidraw) for intuitive and user-friendly visual mapping.
- **Externalized Dialogue**: Guided prompts to facilitate internal conversations that lead to healing.

## Features

- **AI Assistant**: An intelligent assistant that guides users through their healing journey, answers questions, and provides insights.
- **Interactive Exercises**: A variety of exercises such as grounding and visual mapping to help users process their trauma.
- **Safe Place Page**: A dedicated space that offers grounding techniques and a feeling of safety when users need it most.
- **Parts Map Page**: Tools to externalize and visualize parts of themselves to aid in healing, using [Excalidraw](https://github.com/excalidraw/excalidraw) for real-time, collaborative drawing.
- **Externalized Dialogue**: Prompts and exercises for self-reflection and internal dialogue.

## Open-Source Integration

The app integrates **Excalidraw**, an open-source whiteboard-like tool that allows for intuitive visual representations. It is particularly useful for the **Parts Map** feature, enabling users to visually map out different parts of themselves, making the process both interactive and engaging. The flexibility of Excalidraw allows users to collaborate in real-time and modify their drawings to reflect their ongoing trauma healing process.

## Getting Started

These instructions will help you set up the project locally for development and testing purposes.

### Prerequisites

- **Node.js** version 22.2.0 (Ensure this is installed on your local machine)
- **Git** for version control

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YourUsername/HelpForTrauma.ai.git
    ```

2. Navigate into the project directory:

    ```bash
    cd HelpForTrauma.ai
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:3000`.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Vercel AI SDK, OpenAI, Vercel KV
- **Authentication**: NextAuth.js
- **Database**: Vercel KV for chat history, rate limiting, and session storage
- **UI/UX**: Radix UI for headless components
- **Styling**: Tailwind CSS for streamlined, responsive designs
- **Visual Tools**: Excalidraw for real-time drawing and mapping

## Folder Structure

```bash
HelpForTrauma.ai/
│
├── public/                   # Static assets
├── src/                      # Main source code
│   ├── components/           # Reusable components
│   ├── pages/                # Page components
│   ├── styles/               # Styling
│   └── utils/                # Helper functions
│
├── .env.local                # Environment variables
├── README.md                 # Project documentation
└── package.json              # Dependencies and scripts

