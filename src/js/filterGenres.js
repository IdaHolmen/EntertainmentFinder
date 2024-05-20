import {genreMappings, allMovies} from './app.js';

document.addEventListener('DOMContentLoaded', () => {
	const movieSection = document.querySelector('.movie-section');
	const dropdownButton = document.querySelector('.drop-down-button');
	const filterSection = document.querySelector('.filter-section');
	const filterButtonContainer = document.querySelector(
		'.filter-button-container'
	);
	const clearButtonContainer = document.querySelector(
		'.clear-button-container'
	);
	const vectorImage = document.querySelector('.vector-image');

	// FUNCTION TO CREATE GENRE BUTTONS
	function createGenreButtons(genres) {
		genres.forEach((genre) => {
			// CREATING BUTTONS FOR THE INDIVIDUAL GENRES
			const genreButton = document.createElement('button');
			genreButton.textContent = genre;
			genreButton.classList.add('genre-button');
			genreButton.dataset.genre = genre;
			filterButtonContainer.append(genreButton);

			genreButton.addEventListener('click', (e) => {
				e.preventDefault();
				// CLEAR ACTIVE CLASS FROM ALL GENRE BUTTONS
				document.querySelectorAll('.genre-button').forEach((button) => {
					button.classList.remove('genre-button--active');
				});

				// ADD ACTIVE CLASS TO THE BUTTON THAT IS CLICKED
				genreButton.classList.add('genre-button--active');

				// CLEAR EXISTING MOVIES
				while (movieSection.firstChild) {
					movieSection.removeChild(movieSection.firstChild);
				}

				const genreName = e.target.dataset.genre;
				const filteredMovies = allMovies.filter((movie) =>
					movie.genre_ids.includes(
						parseInt(
							Object.keys(genreMappings).find(
								(key) => genreMappings[key] === genreName
							)
						)
					)
				);

				if (filteredMovies.length === 0) {
					const noMoviesMessage = document.createElement('p');
					noMoviesMessage.textContent = 'No movies found in this genre';
					noMoviesMessage.classList.add('no-movies-message');
					movieSection.appendChild(noMoviesMessage);
				} else {
					filteredMovies.forEach((movie) => {
						// CREATING CONTENT CONTAINER ELEMENTS
						const movieContainer = document.createElement('div');
						const posterSection = document.createElement('div');
						const titleSection = document.createElement('div');
						const moviePoster = document.createElement('img');
						const movieTitle = document.createElement('p');

						// SETTING CONTENT
						moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
						moviePoster.alt = movie.title + ' Poster';
						movieTitle.textContent = movie.title;

						// APPEND ELEMENTS
						movieSection.append(movieContainer);
						movieContainer.append(posterSection, titleSection);
						posterSection.append(moviePoster);
						titleSection.append(movieTitle);

						// ADD CLASSES
						movieSection.classList.add('movie-section--filtered');
						movieContainer.classList.add('movie-container--filtered');
						posterSection.classList.add('poster-section');
						titleSection.classList.add('title-section');
						moviePoster.classList.add('movie-poster');
						movieTitle.classList.add('movie-title');
					});
				}
			});
		});
	}

	dropdownButton.addEventListener('click', (e) => {
		e.preventDefault();

		if (vectorImage.classList.contains('vector-image--active')) {
			vectorImage.classList.remove('vector-image--active');
			filterSection.classList.remove('filter-section--active');
			clearGenreButtons();
		} else {
			vectorImage.classList.add('vector-image--active');
			filterSection.classList.add('filter-section--active');
			createGenreButtons(Object.values(genreMappings).sort());
		}
	});

	// CREATE A BUTTON THAT CLEARS ALL FILTERS
	const clearFiltersButton = document.createElement('button');
	clearFiltersButton.textContent = 'Clear all filters';
	clearFiltersButton.classList.add('clear-filters-button');
	clearButtonContainer.append(clearFiltersButton);

	// FUNCTION TO CLEAR GENRE BUTTONS
	function clearGenreButtons() {
		while (filterButtonContainer.firstChild) {
			filterButtonContainer.removeChild(filterButtonContainer.firstChild);
		}
	}

	// EASIEST WAY TO CLEAR IS TO RELOAD THE PAGE
	clearFiltersButton.addEventListener('click', (e) => {
		e.preventDefault();
		window.location.reload();
	});
});
