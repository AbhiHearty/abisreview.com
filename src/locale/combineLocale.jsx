import {avaliableLanguages} from './index';

export const combineLocale = (locale) => {
    let combineAll = {};
    for (var key in avaliableLanguages) {
        combineAll[key] = {};
    }
    for (var key in locale) {
        for (var lang in locale[key]) {
            if(combineAll.hasOwnProperty(lang))
            combineAll[lang][key] = locale[key][lang];
        }
    }
    return combineAll;
}