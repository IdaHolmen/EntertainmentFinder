import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 3000;

const {API_KEY} = process.env;

app.use(cors());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get('/', async (req, res) => {
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
