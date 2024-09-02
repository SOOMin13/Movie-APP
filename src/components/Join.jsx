import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // 경로 조정 필요

function Join() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleJoin = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Passwords do not match!');
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		} else {
			setSuccess('Sign up successful! Check your email for confirmation.');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		}
	};

	return (
		<>
			<form
				className='bg-[#b9d9fc] w-screen h-screen 
			flex flex-col justify-around '
				onSubmit={handleJoin}
			>
				<h1 className=' flex justify-center items-center'>JOIN US!</h1>
				<div className='flex flex-col justify-center items-center '>
					<div className='flex justify-center'>
						<label className='px-[5rem]'>Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='flex justify-center'>
						<label className='px-[4.05rem]'>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className='flex justify-center'>
						<label className='px-[2.1rem]'>Confirm Password</label>
						<input
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{success && <p style={{ color: 'green' }}>{success}</p>}
				<button type='submit'>Create Account</button>
			</form>
		</>
	);
}

export default Join;
