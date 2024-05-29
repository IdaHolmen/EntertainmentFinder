This app is a library of movies that aims to help the user explore them by browsing through different genres.
You browse through them by scrolling to the right in each category or swiping right on mobile.

You need to be signed in to add a comment to the movie. The authentication is handled with Firebase Authentication.
If you try to comment without being signed in you will get a message telling you to sign in first.
When creating an account the users information is collected and added to the Firebase database, and so are comments.

The transpiling is managed with Babel and I've used Webpack as the bundler.

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
