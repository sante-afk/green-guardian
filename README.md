# Green Guardian

Green Guardian is a web application that enables interactive communication with a smart plant monitoring system. The application collects environmental data from an Arduino-based sensor array and provides an AI-powered conversational interface using the Mistral API through FreeLLMAPI.

## Features

- **Real-time Environmental Monitoring**
  - Humidity measurement
  - Temperature tracking
  - Water level detection
  - Noise-based happiness indicator (coming soon)

- **Data Visualization**
  - Visual progress bars for each environmental parameter
  - Color-coded status indicators
  - Degree Celsius display for temperature

- **AI-Powered Communication**
  - Natural language interaction with the plant
  - Integration with Mistral AI API via FreeLLMAPI
  - Context-aware responses based on environmental data

- **User Interface**
  - Clean, responsive design using Element Plus components
  - Message history with scrollable chat interface
  - One-click data refresh functionality
  - Serial port communication with Arduino

## Technology Stack

- **Frontend**: Vue.js 3 with TypeScript
- **UI Framework**: Element Plus
- **API Integration**: Mistral AI (via FreeLLMAPI)
- **Hardware Communication**: Web Serial API
- **Styling**: SCSS with modular component styles

## Prerequisites

- Modern web browser with Web Serial API support (Chrome, Edge, Opera)
- Arduino device with connected sensors
- FreeLLMAPI API key
- Node.js and npm installed

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sante-afk/green-guardian
cd green-guardian
```
