$(document).ready(function() {
    $('#chatForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the message from the input field
        var message = $('#message').val();

        // Change button status
        var submitButton = $('#submit-btn');
        submitButton.prop('disabled', true);
        submitButton.text('Please wait...');
        
        // Send the message to the backend API endpoint in JSON format
        $.ajax({
            type: 'POST',
            url: '/api/chat',
            contentType: 'application/json',
            data: JSON.stringify({ text: message }),
            success: function(response) {
                // Append the user's message to the chat box
                $('#chatBox').append('<div><strong>You:</strong> ' + message + '</div>');

                // Append the response message to the chat box
                $('#chatBox').append('<div><strong>AI:</strong> ' + response.response + '</div>');

                // Scroll to the bottom of the chat box
                $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);

                // Clear the input field
                $('#message').val('');

                // Restore button
                submitButton.prop('disabled', false);
                submitButton.text('Send');
            },
            error: function(xhr, status, error) {
                // Restore button
                submitButton.prop('disabled', false);
                submitButton.text('Send');
                // Handle error responses from backend
                console.error('Chat failed:', error);
                alert('Failed to send message. Please try again.');
            }
        });
    });
});