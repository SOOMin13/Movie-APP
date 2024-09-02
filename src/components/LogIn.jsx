import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위해 useNavigate

const Login = () => {
	const [email, setEmail] = useState(''); // 이메일 입력 상태
	const [password, setPassword] = useState(''); // 비밀번호 입력 상태
	const [error, setError] = useState(null); // 에러 메시지 상태
	const navigate = useNavigate(); 

	const handleLogin = async (e) => {
		e.preventDefault();

		// Supabase를 사용해 로그인 시도
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message); // 로그인 실패 시 에러 메시지
		} else if (!error && window.location.pathname === '/login') {
			navigate('/'); // 로그인 성공 시 메인 페이지로 리디렉션 //이게 문제인듯,,, 초기화면이 로그인화면이야
		}
	};

	return (
		<div className='bg-[#b9d9fc]'>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}{' '}
			{/* 에러 메시지 출력 */}
		</div>
	);
};

export default Login;
