import {fetchAndDisplayComments} from "./app.js";

// GLOBAL VARIABLES FOR SLIDESHOW
let currentSlide = 0;
let slides = [];
let dots = [];
let movieId = "";

const setMovieId = (id) => {
	movieId = id;
};

const fetchAndRenderInfo = async () => {
	try {
		const response = await fetch("http://localhost:3000/movies");
		const movies = await response.json();
		renderMovieInfo(movies);
	} catch (error) {
		console.log(error);
	}
};
fetchAndRenderInfo();

const fetchAndRenderImages = async (movieId) => {
	if (!movieId) {
		console.error("Invalid movieId:", movieId);
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
		console.log(error);
	}
};

// RENDERING THE IMAGES
function renderImages(backdrops) {
	const slideshowContainer = document.querySelector(".slideshow-container");
	const dotsContainer = document.querySelector(".dots-container");

	dotsContainer.classList.add("dots-container");

	// CLEAR EXISTING IMAGES AND DOTS
	while (slideshowContainer.firstChild) {
		slideshowContainer.removeChild(slideshowContainer.firstChild);
	}
	while (dotsContainer.firstChild) {
		dotsContainer.removeChild(dotsContainer.firstChild);
	}

	if (!Array.isArray(backdrops)) {
		console.error("Invalid backdrops:", backdrops);
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
		console.error("Invalid movies array:", movies);
		return;
	}

	movies.forEach((movie) => {
		const title = document.querySelector(".info-title");
		const voteAverage = document.querySelector(".vote-average");
		const overview = document.querySelector(".overview");

		// SET CONTENT
		title.textContent = movie.title;
		overview.textContent = movie.overview;
		voteAverage.textContent = movie.vote_average;

		setMovieId(movie.id);
		fetchAndRenderImages(movie.id);
		fetchAndDisplayComments(movie.title);
	});
}

export {renderImages, renderMovieInfo, setMovieId, movieId};
