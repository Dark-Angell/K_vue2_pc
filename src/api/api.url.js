import axios from "axios";

const BASE_URL = 'http://wap-stock.cc/'
const TIMEOUT_MILLISECONDS = 60000 // 超时链接

const instance = axios.create({
  baseURL: BASE_URL, // 基本url
  timeout: TIMEOUT_MILLISECONDS,
  headers: {
		'Content-Type': 'application/json',
	}
})

instance.interceptors.request.use(
  config => {
    console.log(config)
  },
  error => {
    console.log(error)
  }
)

instance.interceptors.response.use(
  response => {
    
  },
  error => {

  }
)