import './App.scss';
import { useEffect, useState } from 'react';
import MovieDetail from './components/MovieDetail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import LogIn from './components/LogIn';
import Join from './components/Join';
import Search from './components/Search';

function App() {
	const [movies, setMovies] = useState([]);
	const TOKEN = import.meta.env.VITE_API_TOKEN;
	const BASE_URL = 'https://api.themoviedb.org/3';

	const [inputText, setInputText] = useState('');
	// 사용자가 입력한 input 값. 최초값은 빈 문자열이다.

	// movieListData는 배열이 아님.
	//map을 사용하기 위해서는 배열형태를 띈 results까지 찍어서 들어가야 함.

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		fetch(`${BASE_URL}/movie/popular?language=ko&page=1`, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`
				HTTP error! status: ${response.status}
				`);
				}
				return response.json(); //일단 response를 return해줘야 그 다음 .then에서 이 값을 받아옴
			})
			.then((response) => setMovies(response.results))
			.catch((err) => console.error('ERROR', err));
	}, []);

	return (
		<>
			<Routes>
				<Route path='/' element={<MovieList movies={movies} inputText={inputText} setInputText={setInputText} />} />
				<Route path='/details/:id' element={<MovieDetail movies={movies} />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/join' element={<Join />} />
				<Route
					path='/search'
					element={<Search inputText={inputText} setInputText={setInputText} />}
				/>
			</Routes>
		</>
	);
}
export default App;
