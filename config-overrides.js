/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, addWebpackPlugin, override, overrideDevServer, watchAll, disableEsLint } = require('customize-cra');
const webpack = require('webpack');

module.exports = {
	webpack: override(
		addWebpackPlugin(
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
		),
		useBabelRc(),
		disableEsLint(),
	),
	devServer: overrideDevServer(
		// dev server plugin
		watchAll(),
	),
};
