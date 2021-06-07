// 时间格式化
export const formatTime=(Timestamp:string | number,fmt:string):string|null=>{
  if (Timestamp <= 0) {
    return null
  } else if (Timestamp == null || undefined) {
    return null
  }
  const getDate = new Date(+Timestamp)
  const o:any = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  }
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (getDate.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(const k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt 
}
// 金额格式化 / 数字格式化
type Tmoney = number | string
export const formatAmount=(num:Tmoney,type = ','):Tmoney=>{
  if(!num){return 0;} 
  const strSum = num.toString()
  let num_top = strSum.split(".")[0]
  const num_tail = strSum.indexOf(".") > -1 ? strSum.split(".")[1] : '0'
  let result = ''
  while (num_top.length > 3) {
    result = type + num_top.slice(-3) + result;
    num_top = num_top.slice(0, num_top.length - 3);
  }
  num_top && (result = num_top + result); 
  return +num_tail ? result + '.' + num_tail : result;
}

