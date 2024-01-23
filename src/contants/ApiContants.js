const COUNTRY_FLAG = {
  BASE_URL: `https://flagcdn.com/`,
  SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
  STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};
const STATIC_IMAGE = {
  BASE_URL: `http://10.0.2.2:5000/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

const BACKEND_API = {
  BASE_API_URL: 'http://10.0.2.2:5000',
  REGISTER: '/user/register',
  LOGIN: '/user/login',
  USER_EXITS: '/user/user-exist',
  CATEGORY: '/category',
  USER: '/user',
  PRODUCTS: '/product',
  REFRESH_TOKEN: '/refresh',
  CART: '/user/cart',
  POSTCART: '/user/user-cart',
};
export default {COUNTRY_FLAG, STATIC_IMAGE, BACKEND_API};
