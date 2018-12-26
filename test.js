import axios from 'axios'

axios({
    method:'get',
    url:'http://192.168.20.151:9000/API/Attendance/getTime.htm'
}).then(res=>{
    console.log(res.data)
})
