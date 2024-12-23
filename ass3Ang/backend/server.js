require('dotenv').config({ path: '../.env' });
const express = require("express");
const Driver = require("./models/driver");
const Package = require("./models/package");
const driverRouter = require("./routes/driver-routes");
const packageRouter = require("./routes/package-routes");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { Translate } = require('@google-cloud/translate').v2;

const app = express();
const PORT_NUMBER = 8080;

const gemini_api_key = process.env.GEMINI_API_KEY;
const translate_api_key = process.env.TRANSLATE_API_KEY;

const url = "mongodb://localhost:27017/assignment";

const server = http.createServer(app);

const io = new Server(server);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./dist/ass3-ang/browser'));
app.use(express.json());
app.use(cors());

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const translate = new Translate({
  key: translate_api_key,
});

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("Successfully connected to mongodb and mongoose");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connect();

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('ass3ai', async (data) => {
    const result = await geminiModel.generateContent(`What is the distance between ${data} and Melbourne?`);
    const responseText = await result.response.text();
    io.emit('ass3aianswer', responseText);
  });
  socket.on('translate', async (text, targetLanguage) => {
    const [translation] = await translate.translate(text, targetLanguage);
    const responseText = [translation][0]; 
    io.emit('translationResult', responseText);
  });
});

app.use("/35423056/Aiken/api/v1/drivers", driverRouter);
app.use("/35423056/Aiken/api/v1/packages", packageRouter);

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist/ass3-ang/browser/' });
});

server.listen(PORT_NUMBER, () => {
  console.log('Server is running on port ${PORT_NUMBER}');
});