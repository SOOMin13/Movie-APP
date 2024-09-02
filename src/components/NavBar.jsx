import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDebounce from '../hook/useDebounce';
import { supabase } from '../supabaseClient'; // Supabase 클라이언트를 임포트합니다.

export default function NavBar({ inputText, setInputText }) {
	const navigate = useNavigate();
	const debouncedInput = useDebounce(inputText, 3000);

	const [user, setUser] = useState(null); // 로그인된 사용자 정보를 저장하는 상태

	// 검색어가 디바운스 된 후에 검색 페이지로 이동합니다.
	useEffect(() => {
		if (debouncedInput) {
			navigate('/Search');
		}
	}, [debouncedInput, navigate]);

	// 현재 로그인된 사용자를 가져와서 상태에 저장합니다.
	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				setUser(user); // 사용자가 있으면 상태에 저장
			} else {
				setUser(null); // 사용자가 없으면 상태를 null로 설정
			}
		};

		fetchUser();
	}, [navigate]);

	// 로그아웃 기능을 처리하는 함수입니다.
	const handleLogout = async () => {
		await supabase.auth.signOut(); // Supabase에서 로그아웃
		setUser(null); // 사용자 상태를 초기화
		navigate('/'); // 로그아웃 후 메인 페이지로 리디렉션
	};

	return (
		<div className='flex justify-between items-center bg-[#b9d9fc] h-[60px]'>
			<Link to={'/'}>
				<h1 className='mx-6'> Suve ⋰˚✩ </h1>
			</Link>
			<div className='flex justify-between w-[650px]'>
				{user ? (
					// 사용자가 로그인된 상태라면
					<>
						<span>Welcome, {user.email}</span> {/* 사용자 이메일 출력 */}
						<button
							onClick={handleLogout}
							className='border-[1px] rounded-lg p-1'
						>
							Log out
						</button>
					</>
				) : (
					// 사용자가 로그인되지 않은 상태라면
					<>
						<Link to={'/login'}>
							<button className='border-[1px] rounded-lg p-1'>Log in</button>
						</Link>
						<Link to={'/Join'}>
							<button className='border-[1px] rounded-lg p-1'>Join us</button>
						</Link>
					</>
				)}
				<div className='flex'>
					<input
						type='text'
						value={inputText}
						autoFocus
						onChange={(event) => setInputText(event.target.value)}
					/>
					<button>🔍</button>
				</div>
			</div>
		</div>
	);
}
