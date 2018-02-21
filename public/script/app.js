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

    // format html from message data
    let formatMessage = data => {
        let s;
        let html;

        s = "class=\"messages__message";
        s += data.handle === "me" ? " messages__my-message\"" : " messages__other-message\"";
        html = "<div class=\"messages__message-container\">";
        html += "<ul " + s + ">";
        html += "<li><span>" + data.handle + "</span>&nbsp;<span>" + new Date(data.timestamp).toString() + "</span></li>";
        html += "<ul " + s + ">";
        html += "<li><span>" + data.message + "</span></li>";
        html += "</ul></ul>";
        html += "</div>";
        return html;
    };

    // handle input text keypress events
    elHandle.addEventListener("keyup", toggleButtonDisabled);
    elMessage.addEventListener("keyup", toggleButtonDisabled);

    // handle button client event
    elButton.addEventListener("click", event => {
        let timestamp = Date.now();
        let message = { handle: "me", message: elMessage.value, timestamp: timestamp };

        elMessages.innerHTML += formatMessage(message);
        message.handle = elHandle.value;
        socket.emit("message", {
            handle: elHandle.value,
            message: elMessage.value,
            timestamp: timestamp
        });
        elMessage.value = "";
        toggleButtonDisabled();
    });

    // setup socket
    socket = io();
    socket.on("connect", () => {
        console.log("client connected to socket");
    });
    socket.on("message", data => {
        elMessages.innerHTML += formatMessage(data);
    });

    // toggle the button
    toggleButtonDisabled();
}(window.io));
