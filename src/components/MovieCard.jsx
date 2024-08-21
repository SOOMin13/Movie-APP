import { Link } from 'react-router-dom';
import MovieDetail from './MovieDetail';

export default function MovieCard({ posterPath, title, voteAverage }) {
	const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
	return (
		<div className='m-3 p-2 border-[1px] border-gray-300 rounded-[10px]'>
			<img src={posterUrl} alt={title} className='w-[200px] h-[300px]' />
			<h2>{title}</h2>
			<p>평점: {voteAverage}</p>
		</div>
	);
}
