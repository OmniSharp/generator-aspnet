$(function () {
    if ($.validator) {
        $.validator.setDefaults({
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.field').addClass('error');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.field').removeClass('error');

            }
        });

        $('form.validate-me').bind('invalid-form.validate', function (form, validator) {
            if (validator.errorList && validator.errorList.length > 0) {
                validator.errorList.forEach(function (error, i) {
                    $('.ui.error.message ul').append($('<li/>').text(error.message));
                });

                $('.ui.error.message').show();
            } else {
                $('.ui.error.message').hide();
            }
        });
    }
    
});