//server端请求
import serverHttp from 'SERVERHTTP'

export default function (req) {
    return serverHttp(req,{
        method:'get',
        url:'/API/Attendance/getTime.htm'
    })

}