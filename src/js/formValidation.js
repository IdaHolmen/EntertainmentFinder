// SIGN IN FORM VALIDATION
const validateSignInForm = (
	email,
	password,
	emailErrorElement,
	passwordErrorElement
) => {
	const errors = {
		errorStatus: false,
		emailError: "",
		passwordError: "",
	};

	if (!email && !password) {
		(errors.errorStatus = true), (errors.emailError = "E-mail is required ⚠️");
		errors.passwordError = "Password is required ⚠️";

		emailErrorElement.style.visibility = "visible";
		passwordErrorElement.style.visibility = "visible";

		emailErrorElement.textContent = errors.emailError;
		passwordErrorElement.textContent = errors.passwordError;
	} else if (!email) {
		(errors.errorStatus = true),
			(errors.emailError = "E-mail is required ⚠️"),
			(errors.passwordError = "");

		emailErrorElement.style.visibility = "visible";
		passwordErrorElement.style.visibility = "hidden";

		emailErrorElement.textContent = errors.emailError;
		passwordErrorElement.textContent = errors.passwordError;
	} else if (!password) {
		(errors.errorStatus = true),
			(errors.emailError = ""),
			(errors.passwordError = "Password is required ⚠️");

		emailErrorElement.style.visibility = "hidden";
		passwordErrorElement.style.visibility = "visible";

		emailErrorElement.textContent = errors.emailError;
		passwordErrorElement.textContent = errors.passwordError;
	} else {
		(errors.errorStatus = false),
			(errors.emailError = ""),
			(errors.passwordError = "");

		emailErrorElement.style.visibility = "hidden";
		passwordErrorElement.style.visibility = "hidden";

		emailErrorElement.textContent = errors.emailError;
		passwordErrorElement.textContent = errors.passwordError;
	}

	const signInFormStatus = () => {
		return errors.errorStatus;
	};
	return {signInFormStatus};
};

// SIGN UP VALIDATION FORM
const validateSignUpForm = (
	firstname,
	lastname,
	email,
	password,
	errorMessage
) => {
	let errorStatus = false;

	if (!firstname || !lastname || !email || !password) {
		errorStatus = true;
		errorMessage.style.visibility = "visible";
		errorMessage.textContent = "Please fill out all the fields ⚠️";
	} else {
		errorStatus = false;
		errorMessage.style.visibility = "hidden";
		errorMessage.textContent = "";
	}

	const signUpErrorStatus = () => {
		return errorStatus;
	};

	return {signUpErrorStatus};
};

// COMMENT SECTION VALIDATION
const validateCommentInput = (commentInput, counterLabel, commentError) => {
	commentInput.addEventListener("input", () => {
		counterLabel.textContent = `Typed characters: ${commentInput.value.length}`;
		if (commentInput.value.length >= 140) {
			counterLabel.style.color = "red";
			commentError.textContent =
				"Description must be less than 140 characters ⚠️";
			commentError.style.visibility = "visible";
		} else {
			counterLabel.style.color = "white";
			commentError.style.visibility = "hidden";
		}
	});

	commentInput.addEventListener("keydown", (e) => {
		if (commentInput.value.length >= 140 && e.key !== "Backspace") {
			e.preventDefault();
		}
	});
};

export {validateSignInForm, validateSignUpForm, validateCommentInput};
