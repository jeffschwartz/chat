let express = require("express");
let socket = require("socket.io");
let io;

// app setup
let app = express();

// server
let server = app.listen(4000, () => {
    console.log("Connected to and listening on port 4000");
});

// static files
app.use(express.static("public"));

// socket setup
io = socket(server);

io.on("connection", socket => {
    console.log("Client made socket connection", socket.id);
    socket.on("message", data => {
        console.log(data);
        socket.broadcast.emit("message", data);
    });
});
