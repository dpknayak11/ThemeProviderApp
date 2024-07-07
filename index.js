const express = require("express");
require("dotenv").config();
const cors = require('cors');
const connectDB = require("./connection/connection");
const themeRouter = require("./routes/themeRoute");
const userRoute = require("./routes/userRoute");
const { logout } = require("./routes/index");
const PORT = process.env.PORT;
const app = express();
const bodyParser = require("body-parser");
app.use(cors());

const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};


app.options("", cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connectDB()

app.use('/app', themeRouter);
app.use('/user', userRoute);
app.use("/api/logout", logout);

app.get("/", (req, res) => {
    res.send("Project is Runing...");
});



// app.listen(PORT, '192.168.1.45', () => {
//     console.log(`Server is listening at http://192.168.1.45:${PORT}`);
// });

// http://http://localhost:5000


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Listening at Port " + PORT + "!");
    else console.log("Error Occurred");
});


