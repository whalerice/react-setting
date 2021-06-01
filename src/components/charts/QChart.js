import React, { useEffect, useRef, useState } from 'react';
import { CIQ } from 'chartiq/js/standard';
import quoteFeed from 'chartiq/examples/feeds/quoteFeedSimulator';

const QChart = ({ ...props }) => {
	const { symbol } = props || 'SPY';
	const containerRef = useRef();
	const [, setState] = useState();

	useEffect(() => {
		const stxx = new CIQ.ChartEngine({
			container: containerRef.current,
		});
		stxx.attachQuoteFeed(quoteFeed, { refreshInterval: 0 });
		stxx.loadChart(symbol, null, () => {});
		setState(stxx);
	}, [symbol]);
	return (
		<>
			<div ref={containerRef} className='chart'></div>
		</>
	);
};

export default QChart;

// https://jsfiddle.net/chartiq/sk372sog/ 여기 페이지 hook으로 만들기
