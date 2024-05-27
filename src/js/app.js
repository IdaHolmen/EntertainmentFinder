import firebaseConfig from "./firebaseConfig.js";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, onSnapshot} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";

// INITIALIZE FIREBASE
initializeApp(firebaseConfig);

// INITIALIZE AUTHENTICATION SERVICE
const authenticationService = getAuth();

// CONNECT TO THE DATABASE
const database = getFirestore();

// CONNECT TO THE USERS' COLLECTION
const usersCollection = collection(database, "users");

// ADD USERS TO THE COLLECTION

import "./filterGenres.js";
import {renderMovieInfo} from "./movieInfo.js";
import {validateSignInForm} from "./signInValidation.js";
import {validateSignUpForm} from "./signUpValidation.js";

// SELECTING THE MAIN PAGE ELEMENTS
const header = document.querySelector(".header");
const mainContainer = document.querySelector(".main-container");
const movieSection = document.querySelector(".movie-section");
const movieInfoContainer = document.querySelector(".movie-info-container");
const backButton = document.querySelector(".back-to-main-button");

// SELECTING THE SIGN IN ELEMENTS
const signInButtonOpenForm = document.querySelector(".sign-in-button__open");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const signInButton = document.querySelector(".sign-in-button");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const signInForm = document.querySelector(".sign-in-form");
const submissionError = document.querySelector(".submission-error");
const signInFormContainer = document.querySelector(".sign-in-form-container");
const openSignInFormButton = document.querySelector(".sign-in-button__open");
const closeSignInFormButton = document.querySelector(".sign-in-form__close");

// SELECTING THE SIGN UP ELEMENTS
const signUpFirstName = document.querySelector(".firstname");
const signUpLastName = document.querySelector(".lastname");
const signUpEmail = document.querySelector(".sign-up-email");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpError = document.querySelector(".sign-up-error");
const signUpForm = document.querySelector(".sign-up-form");
const closeSignUpFormButton = document.querySelector(".sign-up-form__close");
const openSignUpFormButton = document.querySelector(".sign-up-form__open");
const signUpFormContainer = document.querySelector(".sign-up-form-container");
const signUpButton = document.querySelector(".sign-up-button");

// SELECTING SIGN OUT BUTTON
const signOutButton = document.querySelector(".sign-out-button");

// OPEN SIGN IN MODAL
openSignInFormButton.addEventListener("click", (e) => {
	e.preventDefault();
	header.style.display = "none";
	mainContainer.style.display = "none";
	movieInfoContainer.style.display = "none";
	backButton.style.display = "none";
	signUpFormContainer.style.display = "none";
	signInFormContainer.style.display = "flex";
});

// CLOSE SIGN IN MODAL
closeSignInFormButton.addEventListener("click", (e) => {
	e.preventDefault();
	header.style.display = "flex";
	signInFormContainer.style.display = "none";
	signUpFormContainer.style.display = "none";
	mainContainer.style.display = "flex";
});

// OPEN SIGN UP MODAL
openSignUpFormButton.addEventListener("click", (e) => {
	e.preventDefault();
	header.style.display = "none";
	signUpFormContainer.style.display = "flex";
	signInFormContainer.style.display = "none";
});

// CLOSE SIGN UP MODAL
closeSignUpFormButton.addEventListener("click", (e) => {
	e.preventDefault();
	header.style.display = "flex";
	signUpFormContainer.style.display = "none";
	signInFormContainer.style.display = "none";
	mainContainer.style.display = "flex";
});

// SETTING GENRES AND ALL MOVIES SO THEY CAN BE EXPORTED
let genreMappings = {};
let allMovies = [];

// MATCHING THE ID NUMBERS UP AGAINST THE GENRE NAMES
function storeGenreMappings(genreData) {
	genreData.genres.forEach((genre) => {
		genreMappings[genre.id] = genre.name;
	});
}

