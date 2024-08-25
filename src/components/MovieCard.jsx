export default function MovieCard({ movies }) {
	const posterUrl = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;

	return (
		<div
			className='flex flex-col justify-center items-center 
			m-3 p-2 border-[1px] border-gray-300 rounded-[10px] 
		w-[220px] h-[330px]'
		>
			<img src={posterUrl} alt={movies.title} className='w-[190px] h-[250px]' />
			<h2 className=' flex flex-wrap'>{movies.title}</h2>
			<p className='text-[12px]'> 평점: {movies.vote_average}</p>
		</div>
	);
}
