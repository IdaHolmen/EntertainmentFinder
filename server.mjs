import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 3000;

const {API_KEY} = process.env;

app.use(cors());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// ROUTE FOR MOVIE API
app.get("/movies", async (req, res) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
		);
		const movies = await response.json();
		res.json(movies.results);
	} catch (error) {
		console.log(error);
	}
});

// ROUTE FOR MOVIE IMAGES
app.get("/images/:movieId", async (req, res) => {
	const {movieId} = req.params;
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
		);
		const images = await response.json();
		res.json(images.backdrops || []);
	} catch (error) {
		console.log(error);
	}
});

// ROUTE FOR FIREBASE CONFIG
app.get("/firebase-config", (req, res) => {
	res.json(firebaseConfig);
});
