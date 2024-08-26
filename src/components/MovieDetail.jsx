import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

export default function MovieDetail({ movies }) {
	const TOKEN = import.meta.env.VITE_API_TOKEN;
	const BASE_URL = 'https://api.themoviedb.org/3';
	const { id } = useParams();
	const [detail, setDetail] = useState(null);
	const clickedMovie = movies.find((movie) => movie.id === Number(id));

	// filter: 배열에서 조건을 만족하는 요소만을 선택하여 새로운 배열 리턴.
	// 조건에 맞는 배열의 요소 자체를 그대로 반환한다.

	//find: 메서드는 조건을 만족하는 첫 번째 요소를 반환. (개별 객체를 반환)

	// map:배열의 각 요소를 가공하여 새로운 형태로 변환하여 반환.

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		fetch(`${BASE_URL}/movie/${id}?language=ko`, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`
			HTTP error! status: ${response.status}
			`);
				}
				return response.json(); //일단 response를 return해줘야 그 다음 .then에서 이 값을 받아옴
			})
			.then((data) => {
				// 여기서 인자로 data로 안받고 response로 받더라도
				//어차피 앞서서 존재하는 .then이 반환하는 promise를 인자로 가져온다.
				//data로 굳이 바꿔서 써주는 이유는 그냥 보는 사람 헷갈리지 말라고 그런 것.
				setDetail(data);
			})
			.catch((err) => console.error('ERROR', err));
	}, [id]);

	if (!clickedMovie) {
		return <div>Loading...</div>;
	}

	const posterUrl = `https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}`;

	return (
		<>
			<NavBar />
			<div className='flex flex-row justify-center items-center'>
				<img
					className='w-[440px] h-[500px] m-7'
					src={posterUrl}
					alt={clickedMovie.title}
				/>
				<div>
					<h2 className='text-[40px]  '>{clickedMovie.title}</h2>
					<p className='text-[20px]'>{clickedMovie.vote_average}</p>
					<ul className='flex gap-3'>
						{detail?.genres.map((genreId) => {
							return (
								<li
									key={genreId.id}
									className='bg-orange-200 p-1 rounded-[5px]'
								>
									{genreId.name}
								</li>
							);
						})}
						{/* 옵셔널 체이닝: ? 가 붙은 값이 
		 null, undefined일 때는 바로 undefined를 반환하고, 
		 그 결과로 뒤따르는 속성에 접근하려는 시도가 멈추는 것. */}
					</ul>
					<p>{clickedMovie.overview}</p>
				</div>
			</div>
		</>
	);
}
