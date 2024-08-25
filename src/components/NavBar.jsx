import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div className='flex bg-[#b9d9fc] h-[60px]'>
			<h1>Suve ⋰˚✩ </h1>
			<div className=''>
				<Link to={'/login'}>
					<button className=' border-[1px] rounded-lg p-1'>Log in</button>
				</Link>
				<Link to={'/Join'}>
					<button className='border-[1px] rounded-lg p-1'>Join us</button>
				</Link>
			</div>
		</div>
	);
}
