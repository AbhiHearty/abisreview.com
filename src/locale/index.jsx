import LocalizedStrings from 'react-localization';
import {combineLocale} from './combineLocale';
import {common} from './common';
import {home} from './home';

export const avaliableLanguages = {en: 'English',ta: 'Tamil'}
export const locale = new LocalizedStrings(
    combineLocale({
        common: common,
        home: home,
    })
);

if ((typeof localStorage.getItem('language') === 'string')) {
    locale.setLanguage(localStorage.getItem('language'));
}