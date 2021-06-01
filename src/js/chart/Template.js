import { useLocation } from 'react-router-dom';
import { Create, Add, ListAlt, PhotoCamera, ArrowDropDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Template = ({ headsup }) => {
	const location = useLocation();
	const hu = headsup || null;
	const VolToM = (args) => {
		return args && `${(args / 1000000).toFixed(1)}M`;
	};
	return (
		<>
			<div className='chart-nav'>
				{/* <div className=''>
					<cq-toggle class='ciq-sidenav' cq-member='sidenav' cq-toggles='sidenavOn,sidenavOff' cq-toggle-classes='active,'>
						<span></span>
						<cq-tooltip>More</cq-tooltip>
					</cq-toggle>
				</div> */}

				{/* <cq-menu class='ciq-search'>
					<cq-lookup cq-keystroke-claim cq-keystroke-default cq-uppercase></cq-lookup>
				</cq-menu> */}
				<div className='ciq-nav-lt'>
					<div className='ciq-toggles'>
						<cq-toggle class='cq-toggle' cq-member='drawing'>
							<Create style={{ fontSize: 26 }} />
						</cq-toggle>
						<cq-toggle class='cq-toggle' cq-member='crosshair'>
							<Add style={{ fontSize: 26 }} />
						</cq-toggle>
						<cq-toggle class='cq-toggle' cq-member='tableView'>
							<ListAlt style={{ fontSize: 26 }} />
						</cq-toggle>
						<cq-share-button>
							<PhotoCamera style={{ fontSize: 26 }} />
						</cq-share-button>
						{hu && (
							<div className='custom-headup'>
								<ul>
									<li>
										<span className='huLabel'>Date</span>
										<span className='huField'>{!hu.DT ? 'N/A' : <Moment format='YYYY/MM/DD ss:mm' date={hu.DT} />}</span>
									</li>
									<li>
										<span className='huLabel'>Open</span>
										<span className='huField'>{!hu.Open ? 'N/A' : hu.Open}</span>
									</li>
									<li>
										<span className='huLabel'>Close</span>
										<span className='huField'>{!hu.Close ? 'N/A' : hu.Close}</span>
									</li>
								</ul>
								<ul>
									<li>
										<span className='huLabel'>Vol</span>
										<span className='huField'>{!hu.Volume ? 'N/A' : VolToM(hu.Volume)}</span>
									</li>
									<li>
										<span className='huLabel'>High</span>
										<span className='huField'>{!hu.High ? 'N/A' : hu.High}</span>
									</li>
									<li>
										<span className='huLabel'>Low</span>
										<span className='huField'>{!hu.Low ? 'N/A' : hu.Low}</span>
									</li>
								</ul>
							</div>
						)}
					</div>
					{/* <cq-menu-dropdown-section class='shortcuts-ui'>
						<cq-separator></cq-separator>
						<cq-heading>Shortcuts</cq-heading>
						<cq-item stxtap='Layout.showShortcuts(true)'>Shortcuts / Hotkeys</cq-item>
					</cq-menu-dropdown-section> */}
					{/* className='termstructure-ui' */}
				</div>
				{/* <cq-side-nav cq-on='sidenavOn'></cq-side-nav> */}

				<div className='ciq-nav-rt'>
					<div className='ciq-dropdowns'>
						<cq-menu class='ciq-menu ciq-period'>
							<span>
								<cq-clickable stxbind='Layout.periodicity'>1D</cq-clickable>
							</span>
							<cq-menu-dropdown>
								<cq-menu-container cq-name='menuPeriodicity'></cq-menu-container>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-views collapse'>
							<span>Views</span>
							<cq-menu-dropdown>
								<cq-views></cq-views>
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

						<cq-menu class='ciq-menu ciq-studies collapse'>
							<span>Studies</span>
							<cq-menu-dropdown cq-no-scroll>
								<cq-study-legend cq-no-close>
									<cq-section-dynamic>
										<cq-heading>Current Studies</cq-heading>
										<cq-study-legend-content>
											<template cq-study-legend='true'>
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
								<cq-heading cq-filter cq-filter-min='-1'>
									Studies
								</cq-heading>
								<cq-scroll cq-no-maximize>
									<cq-studies></cq-studies>
								</cq-scroll>
							</cq-menu-dropdown>
						</cq-menu>

						{/* <cq-menu class='ciq-menu stx-markers collapse'>
							<span>Events</span>
							<cq-menu-dropdown>
								<cq-heading>Chart Events</cq-heading>
								<cq-item stxtap="Markers.showMarkers('square')">
									Simple Square
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item stxtap="Markers.showMarkers('circle')">
									Simple Circle
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item stxtap="Markers.showMarkers('callout')">
									Callouts
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item class='ta_markers-ui' stxtap="Markers.showMarkers('trade')">
									Trade
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item class='video_markers-ui' stxtap="Markers.showMarkers('video')">
									Video
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item stxtap="Markers.showMarkers('abstract')">
									Abstract
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-separator></cq-separator>
								<cq-item stxtap='Markers.showMarkers()' class='ciq-active'>
									None
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<div className='timespanevent-ui'>
									<cq-separator></cq-separator>
									<cq-heading>Panel Events</cq-heading>
									<cq-item class='span-event' stxtap="TimeSpanEvent.showMarkers('Order')" cq-no-close>
										Order
										<span className='ciq-checkbox ciq-active'>
											<span></span>
										</span>
									</cq-item>
									<cq-item class='span-event' stxtap="TimeSpanEvent.showMarkers('CEO')" cq-no-close>
										CEO
										<span className='ciq-checkbox ciq-active'>
											<span></span>
										</span>
									</cq-item>
									<cq-item class='span-event' stxtap="TimeSpanEvent.showMarkers('News')" cq-no-close>
										News
										<span className='ciq-checkbox ciq-active'>
											<span></span>
										</span>
									</cq-item>
								</div>
							</cq-menu-dropdown>
						</cq-menu> */}

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
							</cq-menu-dropdown>
						</cq-menu>
					</div>

					{/* {pluginToggles} */}
				</div>
			</div>

			<cq-scriptiq class='scriptiq-ui'></cq-scriptiq>

			<cq-tradingcentral class='tc-ui' token='eZOrIVNU3KR1f0cf6PTUYg==' partner='1000' disabled></cq-tradingcentral>

			<cq-recognia uid='' lang='en' disabled></cq-recognia>

			<div className='ciq-chart-area'>
				<div className='ciq-chart'>
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

						<cq-chart-title cq-marker cq-browser-tab={location.pathname === '/chart'} class='custom-title'>
							<cq-symbol></cq-symbol>
							<cq-chart-price>
								<cq-current-price cq-animate></cq-current-price>
								<cq-change>
									<ArrowDropDown className='cu-icon' />
									<cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
								</cq-change>
							</cq-chart-price>
						</cq-chart-title>

						<cq-chartcontrol-group class='full-screen-show' cq-marker></cq-chartcontrol-group>

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
						<cq-hu-dynamic class='cq-hu-dynamic'>
							<svg version='1.1' x='0px' y='0px' viewBox='0 0 215 140' enableBackground='new 0 0 215 140'>
								<defs>
									<filter id='ciq-hu-shadow' height='130%'>
										<feGaussianBlur in='SourceAlpha' stdDeviation='1'></feGaussianBlur>
										<feOffset dx='0' dy='1' result='offsetblur'></feOffset>
										<feComponentTransfer>
											<feFuncA type='linear' slope='0.2'></feFuncA>
										</feComponentTransfer>
										<feMerge>
											<feMergeNode></feMergeNode>
											<feMergeNode in='SourceGraphic'></feMergeNode>
										</feMerge>
									</filter>
								</defs>
								<polygon className='ciq-hu-bg' points='198.4,124.4 1,124.4 1,1 214,1 214,137.8' filter='url(#ciq-hu-shadow)' />
								<path className='ciq-hu-stroke' fill='#398DFF' d='M213,2v133.6l-13.7-11.8l-0.6-0.5H198H2V2H213 M215,0H0v125.4h198l17,14.6V0L215,0z'></path>
							</svg>
							<div>
								<div className='hu-col hu-col-lt'>
									<cq-hu-date></cq-hu-date>
									<cq-hu-price></cq-hu-price>
									<cq-volume-grouping>
										<div className='volume-grouping-title'>Volume</div>
										<div>
											<cq-volume-visual></cq-volume-visual>
										</div>
										<div>
											<cq-hu-volume></cq-hu-volume>
											<cq-volume-rollup></cq-volume-rollup>
										</div>
									</cq-volume-grouping>
								</div>
								<div className='hu-col hu-col-rt'>
									<div>
										<strong>Open</strong>
										<cq-hu-open></cq-hu-open>
									</div>
									<div>
										<strong>Close</strong>
										<cq-hu-close></cq-hu-close>
									</div>
									<div>
										<strong>High</strong>
										<cq-hu-high></cq-hu-high>
									</div>
									<div>
										<strong>Low</strong>
										<cq-hu-low></cq-hu-low>
									</div>
								</div>
							</div>
						</cq-hu-dynamic>
					</div>
				</div>
			</div>

			<cq-abstract-marker cq-type='helicopter'></cq-abstract-marker>

			{/* <cq-attribution></cq-attribution> */}

			{/* <div className='ciq-footer full-screen-hide'>
				<cq-share-button></cq-share-button>
				<cq-show-range></cq-show-range>
			</div> */}

			<div className='cq-context-dialog'>
				<cq-dialog>
					<cq-drawing-context></cq-drawing-context>
				</cq-dialog>

				<cq-dialog>
					<cq-study-context></cq-study-context>
				</cq-dialog>
			</div>
			<cq-side-panel></cq-side-panel>
		</>
	);
};

Template.prototype = {
	headsUp: PropTypes.element.isRequired,
	// getPluginToggles: PropTypes.element.isRequired,
};

export default Template;
