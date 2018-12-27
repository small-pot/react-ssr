import serverHttp from 'SERVERHTTP'
import axios from 'axios'

async function getTime () {
    let data=await axios({
        method:'get',
        url:'http://192.168.20.151:9000/API/Attendance/getTime.htm'
    })
    return data.data
}

(async function f() {
    let data=await getTime()
    console.log(data)
})()