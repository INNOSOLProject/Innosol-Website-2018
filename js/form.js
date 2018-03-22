$(() => {
  let $name = $('#form-name');
  let $email = $('#form-email');
  let $message = $('#form-message');

  let getValues = () => {
    return {
      name: $name.val().trim(),
      email: $email.val().trim(),
      message: $message.val().trim(),
    };
  };

  let checkForm = () => {
    $name.focus();
    $email.focus();
    $message.focus();

    let name = $name.hasClass('valid');
    let email = $email.hasClass('valid');
    let message = $message.hasClass('valid');

    return name && email && message;
  }

  let submitForm = () => {
    let isValid = checkForm();

    if(!isValid) {
      return;
    }

    let name = $name.val();
    let email = $email.val();
    let message = $message.val();

    console.log({
      name,
      email,
      message,
    });

    $('#submit').attr('disabled', 'disabled');
    $.ajax({
      url: 'https://mepnu1bmea.execute-api.us-east-1.amazonaws.com/prod/contact-submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        name,
        email,
        message,
      }),
      success: () => {
        $('#submit').attr('disabled', null);
        window.location = window.location.origin + '/contact-form-thank-you.html';
      },
      error: () => {
        $('#submit').addClass('hidden');
        $('.error-submitting').removeClass('hidden');
      },
    });
  }

  $('#submit').on('click', submitForm);
});
