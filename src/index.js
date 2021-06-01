import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

import App from './_app';
import reportWebVitals from './reportWebVitals';

render(
	<React.StrictMode>
		<Provider store={configureStore}>
			<BrowserRouter>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // 웹 페이지의 사용자 경험을 포착하는 것을 목표로하는 유용한 메트릭 세트
// https://create-react-app.dev/docs/measuring-performance/
