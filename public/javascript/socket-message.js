const socket = io('http://localhost:3000');

renderMessage = (message) => {
    $('.demo-card-square > .messages').append(`
        <div class="message">
            <strong>${message.author}: </strong> ${message.message}
        </div>
    `)
};

socket.on('previousMessages', (messages) => {
    for (let message of messages) {
        renderMessage(message)
    }
});

socket.on('receivedMessage', (message) => {
    renderMessage(message);
});

$('#chat').submit( (event) => {
    event.preventDefault();
    let author_input = $('input[name=username]');
    let message_input = $('textarea[name=message]');

    let author = author_input.val();
    let message = message_input.val();

    if (author.length && message.length) {
        let messageObject = {
            author: author,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
        message_input.val('');
    }
});
