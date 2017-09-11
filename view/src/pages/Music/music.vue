<template>
  <div class="music-box">
    <div class="block-box sign-box">
      Play play ...
    </div>
    <div class="block-box search-box">
      <input type="text" placeholder="Search..." v-model="searchParams.name" @input="callSearch">
    </div>
    <div class="result-box" @scroll="onScroll($event)">
      <div v-for="(item,key) in searchOpt.songs" @click="callSongDetail(item.id)">
        <p>{{item.name}}</p>
        <p>{{item.ar[0].name}} -- {{item.al.name}}</p>
      </div>
    </div>
    <div v-if="playerConfig.isShow" class="player-box">
      <audio ref="audioPlay" controls="controls" :src="playerConfig.src"></audio>
    </div>
  </div>
</template>
<script>
  import {mapActions} from  'vuex'
  export default{
    data:()=>({
      searchOpt:{
        songCount:0,
        songs:[]
      },
      searchParams:{
        name:'',
        page:1,
        rows:20,
      },
      scrollConfig:{
        isScroll:false,
        isEnd:false
      },
      playerConfig:{
        isShow:false,
        src:''
      },
    }),
    filters:{
      currentColor(data){

      },
    },
    created(){
      this.initView()
    },
    methods:{
      ...mapActions(['searchName','getSongDetail','getLyricDetail','getSongUrl']),
      initView(){

      },
      callSongDetail(id){
//        let _opt = {
//            id
//        }
        this.$router.push({
          name:'Song',
          query:{
              id
          }
        })
        return false
        this.getSongUrl(_opt)
          .then((rs)=>{
            this.playerConfig.src = rs[0].url
            this.playerConfig.isShow = true
          })
        this.getSongDetail(_opt)
          .then((rs)=>{
            console.log(rs)
          })
        this.getLyricDetail(_opt)
          .then((rs)=>{
            console.log(rs)
          })
      },
      callSearch(){
        if(!this.searchParams.name) {
          this.searchOpt = {
            songCount:'',
            songs:[]
          }
          return
        }
        this.searchOpt = {
          songCount:'',
          songs:[]
        }
        this.searchParams.page = 1
        this.scrollPage()
      },
      scrollPage(){
        this.scrollConfig.isScroll = true
        this.searchName(this.searchParams)
          .then((rs)=>{
            this.searchOpt.songCount = rs.songCount
            this.searchOpt.songs = this.searchOpt.songs.concat(rs.songs)

            this.scrollConfig.isScroll = false
          })
      },
      callPageScroll(){
        if(this.scrollConfig.isScroll) return
        this.searchParams.page ++
        this.scrollPage()
      },
      onScroll(){
        let offsetHeight = event.currentTarget.offsetHeight,
          scrollHeight = event.target.scrollHeight,
          scrollTop = event.target.scrollTop,
          scrollBottom = offsetHeight + scrollTop
        if(offsetHeight + scrollTop + 50 >= scrollHeight){
          this.callPageScroll()
        }
      },
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @function remChange($args) {
    @return  $args / 750 * 10rem;
  }
  .music-box{
    width: remChange(750);
    font-size: 14px;
    >.sign-box{
      width: remChange(750);
      height: remChange(60);
      line-height: remChange(60);
      text-align: center;
      //background-color: rgba(0,204,255,.9);
    }
    >.search-box{
      width: remChange(500);
      margin: remChange(10) auto remChange(50);
      >input{
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
    }
    >.result-box{
      width: remChange(710);
      margin: 0 auto;
      height: remChange(1020);
      overflow-y:scroll;
      /*border-bottom: 1px solid #000;*/
      >div{
        padding: 8px 0;
        transition: all linear 300ms;
        border-top: 1px solid rgba(153,204,153,.5);
        >p{
          font-size: 12px;
          color:rgba(153,204,153,.9);
          &:first-child{
            margin-bottom: 2px;
            font-size: 15px;
            color: rgba(0,204,255,.9);
          }
        }
      }
    }

  }
  .player-box{
    position: fixed;
    bottom:0;
    left:0;
    width: remChange(750);
    height: remChange(100);
    >audio{
      width: remChange(750);
      height: remChange(100);
    }
  }
</style>
