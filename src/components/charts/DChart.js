import React, { useEffect, useState, useRef } from 'react';
import { CIQ, getConfig, Scrollbar, quoteFeed } from 'js/chart/resources';
import Template from 'js/chart/TemplateTrader';

const DChart = ({ ...props }) => {
	const containerRef = useRef();
	const chartId = props.chartId || '_DDDDDDDDD';
	const symbol = props.symbol || 'SPY';
	const [config, setConfig] = useState(
		getConfig({
			quoteFeed,
			scrollStyle: Scrollbar,
		}),
	);
	const [state, setState] = useState({
		chart: new CIQ.UI.Chart(),
		stx: null,
		UIContext: null,
	});

	const moneyFlowChart = (stx) => {
		const initialPieData = {
			Up: { index: 1 },
			Down: { index: 2 },
			Even: { index: 3 },
		};

		const pieChart = new CIQ.Visualization({
			container: 'cq-tradehistory-table div[pie-chart] div',
			renderFunction: CIQ.SVGChart.renderPieChart,
			colorRange: ['#b82c0c', '#005ed4', '#7c7c7c'],
			className: 'pie',
			valueFormatter: CIQ.condenseInt,
		}).updateData(CIQ.clone(initialPieData));

		let last = null;
		// eslint-disable-next-line no-shadow
		stx.append('updateCurrentMarketData', (data, chart, symbol) => {
			if (symbol) return;
			const items = document.querySelectorAll('cq-tradehistory-body cq-item');
			const d = {};
			let i = 0;
			for (i; i < items.length; i += 1) {
				const item = items[i];
				if (item === last) break;
				let dir = item.getAttribute('dir');
				if (!dir) dir = 'even';
				dir = CIQ.capitalize(dir);
				if (!d[dir]) d[dir] = 0;
				d[dir] += parseFloat(item.querySelector('[col=amount]').getAttribute('rawval'));
			}
			if (i) pieChart.updateData(d, 'add');
			last = items[0];
		});

		stx.addEventListener('symbolChange', () => {
			pieChart.updateData(CIQ.clone(initialPieData));
		});
		return pieChart;
	};

	const cryptoSetup = (stx) => {
		const stxx = stx;
		stxx.setChartType('mountain');
		CIQ.extend(stxx.layout, {
			crosshair: true,
			headsUp: { dynamic: true, floating: false, static: true },
			l2heatmap: true,
			rangeSlider: false,
			marketDepth: true,
			extended: false,
		});
		stxx.changeOccurred('layout');
		CIQ.simulateL2({ stx: stxx, onInterval: 1000, onTrade: true });
		stxx.moneyFlowChart = moneyFlowChart(stxx);
	};

	// const createChartAndUI = ({ container, config }) => {
	// 	const uiContext = state.chart.createChartAndUI({ container, config });
	// 	return uiContext;
	// };

	// function portalizeContextDialogs(container) {
	// 	container.querySelectorAll('cq-dialog').forEach((dialog) => {
	// 		dialog.remove();
	// 		// eslint-disable-next-line no-use-before-define
	// 		if (!dialogPortalized(dialog)) {
	// 			document.body.appendChild(dialog);
	// 		}
	// 	});
	// }

	// function dialogPortalized(el) {
	// 	const tag = el.firstChild.nodeName.toLowerCase();
	// 	const result = Array.from(document.querySelectorAll(tag)).some((el) => !el.closest('cq-context'));
	// 	return result;
	// }

	const chartTemplate = <Template />;
	useEffect(() => {
		const container = containerRef.current;
		config.chartId = chartId;
		config.initialSymbol = symbol;
		config.addOns.tableView.coverContainer = '#mainChartGroup .chartContainer';
		config.enabledAddOns = { animation: true, rangeSlider: true, tableView: true };
		config.plugins.marketDepth = false;
		config.plugins.marketDepth = {
			volume: true,
			mountain: true,
			step: true,
			record: false,
			height: '40%',
			precedingContainer: '#marketDepthBookmark',
		};
		config.themes.defaultTheme = 'ciq-night';

		config.menuChartPreferences = config.menuChartPreferences.filter((item) => {
			return item.label !== 'Market Depth' && item.label !== 'Extended Hours';
		});
		// portalizeContextDialogs(container);
		// console.log(state.chart);
		const uiContext = state.chart.createChartAndUI({ container, config });
		const stxx = uiContext.stx;
		setConfig(config);
		setState({ stx: stxx, UIContext: uiContext });

		// 아래 두개 설정하면 차트 스크롤 할 때 뭔가 차분해 진다. 더 찾아 보도록 해보자
		stxx.chart.allowScrollFuture = false; // 스크롤시 오른쪽 차트 공백 , 차트 공백 안생기게 해줌
		stxx.chart.allowScrollPast = false; // 스크롤시 상하공백,  차트 공백관련 인데 정확히 어떤 공백인것인가?????????? 모르겠다
		// console.log(stxx);

		if (window.d3) {
			cryptoSetup(stxx);
		} else {
			CIQ.loadScript('https://d3js.org/d3.v5.min.js', () => {
				cryptoSetup(stxx);
			});
		}
		return () => {
			setState();
			stxx.moneyFlowChart.destroy();
			setTimeout(() => {
				// Unmount 즉시 destroy() 처리하니까 콘솔에 에러가 나서 setTimeout으로 stxx.destroy(); 처리함
				stxx.destroy();
			}, 0);
			// setState({});
		}; //componentWillUnmount

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<cq-context ref={containerRef} id={chartId}>
				{chartTemplate}
			</cq-context>
		</>
	);
};

export default DChart;
