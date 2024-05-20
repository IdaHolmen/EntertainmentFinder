/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   allMovies: function() { return /* binding */ allMovies; },\n/* harmony export */   genreMappings: function() { return /* binding */ genreMappings; }\n/* harmony export */ });\n/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key.js */ \"./src/js/key.js\");\n/* harmony import */ var _filterGenres_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterGenres.js */ \"./src/js/filterGenres.js\");\n\n\n\n// SETTING GENRES AND ALL MOVIES SO THEY CAN BE EXPORTED\nlet genreMappings = {};\nlet allMovies = [];\ndocument.addEventListener('DOMContentLoaded', () => {\n  const movieSection = document.querySelector('.movie-section');\n\n  // MATCHING THE ID NUMBERS UP AGAINST THE GENRE NAMES\n  function storeGenreMappings(genreData) {\n    genreData.genres.forEach(genre => {\n      genreMappings[genre.id] = genre.name;\n    });\n  }\n\n  // LIST OF ID'S AND GENRES\n  // USED THIS LINK TO FETCH THE GENRE LIST AND DECIDED TO HARDCODE IT RIGHT INTO THE DOCUMENT FOR EASIER ACCESS:\n  // https://developer.themoviedb.org/reference/genre-movie-list\n  storeGenreMappings({\n    genres: [{\n      id: 28,\n      name: 'Action'\n    }, {\n      id: 12,\n      name: 'Adventure'\n    }, {\n      id: 16,\n      name: 'Animation'\n    }, {\n      id: 35,\n      name: 'Comedy'\n    }, {\n      id: 80,\n      name: 'Crime'\n    }, {\n      id: 99,\n      name: 'Documentary'\n    }, {\n      id: 18,\n      name: 'Drama'\n    }, {\n      id: 10751,\n      name: 'Family'\n    }, {\n      id: 14,\n      name: 'Fantasy'\n    }, {\n      id: 36,\n      name: 'History'\n    }, {\n      id: 27,\n      name: 'Horror'\n    }, {\n      id: 10402,\n      name: 'Music'\n    }, {\n      id: 9648,\n      name: 'Mystery'\n    }, {\n      id: 10749,\n      name: 'Romance'\n    }, {\n      id: 878,\n      name: 'Science Fiction'\n    }, {\n      id: 10770,\n      name: 'TV Movie'\n    }, {\n      id: 53,\n      name: 'Thriller'\n    }, {\n      id: 10752,\n      name: 'War'\n    }, {\n      id: 37,\n      name: 'Western'\n    }]\n  });\n\n  // MAKING A VARIABLE NAMED GENRES AND SORTING IT ALPHABETICALLY\n  const genres = Object.values(genreMappings).sort();\n\n  // CREATING A MAPPING FROM GENRE TO CONTENT CONTAINER\n  const genreContentContainers = {};\n  genres.forEach(genre => {\n    // CREATING GENRE HEADLINE ELEMENTS\n    const genreHeadlineContainer = document.createElement('div');\n    const line1 = document.createElement('span');\n    const genreHeadline = document.createElement('span');\n    const line2 = document.createElement('span');\n\n    // SET CONTENT\n    genreHeadline.textContent = genre;\n\n    // APPEND ELEMENTS\n    movieSection.append(genreHeadlineContainer);\n    genreHeadlineContainer.append(line1, genreHeadline, line2);\n\n    // ADD CLASSES\n    genreHeadlineContainer.classList.add('genre-headline-container');\n    line1.classList.add('line');\n    genreHeadline.classList.add('genre-headline');\n    line2.classList.add('line');\n\n    // CREATING CONTENT CONTAINER ELEMENT FOR THE GENRES\n    const contentContainer = document.createElement('section');\n    contentContainer.classList.add('content-container');\n    movieSection.append(contentContainer);\n\n    // STORE THE CONTENT CONTAINER IN THE MAPPING\n    genreContentContainers[genre] = contentContainer;\n  });\n\n  // FETCHING MOVIE LIST\n  const fetchMovies = async () => {\n    try {\n      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${_key_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}`);\n      const result = await response.json();\n      allMovies = result.results;\n      console.log(allMovies);\n      renderMovies(result.results);\n    } catch (error) {\n      console.error(error);\n    }\n  };\n  fetchMovies();\n  function renderMovies(movies) {\n    movies.forEach(movie => {\n      //MAKING SURE THAT THE MOVIES GET SORTED IN EVERY GENRE THEY HAVE IN THE genre_ids ARRAY\n      movie.genre_ids.forEach(genreId => {\n        const genreName = genreMappings[genreId];\n        const genreContentContainer = genreContentContainers[genreName];\n        if (genreContentContainer) {\n          // CREATING CONTENT CONTAINER ELEMENTS\n          const movieContainer = document.createElement('div');\n          const posterSection = document.createElement('div');\n          const titleSection = document.createElement('div');\n          const moviePoster = document.createElement('img');\n          const movieTitle = document.createElement('p');\n\n          // SETTING CONTENT\n          moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;\n          moviePoster.alt = movie.title + ' Poster';\n          movieTitle.textContent = movie.title;\n\n          // APPEND ELEMENTS\n          movieContainer.append(posterSection, titleSection);\n          posterSection.append(moviePoster);\n          titleSection.append(movieTitle);\n\n          // ADD CLASSES\n          movieContainer.classList.add('movie-container');\n          posterSection.classList.add('poster-section');\n          titleSection.classList.add('title-section');\n          moviePoster.classList.add('movie-poster');\n          movieTitle.classList.add('movie-title');\n\n          // APPEND MOVIE CONTAINER TO THE CORRECT GENRE CONTENT CONTAINER\n          genreContentContainer.append(movieContainer);\n        }\n      });\n    });\n  }\n});\n\n\n//# sourceURL=webpack://final-project/./src/js/app.js?");

