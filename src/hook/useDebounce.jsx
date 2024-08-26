import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
	//value: 디바운스 하고 싶은 값
	//delay: 딜레이 주려는 밀리초

	const [debouncedValue, setDebouncedValue] = useState(value);
	// 디바운스를 적용할 값을 상태로 관리함.

	useEffect(() => {
		const debounceHandler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		//setTimeout이 실행되면 ?
		// >>> setDebouncedValue를 통한 입력값의 상태변경이 delay 초 만큼의 뒤에 실행됨.

		return () => {
			clearTimeout(debounceHandler);
		};
	}, [value]);
	//value 값이 변경될 때 effect가 실행

	return debouncedValue;
	//useDebounce(value, delay) 호출 시,
	// useEffect를 통해 최종적으로 변경된 debouncedValue(상태값)을 반환함.
}

