import { useEffect, useState } from 'react';
import MovieDetail from './components/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import LogIn from './components/LogIn';
import Join from './components/Join';
import { supabase } from './supabaseClient';
import Search from './components/Search';
import { useNavigate } from 'react-router-dom';

function App() {
	const [movies, setMovies] = useState([]);
	const TOKEN = import.meta.env.VITE_API_TOKEN;
	const BASE_URL = 'https://api.themoviedb.org/3';

	const [user, setUser] = useState(null); // 현재 로그인된 사용자 상태
	const navigate = useNavigate();

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

	useEffect(() => {
		// 현재 로그인된 사용자를 가져옴
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setUser(user); // 사용자가 있으면 상태에 저장
			} else {
				navigate('/login'); // 로그인되지 않았다면 로그인 페이지로 리디렉션
			}
		};

		fetchUser();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut(); // Supabase에서 로그아웃
		navigate('/'); // 로그아웃 후 로그인 페이지로 리디렉션
	};

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<MovieList
							movies={movies}
							inputText={inputText}
							setInputText={setInputText}
						/>
					}
				/>
				<Route path='/details/:id' element={<MovieDetail movies={movies} user={user} handleLogout={handleLogout}  />} />
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
