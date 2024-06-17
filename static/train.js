$(document).ready(function() {
    // Function to get the value of a cookie by name
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    // Check for Authorization token in cookies
    const token = getCookie('Authorization');
    if (!token) {
        // If token is not found, redirect to login page
        alert("You must log in to use this feature!")
        window.location.href = '/login.html';
        return;
    }


    $('#trainForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the message from the input field
        var message = $('#data').val();

        // Change button status
        var submitButton = $('#submit-btn');
        submitButton.prop('disabled', true);
        submitButton.text('Please wait...');
        
        // Send the message to the backend API endpoint in JSON format
        $.ajax({
            type: 'POST',
            url: '/api/add_data',
            contentType: 'application/json',
            data: JSON.stringify({ text: message }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function(response) {
                // Append the user's data to the chat box
                $('#trainBox').append('<div>' + message + '</div>');

                // Scroll to the bottom of the chat box
                $('#trainBox').scrollTop($('#trainBox')[0].scrollHeight);

                // Clear the input field
                $('#data').val('');

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
                alert('Failed to send data. Please try again.');
            }
        });
    });
});