/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', () => {\n  const movieSection = document.querySelector('.movie-section');\n\n  // SETTING GENRES\n  let genreMappings = {};\n  function storeGenreMappings(genreData) {\n    genreData.genres.forEach(genre => {\n      genreMappings[genre.id] = genre.name;\n    });\n  }\n  storeGenreMappings({\n    genres: [{\n      id: 28,\n      name: 'Action'\n    }, {\n      id: 12,\n      name: 'Adventure'\n    }, {\n      id: 16,\n      name: 'Animation'\n    }, {\n      id: 35,\n      name: 'Comedy'\n    }, {\n      id: 80,\n      name: 'Crime'\n    }, {\n      id: 99,\n      name: 'Documentary'\n    }, {\n      id: 18,\n      name: 'Drama'\n    }, {\n      id: 10751,\n      name: 'Family'\n    }, {\n      id: 14,\n      name: 'Fantasy'\n    }, {\n      id: 36,\n      name: 'History'\n    }, {\n      id: 27,\n      name: 'Horror'\n    }, {\n      id: 10402,\n      name: 'Music'\n    }, {\n      id: 9648,\n      name: 'Mystery'\n    }, {\n      id: 10749,\n      name: 'Romance'\n    }, {\n      id: 878,\n      name: 'Science Fiction'\n    }, {\n      id: 10770,\n      name: 'TV Movie'\n    }, {\n      id: 53,\n      name: 'Thriller'\n    }, {\n      id: 10752,\n      name: 'War'\n    }, {\n      id: 37,\n      name: 'Western'\n    }]\n  });\n  const genres = Object.values(genreMappings).sort();\n  genres.forEach(genre => {\n    // CREATING GENRE HEADLINE ELEMENTS\n    const genreHeadlineContainer = document.createElement('div');\n    const line1 = document.createElement('span');\n    const genreHeadline = document.createElement('span');\n    const line2 = document.createElement('span');\n\n    // SET CONTENT\n    genreHeadline.textContent = genre;\n\n    // APPEND ELEMENTS\n    movieSection.append(genreHeadlineContainer);\n    genreHeadlineContainer.append(line1, genreHeadline, line2);\n\n    // ADD CLASSES\n    genreHeadlineContainer.classList.add('genre-headline-container');\n    line1.classList.add('line');\n    genreHeadline.classList.add('genre-headline');\n    line2.classList.add('line');\n\n    // CREATING CONTENT CONTAINER ELEMENTS\n    const contentContainer = document.createElement('section');\n    const movieContainer = document.createElement('div');\n    const moviePoster = document.createElement('img');\n    const movieTitle = document.createElement('p');\n\n    // APPEND ELEMENTS\n    movieSection.append(contentContainer);\n    contentContainer.append(movieContainer);\n    movieContainer.append(moviePoster, movieTitle);\n\n    // ADD CLASSES\n    contentContainer.classList.add('content-container');\n    movieContainer.classList.add('movie-container');\n    moviePoster.classList.add('movie-poster');\n    movieTitle.classList.add('movie-title');\n  });\n});\n\n//# sourceURL=webpack://final-project/./src/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/app.js"]();
/******/ 	
/******/ })()
;