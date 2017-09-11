import axios from 'axios'
export default {
  fetch:(opts,fn)=>{
    return new Promise((resolve)=>{
      axios(opts).then((response)=>{
        fn && fn(response,resolve)
      })
        .catch((err)=>{
          console.log(err)
        })
    })

  }
}
