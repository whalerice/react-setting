import React, { useEffect, useState, useRef } from 'react';
import { CIQ, getConfig, quoteFeed, Scrollbar } from 'js/chart/resources';

const GridTemplateChart = (props) => {
	const containerRef = useRef();
	const chartContainerRef = useRef();
	const { items, sendParentState, currentActive } = props;
	const [chartId] = useState(`chart${items.symbol}`);

	const removeUI = () => {
		const chartBox = chartContainerRef.current;
		Array.from(chartBox.children).forEach((child) => {
			if (child.matches('canvas')) {
				child.remove();
			}
		});
	};

	const startUI = () => {
		const container = containerRef.current;
		const chart = new CIQ.UI.Chart();
		const config = getConfig({
			quoteFeed,
			scrollStyle: Scrollbar,
		});

		CIQ.extend(
			config,
			{
				chartId,
				initialSymbol: items.symbol,
				enabledAddOns: {
					animation: true,
					extendedHours: true,
					fullScreen: false,
					inactivityTimer: true,
				},
			},
			true,
		);

		const uiContext = chart.createChartAndUI({ container, config });
		const stxx = uiContext.stx;

		stxx.preferences.currentPriceLine = false;
		stxx.preferences.horizontalCrosshairField = 'Close';
		stxx.layout.crosshair = false;
		stxx.controls.chartControls = null;
		stxx.displayIconsClose = false;
		stxx.cleanupGaps = 'carry';
		// stxx.setPeriodicity(1, 'day');
		// stxx.setPeriodicity(1, 'minute');
		// stxx.bypassRightClick = true;
		if (items.xaxis === false) {
			stxx.xaxisHeight = 0;
			stxx.controls.floatDate.style.opacity = 0;
		} else {
			stxx.controls.floatDate.style.opacity = 1;
		}
		// stxx.setChartType('mountain');
		stxx.changeOccurred('layout');
		stxx.resizeChart('layout');
		stxx.draw('layout');

		const returnItem = {
			symbol: items.symbol,
			stxx,
			uiContext,
			container,
			chartId,
		};
		sendParentState(returnItem);
	};

	useEffect(() => {
		removeUI();
		startUI();
		// items
	}, [items]);

	return (
		<>
			<div className={`cq-instant-chart${currentActive === items.symbol ? ' active' : ''}`} style={{ width: `calc(100% / ${items.cols})`, height: `calc(100% / ${items.rows})` }} id={chartId}>
				<cq-context ref={containerRef}>
					<cq-ui-manager></cq-ui-manager>
					<div className='ciq-nav'>
						<cq-menu class='ciq-search'>
							<cq-lookup cq-keystroke-claim cq-keystroke-default cq-uppercase>
								<cq-lookup-input cq-no-close>
									<input type='text' spellCheck='false' autoComplete='off' autoCorrect='off' autoCapitalize='none' name='symbol' placeholder='' />
									<cq-lookup-icon></cq-lookup-icon>
								</cq-lookup-input>
								<cq-lookup-results>
									<cq-lookup-filters cq-no-close>
										<cq-filter class='true'>ALL</cq-filter>
										<cq-filter>STOCKS</cq-filter>
										<cq-filter>FX</cq-filter>
										<cq-filter>INDEXES</cq-filter>
										<cq-filter>FUNDS</cq-filter>
										<cq-filter>FUTURES</cq-filter>
									</cq-lookup-filters>
									<cq-scroll></cq-scroll>
								</cq-lookup-results>
							</cq-lookup>
						</cq-menu>
					</div>
					<div className='ciq-chart-area'>
						<div className='ciq-chart'>
							<div className='chartContainer' ref={chartContainerRef}>
								<stx-hu-tooltip>
									<stx-hu-tooltip-field field='DT'>
										<stx-hu-tooltip-field-name>Date/Time</stx-hu-tooltip-field-name>
										<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
									</stx-hu-tooltip-field>
									<stx-hu-tooltip-field field='Close'>
										<stx-hu-tooltip-field-name></stx-hu-tooltip-field-name>
										<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
									</stx-hu-tooltip-field>
								</stx-hu-tooltip>

								<cq-chart-title cq-marker>
									<cq-symbol></cq-symbol>
									<cq-chart-price>
										<cq-current-price cq-animate></cq-current-price>
										<cq-change>
											<div className='ico'></div>
											<cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
										</cq-change>
									</cq-chart-price>
								</cq-chart-title>

								<cq-loader></cq-loader>
							</div>
						</div>
					</div>
				</cq-context>
			</div>
		</>
	);
};

export default GridTemplateChart;
