import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT2 = 3500;

const {API_KEY} = process.env;

app.use(cors());

app.listen(PORT2, () => {
	console.log(`Server is running on port ${PORT2}`);
});

app.get('/images/:movieId', async (req, res) => {
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
