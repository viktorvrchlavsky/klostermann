# Booking Application

This is a simple web application for booking appointments. It features a React frontend with Bootstrap for styling, and a Node.js backend with an Express server. Bookings are stored in a JSON file.

***

> **Note:** This entire application was created by Google's Gemini model without any human developer intervention.

***

## How to Run Locally

This guide will walk you through setting up and running the application on your local machine.

### Prerequisites

Before you begin, you need to have **Node.js** and **npm** installed on your computer. npm (Node Package Manager) is included with the Node.js installation.

*   **To install Node.js**, go to the official website: [nodejs.org](https://nodejs.org/).
*   Download the **LTS (Long Term Support)** version recommended for most users.
*   Run the installer and follow the on-screen instructions.
*   To verify the installation, open a terminal or command prompt and run the following commands:
    ```bash
    node -v
    npm -v
    ```
    These commands should display the installed versions of Node.js and npm.

### Step 1: Get the Code

First, you need to get the application code on your computer. If you have `git` installed, you can clone the repository:

```bash
git clone https://github.com/viktorvrchlavsky/klostermann.git
```

If you don't have `git`, you can download the source code as a ZIP file from the repository's main page and unzip it.

### Step 2: Install Dependencies

The application is split into two parts: a `server` (backend) and a `client` (frontend). Both have their own dependencies that need to be installed.

**Install Server Dependencies:**
1.  Open your terminal or command prompt.
2.  Navigate to the `server` directory inside the project folder.
3.  Run the following command to install the necessary packages for the server:
    ```bash
    npm install
    ```

**Install Client Dependencies:**
1.  Open another terminal or use the same one.
2.  Navigate to the `client` directory inside the project folder.
3.  Run the following command to install the necessary packages for the client:
    ```bash
    npm install
    ```

### Step 3: Run the Application

To run the application, you need to have both the server and the client running at the same time. You will need two separate terminal windows for this.

**Run the Backend Server:**
1.  In a terminal, make sure you are in the `server` directory.
2.  Run the following command:
    ```bash
    node server.js
    ```
    The server will start. You will see a message like `Server is running on http://localhost:3001`. Keep this terminal window open.

**Run the Frontend Client:**
1.  In your second terminal, make sure you are in the `client` directory.
2.  Run the following command:
    ```bash
    npm start
    ```
    This will automatically open the application in your default web browser at `http://localhost:3000`.

You should now see the application running in your browser!