// LIST OF ID'S AND GENRES
// USED THIS LINK TO FETCH THE GENRE LIST AND DECIDED TO HARDCODE IT RIGHT INTO THE DOCUMENT FOR EASIER ACCESS:
// https://developer.themoviedb.org/reference/genre-movie-list
storeGenreMappings({
	genres: [
		{id: 28, name: "Action"},
		{id: 12, name: "Adventure"},
		{id: 16, name: "Animation"},
		{id: 35, name: "Comedy"},
		{id: 80, name: "Crime"},
		{id: 99, name: "Documentary"},
		{id: 18, name: "Drama"},
		{id: 10751, name: "Family"},
		{id: 14, name: "Fantasy"},
		{id: 36, name: "History"},
		{id: 27, name: "Horror"},
		{id: 10402, name: "Music"},
		{id: 9648, name: "Mystery"},
		{id: 10749, name: "Romance"},
		{id: 878, name: "Science Fiction"},
		{id: 10770, name: "TV Movie"},
		{id: 53, name: "Thriller"},
		{id: 10752, name: "War"},
		{id: 37, name: "Western"},
	],
});

// MAKING A VARIABLE NAMED GENRES AND SORTING IT ALPHABETICALLY
const genres = Object.values(genreMappings).sort();

// CREATING A MAPPING FROM GENRE TO CONTENT CONTAINER
const genreContentContainers = {};

genres.forEach((genre) => {
	// CREATING GENRE HEADLINE ELEMENTS
	const genreHeadlineContainer = document.createElement("div");
	const line1 = document.createElement("span");
	const genreHeadline = document.createElement("span");
	const line2 = document.createElement("span");

	// SET CONTENT
	genreHeadline.textContent = genre;

	// APPEND ELEMENTS
	movieSection.append(genreHeadlineContainer);
	genreHeadlineContainer.append(line1, genreHeadline, line2);

	// ADD CLASSES
	genreHeadlineContainer.classList.add("genre-headline-container");
	line1.classList.add("line");
	genreHeadline.classList.add("genre-headline");
	line2.classList.add("line");

	// CREATING CONTENT CONTAINER ELEMENT FOR THE GENRES
	const contentContainer = document.createElement("section");
	contentContainer.classList.add("content-container");
	movieSection.append(contentContainer);

	// STORE THE CONTENT CONTAINER IN THE MAPPING
	genreContentContainers[genre] = contentContainer;
});

const fetchAndRender = async () => {
	try {
		const response = await fetch("http://localhost:3000/movies");
		const movies = await response.json();
		allMovies = [...movies];
		renderMovies(movies);
	} catch (error) {
		console.log(error);
	}
};
fetchAndRender();

function renderMovies(movies) {
	movies.forEach((movie) => {
		//MAKING SURE THAT THE MOVIES GET SORTED IN EVERY GENRE THEY HAVE IN THE genre_ids ARRAY
		movie.genre_ids.forEach((genreId) => {
			const genreName = genreMappings[genreId];
			const genreContentContainer = genreContentContainers[genreName];

			if (genreContentContainer) {
				// CREATING CONTENT CONTAINER ELEMENTS
				const movieContainer = document.createElement("button");
				const posterSection = document.createElement("div");
				const titleSection = document.createElement("div");
				const moviePoster = document.createElement("img");
				const movieTitle = document.createElement("p");

				// SETTING CONTENT
				moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				moviePoster.alt = movie.title + " Poster";
				movieTitle.textContent = movie.title;

				// SHORTENS TITLE IF IT'S TOO LONG
				const maxLength = 30;
				const shortenedTitle =
					movie.title.length > maxLength
						? movie.title.substring(0, maxLength) + "..."
						: movie.title;
				movieTitle.textContent = shortenedTitle;

				// APPEND ELEMENTS
				movieContainer.append(posterSection, titleSection);
				posterSection.append(moviePoster);
				titleSection.append(movieTitle);

				// ADD CLASSES
				movieContainer.classList.add("movie-container");
				posterSection.classList.add("poster-section");
				titleSection.classList.add("title-section");
				moviePoster.classList.add("movie-poster");
				movieTitle.classList.add("movie-title");

				// APPEND MOVIE CONTAINER TO THE CORRECT GENRE CONTENT CONTAINER
				genreContentContainer.append(movieContainer);

				// ADD EVENT LISTENER TO MOVIE CONTAINER
				movieContainer.addEventListener("click", () => {
					const selectedMovie = movie;
					mainContainer.style.display = "none";
					movieInfoContainer.style.display = "flex";
					backButton.style.display = "flex";
					renderMovieInfo([selectedMovie]);
				});
			}
		});
	});
}

