require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const folderRoutes = require("./routes/folderRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my PhotoLodge API using MongoDB." });
});

app.use("/api/users", userRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});