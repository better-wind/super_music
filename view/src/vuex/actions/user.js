import baseActions from './base'

export default {
  getLogin({commit},rs){
    const opts = {
      url:'/MusicAPI/user/login',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  checkUser({commit},rs){
    const opts = {
      url:'/MusicAPI/user/check',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  createUser({commit},rs){
    const opts = {
      url:'/MusicAPI/user/create',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },

}
