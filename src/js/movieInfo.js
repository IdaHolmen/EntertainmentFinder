import key from './key.js';

// SELECTING ELEMENTS FROM THE DOM

// FETCHING MOVIE LIST
const fetchMovies = async () => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${key}`
		);

		const result = await response.json();
		console.log(result.results);
		renderMovieInfo(result.results);
	} catch (error) {
		console.error(error);
	}
};
fetchMovies();

// FETCHING IMAGES TO MATCH THE MOVIES
async function fetchImages(movieId) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${key}`
		);

		const result = await response.json();
		renderImages(result.backdrops);
	} catch (error) {
		console.error(error);
	}
}
fetchImages();

// RENDERING THE IMAGES
function renderImages(backdrops) {
	const imageContainer = document.querySelector('.slideshow-container');

	// CLEAR EXISTING IMAGES
	while (imageContainer.firstChild) {
		imageContainer.removeChild(imageContainer.firstChild);
	}

	backdrops.forEach((backdrop) => {
		const img = document.createElement('img');
		img.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;
		img.alt = 'Movie Image';
		img.style.width = '100%';
		img.style.height = 'auto';

		imageContainer.appendChild(img);
	});
}

function renderMovieInfo(movies) {
	movies.forEach((movie) => {
		const title = document.querySelector('.info-title');
		const voteAverage = document.querySelector('.vote-average');
		const overview = document.querySelector('.overview');

		const slides = document.createElement('img');
		const dots = document.createElement('span');

		// SET CONTENT
		title.textContent = movie.title;
		overview.textContent = movie.overview;
		voteAverage.textContent = movie.vote_average;

		// SETTING IMAGE
		slides.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		slides.alt = movie.title + ' Poster';
		slides.style.width = '100%';
		slides.style.height = 'auto';

		// APPENDING ELEMENTS

		// SLIDESHOW LOGIC
		let currentSlide = 0;

		const showSlide = (index) => {
			slides.forEach((slide) => (slide.style.display = 'none'));
			dots.forEach((dot) => dot.classList.remove('active'));
			slides[index].style.display = 'block';
			dots[index].classList.add('active');
		};

		const nextSlide = () => {
			currentSlide = (currentSlide + 1) % slides.length;
			showSlide(currentSlide);
		};

		const previousSlide = () => {
			currentSlide = (currentSlide - 1 + slides.length) % slides.length;
			showSlide(currentSlide);
		};

		const setDotClickHandlers = () => {
			dots.forEach((dot, index) => {
				dot.addEventListener('click', () => {
					currentSlide = index;
					showSlide(currentSlide);
				});
			});
		};

		document
			.querySelector('.previous')
			.addEventListener('click', previousSlide);
		document.querySelector('.next').addEventListener('click', nextSlide);

		showSlide(currentSlide);
		setDotClickHandlers();
	});
}
