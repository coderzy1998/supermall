import axios from 'axios'

export function request(config)
{
  const instence =axios.create({
    baseURL:'新的接口加老师微信coderwhy002',
    timeout:5000
  })
  instence.interceptors.request.use(config =>{
    return config
  },error => {

  });
  instence.interceptors.response.use(res =>{
    return res.data
  },error => {

  });
  return instence(config)
}
