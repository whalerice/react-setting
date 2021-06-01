import { Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { routes } from 'js/router';

import 'chartiq/css/stx-chart.css';
import 'chartiq/css/chartiq.css';
import 'styles/style.scss';

const App = () => {
	const location = useLocation();
	const menuList = routes;
	const documentTitle = routes.reduce((pre, val) => {
		let item = pre;
		if (val.path === location.pathname) {
			item = val.title;
		}
		return item;
	}, []);
	const SEO = () => {
		return (
			<Helmet
				title={documentTitle}
				// meta={[
				// 	{ name: 'description', content: 'Description of page' },
				// 	{ property: 'og:type', content: 'article' },
				// 	{ property: 'og:title', content: 'Example title' },
				// 	{ property: 'og:image', content: 'http://example.com/article.jpg' },
				// 	{ property: 'og:url', content: 'http://example.com/example' },
				// ]}
			/>
		);
	};

	return (
		<>
			<SEO />
			{/* <Helmet><meta name="google" content="notranslate"> // 문서전체 구글번역 제외</Helmet> */}
			<div className='header'>
				<div className='nav'>
					<ul className='nav-list'>
						<li className='nav-item'>
							<Link to={routes[0].path}>{routes[0].title}</Link>
						</li>
						<li className='nav-item'>
							<Link to={routes[1].path}>{routes[1].title}</Link>
						</li>
						<li className='nav-item'>
							<Link to={routes[2].path}>{routes[2].title}</Link>
						</li>
						<li className='nav-item'>
							<Link to={routes[3].path}>{routes[3].title}</Link>
						</li>
					</ul>
				</div>
				{/* {menuList.map((data) => {
					return (
						<Link to={data.path} key={data.id}>{data.title}</Link>
					);
				})} */}
			</div>
			<div className='container'>
				{menuList.map((data) => {
					return <Route key={data.id} exact={data.path === '/'} path={data.path} component={data.component} />;
				})}
				{/* <Route exact render={() => <div className='error'>에러 페이지</div>} /> */}
			</div>
		</>
	);
};

export default App;
