🎟️ Synergia Event Booking API
A simple Node.js + Express API connected to MongoDB for managing event bookings for Synergia 2025.

🚀 Features
Connects Node.js and Express to MongoDB
Performs CRUD operations (Create, Read, Update, Delete)
Includes Search and Filter queries
Follows REST API standards
Uses proper HTTP status codes
### 🧩 API Endpoints
# Method	Endpoint	Description
# GET	/api/bookings	Get all bookings
# POST	/api/bookings	Create a new booking
# GET	/api/bookings/:id	Get booking by ID
# PUT	/api/bookings/:id	Update booking details
# DELETE	/api/bookings/:id	Delete a booking
# GET	/api/bookings/search?email=xyz	Search booking by email
# GET	/api/bookings/filter?event=Synergia	Filter bookings by event name

### ⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/harshinisapare/project-api-bookings.git cd project-api-bookings

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file in the root folder
Add your MongoDB connection URL: MONGO_URL=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/?appName=Cluster0

4️⃣ Run the server
node projectapi.js

5️⃣ Test API endpoints
Use Postman or curl to test the endpoints.

🧠 Example POST Request (in Postman)
URL: http://localhost:3000/api/bookings

Body (JSON): { "name": "Harshini", "email": "harshini@gmail.com", "event": "Synergia 2025", "ticketType": "VIP" }

✅ All APIs tested successfully using Postman and stored data verified in MongoDB
