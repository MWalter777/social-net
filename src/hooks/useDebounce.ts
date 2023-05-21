import { useRef } from 'react';

type ReturnValue = {
	debounce: (callback: () => void, wait?: number) => void;
};

const useDebounce = (waitValue = 800): ReturnValue => {
	const timeoutHandlerDebounce = useRef<NodeJS.Timeout>();

	const debounce = (callback: () => void, wait: number = waitValue): void => {
		timeoutHandlerDebounce.current &&
			clearTimeout(timeoutHandlerDebounce.current);
		timeoutHandlerDebounce.current = setTimeout(function () {
			timeoutHandlerDebounce.current = undefined;
			callback();
		}, wait);
	};
	return { debounce };
};

export default useDebounce;
