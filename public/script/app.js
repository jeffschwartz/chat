(function (io) {
    let elHandle = document.getElementById("handle");
    let elMessages = document.getElementById("messages");
    let elMessage = document.getElementById("message");
    let elButton = document.getElementById("button");
    let socket;

    // toggle button enabled/disabled depending on handle & message value lengths
    let toggleButtonDisabled = () => {
        let enabled = !!elHandle.value.length && !!elMessage.value.length;
        elButton.className = enabled ? "message-submit-button"
            : "message-submit-button message-submit-button--disabled";
        elButton.disabled = !enabled;
    };

    // handle input text keypress events
    elHandle.addEventListener("keyup", toggleButtonDisabled);
    elMessage.addEventListener("keyup", toggleButtonDisabled);

    // handle button client event
    elButton.addEventListener("click", event => {
        console.log("button clicked!");
        elMessages.innerHTML +=
            "<div class=\"messages__my-message\">Me: " +
            elMessage.value + "</div>";
        socket.emit("message", { handle: elHandle.value, message: elMessage.value });
        elMessage.value = "";
        toggleButtonDisabled();
    });

    // setup socket
    socket = io();
    socket.on("connect", () => {
        console.log("client connected to socket");
    });
    socket.on("message", data => {
        elMessages.innerHTML +=
            "<div class=\"messages__other-message\">" +
            data.handle + ": " + data.message + "</div>";
    });

    // toggle the button
    toggleButtonDisabled();
}(window.io));
