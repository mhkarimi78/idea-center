import axios from "axios";

const baseURL =
  // process.env.NODE_ENV === 'development'
  //   ?
  "http://188.121.108.189:1919/";
// : `https://${process.env.SITE_NAME}/api`

const publicFetch = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    proxy: "http://localhost:3000",
  },
});

export { publicFetch, baseURL };
