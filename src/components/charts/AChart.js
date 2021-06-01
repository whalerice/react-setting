import React, { useEffect, useState, useRef } from 'react';
import { CIQ, getConfig, Scrollbar, quoteFeed } from 'js/chart/resources';
import Template from 'js/chart/Template';
import PropTypes from 'prop-types';

const AChart = ({ ...props }) => {
	const containerRef = useRef();
	const chartId = props.chartId || '_AAAAAA';
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
		const stxx = stx;
		stxx.preferences.labels = true;
		if (!stxx.layout.studies) {
			const inputs = {
				Period: 10,
				Field: 'Close',
				Type: 'ma',
			};
			const outputs = {
				MA: '#E660CB',
			};

			CIQ.Studies.addStudy(stxx, 'ma', inputs, outputs);
			//CIQ.Studies.addStudy(stx, 'ma', { Period: 50, Field: 'Close', Type: 'ma' });
			//CIQ.Studies.addStudy(stx, 'ma', { Period: 15, Field: 'Close', Type: 'ma' }, { MA: '#1a5fde' });
			CIQ.Studies.addStudy(stxx, 'volume', {}, {});
		}
		stxx.setChartType('candle');
		CIQ.extend(stxx.layout, {
			crosshair: true,
			headsUp: { dynamic: false, floating: true, static: true },
		});
		stxx.prepend('mouseWheel', (e) => {
			if (e.altKey) {
				e.preventDefault();
				return false;
			}
			return true;
		});
		customHeadsUpValue(stxx);
	};
	// console.log(CIQ.Studies.studyLibrary);

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
		// portalizeContextDialogs(container);

		const uiContext = state.chart.createChartAndUI({ container, config });
		// const uiContext = createChartAndUI({ container, config });
		const stxx = uiContext.stx;
		initStyle(stxx);
		setConfig(config);
		setState({ stx: stxx, UIContext: uiContext });

		return () => {
			setState();
			setTimeout(() => {
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

AChart.prototype = {
	config: PropTypes.func,
	symbol: PropTypes.string,
	chartId: PropTypes.string,
};

export default AChart;
