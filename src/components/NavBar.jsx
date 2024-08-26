import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../hook/useDebounce';
import { useEffect } from 'react';

export default function NavBar({ inputText, setInputText }) {
	const navigate = useNavigate();
	const debouncedInput = useDebounce(inputText, 3000);

	useEffect(() => {
		if (debouncedInput) {
			navigate('/Search');
		}
	}, [debouncedInput]);

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
						autoFocus
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
