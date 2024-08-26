import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import NavBar from './NavBar';

export default function MovieList({ movies, inputText, setInputText }) {
	return (
		<>
			<NavBar inputText={inputText} setInputText={setInputText} />
			<div className='flex justify-center items-center flex-wrap py-8'>
				{movies.map((movies) => (
					<Link key={movies.id} to={`/details/${movies.id}`}>
						<MovieCard movies={movies} />
					</Link>
				))}
			</div>
		</>
	);
}
