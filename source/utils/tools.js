export function timeFormatToS(t) {
  const time=new Date(t)
  const h=time.getHours();
  const m=time.getMinutes();
  const s=time.getSeconds();
  return `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`
}
export function timeFormatToM(t) {
  return timeFormatToS(t).replace(/:\d{2}$/,'')
}
export function dateFormat(t) {
  const time=new Date(t);
  const y=time.getFullYear();
  const m=time.getMonth()+1;
  const d=time.getDate();
  return `${y}-${m<10?'0'+m:m}-${d<10?'0'+d:d}`
}
export function getLatLon(callback) {
  window.checkLatLon=(latlon)=>{
    callback(latlon)
  }
  LeKeBridge.getLatLon('checkLatLon')
}
