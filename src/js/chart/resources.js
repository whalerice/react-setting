import 'chartiq/js/thirdparty/custom-elements.min';
import { CIQ } from 'chartiq/js/standard';

import 'chartiq/js/addOns';
import 'chartiq/js/components';
import Scrollbar from 'chartiq/js/thirdparty/perfect-scrollbar.esm';

// Symbol mapping to market definition
// import 'chartiq/examples/markets/marketDefinitionsSample';
// import 'chartiq/examples/markets/marketSymbologySample';
// import 'chartiq/examples/feeds/symbolLookupChartIQ';
import 'chartiq/plugins/activetrader/addons/animation';

// Event Markers
// import marker from 'chartiq/examples/markers/markersSample';
import 'chartiq/examples/markers/tradeAnalyticsSample';
import 'chartiq/examples/markers/videoSample';

import quoteFeed from 'chartiq/examples/feeds/quoteFeedSimulator';
// import forecastQuoteFeed from 'chartiq/examples/feeds/quoteFeedForecastSimulator';

import getConfig from 'chartiq/js/defaultConfiguration';

import 'chartiq/js/extras/svgcharts/piechart';
import 'chartiq/plugins/activetrader/cryptoiq';
import 'chartiq/examples/feeds/L2_simulator';

import 'js/chart/translations';

CIQ.Studies.studyLibrary.volume.outputs = { 'Up Volume': '#d24f45', 'Down Volume': '#1261c4' };
CIQ.Studies.studyLibrary.ma.outputs = { MA: '#d24f45' };

const defaultSymbols = [
	// 'USDAUD',
	// 'BTCUSD',
	'JNJ',
	'JPM',
	'MCD',
	'MRK',
	'MSFT',
	'NKE',
	'PFE',
	'PG',
	'TRV',
	'UNH',
	'UTX',
	'VZ',
	'V',
	'WMT',
	'WBA',
	'DIS',
	'MMM',
	'AAPL',
	'AXP',
	'BA',
	'CAT',
	'CVX',
	'CSCO',
	'KO',
	'DWDP',
	'XOM',
	'GS',
	'HD',
	'IBM',
	'INTC',
];

export { CIQ, getConfig, Scrollbar, quoteFeed, defaultSymbols };
