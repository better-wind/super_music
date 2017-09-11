<template>
  <div class="login-box">
    <div class="item-box">
      <input type="text" v-model="loginRs.name" placeholder="Username...">
    </div>
    <div class="item-box">
      <input type="password" v-model="loginRs.pwd" placeholder="Password...">
    </div>
    <div class="item-box">
      <button @click="callLogin">Login</button>
      <button @click="callRegist">Regist</button>
    </div>
  </div>
</template>
<script>
  import {mapActions} from  'vuex'
  export default{
    data:()=>({
      loginRs:{
        name:'',
        pwd:''
      }


    }),

    methods:{
      ...mapActions(['getLogin','createUser']),
      callLogin(){
        this.getLogin(this.loginRs)
          .then(()=>{
            this.$router.push({
              path: 'music',
            })
          })
      },
      callRegist(){
        this.createUser(this.loginRs)
          .then(()=>{
            this.$router.push({
              path: 'music',
            })
          })
      },
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @function remChange($args) {
    @return  $args / 750 * 10rem;
  }
  .login-box{
    width: remChange(750);
    margin-top: remChange(200);
    >.item-box{
      width: remChange(500);
      margin: remChange(30) auto;
      >input,>button{
        width: remChange(500);
        appearance:none;
        line-height: remChange(60);
        font-size: remChange(28);
        color: rgba(0,204,255,.9);
        text-indent: 10px;
        /*background-color:rgba(255,255,153,.5);*/
        /*border: 1px solid rgba(255,255,153,1);*/
        border: 1px solid rgba(153,204,153,1);
        border-radius: 4px;
      }
      >button{
        margin-bottom: remChange(60);
      }
    }

  }
</style>
