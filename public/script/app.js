(function (io) {
    let socket = io("http://localhost:4000");
    socket.on("connect", () => {
        console.log("client connected to socket");
    });
}(window.io));
