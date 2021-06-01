import { DChart } from 'components/charts';
// import { DChart } from 'components/charts';

const Chart = () => {
	return (
		<>
			<DChart chartId='chartD' symbol='USDAUD' />
			{/* <AChart config={aConfig} chartId='chartA12365' symbol='USDAUD' /> */}
			{/* <FChart chartId='chartF4587' symbol='USDAUD' config={fConfig} /> */}
			{/* <QChart /> */}
			{/* <div className='multi'>
				<div className='left'>
					<BChart chartId='chart0' symbol='^USDAUD' />
				</div>
				<div className='right'>
					<AChart chartId='chartaaa' symbol='^BTCUSD' />
				</div>
			</div> */}
		</>
	);
};

export default Chart;
