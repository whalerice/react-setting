import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import quoteFeed from 'chartiq/examples/feeds/quoteFeedSimulator';
import { CIQ } from 'js/chart/resources';

const FChart = ({ ...props }) => {
	const containerRef = useRef();
	const chartId = props.chartId || 'FChart';
	const initialSymbol = props.symbol || 'USDAUD';
	const [state, setState] = useState();

	const changePeriodicity = (time) => {
		switch (time) {
			case '1d':
				state.setPeriodicity(1, 'day');
				break;
			case '1m':
				state.setPeriodicity(1, 'minute');
				break;
			case '3m':
				state.setPeriodicity(3, 'minute');
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		// init();
		const stxx = new CIQ.ChartEngine({
			container: containerRef.current.children[1],
			layout: {
				chartType: 'mountain',
				crosshair: true,
			},
		});
		stxx.attachQuoteFeed(quoteFeed, { refreshInterval: 1 });
		stxx.loadChart(initialSymbol, null, () => {});
		const inputs = {
			Period: 10,
			Field: 'Close',
			Type: 'ma',
		};
		const outputs = {
			MA: '#E660CB',
		};
		CIQ.Studies.addStudy(stxx, 'ma', inputs, outputs);
		CIQ.Studies.addStudy(stxx, 'volume', {}, {});
		// stxx.panelUp(stxx.panels.volume);
		// eslint-disable-next-line no-new
		new CIQ.Animation(stxx, {
			tension: 0.3,
		});
		setState(stxx);
		return () => {};
	}, [initialSymbol]);
	return (
		<>
			{/*color={currentLayout.id === '1d' ? 'primary' : 'default'}*/}
			<div ref={containerRef} className='chart' id={chartId}>
				<div className='chart-menu-bar'>
					<Button
						variant='contained'
						onClick={() => {
							return changePeriodicity('1d');
						}}
					>
						1D
					</Button>{' '}
					<Button
						variant='contained'
						onClick={() => {
							return changePeriodicity('1m');
						}}
					>
						1M
					</Button>{' '}
					<Button
						variant='contained'
						onClick={() => {
							return changePeriodicity('3m');
						}}
					>
						3M
					</Button>
				</div>
				<div className='chart-container'></div>
			</div>
		</>
	);
};

export default FChart;
