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

	return signUpErrorStatus;
};
export {validateSignUpForm};
