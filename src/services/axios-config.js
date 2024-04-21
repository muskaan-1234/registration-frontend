import axios from "axios";

let baseURL = "http://localhost:2024";

const publicReq=axios.create({baseURL,});

const privateReq=axios.create({baseURL,});

export {publicReq,privateReq};