document.addEventListener('DOMContentLoaded', () => {
	const movieSection = document.querySelector('.movie-section');

	// SETTING GENRES
	let genreMappings = {};

	function storeGenreMappings(genreData) {
		genreData.genres.forEach((genre) => {
			genreMappings[genre.id] = genre.name;
		});
	}

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

	const genres = Object.values(genreMappings).sort();

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

		// CREATING CONTENT CONTAINER ELEMENTS
		const contentContainer = document.createElement('section');
		const movieContainer = document.createElement('div');
		const moviePoster = document.createElement('img');
		const movieTitle = document.createElement('p');

		// APPEND ELEMENTS
		movieSection.append(contentContainer);
		contentContainer.append(movieContainer);
		movieContainer.append(moviePoster, movieTitle);

		// ADD CLASSES
		contentContainer.classList.add('content-container');
		movieContainer.classList.add('movie-container');
		moviePoster.classList.add('movie-poster');
		movieTitle.classList.add('movie-title');
	});
});
