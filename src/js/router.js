import Home from 'pages/Home';
import Grid from 'pages/Grid';
import Chart from 'pages/Chart';
import ChartGrid from 'pages/ChartGrid';

const routes = [
	{ id: 1, path: '/', title: '메인', component: Home },
	{ id: 2, path: '/chart', title: '차트', component: Chart },
	{ id: 3, path: '/grid', title: '그리드', component: Grid },
	{ id: 4, path: '/chartgrid', title: '차트그리드', component: ChartGrid },
];

export { routes };
