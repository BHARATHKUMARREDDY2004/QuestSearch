# QuestSearch

QuestSearch is a search functionality platform for a questions database, designed to allow users to easily search and retrieve answers based on various criteria. The backend is powered by **Node.js** with **gRPC** for communication, while the frontend is built with **React**. The project leverages **MongoDB** for data storage and provides a responsive UI to display the query results.

## Features
- Efficient search functionality for a vast database of questions.
- Backend powered by Node.js with gRPC communication.
- Frontend built using React for a smooth and interactive user experience.
- Data stored and managed with MongoDB.
- Fast, reliable, and scalable.

## Installation

### Prerequisites

Ensure you have the following tools installed on your machine:
- **Node.js**
- **MongoDB** (local or cloud instance)
- **Git** for version control

### Steps to Set Up

1. Clone the repository to your local machine:
    ```bash
    git clone https://https://github.com/BHARATHKUMARREDDY2004/QuestSearch
    ```

2. Navigate to the project directory:
    ```bash
    cd QuestSearch
    npm install
    ```

3. Set up the frontend:
    ```bash
    cd frontend
    npm install
    ```

5. Configure your environment variables (e.g., MongoDB URI) by creating a `.env` file in the root of the project with appropriate settings.

6. Run the project:
      ```bash
      cd QuestSearch
      npm run start-server
      ```

7. Open your browser and go to `http://localhost:5173` to see the app in action.

## Usage

Once the application is running, you can:
- Enter a query in the search bar to retrieve relevant questions.
- Filter search results based on question type.
- View detailed information for each question returned by the search.

## Acknowledgments

- Thanks to the contributors of **Node.js**.
- Special thanks to **MongoDB** for handling efficient data storage.
- Powered by **gRPC** for seamless communication between the backend and frontend.
