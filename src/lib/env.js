// export const sgKey = import.meta.env.PUBLIC_SENDGRID_API_KEY;
export const PUBLIC_PROD = import.meta.env.PUBLIC_PROD === true || import.meta.env.PUBLIC_PROD === 'true';

// API Configuration
export const BASE_API_URL = PUBLIC_PROD 
  ? 'https://tt-strapi.glass.thinkteacher.co.za'
  : 'http://127.0.0.1:1337';

export const API_URL = `${BASE_API_URL}/api`;

// API Keys
export const STRAPI_KEY = PUBLIC_PROD
  ? import.meta.env.VITE_STRAPI_PUB_KEY
  : import.meta.env.VITE_STRAPI_PUB_KEY_LOCAL;

export const YOCO_PUB_KEY = PUBLIC_PROD
  ? import.meta.env.VITE_YOCO_LIVE_PUBLIC_KEY
  : import.meta.env.VITE_YOCO_TEST_PUBLIC_KEY;

export const toastSuc = {
    theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(72,187,120,0.9)",
        "--toastBarBackground": "#2F855A",
    },
};

export const toastErr = {
    theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "#d83b1c",
        "--toastBarBackground": "#332307",
    },
};