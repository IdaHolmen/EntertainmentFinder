This app is a library of movies that aims to help the user explore them by browsing through different genres.
You browse through them by scrolling to the right in each category or swiping right on mobile.

If you press a movie, a separate module will display the more detailed movie info. It fetches the backdrop images, which are used in a simple slideshow, the rating, and overview text of each film from the API.

You need to be signed in to add a comment to the movie. The authentication is handled with Firebase Authentication.
If you try to comment without being signed in you will get a message telling you to sign in first.
When creating an account the users information is collected and added to the Firebase database, and so are comments.
Both the Sign in form and Sign up form are being validated in a separate module.

API-keys and sensitive information are being hidden in the backend.

The transpiling is managed with Babel and I've used Webpack as the bundler.
Two commands are needed to start up the project:
npm start server & npm run build

Logo is created by me and icons are from the Iconify plugin on Figma.

Link to deployed Netlify site:
https://sweet-starship-9c5d8b.netlify.app/

Link to GitHub repository:
https://github.com/IdaHolmen/EntertainmentFinder

Used for design inspiration:
https://www.kinolibrary.com/
https://www.imdb.com/
https://www.digitaliafilmlibrary.com/films
https://www.netflix.com/

I used this link to add a favicon in the browser tab to make it look more professional:
https://www.w3schools.com/html/html_favicon.asp

To figure out how to use keypress:
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

To style scrollbar so it doesn't look so out of place:
https://blog.logrocket.com/guide-styling-css-scrollbars/

Wanted the vote average to be in percentage, so I used this article to learn Math.round():
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

<img width="1458" alt="Screenshot 2024-05-29 at 15 20 06" src="https://github.com/IdaHolmen/EntertainmentFinder/assets/143997448/ebf9597b-bdd0-4625-8fdb-c6501b19b6ad">
The main page where you can browse through movies.

<img width="1456" alt="Screenshot 2024-05-29 at 15 21 18" src="https://github.com/IdaHolmen/EntertainmentFinder/assets/143997448/38ba22f7-a54d-4d3f-9fbd-84cf53d7b79b">
The movies can be filtered by genre.

<img width="1455" alt="Screenshot 2024-05-29 at 15 22 09" src="https://github.com/IdaHolmen/EntertainmentFinder/assets/143997448/8c89acca-d8c0-4f1c-a28d-17628f318e8d">
If you press a movie you can see more information and leave a comment

