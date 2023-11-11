const map:Record<string,string> = {
  'Too Many Requests':"操作太频繁"
}

export const getFriendlyError = (error:string) => {
  // console.log(error);
  return map[error] || error
}