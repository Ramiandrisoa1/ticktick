import express, { json } from 'express';
import cors from 'cors';
import pkg from 'body-parser';

const { json: _json, urlencoded } = pkg;

const app = express();

var corsOptions = { origin: 'http://localhost:8080' };

app.use(cors(corsOptions));
app.use(_json());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to this application' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
import sampleRoute from './app/routes/sampleRoute.js';
app.use('/sample/', sampleRoute);

import userRoute from "./app/routes/userRoute.js";
app.use("/user/", userRoute);
    