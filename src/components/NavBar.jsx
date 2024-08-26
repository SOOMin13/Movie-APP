import { Link } from 'react-router-dom';
import Search from './Search';

export default function NavBar({ inputText, setInputText }) {
	return (
		<div className='flex justify-between items-center bg-[#b9d9fc] h-[60px]'>
			<Link to={'/'}>
				<h1 className='mx-6'> Suve ⋰˚✩ </h1>
			</Link>
			<div className='flex justify-between w-[650px]'>
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
					<button>🔍</button>
				</Link>
			</div>
		</div>
	);
}
