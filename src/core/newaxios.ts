import axios from "axios";
import { HOST_WALLET } from "../constants/endpoint-constants";

const baseURL = HOST_WALLET;

const tokenAxios = axios.create({
    baseURL
});
//call service ví
tokenAxios.interceptors.request.use((config) => {
    // const jwtTokent = localStorage.getItem("token");
    //fake token để test
    const jwtTokent =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoic3lzdGVtQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTcyMzAwNDMzODAwMCwiZXhwIjoxNzIzMDA0MzM4MDAwfQ.l2FsSh_pgRyqihx9M8h-XQ80eVSgR0EbPugPW93USBWNoXDaqRuwHTz-77uljlUx5ADEDW4CwFv6Zv5DpET_VemrAlh4hSVpy6TyZ5dgMztsxF0Zg6DKCXFRchCTJfa9B3JlINyxdc3TkmZ8Cfmqdv1OJ5ldGzpmpupQAzAKYsVOVjBIZkwPQB_6PiUlucP66BP1gzqcxrXlicqFsI2IWx1P2FqY9EUqwzqvTLt21uReIYb_vG_0loasAbJPs3pCTTOGkvEFu_j47nfrn8ThC3MPVUyOURN1GmSvTvtwXqpFc1O4uQhEBaJlCprXSGTlffiDYADUIXdb11tNZ9ATtg";

    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtTokent}`
        }
    };
});

export default tokenAxios;
