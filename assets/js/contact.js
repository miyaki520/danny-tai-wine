$(function() {
    $('form#contact_form').submit(function(e) {
        e.preventDefault(); 
        $('form#contact_form .error').remove();
        var hasError = false;
        var $email = $('form input[name="email'); 
        var $name = $('form input[name="name'); 
        var $message = $('form textarea[name="message');
        var $whatsapp = $('form input[name="whatsapp'); 
        var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if ($email.val() == '' || !re.test($email.val())){
            $('#email').parent().append('<p class="error text-white">Please provide valid Email.</p>');
            $('#email').addClass('inputError');
            hasError = true;
        }

        if($name.val() == '') {
            $('#name').parent().append('<p class="error text-white">Please provide Your name.</p>');
            $('#name').addClass('inputError');
            hasError = true;
        }

        if($message.val() == '') {
            $('#message').parent().append('<p class="error text-white">Please enter a message.</p>');
            $('#message').addClass('inputError');
            hasError = true;
        }

        if($whatsapp.val() == '') {
            $('#whatsapp').parent().append('<p class="error text-white">Please provide Your Whatsapp Number.</p>');
            $('#whatsapp').addClass('inputError');
            hasError = true;
        }

        if(!hasError) {
            var url = "./assets/php/contact.php"; 
            $.ajax({
               type: "POST",
               url: url,
               data: $("#contact_form").serialize()
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $('form#contact_form').removeClass('error');
                $('form#contact_form').addClass('success');

                // Set the message text.
                $('#contact_modal').slideUp(300);
                $('.modal-backdrop').hide();
                var successMessage = $('form#contact_form').prepend('<p class="success text-white pb-2">Thank you. Your email was sent successfully.</p>');
                setTimeout(successMessage, 2000);

                // Clear the form.
                $('form input[name="email"], form input[name="name"], form textarea[name="message"], form input[name="whatsapp"]').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $('form#contact_form').removeClass('success');
                $('form#contact_form').addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $('form#contact_form').text(data.responseText);
                } else {
                    $('form#contact_form').prepend('<p class="error text-white pb-2">Oops! An error occured and your message could not be sent.</p>');
                }
            });
        }
        return false;
    });
});
