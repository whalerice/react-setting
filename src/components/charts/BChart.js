import React, { useEffect, useState, useRef } from 'react';
import { CIQ, getConfig, Scrollbar, quoteFeed } from 'js/chart/resources';
import Template from 'js/chart/Template';

const BChart = ({ ...props }) => {
	const containerRef = useRef();
	const chartId = props.chartId || '_BBBBBB';
	const symbol = props.symbol || 'AAPL';
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
	const [headsUp, setHeadsUp] = useState(null);

	const customHeadsUpValue = (stx) => {
		function prependHeadsUpHR() {
			const target = this;
			const tick = target.barFromPixel(target.cx);
			const prices = target.chart.xaxis[tick];
			if (prices && prices.data) {
				setHeadsUp({ ...prices.data });
			} else {
				setHeadsUp({});
			}
		}
		stx.prepend('headsUpHR', prependHeadsUpHR);
	};

	const initStyle = (stx) => {
		if (!stx.layout.studies) {
			CIQ.Studies.addStudy(stx, 'ma', { Period: 50, Field: 'Close', Type: 'ma' });
			CIQ.Studies.addStudy(stx, 'ma', { Period: 15, Field: 'Close', Type: 'ma' }, { MA: '#1a5fde' });
			CIQ.Studies.addStudy(stx, 'volume', {}, {});
		}
		stx.setChartType('line');
		CIQ.extend(stx.layout, {
			crosshair: false,
			headsUp: { dynamic: true, floating: false, static: true },
		});
		stx.changeOccurred('layout');
		customHeadsUpValue(stx);
	};

	const chartTemplate = <Template headsup={headsUp} />;

	useEffect(() => {
		const container = containerRef.current;
		config.chartId = chartId;
		config.initialSymbol = symbol;
		config.enabledAddOns = { animation: true, fullScreen: false, tableView: true };
		config.themes.defaultTheme = 'ciq-day';

		if (!config.plugins.marketDepth) {
			config.menuChartPreferences = config.menuChartPreferences.filter((item) => {
				return item.label !== 'Market Depth' && item.label !== 'L2 Heat Map';
			});
		}

		const uiContext = state.chart.createChartAndUI({ container, config });
		const stxx = uiContext.stx;
		initStyle(stxx);
		setConfig(config);
		setState({ stx: stxx, UIContext: uiContext });

		return () => {
			setState();
			setTimeout(() => {
				stxx.destroy();
			}, 0);
		};
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

export default BChart;
