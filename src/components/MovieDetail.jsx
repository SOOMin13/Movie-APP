import { useState } from 'react';
import MovieDetailData from '../data/movieDetailData.json';

export default function MovieDetail() {
	const [detailData, setDetailData] = useState(MovieDetailData);
	const movieGenres = detailData.genres.map((genre) => genre.name);
	//filter: 배열에서 조건을 만족하는 요소만을 선택하여 새로운 배열 리턴.
	//조건에 맞는 배열의 요소 자체를 그대로 반환한다.

	//map:배열의 각 요소를 가공하여 새로운 형태로 변환하여 반환.

	const posterUrl = `https://image.tmdb.org/t/p/w500${detailData.poster_path}`;
	return (
		<div className='flex flex-row justify-center items-center'>
			<img
				className='w-[450px] h-[600px] m-7'
				src={posterUrl}
				alt={detailData.title}
			/>
			<div>
				<h2 className='text-[40px]  '>{detailData.title}</h2>
				<p className='text-[20px]'>{detailData.vote_average}</p>
				<ul className='flex gap-3'>
					{movieGenres.map((item) => {
						return <li className='bg-orange-200 p-1 rounded-[5px]'>{item}</li>;
					})}
				</ul>
				<p>{detailData.overview}</p>
			</div>
		</div>
	);
}
