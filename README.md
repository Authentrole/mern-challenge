MERN Challenge Project
This is a full-stack application using the MERN stack (MongoDB, Express.js, React, and Node.js). The project includes APIs for managing transactions and provides a dashboard to view transactions in a table format along with charts and statistics.

Features
Transaction Table: Lists all transactions with options to filter by month, search by title/description/price, and paginate the results.
Transaction Statistics: Displays the total sale amount, total sold items, and total not sold items for the selected month.
Bar Chart: Visualizes the price range of items sold in the selected month.
Technologies Used
Frontend:
React.js
React Hooks
Axios (for API calls)
React-Scripts (for running the development server)
Backend:
Node.js
Express.js
MongoDB
Mongoose
Tools:
Postman (for testing API endpoints)
CORS (for handling cross-origin requests)
Setup Instructions
Follow the steps below to set up both the frontend and backend of this project:

Prerequisites
Node.js and npm (Node Package Manager) must be installed on your system.
Download Node.js from here.
MongoDB database (either locally or MongoDB Atlas).
Backend Setup
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the backend directory:

bash
Copy code
cd backend
Install required packages:

Copy code
npm install
Set up environment variables:

Create a .env file in the backend directory and add the following:
env
Copy code
MONGO_URI=your-mongodb-connection-string
PORT=5000
Start the backend server:

arduino
Copy code
npm run dev
This will start the server on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install required packages:

Copy code
npm install
Start the frontend application:

sql
Copy code
npm start
This will start the React app on http://localhost:3000.

API Endpoints
GET /api/transactions: Fetches a list of transactions. You can filter by month using query parameters.
GET /api/statistics: Fetches transaction statistics for the selected month.
GET /api/transactions/bar-chart: Fetches data for the bar chart showing price ranges.
Error Handling
Ensure MongoDB is running and the API server is properly configured.
If you encounter CORS issues, ensure your Express app uses the CORS middleware.
Common Issues
CORS issues: Ensure that you have app.use(cors()) in the backend server.js.
Database connection error: Double-check your MongoDB URI and network access if using MongoDB Atlas.
