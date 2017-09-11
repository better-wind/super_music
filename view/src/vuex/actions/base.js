import axios from 'axios'
const fetch = (commit,opts,fn)=>{
  return new Promise((resolve)=>{
    axios(opts).then((response)=>{
      if(response.data.code == 200){
        fn && commit(fn,response.data)
        resolve && resolve(response.data.data)
      } else {
        setToast(commit)
      }
    })
      .catch((err)=>{
        console.log(err)
        setToast(commit)
      })
  })

}
const formData = (opts) => {
  let data = [];
  for(let i in opts){
    data.push(i + '='+opts[i])
  }
  return data.join('&');
}
const startLoading = (commit,rs)=>{
  console.log('start...')
}

const endLoading = (commit,rs)=>{
  console.log('end...')
}
const setToast = (commit,rs)=>{
  console.log('提示')
}
export default {
  fetch:fetch,
  formData:formData
}
