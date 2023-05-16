import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/styles/spinners.css';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
