const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Starts the server
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
