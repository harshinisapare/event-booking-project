const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());


require('dotenv').config();
const dburl = process.env.MONGO_URL;



const client = new MongoClient(dburl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let bookingsCollection;

async function connectDB() {
  try {
    await client.connect();
    const database = client.db("eventDB");
    bookingsCollection = database.collection("bookings");
    console.log(" Connected to MongoDB Atlas!");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
}
connectDB();

app.get('/api/bookings', async (request, response) => {
  try {
    const data = await bookingsCollection.find().toArray();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ message: "Error fetching bookings" });
  }
});

app.post('/api/bookings', async (request, response) => {
  const { name, email, event, ticketType } = request.body;
  if (!name || !email || !event) {
    return response.status(400).json({ message: "Name, email, and event are required." });
  }

  const newBooking = {
    name,
    email,
    event,
    ticketType,
    createdAt: new Date()
  };

  try {
    const result = await bookingsCollection.insertOne(newBooking);
    response.status(201).json({
      message: " Booking created successfully!",
      booking: newBooking,
      id: result.insertedId
    });
  } catch (error) {
    response.status(500).json({ message: "Error creating booking" });
  }
});

app.get('/api/bookings/:id', async (request, response) => {
  try {
    const id = new ObjectId(request.params.id);
    const booking = await bookingsCollection.findOne({ _id: id });
    if (!booking) return response.status(404).json({ message: "Booking not found" });
    response.status(200).json(booking);
  } catch {
    response.status(400).json({ message: "Invalid ID format" });
  }
});


app.put('/api/bookings/:id', async (request, response) => {
  try {
    const id = new ObjectId(request.params.id);
    const updated = await bookingsCollection.updateOne({ _id: id }, { $set: request.body });
    if (updated.matchedCount === 0) return response.status(404).json({ message: "Booking not found" });
    response.status(200).json({ message: " Booking updated successfully!" });
  } catch {
    response.status(400).json({ message: "Invalid ID format" });
  }
});


app.delete('/api/bookings/:id', async (request, response) => {
  try {
    const id = new ObjectId(request.params.id);
    const deleted = await bookingsCollection.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) return response.status(404).json({ message: "Booking not found" });
    response.status(200).json({ message: " Booking deleted successfully!" });
  } catch {
    response.status(400).json({ message: "Invalid ID format" });
  }
});


app.get('/api/bookings/search', async (request, response) => {
  const { email } = request.query;
  try {
    const data = await bookingsCollection.find({ email: { $regex: email, $options: "i" } }).toArray();
    response.status(200).json(data);
  } catch {
    response.status(500).json({ message: "Error searching booking" });
  }
});


app.get('/api/bookings/filter', async (request, response) => {
  const { event } = request.query;
  try {
    const data = await bookingsCollection.find({ event: { $regex: event, $options: "i" } }).toArray();
    response.status(200).json(data);
  } catch {
    response.status(500).json({ message: "Error filtering booking" });
  }
});

app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});
