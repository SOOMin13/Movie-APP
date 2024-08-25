export default function Join() {
	return (
		<>
			<h1>Suve</h1>
			<form
				className='flex flex-col justify-center items-center w-screen h-screen
         bg-[#d2e8ff]'
				action='#'
			>
				<div
					className=' flex flex-col justify-around items-center 
        w-[50rem] h-[30rem] bg-[#add1f7]'
				>
					<input type='text' name='name' placeholder='Name' />
					<input type='text' name='email' placeholder='Email' />
					<input type='text' name='password' placeholder='Password' />
					<input
						type='text'
						name='reenter-passward'
						placeholder='Re-enter Your Password'
					/>
					<button>Create account</button>
				</div>
			</form>
		</>
	);
}
