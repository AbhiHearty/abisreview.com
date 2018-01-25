export const AJAX = 'AJAX_';
export const HOME = 'HOME';
export const BANNER = 'BANNER';

export const loadHome = (data) => ({
    type: AJAX + HOME,
    payload: { type: 'GET', url: 'get_home',service:'VPLAY_API' }
});

export const loadBanner = (data) => ({
    type: AJAX + BANNER,
    payload: { type: 'GET', url: 'get_banner',service:'VPLAY_API' }
});