import { CIQ, i18n } from 'chartiq/js/standard';

CIQ.activateImports(i18n);
// Supported languages object, see documentation in i18n.js
CIQ.I18N.languages = {
	en: 'English',
	ko: '한국어',
	// ar: 'عربى',
	// fr: 'Français',
	// de: 'Deutsche',
	// hu: 'Magyar',
	// it: 'Italiano',
	// pt: 'Português',
	// ru: 'русский',
	// es: 'Español',
	// zh: '中文',
	// ja: '日本語',
};

const csvFile = `en,ar,fr,de,hu,it,pt,ru,es,zh,ja,ko\nChart,الرسم البياني,Graphique,Darstellung,Diagram,Grafico,Gráfico,График,Gráfica,图表,チャート,차트\nChart Style,أسلوب الرسم البياني,Style de graphique,Darstellungsstil,Diagram stílusa,Stile grafico,Estilo do gráfico,Тип графика,Estilo de gráfica,图表类型,チャート形式,차트스타일\n1 D,1ي,,,,,,,,,,1일\n1 W,,,,,,,,,,,1 주\n1 Mo,,,,,,,,,,,1 달\n1 Min,,,,,,,,,,,1 분\n5 Min,,,,,,,,,,,5 분\n10 Min,,,,,,,,,,,10 분\n15 Min,,,,,,,,,,,15 분\n30 Min,,,,,,,,,,,30 분\n1 Hour,,,,,,,,,,,1 시간\n4 Hour,,,,,,,,,,,4 시간\n1 Sec,,,,,,,,,,,1 초\n10 Sec,,,,,,,,,,,10 초\n30 Sec,,,,,,,,,,,30 초\n250 MSec,,,,,,,,,,,250 MSec\n1M,,,,,,,,,,,1달\n1m,,,,,,,,,,,1분\n5m,,,,,,,,,,,5분\n10m,,,,,,,,,,,10분\n15m,,,,,,,,,,,15분\n30m,,,,,,,,,,,30분\n1h,,,,,,,,,,,1시간\n4h,,,,,,,,,,,4시간\n1s,,,,,,,,,,,1초\n10s,,,,,,,,,,,10초\n30s,,,,,,,,,,,30초\n1D,,,,,,,,,,,1일\n1W,,,,,,,,,,,1주\n1Mo,,,,,,,,,,,1달\n1Min,,,,,,,,,,,1분\n5Min,,,,,,,,,,,5분\n10Min,,,,,,,,,,,10분\n15Min,,,,,,,,,,,15분\n30Min,,,,,,,,,,,30분\n1Hour,,,,,,,,,,,1시간\n4Hour,,,,,,,,,,,4시간\n1Sec,,,,,,,,,,,1초\n10Sec,,,,,,,,,,,10초\n30Sec,,,,,,,,,,,30초\n250MSec,,,,,,,,,,,250MSec\nShare,,,,,,,,,,,스냅샷\nPrice,,,,,,,,,,,가격\nOpen,,,,,,,,,,,시가\nClose,,,,,,,,,,,종가\nVol,,,,,,,,,,,거래량\nHigh,,,,,,,,,,,고가\nLow,,,,,,,,,,,저가\nDate,,,,,,,,,,,날짜\nDisplay,,,,,,,,,,,Display\nStudies,,,,,,,,,,,지표\nCandle,,,,,,,,,,,캔들\nBar,,,,,,,,,,,바
`;

export const month = {
	en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
};

export const monthLetter = {
	en: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
	ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
};

//CIQ.I18N.setLocale(stx, language);
CIQ.I18N.convertCSV(csvFile);
CIQ.I18N.setLanguage = (stx, language, translationCallback, csv, root) => {
	const stxx = stx;
	let callback = translationCallback;

	CIQ.I18N.language = language;
	stxx.monthAbv = month[language];
	stxx.monthLetters = monthLetter[language];

	if (!translationCallback) {
		callback = CIQ.I18N.translate;
	}
	stxx.translationCallback = callback;

	setTimeout(() => {
		CIQ.I18N.translateUI(language, root);
	}, 100);
};

export { CIQ };
