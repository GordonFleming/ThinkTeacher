import { 
    PUBLIC_PROD,
} from '$env/static/public';

// API Configuration
export const BASE_API_URL = (PUBLIC_PROD === "true" || PUBLIC_PROD === true) 
  ? 'https://tt-strapi.glass.thinkteacher.co.za'
  : 'http://127.0.0.1:1337';

export const API_URL = `${BASE_API_URL}/api`;

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