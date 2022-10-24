export const sgKey = import.meta.env.VITE_SENDGRID_API_KEY;
export const prod = import.meta.env.VITE_PROD;

export let strapiKey = import.meta.env.VITE_STRAPI_PUB_KEY_LOCAL;
export let yocoPubKey = import.meta.env.VITE_YOCO_TEST_PUBLIC_KEY;
export let BASE_API_URL = "http://localhost:1337";
export let API_URL = "http://localhost:1337/api";
export let sendgridList = "57df636d-5399-423f-bf72-35424b5644b5";
if (prod == "true"){
    strapiKey = import.meta.env.VITE_STRAPI_PUB_KEY;
    BASE_API_URL = "https://tt-strapi.glass.thinkteacher.co.za";
    API_URL = "https://tt-strapi.glass.thinkteacher.co.za/api";
    sendgridList = "75b1cd1c-6bb0-406b-bc94-d7c2f04bc9f8";
    yocoPubKey = import.meta.env.VITE_YOCO_LIVE_PUBLIC_KEY;
} 