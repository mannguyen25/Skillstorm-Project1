const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // This loads the .env file contents into the Node environment

const app = express();
app.use(require('cors')());
app.use(express.json());
app.use('/items', require('./routes/item.route')); // You can do it on one line
app.use('/warehouses', require('./routes/warehouse.route')); // You can do it on one line

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB!');
    } catch (err) {
        // This runs if it fails to connect to MongoDB
        console.error(err);
        process.exit(1); // Immediately kill the server
    }
}

connectToMongo();

app.listen(process.env.PORT || 8080, () => {
    // This callback runs right when the app starts
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});