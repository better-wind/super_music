<template>
  <div class="Home">

  </div>
</template>

<script>
  import {mapActions} from  'vuex'
  export default {
    name: 'Home',
    data:()=>({

    }),
    created(){
      this.initView()
    },

    methods:{
      ...mapActions(['checkUser']),
      initView(){
        this.checkUser()
          .then((rs)=>{
            let _link = 'login'
            if(rs){
                _link = 'music'
            }
            console.log(_link)
            this.$router.push({
              path: _link,
            })
          })
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss">


</style>
