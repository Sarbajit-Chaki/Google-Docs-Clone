# Google Docs Clone

A collaborative real-time document editing application built using **React.js**, **Socket.IO**, and the **Quill.js** library. This project replicates the core functionality of Google Docs, allowing multiple users to edit the same document simultaneously with changes reflected in real-time.

## Features

- **Real-Time Collaboration**: Multiple users can edit a document simultaneously, with live updates synced across all clients.
- **Rich Text Editing**: Leverages the Quill.js library for a seamless and feature-rich text editing experience.
- **Socket.IO Integration**: Ensures low-latency updates and efficient communication between clients and the server.
- **Document Persistence**: Saves documents, allowing users to reopen and continue editing from where they left off.
- **Minimalistic UI**: User-friendly design for focused editing and collaboration.

## Technologies Used

- **Frontend**: React.js for building the user interface.
- **Backend**: Node.js for handling the server-side logic.
- **Database**: MongoDB for persist the documents in future.
- **WebSocket**: Socket.IO for real-time communication between clients and the server.
- **Text Editor**: Quill.js for rich-text editing capabilities.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/sarbajit-chaki/google-docs-clone.git
   cd google-docs-clone
   ```

2. Install dependencies:
   ```bash
   # For the server
   cd server
   npm install

   # For the client
   cd client
   npm install
   ```

3. Start the server:
   ```bash
   cd server
   node --watch server.js
   ```

4. Start the client:
   ```bash
   cd client
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to start collaborating!

## How It Works

- When a user opens the application, a new document is created, or an existing document is loaded based on the URL.
- Changes made by any user are broadcasted to all other users in real-time via Socket.IO.
- The server handles communication between clients and ensures updates are synchronized.
