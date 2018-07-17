console.log('Javascript is linked');





//add event listener for when use clicks out of the input form
//checks if both password fields are the same in order to enable submit button
$('input').on('keyup', (event) => {
	$password1 = $('#pass');
	$password2 = $('#checkpass');
	//console.log($password1.val());
	//console.log($password2.val());	

	if($password1.val() !== $password2.val()) {
		$('button').prop('disabled', true)
		$('button').css('cursor', 'not-allowed')
	} else {
		$('button').prop('disabled', false)
		$('button').css('cursor', 'pointer')
	}

})

