//date = new Date()为默认值写法
export const time = (date = new Date())=>{
  const api = {
    format:(pattern:string = "YYYY-MM-DD")=>{
      //目前支持的格式有 YYYY MM DD HH mm ss SSS
      const year = date.getFullYear()
      //Mounth从0开始的
      const month = date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const msecond = date.getMilliseconds()
      return pattern.replace(/YYYY/g,year.toString())
          //如果数字少于两位会补充一位
        .replace(/MM/,month.toString().padStart(2,'0'))
        .replace(/DD/,day.toString().padStart(2,'0'))
        .replace(/HH/,hour.toString().padStart(2,'0'))
        .replace(/mm/,minute.toString().padStart(2,'0'))
        .replace(/ss/,second.toString().padStart(2,'0'))
        .replace(/SSS/,msecond.toString().padStart(3,'0'))
    }
  }
  return api
}