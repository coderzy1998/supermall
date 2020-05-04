import axios from 'axios'

export function request(config)
{
  const instence =axios.create({
    baseURL:'http://152.136.185.210:8000/api/h8',
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
