import { useEffect, useState } from 'react';
import useDebounce from '../hook/useDebounce';
import NavBar from './NavBar';

const TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function Search({ inputText, setInputText }) {
	// const [inputText, setInputText] = useState('');
	// 사용자가 입력한 input 값. 최초값은 빈 문자열이다.
	const [searchValue, setSearchValue] = useState([]);
	//inputText의 결과로 api에서 받아온 데이터 목록을 저장하는 상태

	const debouncedInputText = useDebounce(inputText, 3000);
	//debounced되어 최종적으로 전달되는 검색어 값

	useEffect(() => {
		//최초 마운트 시에 if 문 1번 실행
		if (debouncedInputText) {
			fetchMovies();
			//debouncedInputText 값이 있을 떄 데이터를 fetch 해온다.
		} else {
			setSearchValue([]); //최종적으로 전달되는 입력값이 없을 떄 검색결과를 비운다.
		}
	}, [debouncedInputText]); //debouncedInputText 변할 시 데이터 fetch 실행

	console.log('debouncedInputText', debouncedInputText);
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	async function fetchMovies() {
		try {
			const response = await fetch(
				`${BASE_URL}/search/movie?query=${debouncedInputText}&include_adult=false&language=ko&page=1`,
				options
			);
			const searchData = await response.json();

			if (searchData.results) {
				setSearchValue(searchData.results);
			} // searchData.results 값이 참이면 검색 결과 데이터를 보여주는 상태에 fetch된 data를 저장.
		} catch (error) {
			console.error('search page Error :', error);
		}
	}

	return (
		<>
			<NavBar inputText={inputText} setInputText={setInputText} />
			<div>
				{searchValue.map((movie) => (
					<SearchMovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</>
	);
}

function SearchMovieCard({ movie, debouncedInputText }) {
	const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	return (
		<>
			<div>
				<img
					src={posterUrl}
					alt={`Movie poster of your search results : ${debouncedInputText}`}
				/>
				<div>{movie.title}</div>
			</div>
		</>
	);
}
