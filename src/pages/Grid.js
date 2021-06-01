import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Form from 'components/Form';
import NonComponent from 'components/NonComponent';
import { BChart, AChart, FChart, QChart } from 'components/charts';
// , FChart, QChart

export const grid = [
	{ id: 1, name: 'g_01', width: 200, height: 200, x: 0, y: 0, component: null, data: null },
	{ id: 2, name: 'g_02', width: 200, height: 200, x: 200, y: 0, component: Form, data: { title: '폼박스' } },
	{ id: 3, name: 'g_03', width: 660, height: 420, x: 0, y: 200, component: AChart, data: { title: 'A차트', symbol: '^USDAUD', chartId: 'chartAAA' } },
	{ id: 4, name: 'g_04', width: 560, height: 620, x: 660, y: 0, component: BChart, data: { title: 'B차트', symbol: '^BTCUSD', chartId: 'chartBBBB' } },
	{ id: 5, name: 'g_05', width: 600, height: 400, x: 238, y: 205, component: FChart, data: { title: 'F차트', symbol: '^BTCUSD', chartId: 'FChartDD' } },
	{ id: 6, name: 'g_06', width: 840, height: 580, x: 0, y: 282, component: QChart, data: { title: 'Q차트', symbol: '^BTCUSD', chartId: 'QChart1234' } },
];

const Grid = () => {
	const [gridState, setGridState] = useState(grid);
	const [activeGrid, setActiveGrid] = useState('');

	const currentGridItem = (e) => {
		const currentItem = e;
		if (currentItem.classList.contains('grid-item') && !currentItem.classList.contains('active')) {
			setActiveGrid(currentItem.id);
		}
	};
	const onMouseDown = (e) => {
		currentGridItem(e.currentTarget);
	};

	const onResizeStart = (e) => {
		currentGridItem(e.target.offsetParent);
	};

	const onDragStop = (e, d) => {
		const currentId = d.node.attributes.id.value;
		const item = gridState.map((value) => {
			if (value.name === currentId) {
				return {
					...value,
					x: d.x,
					y: d.y,
				};
			}
			return { ...value };
		});
		setGridState(item);
	};

	const onResizeStop = (e, direction, ref, delta, position) => {
		const currentId = ref.attributes.id.value;
		const item = gridState.map((value) => {
			if (value.name === currentId) {
				return {
					...value,
					x: position.x,
					y: position.y,
					width: value.width + delta.width,
					height: value.height + delta.height,
				};
			}
			return { ...value };
		});
		setGridState(item);
	};

	const deleteGrid = (e) => {
		const currentId = e.currentTarget.offsetParent.id;
		const item = gridState.filter((value, index) => {
			const t = null;
			if (value.name === currentId) {
				return t;
			}
			gridState.splice(index, t);
			return { ...value };
		});

		setGridState(item);
	};

	return (
		<>
			<PerfectScrollbar className='grid-layout'>
				{gridState.map((item) => {
					const GridComponent = item.component;
					return (
						<Rnd
							id={item.name}
							className={`grid-item ${activeGrid === item.name ? 'active' : ''}`}
							bounds='.grid-layout'
							key={item.id}
							default={item}
							dragAxis='both'
							dragGrid={[20, 20]}
							resizeGrid={[20, 20]}
							dragHandleClassName='grid-header'
							onDragStop={onDragStop}
							onResizeStart={onResizeStart}
							onResizeStop={onResizeStop}
							onMouseDown={onMouseDown}
						>
							<div className='grid-content'>
								<div className='grid-header'>
									{!item.data ? '??????' : item.data.title} {item.width} * {item.height} | {item.x} : {item.y}
									<IconButton aria-label='delete' onClick={deleteGrid} size='small'>
										<Delete />
									</IconButton>
								</div>
								{!item.component && (
									<div className='grid-body'>
										<NonComponent />
										{item.width} * {item.height} | {item.x} : {item.y}
									</div>
								)}
								{item.component && (
									<PerfectScrollbar className='grid-body'>
										{!item.data.symbol && <GridComponent />}
										{item.data.symbol && <GridComponent symbol={item.data.symbol} chartId={item.data.chartId} />}
									</PerfectScrollbar>
								)}
							</div>
						</Rnd>
					);
				})}
				{/* {!myInfo && <div>로그인 해주세욤</div>} */}
			</PerfectScrollbar>
		</>
	);
};

export default Grid;
