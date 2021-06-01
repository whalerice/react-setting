import React, { useEffect, useState } from 'react';
import { CIQ, defaultSymbols } from 'js/chart/resources';
import { ChartLinker } from 'chartiq/examples/templates/chart-grid/chart-linker';
import GridTemplateChart from 'js/chart/GridTemplateChart';

const ChartGrid = () => {
	const [initGridSize, changeGridSize] = useState({ cols: 2, rows: 2 });
	const [childInfo, setChildInfo] = useState([]);
	const [activeChart, changeActiveChart] = useState();
	const chartLinker = new ChartLinker();

	const chartInjectionEvent = (item) => {
		const target = item.container;
		target.addEventListener('mouseover', () => {
			chartLinker.setLinkerMaster(item.chartId);
		});
		target.addEventListener('mousedown', () => {
			changeActiveChart(item.symbol);
			chartLinker.setLinkerMaster(item.chartId);
		});
	};

	const receiveChaildState = (item) => {
		if (item) {
			const UILayout = new CIQ.UI.Layout(item.uiContext);
			chartLinker.add(item.symbol, item.stxx, item.uiContext, item.chartId);
			item.uiContext.advertiseAs(chartLinker, 'Linker');
			chartLinker.setUI(item.uiContext, UILayout);
			chartLinker.showCrosshair(true);
			chartInjectionEvent(item);
			CIQ.UI.begin();
		}
	};

	const AddCharts = (cols, rows) => {
		const count = cols * rows;
		const list = [];

		for (let i = 0; i < count; i += 1) {
			const symbol = defaultSymbols[i];
			let xaxis = true;
			const exclude = count - cols;

			if (exclude === 0) {
				xaxis = true;
			}

			if (i < exclude) {
				xaxis = false;
			}

			const item = {
				id: i,
				symbol,
				cols,
				rows,
				xaxis,
			};
			list.push(item);
		}
		setChildInfo(list);
		changeGridSize({ cols, rows });
	};

	useEffect(() => {
		localStorage.clear();
		chartLinker.removeAll();
		AddCharts(initGridSize.cols, initGridSize.rows);
		document.addEventListener('update-grid', (e) => {
			AddCharts(e.detail.columns, e.detail.rows);
		});

		return () => {};
	}, []);

	return (
		<cq-context>
			<cq-ui-manager></cq-ui-manager>
			<div className='chart-grid-header'>
				<div className='ciq-nav'>
					<cq-menu class='ciq-search'>
						<cq-lookup cq-keystroke-claim cq-keystroke-default cq-uppercase>
							<cq-lookup-input cq-no-close>
								<input id='symbol' type='text' spellCheck='false' autoComplete='off' autoCorrect='off' autoCapitalize='none' name='symbol' placeholder='Enter Symbol' />
								<cq-lookup-icon></cq-lookup-icon>
							</cq-lookup-input>
							<cq-lookup-results>
								<cq-lookup-filters cq-no-close>
									<cq-filter class='true'>RESULTS</cq-filter>
								</cq-lookup-filters>
								<cq-scroll></cq-scroll>
							</cq-lookup-results>
						</cq-lookup>
					</cq-menu>
					<div className='icon-toggles ciq-toggles'>
						<cq-toggle class='ciq-CH' cq-member='crosshair' cq-toggle-classes='active'>
							<span></span>
							<cq-tooltip>Crosshair</cq-tooltip>
						</cq-toggle>
					</div>
					<div className='ciq-dropdowns'>
						<cq-menu class='ciq-menu ciq-grid'>
							<span>
								<cq-clickable>Grid</cq-clickable>
							</span>
							<cq-menu-dropdown>
								<cq-grid-size-picker maxrows='5' maxcols='5'></cq-grid-size-picker>
							</cq-menu-dropdown>
						</cq-menu>
						<cq-menu class='ciq-menu'>
							<span>Themes</span>
							<cq-menu-dropdown>
								<cq-item stxtap="Theme.changeTheme('ciq-day')">Day</cq-item>
								<cq-item stxtap="Theme.changeTheme('ciq-night')">Night</cq-item>
							</cq-menu-dropdown>
							<cq-themes style={{ display: 'none' }}>
								<cq-themes-builtin cq-no-close>
									<template>
										<cq-item onclick='chartLinker.changeTheme(this)'></cq-item>
									</template>
								</cq-themes-builtin>
								<cq-themes-custom cq-no-close>
									<template>
										<cq-theme-custom>
											<cq-item>
												<cq-label></cq-label>
												<cq-close></cq-close>
											</cq-item>
										</cq-theme-custom>
									</template>
								</cq-themes-custom>
								<cq-separator cq-partial></cq-separator>
								<cq-item stxtap='newTheme()'>
									<cq-plus></cq-plus>New Theme
								</cq-item>
							</cq-themes>
						</cq-menu>
					</div>
				</div>
			</div>
			<div className='chart-grid'>
				{childInfo.map((item) => {
					return <GridTemplateChart sendParentState={receiveChaildState} items={item} key={item.id} currentActive={activeChart} />;
				})}
			</div>
		</cq-context>
	);
};

export default ChartGrid;
