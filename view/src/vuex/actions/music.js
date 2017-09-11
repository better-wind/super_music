import baseActions from './base'

export default {
  searchName({commit},rs){
    const opts = {
      url:'/nateAPI/search',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  getSongDetail({commit},rs){
    const opts = {
      url:'/nateAPI/songsDetail',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  getLyricDetail({commit},rs){
    const opts = {
      url:'/nateAPI/lyricDetail',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  getSongUrl({commit},rs){
    const opts = {
      url:'/nateAPI/songUrl',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  },
  getPicUrl({commit},rs){
    const opts = {
      url:'/nateAPI/picUrl',
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:baseActions.formData(rs)
    }
    return baseActions.fetch(commit,opts)
  }
}
