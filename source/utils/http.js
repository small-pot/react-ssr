import axios from 'axios';


const http=axios.create({
  timeout:3000,
  baseURL:'/API/Attendance',
  headers:{'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest:[
    function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }
  ]
})
http.interceptors.response.use((response) => {
  return response.data;
})
export default function(opt){
  return new Promise((resolve, reject) => {
    http(opt).then(res=>{
      if(res.success){
        resolve(res.data)
      }else{
        reject(res)
      }
    })
  })
};
