import movieListData from './data/movieListData.json';
import './App.scss';
import { useState } from 'react';
import MovieDetail from './components/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';

function App() {
	const [movies, setMovies] = useState(movieListData.results);
	// movieListData는 배열이 아님.
	//map을 사용하기 위해서는 배열형태를 띈 results까지 찍어서 들어가야 함.

	return (
		<>
			<Routes>
				<Route path='/' element={<MovieList movies={movies} />} />
				<Route path='/details' element={<MovieDetail />} />
			</Routes>
		</>
	);
}
export default App;
