import {fetchAndDisplayComments} from "./app.js";

// SELECTING ELEMENTS
const movieInfoContainer = document.querySelector(".movie-info-container");
const slideshowSection = document.querySelector(".slideshow-section");
const slideshowContainer = document.querySelector(".slideshow-container");
const dotsContainer = document.querySelector(".dots-container");
const title = document.querySelector(".info-title");
const voteAverage = document.querySelector(".vote-average");
const overview = document.querySelector(".overview");

// GLOBAL VARIABLES FOR SLIDESHOW
let currentSlide = 0;
let slides = [];
let dots = [];
let movieId = "";

const setMovieId = (id) => {
	movieId = id;
};

// FUNCTION TO REMOVE ALL CHILDREN
function removeAllChildren(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

const fetchAndRenderInfo = async () => {
	try {
		const response = await fetch("http://localhost:3000/movies");
		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}
		const movies = await response.json();
		renderMovieInfo(movies);
	} catch (error) {
		if (movieInfoContainer) {
			removeAllChildren(movieInfoContainer);
		}
		const pageErrorContainer = document.createElement("div");
		const pageError = document.createElement("p");
		const refreshButton = document.createElement("button");

		pageErrorContainer.classList.add("page-error-container");
		pageError.classList.add("page-error");
		refreshButton.classList.add("refresh-button");

		pageError.textContent =
			"Cannot load information. Please refresh and try again!";
		refreshButton.textContent = "Refresh";

		movieInfoContainer.append(pageErrorContainer);
		pageErrorContainer.append(pageError, refreshButton);

		refreshButton.addEventListener("click", () => {
			window.location.reload();
		});
	}
};
fetchAndRenderInfo();

const fetchAndRenderImages = async (movieId) => {
	if (!movieId) {
		if (slideshowSection) {
			removeAllChildren(slideshowSection);
		}
		const pageErrorContainer = document.createElement("div");
		const pageError = document.createElement("p");

		pageErrorContainer.classList.add("page-error-container");
		pageError.classList.add("page-error");

		pageError.textContent = "Cannot load image.";

		slideshowSection.append(pageErrorContainer);
		pageErrorContainer.append(pageError);
		return;
	}
	try {
		const response = await fetch(`http://localhost:3000/images/${movieId}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const images = await response.json();
		renderImages(images || []);
	} catch (error) {
		if (slideshowSection) {
			removeAllChildren(slideshowSection);
		}
		const pageErrorContainer = document.createElement("div");
		const pageError = document.createElement("p");

		pageErrorContainer.classList.add("page-error-container");
		pageError.classList.add("page-error");

		pageError.textContent = "Cannot load image";

		slideshowSection.append(pageErrorContainer);
		pageErrorContainer.append(pageError);
	}
};

// RENDERING THE IMAGES
function renderImages(backdrops) {
	dotsContainer.classList.add("dots-container");

	// CLEAR EXISTING IMAGES AND DOTS
	while (slideshowContainer.firstChild) {
		slideshowContainer.removeChild(slideshowContainer.firstChild);
	}
	while (dotsContainer.firstChild) {
		dotsContainer.removeChild(dotsContainer.firstChild);
	}

	if (!Array.isArray(backdrops)) {
		return;
	}

	// I WANT TO LIMIT THE NUMBER OF IMAGES TO 6
	backdrops.slice(0, 6).forEach((backdrop, index) => {
		const img = document.createElement("img");
		img.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;
		img.alt = "Movie Image";
		img.style.width = "100%";
		img.style.height = "auto";
		img.classList.add("slide");
		img.style.display = index === 0 ? "block" : "none";

		slideshowContainer.appendChild(img);

		const dot = document.createElement("span");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.addEventListener("click", () => {
			showSlide(index);
		});
		dotsContainer.appendChild(dot);
	});

	// UPDATING GLOBAL VARIABLES
	slides = document.querySelectorAll(".slide");
	dots = document.querySelectorAll(".dot");

	// RESETTING SLIDE INDEX
	currentSlide = 0;

	showSlide(currentSlide);
}

// SLIDESHOW LOGIC
const showSlide = (index) => {
	slides.forEach((slide, i) => {
		slide.style.display = i === index ? "block" : "none";
		dots[i].classList.toggle("active", i === index);
	});
	currentSlide = index;
};

const nextSlide = () => {
	currentSlide = (currentSlide + 1) % slides.length;
	showSlide(currentSlide);
};

const previousSlide = () => {
	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	showSlide(currentSlide);
};

document.querySelector(".previous").addEventListener("click", previousSlide);
document.querySelector(".next").addEventListener("click", nextSlide);

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		previousSlide();
	} else if (event.key === "ArrowRight") {
		nextSlide();
	}
});

showSlide(currentSlide);

function renderMovieInfo(movies) {
	if (!Array.isArray(movies) || movies.length === 0) {
		return;
	}

	movies.forEach((movie) => {
		// SET CONTENT
		title.textContent = movie.title;
		overview.textContent = movie.overview;

		// CONVERT THE VOTE AVERAGE TO A PERCENTAGE FORMAT
		//movie.vote_average * 10 MAKES A PERCENTAGE
		// Math.round() ROUNDS THE NUMBER TO THE NEAREST INTEGER
		const voteAveragePercentage = Math.round(movie.vote_average * 10);
		voteAverage.textContent = `${voteAveragePercentage}%`;

		setMovieId(movie.id);
		fetchAndRenderImages(movie.id);
		fetchAndDisplayComments(movie.title);
	});
}

export {renderImages, renderMovieInfo, setMovieId, movieId};
