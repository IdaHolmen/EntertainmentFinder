import {genreMappings} from './app.js';

document.addEventListener('DOMContentLoaded', () => {
	const dropdownButton = document.querySelector('.drop-down-button');
	const filterButtonContainer = document.querySelector(
		'.filter-button-container'
	);
	const vectorImage = document.querySelector('.vector-image');

	// FUNCTION TO CREATE GENRE BUTTONS
	function createGenreButtons(genres) {
		genres.forEach((genre) => {
			const genreButton = document.createElement('button');
			genreButton.textContent = genre;
			genreButton.classList.add('genre-button');
			genreButton.dataset.genre = genre;
			filterButtonContainer.appendChild(genreButton);
		});
	}

	// FUNCTION TO CLEAR GENRE BUTTONS
	function clearGenreButtons() {
		while (filterButtonContainer.firstChild) {
			filterButtonContainer.removeChild(filterButtonContainer.firstChild);
		}
	}

	dropdownButton.addEventListener('click', (e) => {
		e.preventDefault();

		if (vectorImage.classList.contains('vector-image--active')) {
			vectorImage.classList.remove('vector-image--active');
			filterButtonContainer.classList.remove('filter-button-container--active');
			clearGenreButtons();
		} else {
			vectorImage.classList.add('vector-image--active');
			filterButtonContainer.classList.add('filter-button-container--active');
			createGenreButtons(Object.values(genreMappings).sort());
		}
	});
});
