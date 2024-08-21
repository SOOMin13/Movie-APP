import { Link } from 'react-router-dom';
import MovieCard from './movieCard';

export default function MovieList({ movies }) {
	return (
		<div className='flex justify-center items-center flex-wrap py-8'>
			{movies.map((movie) => (
				<Link key={movie.id} to={`/details`}>
					<MovieCard
						posterPath={movie.poster_path}
						title={movie.title}
						voteAverage={movie.vote_average}
					/>
				</Link>
			))}
		</div>
	);
}