/***/ }),

/***/ "./src/js/filterGenres.js":
/*!********************************!*\
  !*** ./src/js/filterGenres.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./src/js/app.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const movieSection = document.querySelector('.movie-section');\n  const dropdownButton = document.querySelector('.drop-down-button');\n  const filterSection = document.querySelector('.filter-section');\n  const filterButtonContainer = document.querySelector('.filter-button-container');\n  const clearButtonContainer = document.querySelector('.clear-button-container');\n  const vectorImage = document.querySelector('.vector-image');\n\n  // FUNCTION TO CREATE GENRE BUTTONS\n  function createGenreButtons(genres) {\n    genres.forEach(genre => {\n      // CREATING BUTTONS FOR THE INDIVIDUAL GENRES\n      const genreButton = document.createElement('button');\n      genreButton.textContent = genre;\n      genreButton.classList.add('genre-button');\n      genreButton.dataset.genre = genre;\n      filterButtonContainer.append(genreButton);\n      genreButton.addEventListener('click', e => {\n        e.preventDefault();\n        // CLEAR ACTIVE CLASS FROM ALL GENRE BUTTONS\n        document.querySelectorAll('.genre-button').forEach(button => {\n          button.classList.remove('genre-button--active');\n        });\n\n        // ADD ACTIVE CLASS TO THE BUTTON THAT IS CLICKED\n        genreButton.classList.add('genre-button--active');\n\n        // CLEAR EXISTING MOVIES\n        while (movieSection.firstChild) {\n          movieSection.removeChild(movieSection.firstChild);\n        }\n        const genreName = e.target.dataset.genre;\n        const filteredMovies = _app_js__WEBPACK_IMPORTED_MODULE_0__.allMovies.filter(movie => movie.genre_ids.includes(parseInt(Object.keys(_app_js__WEBPACK_IMPORTED_MODULE_0__.genreMappings).find(key => _app_js__WEBPACK_IMPORTED_MODULE_0__.genreMappings[key] === genreName))));\n        if (filteredMovies.length === 0) {\n          const noMoviesMessage = document.createElement('p');\n          noMoviesMessage.textContent = 'No movies found in this genre';\n          noMoviesMessage.classList.add('no-movies-message');\n          movieSection.appendChild(noMoviesMessage);\n        } else {\n          filteredMovies.forEach(movie => {\n            // CREATING CONTENT CONTAINER ELEMENTS\n            const movieContainer = document.createElement('div');\n            const posterSection = document.createElement('div');\n            const titleSection = document.createElement('div');\n            const moviePoster = document.createElement('img');\n            const movieTitle = document.createElement('p');\n\n            // SETTING CONTENT\n            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;\n            moviePoster.alt = movie.title + ' Poster';\n            movieTitle.textContent = movie.title;\n\n            // APPEND ELEMENTS\n            movieSection.append(movieContainer);\n            movieContainer.append(posterSection, titleSection);\n            posterSection.append(moviePoster);\n            titleSection.append(movieTitle);\n\n            // ADD CLASSES\n            movieSection.classList.add('movie-section--filtered');\n            movieContainer.classList.add('movie-container--filtered');\n            posterSection.classList.add('poster-section');\n            titleSection.classList.add('title-section');\n            moviePoster.classList.add('movie-poster');\n            movieTitle.classList.add('movie-title');\n          });\n        }\n      });\n    });\n  }\n  dropdownButton.addEventListener('click', e => {\n    e.preventDefault();\n    if (vectorImage.classList.contains('vector-image--active')) {\n      vectorImage.classList.remove('vector-image--active');\n      filterSection.classList.remove('filter-section--active');\n      clearGenreButtons();\n    } else {\n      vectorImage.classList.add('vector-image--active');\n      filterSection.classList.add('filter-section--active');\n      createGenreButtons(Object.values(_app_js__WEBPACK_IMPORTED_MODULE_0__.genreMappings).sort());\n    }\n  });\n\n  // CREATE A BUTTON THAT CLEARS ALL FILTERS\n  const clearFiltersButton = document.createElement('button');\n  clearFiltersButton.textContent = 'Clear all filters';\n  clearFiltersButton.classList.add('clear-filters-button');\n  clearButtonContainer.append(clearFiltersButton);\n\n  // FUNCTION TO CLEAR GENRE BUTTONS\n  function clearGenreButtons() {\n    while (filterButtonContainer.firstChild) {\n      filterButtonContainer.removeChild(filterButtonContainer.firstChild);\n    }\n  }\n\n  // EASIEST WAY TO CLEAR IS TO RELOAD THE PAGE\n  clearFiltersButton.addEventListener('click', e => {\n    e.preventDefault();\n    window.location.reload();\n  });\n});\n\n//# sourceURL=webpack://final-project/./src/js/filterGenres.js?");

/***/ }),

/***/ "./src/js/key.js":
/*!***********************!*\
  !*** ./src/js/key.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst API_KEY = 'b8565e12d0464571fb0345ff0ceaa764';\n/* harmony default export */ __webpack_exports__[\"default\"] = (API_KEY);\n\n//# sourceURL=webpack://final-project/./src/js/key.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ })()
;