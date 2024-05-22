import key from './key.js';
import './filterGenres.js';
import {fetchImages, renderMovieInfo} from './movieInfo.js';

// SETTING GENRES AND ALL MOVIES SO THEY CAN BE EXPORTED
let genreMappings = {};
let allMovies = [];

document.addEventListener('DOMContentLoaded', () => {
	const movieSection = document.querySelector('.movie-section');
	const mainContainer = document.querySelector('.main-container');
	const movieInfoContainer = document.querySelector('.movie-info-container');

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
			{id: 28, name: 'Action'},
			{id: 12, name: 'Adventure'},
			{id: 16, name: 'Animation'},
			{id: 35, name: 'Comedy'},
			{id: 80, name: 'Crime'},
			{id: 99, name: 'Documentary'},
			{id: 18, name: 'Drama'},
			{id: 10751, name: 'Family'},
			{id: 14, name: 'Fantasy'},
			{id: 36, name: 'History'},
			{id: 27, name: 'Horror'},
			{id: 10402, name: 'Music'},
			{id: 9648, name: 'Mystery'},
			{id: 10749, name: 'Romance'},
			{id: 878, name: 'Science Fiction'},
			{id: 10770, name: 'TV Movie'},
			{id: 53, name: 'Thriller'},
			{id: 10752, name: 'War'},
			{id: 37, name: 'Western'},
		],
	});

	// MAKING A VARIABLE NAMED GENRES AND SORTING IT ALPHABETICALLY
	const genres = Object.values(genreMappings).sort();

	// CREATING A MAPPING FROM GENRE TO CONTENT CONTAINER
	const genreContentContainers = {};

	genres.forEach((genre) => {
		// CREATING GENRE HEADLINE ELEMENTS
		const genreHeadlineContainer = document.createElement('div');
		const line1 = document.createElement('span');
		const genreHeadline = document.createElement('span');
		const line2 = document.createElement('span');

		// SET CONTENT
		genreHeadline.textContent = genre;

		// APPEND ELEMENTS
		movieSection.append(genreHeadlineContainer);
		genreHeadlineContainer.append(line1, genreHeadline, line2);

		// ADD CLASSES
		genreHeadlineContainer.classList.add('genre-headline-container');
		line1.classList.add('line');
		genreHeadline.classList.add('genre-headline');
		line2.classList.add('line');

		// CREATING CONTENT CONTAINER ELEMENT FOR THE GENRES
		const contentContainer = document.createElement('section');
		contentContainer.classList.add('content-container');
		movieSection.append(contentContainer);

		// STORE THE CONTENT CONTAINER IN THE MAPPING
		genreContentContainers[genre] = contentContainer;
	});

	// FETCHING MOVIE LIST
	const fetchMovies = async () => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/discover/movie?api_key=${key}`
			);

			const result = await response.json();
			allMovies = result.results;
			console.log(allMovies);
			renderMovies(result.results);
		} catch (error) {
			console.error(error);
		}
	};
	fetchMovies();

	function renderMovies(movies) {
		movies.forEach((movie) => {
			//MAKING SURE THAT THE MOVIES GET SORTED IN EVERY GENRE THEY HAVE IN THE genre_ids ARRAY
			movie.genre_ids.forEach((genreId) => {
				const genreName = genreMappings[genreId];
				const genreContentContainer = genreContentContainers[genreName];

				if (genreContentContainer) {
					// CREATING CONTENT CONTAINER ELEMENTS
					const movieContainer = document.createElement('button');
					const posterSection = document.createElement('div');
					const titleSection = document.createElement('div');
					const moviePoster = document.createElement('img');
					const movieTitle = document.createElement('p');

					// SETTING CONTENT
					moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
					moviePoster.alt = movie.title + ' Poster';
					movieTitle.textContent = movie.title;

					// SHORTENS TITLE IF IT'S TOO LONG
					const maxLength = 30;
					const shortenedTitle =
						movie.title.length > maxLength
							? movie.title.substring(0, maxLength) + '...'
							: movie.title;
					movieTitle.textContent = shortenedTitle;

					// APPEND ELEMENTS
					movieContainer.append(posterSection, titleSection);
					posterSection.append(moviePoster);
					titleSection.append(movieTitle);

					// ADD CLASSES
					movieContainer.classList.add('movie-container');
					posterSection.classList.add('poster-section');
					titleSection.classList.add('title-section');
					moviePoster.classList.add('movie-poster');
					movieTitle.classList.add('movie-title');

					// APPEND MOVIE CONTAINER TO THE CORRECT GENRE CONTENT CONTAINER
					genreContentContainer.append(movieContainer);

					// ADD EVENT LISTENER TO MOVIE CONTAINER
					movieContainer.addEventListener(
						'click',
						(() => {
							const selectedMovie = movie;
							return () => {
								mainContainer.hidden = true;
								movieInfoContainer.hidden = false;
								movieInfoContainer.style.display = 'flex';
								renderMovieInfo([selectedMovie]);
							};
						})()
					);
				}
			});
		});
	}
});

export {genreMappings, allMovies};
