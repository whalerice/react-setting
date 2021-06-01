import React, { useEffect } from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import sample5min from 'chartiq/examples/data/STX_SAMPLE_5MIN';

const BasicChart = () => {
	const containerRef = React.useRef();

	useEffect(() => {
		const stxx = new CIQ.ChartEngine({
			container: containerRef.current,
			layout: {
				chartType: 'candle',
				crosshair: true,
				candleWidth: 20,
			},
		});
		stxx.loadChart('SPY', {
			masterData: sample5min,
		});
	}, []);

	return (
		<>
			<div ref={containerRef} className='chart'></div>
		</>
	);
};

export default React.memo(BasicChart);
