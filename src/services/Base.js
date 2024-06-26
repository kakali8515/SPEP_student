// dev server base url
export const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL || "https://spep-stdnt-api-dev.dvconsulting.org/";
export const CLIENT_BASE_URL = import.meta.env.VITE_APP_CLIENT_BASE_API_URL || "https://exi.spep.co.kr/";
export const API_Key = import.meta.env.VITE_APP_X_API_KEY || "W80SIIfQEEdvbNE2tcXtIfATNRuQuUiGx0gngSMoi9UHphKh6ycjz51IWgv3lE5l"
export const CHAT_BASE_URL = import.meta.env.VITE_APP_CHAT_BASE_API_URL || "https://sppcht-api.dvconsulting.org/";
// concat the api base url
export const API_BASE_URL = `${BASE_URL}api/v1/`;
export const CLIENT_API_BASE_URL = `${CLIENT_BASE_URL}api/mobile/`;
export const COOKIE_DOMAIN = import.meta.env.VITE_APP_COOKIE_DOMAIN || ".dvconsulting.org";
export const CHAT_API_BASE_URL = `${CHAT_BASE_URL}api/v1/`;