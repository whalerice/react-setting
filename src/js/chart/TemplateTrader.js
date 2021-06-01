import { useLocation } from 'react-router-dom';
import { Create, Add, ListAlt, ArrowDropDown } from '@material-ui/icons';

const Template = () => {
	const location = useLocation();
	return (
		<>
			<div className='ciq-nav full-screen-hide'>
				<div className='sidenav-toggle ciq-toggles'>
					<cq-toggle class='ciq-sidenav' cq-member='sidenav' cq-toggles='sidenavOn,sidenavOff' cq-toggle-classes='active,' keyboard-navigation='false'>
						<span></span>
						<cq-tooltip>More</cq-tooltip>
					</cq-toggle>
				</div>

				<cq-side-nav cq-on='sidenavOn'>
					<div className='icon-toggles ciq-toggles'>
						<cq-toggle class='cq-toggle' cq-member='drawing'>
							<Create style={{ fontSize: 26 }} />
						</cq-toggle>
						<cq-toggle class='cq-toggle' cq-member='crosshair'>
							<Add style={{ fontSize: 26 }} />
						</cq-toggle>
						<cq-toggle class='cq-toggle' cq-member='tableView'>
							<ListAlt style={{ fontSize: 26 }} />
						</cq-toggle>
						{/* <cq-share-button>
							<PhotoCamera style={{ fontSize: 26 }} />
						</cq-share-button> */}
						{/* <cq-toggle class='ciq-draw' cq-member='drawing'>
							<span></span>
							<cq-tooltip>Draw</cq-tooltip>
						</cq-toggle>

						<cq-info-toggle-dropdown>
							<cq-toggle class='ciq-CH' cq-member='crosshair'>
								<span></span>
								<cq-tooltip>Crosshair (Alt + \)</cq-tooltip>
							</cq-toggle>

							<cq-menu class='ciq-menu toggle-options collapse'>
								<span></span>
								<cq-menu-dropdown>
									<cq-item cq-member='crosshair'>
										Hide Heads-Up Display
										<span class='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
									<cq-item cq-member='headsUp-static'>
										Show Heads-Up Display
										<span class='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-info-toggle-dropdown>

						<cq-info-toggle-dropdown>
							<cq-toggle class='ciq-HU' cq-member='headsUp'>
								<span></span>
								<cq-tooltip>Info</cq-tooltip>
							</cq-toggle>

							<cq-menu class='ciq-menu toggle-options collapse tooltip-ui'>
								<span></span>
								<cq-menu-dropdown>
									<cq-item cq-member='headsUp-dynamic'>
										Show Dynamic Callout
										<span class='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
									<cq-item cq-member='headsUp-floating'>
										Show Tooltip
										<span class='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-info-toggle-dropdown>

						<cq-toggle class='ciq-DT tableview-ui' cq-member='tableView'>
							<span></span>
							<cq-tooltip>Table View</cq-tooltip>
						</cq-toggle> */}
					</div>
				</cq-side-nav>

				<div className='ciq-menu-section'>
					<div className='ciq-dropdowns'>
						<cq-menu class='ciq-menu ciq-period'>
							<span>
								<cq-clickable stxbind='Layout.periodicity'>1D</cq-clickable>
							</span>
							<cq-menu-dropdown>
								<cq-menu-container cq-name='menuPeriodicity'></cq-menu-container>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-display collapse'>
							<span>Display</span>
							<cq-menu-dropdown>
								<cq-menu-dropdown-section class='chart-types'>
									<cq-heading>Chart Style</cq-heading>
									<cq-menu-container cq-name='menuChartStyle'></cq-menu-container>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-aggregations'>
									<cq-menu-container cq-name='menuChartAggregates'></cq-menu-container>
								</cq-menu-dropdown-section>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-studies collapse' cq-focus='input'>
							<span>Studies</span>
							<cq-menu-dropdown>
								<cq-study-legend cq-no-close=''>
									<cq-section-dynamic>
										<cq-heading>Current Studies</cq-heading>
										<cq-study-legend-content>
											<template cq-study-legend=''>
												<cq-item>
													<cq-label class='click-to-edit'></cq-label>
													<div className='ciq-icon ciq-close'></div>
												</cq-item>
											</template>
										</cq-study-legend-content>
										<cq-placeholder>
											<div stxtap='Layout.clearStudies()' className='ciq-btn sm'>
												Clear All
											</div>
										</cq-placeholder>
									</cq-section-dynamic>
								</cq-study-legend>
								<div className='scriptiq-ui'>
									<cq-heading>ScriptIQ</cq-heading>
									<cq-item>
										<cq-clickable cq-selector='cq-scriptiq-editor' cq-method='open'>
											New Script
										</cq-clickable>
									</cq-item>
									<cq-scriptiq-menu></cq-scriptiq-menu>
									<cq-separator></cq-separator>
								</div>
								<cq-heading cq-filter='' cq-filter-min='15'>
									Studies
								</cq-heading>
								<cq-studies></cq-studies>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-preferences collapse'>
							<span></span>
							<cq-menu-dropdown>
								<cq-menu-dropdown-section class='chart-preferences'>
									<cq-heading>Chart Preferences</cq-heading>
									<cq-menu-container cq-name='menuChartPreferences'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='y-axis-preferences'>
									<cq-heading>Y-Axis Preferences</cq-heading>
									<cq-menu-container cq-name='menuYAxisPreferences'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-theme'>
									<cq-heading>Themes</cq-heading>
									<cq-themes></cq-themes>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-locale'>
									<cq-heading>Locale</cq-heading>
									<cq-item>
										<cq-clickable cq-selector='cq-timezone-dialog' cq-method='open'>
											Change Timezone
										</cq-clickable>
									</cq-item>
									<cq-item stxsetget='Layout.Language()'>
										<cq-flag></cq-flag>
										<cq-language-name>Change Language</cq-language-name>
									</cq-item>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='shortcuts-ui'>
									<cq-separator></cq-separator>
									<cq-heading>Shortcuts</cq-heading>
									<cq-item stxtap='Layout.showShortcuts(true)'>Shortcuts / Hotkeys</cq-item>
								</cq-menu-dropdown-section>
							</cq-menu-dropdown>
						</cq-menu>
					</div>
				</div>
			</div>

			<cq-scriptiq class='scriptiq-ui'></cq-scriptiq>

			<cq-analystviews class='analystviews-ui' token='eZOrIVNU3KR1f0cf6PTUYg==' partner='1000' disabled=''></cq-analystviews>

			<cq-technicalinsights uid='' lang='en' disabled=''></cq-technicalinsights>

			<div className='ciq-chart-area'>
				<div chartarea='' className='chartarea'>
					<div id='flexContainer'>
						<div id='cryptoGroup1'>
							<div id='tradeHistoryContainer'>
								<cq-tradehistory cq-active>
									<cq-tradehistory-table>
										<cq-scroll cq-no-claim>
											<cq-tradehistory-body maxrows='500'></cq-tradehistory-body>
										</cq-scroll>
										<div pie-chart='true'>
											<span>Money Flow</span>
											<div></div>
										</div>
									</cq-tradehistory-table>
									<template>
										<cq-item>
											<div col='time'>Time</div>
											<div col='qty'>Qty</div>
											<div col='price'>Price</div>
											<div col='amount'>Amount</div>
										</cq-item>
									</template>
								</cq-tradehistory>
							</div>
						</div>
						<div id='cryptoGroup2'>
							<div id='marketDepthBookmark'></div>
							<div id='orderBookContainer'>
								<cq-orderbook cq-active=''></cq-orderbook>
							</div>
						</div>
						<div id='mainChartGroup'>
							<div className='ciq-chart'>
								<cq-message-toaster defaultdisplaytime='10' defaulttransition='slide' defaultposition='top'></cq-message-toaster>

								<cq-palette-dock>
									<div className='palette-dock-container'>
										<cq-drawing-palette class='palette-drawing grid palette-hide' docked='true' orientation='vertical' min-height='300' cq-drawing-edit='none'></cq-drawing-palette>
										<cq-drawing-settings class='palette-settings' docked='true' hide='true' orientation='horizontal' min-height='40' cq-drawing-edit='none'></cq-drawing-settings>
									</div>
								</cq-palette-dock>

								<div className='chartContainer'>
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

									<cq-chart-title cq-marker='true' cq-browser-tab={location.pathname === '/chart'} class='custom-title'>
										<cq-symbol></cq-symbol>
										<cq-chart-price>
											<cq-current-price cq-animate></cq-current-price>
											<cq-change>
												<ArrowDropDown className='cu-icon' />
												<cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
											</cq-change>
										</cq-chart-price>
									</cq-chart-title>

									<cq-chartcontrol-group class='full-screen-show' cq-marker=''></cq-chartcontrol-group>

									<cq-comparison-lookup></cq-comparison-lookup>

									<cq-chart-legend></cq-chart-legend>

									<cq-loader></cq-loader>

									<cq-hu-static class='cq-hu-static'>
										<ul className='cq-hu-static-list'>
											<li>
												<span className='hu-label'>Price</span>
												<cq-hu-price class='hu-field'></cq-hu-price>
												<span className='hu-label'>Open</span>
												<cq-hu-open class='hu-field'></cq-hu-open>
												<span className='hu-label'>Close</span>
												<cq-hu-close class='hu-field'></cq-hu-close>
											</li>
											<li>
												<span className='hu-label'>Vol</span>
												<cq-volume-section class='hu-field'>
													<cq-hu-volume></cq-hu-volume>
													<cq-volume-rollup></cq-volume-rollup>
												</cq-volume-section>
												<span className='hu-label'>High</span>
												<cq-hu-high class='hu-field'></cq-hu-high>
												<span className='hu-label'>Low</span>
												<cq-hu-low class='hu-field'></cq-hu-low>
											</li>
										</ul>
									</cq-hu-static>
									<cq-hu-dynamic class='cq-hu-dynamic'></cq-hu-dynamic>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<cq-abstract-marker cq-type='helicopter'></cq-abstract-marker>

			<cq-attribution></cq-attribution>

			<div className='ciq-footer full-screen-hide'>
				<cq-share-button></cq-share-button>
				<div className='shortcuts-ui ciq-shortcut-button' stxtap='Layout.showShortcuts()' title='Toggle shortcut legend'></div>
				<cq-show-range></cq-show-range>
			</div>

			<cq-dialogs>
				<cq-dialog>
					<cq-drawing-context></cq-drawing-context>
				</cq-dialog>

				<cq-dialog>
					<cq-study-context></cq-study-context>
				</cq-dialog>
			</cq-dialogs>
		</>
	);
};

export default Template;
