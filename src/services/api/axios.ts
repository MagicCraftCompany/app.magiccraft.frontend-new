import axios, { Axios, AxiosError } from 'axios'
// import { setModal } from "../components/Modal/Modal";
// import LoginExpiredModal from "../components/Modal/modals/LoginExpiredModal";
// import { setModal } from "../components/Modal/Modal";
import {
  VITE_MARKETPLACE_BACK_URL,
  AUTH_TOKEN_LOCAL_STORAGE_KEY,
} from '@/lib/constants'
// import produce from "immer";

const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)

axios.defaults.baseURL = VITE_MARKETPLACE_BACK_URL
axios.defaults.headers.common['Authorization'] = token ? token : null

export default axios

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const isAxiosError = error instanceof AxiosError
    const isTokenExpiredError =
      (
        error as AxiosError<{
          error: string
        }>
      ).response?.data.error === 'jwt expired'
    const isUnauthorizedError =
      (
        error as AxiosError<{
          error: string
        }>
      ).response?.data.error === 'Unauthorized access, please login'

    console.log(error)
    if (isAxiosError && (isTokenExpiredError || isUnauthorizedError)) {
      localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, '')
      axios.defaults.headers.common['Authorization'] = undefined

      // return new Promise((resolve, reject) => {
      //   setModal({
      //     title: isTokenExpiredError
      //       ? "You login session has expired"
      //       : "Log in to continue",
      //     onClose: () => {
      //       reject(error);
      //     },
      //     content: () => (
      //       <LoginExpiredModal
      //         afterLogin={() => {
      //           if (!error.config) return reject(error);
      //           const changed = produce(error.config, () => {
      //             if (error.config) {
      //               error.config.headers["Authorization"] =
      //                 localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
      //             }
      //           });
      //           resolve(axios.request(changed));
      //         }}
      //       />
      //     ),
      //   });
      // });
    } else {
      return Promise.reject(error)
    }
  }
)
