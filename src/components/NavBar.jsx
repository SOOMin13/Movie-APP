import { Link } from 'react-router-dom';
import Search from './Search';

export default function NavBar({ inputText, setInputText }) {
	return (
		<div className='flex justify-around items-center bg-[#b9d9fc] h-[60px]'>
			<h1>Suve ⋰˚✩ </h1>
			<div className='flex justify-around'>
				<Link to={'/login'}>
					<button className=' border-[1px] rounded-lg p-1'>Log in</button>
				</Link>
				<Link to={'/Join'}>
					<button className='border-[1px] rounded-lg p-1'>Join us</button>
				</Link>
				<Link to={'/Search'}>
					<input
						type='text'
						value={inputText}
						onChange={(event) => {
							setInputText(event.target.value);
						}}
					/>
				</Link>
				<button>🔍</button>
			</div>
		</div>
	);
}
