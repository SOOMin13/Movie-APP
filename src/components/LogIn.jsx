export default function LogIn() {
	return (
		<>
			<form
				className='flex flex-col justify-center items-center 
				w-screen h-screen'
				action='#'
			>
				<div
					className='flex flex-col justify-around items-center 
				rounded-[1rem] w-[20rem] h-[25rem] bg-[#d2e8ff]'
				>
					<h1>LogIn</h1>
					<div className='flex flex-col justify-around it mt-[1.2rem]'>
						<div className='flex justify-between'>
							Name
							<input
								className=' border-2 rounded-t-md'
								type='text'
								name='id'
								placeholder='ID'
							/>
						</div>

						<div className='flex justify-between'>
							Password
							<input
								className='border-x-2 border-b-2 rounded-b-md'
								type='text'
								name='password'
								placeholder='PASSWORD'
							/>
						</div>
					</div>
					<button
						className=' border-[1px] rounded-[0.5rem] px-3 py-1 bg-[#afdbff] '
						type='button'
					>
						LOGIN
					</button>
				</div>
			</form>
		</>
	);
}
