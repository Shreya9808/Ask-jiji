import express from 'express';
import dotenv from 'dotenv';
import askJIjiRouter from './routes/askJIjiRouter.js';



dotenv.config();

const app = express();

app.use(express.json());


app.use("/ask-jiji", askJIjiRouter);


app.use("/", (req, res) => {
    res.send("jiji backend is running");
});

app.listen(process.env.PORT || 4000, () => {
    console.log("server is running on port 4000");
});