// ADD EVENT LISTENER TO BACK BUTTON
backButton.addEventListener("click", () => {
	mainContainer.style.display = "flex";
	movieInfoContainer.style.display = "none";
	backButton.style.display = "none";
});

// ADD EVENT LISTENER TO SIGN IN FORM
signInForm.addEventListener("submit", (e) => {
	e.preventDefault();
	validateSignInForm(
		emailInput.value,
		passwordInput.value,
		emailError,
		passwordError
	);
});

// HANDLE SIGN UP ACTION
function signUpUser() {
	const {signUpErrorStatus} = validateSignUpForm(
		signUpFirstName.value.trim(),
		signUpLastName.value.trim(),
		signUpEmail.value.trim(),
		signUpPassword.value.trim(),
		signUpError
	);
	if (signUpErrorStatus()) {
		return;
	} else {
		const newUser = {
			firstname: signUpFirstName.value.trim(),
			lastname: signUpLastName.value.trim(),
			signUpEmail: signUpEmail.value.trim(),
			signUpPassword: signUpPassword.value.trim(),
		};
		// MAKING A SEPARATE OBJECT TO STORE USERS IN SO WE DON'T STORE THEIR PASSWORD IN THE DATABASE
		const storedUser = {
			firstname: signUpFirstName.value.trim(),
			lastname: signUpLastName.value.trim(),
			signUpEmail: signUpEmail.value.trim(),
		};
		createUserWithEmailAndPassword(
			authenticationService,
			newUser.signUpEmail,
			newUser.signUpPassword
		)
			.then(() => {
				header.style.display = "flex";
				signUpFormContainer.style.display = "none";
				mainContainer.style.display = "flex";
				signInButtonOpenForm.style.display = "none";
				signOutButton.style.display = "block";
				addDoc(usersCollection, storedUser)
					.then(() => {
						console.log("User has been added to the collection");
					})
					.catch((error) => console.log(error.message));
				signUpForm.reset();
			})
			.catch((error) => {
				console.error("Error during sign up:", error.message);
				signUpError.textContent = "Error during sign up: " + error.message;
				signUpError.style.visibility = "visible";
			});
	}
}

// FETCHING USERS FROM THE COLLECTION
onSnapshot(usersCollection, (snapshot) => {
	const usersArray = [];
	snapshot.docs.forEach((doc) => {
		usersArray.push({id: doc.id, ...doc.data()});
	});
	console.log(usersArray);
});

// ADD EVENT LISTENER TO SIGN UP BUTTON
signUpButton.addEventListener("click", (e) => {
	e.preventDefault();
	signUpUser();
});

// ADDING EVENT LISTENER SO YOU CAN SUBMIT WITH ENTER
document.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		signUpUser();
	}
});

// HANDLE SIGN OUT ACTION
function signOutUser() {
	signOut(authenticationService)
		.then(() => {
			signOutButton.style.display = "none";
			signInButtonOpenForm.style.display = "block";
		})
		.catch((error) => console.log("error"));
}

// ADD EVENT LISTENER TO SIGN OUT BUTTON
signOutButton.addEventListener("click", (e) => {
	e.preventDefault();
	signOutUser();
});

// HANDLE SIGN IN ACTION
function signInUser() {
	const {signInFormStatus} = validateSignInForm(
		emailInput.value,
		passwordInput.value,
		emailError,
		passwordError
	);
	if (signInFormStatus()) {
		return;
	} else {
		const email = emailInput.value.trim();
		const password = passwordInput.value.trim();
		signInWithEmailAndPassword(authenticationService, email, password)
			.then(() => {
				signInForm.reset();
				header.style.display = "flex";
				signInFormContainer.style.display = "none";
				mainContainer.style.display = "flex";
				signOutButton.style.display = "block";
				signInButtonOpenForm.style.display = "none";
			})
			.catch((error) => {
				submissionError.textContent = "Email or password is wrong ⚠️";
				submissionError.style.visibility = "visible";
			});
	}
}

// ADD EVENT LISTENER TO SIGN IN BUTTON
signInButton.addEventListener("click", (e) => {
	e.preventDefault();
	signInUser();
});

// ADDING EVENT LISTENER SO YOU CAN LOG IN WITH ENTER
document.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		signInUser();
	}
});

export {genreMappings, allMovies};
