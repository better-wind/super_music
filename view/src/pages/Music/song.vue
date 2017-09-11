<template>
  <div class="music-box">
    <div class="song-wrap block-box">
      <div class="song-disc">
        <div class="song-img">
          <img :src="picUrl" alt="" :class="startPlay ? 'u-img img-rotate' : 'u-img  img-rotate-paused'" >
        </div>
        <span :class="startPlay ? 'btn-sign sign-rotate' : 'btn-sign'"></span>
      </div>
    </div>
    <div class="lyric-wrap block-box" >
      <div class="lyric-box" :style="'transform: translate3d(0,'+controlTime.lyricPre+',0);'">
        <p>{{songsMsg.name +'-'+ songsMsg.ar}}</p>
        <template v-for="(item,key) in lyricList">
          <p :class="controlTime.lyricIndex - 1 == key ? 'cur-lyric' : ''">{{item.lyric}}</p>
        </template>

      </div>

    </div>
    <div class="control-box">
      <div class="time-box">
        <span>{{controlTime.curTime}}</span>
        <div class="time-line">
          <span class="base-line"></span>
          <span class="current-line" :style="'width:'+controlTime.lineWidth"></span>
        </div>
        <span>{{controlTime.endTime}}</span>

      </div>
      <div class="menu-box">
        <span></span>
        <span></span>
        <span @click="callStartPlay">
          <div class="start">
            <div v-if="!startPlay" class="btn-start"></div>
            <div v-if="startPlay" class="btn-pause"></div>
            <!--<div class="btn-start"></div>-->
          </div>
        </span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div v-if="playerConfig.isShow" style="opacity: 0" class="player-box" @click="callStartPlay">
      <audio ref="audioPlay"  controls="controls" :src="playerConfig.src"></audio>
    </div>
  </div>
</template>
<script>
  import {mapActions} from  'vuex'
  export default{
    data:()=>({
      playerConfig:{
        isShow:false,
        src:''
      },
      picUrl:'',
      lyricList:[],
      songsMsg:{
        ar:'',
        name:''
      },
      startPlay:false,
      currentId:'',
      controlTime:{
        curTime:'00:00',
        endTime:'00:00',
        lineWidth:'0%',
        lyricIndex:0,
        lyricPre:'-0%'
      }
    }),
    filters:{
      replaceTime(str){
         return str.replace(/\[\d{2}:\d{2}.\d*\]/g,'')
      }
    },
    created(){
      this.initView()
    },
    methods:{
      ...mapActions(['getSongDetail','getLyricDetail','getSongUrl','getPicUrl']),
      initView(){
        this.currentId = this.$route.query.id
        this.callSongDetail(this.currentId)
        window.requestAnimationFrame(()=>{
//          this.watchAudio()
        })

      },
      callSongDetail(id){
        let _opt = {
          id
        }
        this.getSongUrl(_opt)
          .then((rs)=>{
            this.playerConfig.src = rs[0].url
            this.playerConfig.isShow = true
          })
        this.getSongDetail(_opt)
          .then((rs)=>{
            let _opt = {
                id:rs.songs[0].al.pic
            }

            this.songsMsg.name = rs.songs[0].name
            this.songsMsg.ar = rs.songs[0].ar[0].name
            return this.getPicUrl(_opt)
          })
          .then((rs)=>{
            this.picUrl = rs.url
          })
        this.getLyricDetail(_opt)
          .then((rs)=>{
            let _list = rs.lrc.lyric.split(/\n/)
            this.lyricList = []
            _list.map((item,idx)=>{
              if(item){
                let _str = item.match(/\[\d{2}:\d{2}.\d*\]/g)[0].replace(/(\[|\])/g,''),
                  _strArr = _str.split(':'),
                  _sec = Number(_strArr[0]) * 60 + Number(_strArr[1])
                let _opt = {
                  nth:idx,
                  time:_sec,
                  lyric:item.replace(/\[\d{2}:\d{2}.\d*\]/g,'')
                }
                this.lyricList.push(_opt)
              }
            })
          })
      },
      debounce(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },
      //实时监听播放器状态
      scrollLyric(time){
        let i = 0
        while(this.lyricList[i].time < time){
            i++
        }
        if(this.controlTime.lyricIndex != i){
          this.controlTime.lyricIndex = i
          this.controlTime.lyricPre = '-'+(i / this.lyricList.length  * 100).toFixed(2)+'%'
          console.log(this.controlTime.lyricPre)
        }

      },
      watchAudio(){
        if(this.$refs.audioPlay.paused){
            return false
        }
        if(this.$refs.audioPlay.readyState == 4){
          this.controlTime.lineWidth = (this.$refs.audioPlay.currentTime / this.$refs.audioPlay.duration * 100).toFixed(2) + '%'
          this.controlTime.curTime = this.transTime(this.$refs.audioPlay.currentTime)
          this.controlTime.endTime = this.transTime(this.$refs.audioPlay.duration)
          this.scrollLyric(this.$refs.audioPlay.currentTime)
        }


        window.requestAnimationFrame(()=>{
          this.debounce(this.watchAudio(),300)
        })
      },
      transTime(time){
         let _time = Number(time).toFixed(0),
             _min = _time == 0 ? _time : Math.floor(_time / 60),
             _sec = _time % 60
         return (_min < 10 ? '0' : '') + _min + ':' + (_sec < 10 ? '0' : '') + _sec
      },
      callStartPlay(){
        this.startPlay = !this.startPlay
        if(this.startPlay){
          this.$refs.audioPlay.play()
          this.watchAudio()
        } else {
          this.$refs.audioPlay.pause()
        }
      },
    },
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @function remChange($args) {
    @return  $args / 750 * 10rem;
  }
  .music-box{
    width: remChange(750);
    font-size: 14px;
    >.song-wrap{
      position: relative;
      margin:remChange(100) auto remChange(60);
     >.song-disc{
       width: remChange(500);
       height: remChange(500);
       margin: 0 auto;
       background-image: url('https://s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48');
       background-size: contain;
       >.song-img{
         position: absolute;
         top:50%;
         left:50%;
         width: remChange(310);
         height: remChange(310);
         transform: translate3d(-50%,-50%,0);
         >.u-img{
           width: 100%;
           vertical-align: middle;
           border-radius: 50%;

           &.img-rotate{
             animation: rotate-img 20000ms infinite linear;
             animation-delay: 1000ms;
           }
           &.img-rotate-paused{
             /*animation-play-state:paused;*/
           }

           @keyframes rotate-img  {
             0%{
               transform: rotate(0deg);
             }
             100%{
               transform: rotate(360deg);
             }
           }

         }
       }
       >.btn-sign:before{
         content: '';
         position: absolute;
         top:50%;
         left: 50%;
       }
       >.btn-sign{
         position: absolute;
         width: remChange(192);
         height: remChange(274);
         top:remChange(-100);
         left:48%;
         background-image: url('https://s3.music.126.net/m/s/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862');
         background-size: contain;
         transform-origin: 0 0;
         transform: rotate(-30deg);
         transition: all 1000ms ease;
         &.sign-rotate{
           transform: rotate(0deg);
         }
       }
     }
    }
    >.lyric-wrap{
      width: remChange(710);
      height: remChange(300);
      padding-top: remChange(40);
      overflow: hidden;
      margin: 0 auto;
      color:rgba(0,204,255,.4);
      .lyric-box{
        //transform: translate3d(0,-90%,0);
        transition: all 200ms ease;
        >p{
          text-align: center;
          padding: 2px 0;
          &.cur-lyric{
            font-size: 16px;
            color:rgba(0,204,255,1);
          }
        }
      }

    }

  }
  .control-box{
    position: fixed;
    bottom:0;
    left:0;
    width: remChange(750);
    padding: remChange(10) 0;
    background-color: rgba(153,204,153,.6);
    color: #fff;
    z-index: 99;
    >.time-box{
      width: remChange(710);
      line-height: remChange(40);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      >span{
        width: remChange(80);
        text-align: center;
        overflow: hidden;
      }
      >.time-line{
        position: relative;
        width: remChange(500);
        >.base-line,>.current-line{
          position: absolute;
          top:50%;
          left: 0;
          height: 2px;
          transform: translate3d(0,-50%,0);
          background-color: rgb(220,220,220);
          border-radius: 2px;
        }
        >.base-line{
          width: remChange(500);
        }
        >.current-line{
          transition: width 100ms ease;
          background-color: rgba(0,204,255,1);
        }
      }
    }
    >.menu-box{
      display: flex;
      justify-content: space-around;
      width: remChange(710);
      line-height: remChange(60);
      margin: 0 auto;
      >span{
        width: remChange(140);
        text-align: center;
        >div{
          &.start{
            position: relative;
            width: remChange(60);
            height: remChange(60);
            margin: 0 auto;
            border-radius: 50%;
            border:1px solid #FFF;
            >.btn-start{
              position: absolute;
              top:remChange(15);
              left:remChange(22);
              /*width: remChange(30);*/
              /*height: remChange(30);*/

              border-top: remChange(15) solid transparent;
              border-bottom: remChange(15) solid transparent;
              border-left: remChange(25) solid #fff;
              /*background-color: #FFF;*/
            }
            >.btn-pause{
              position: absolute;
              top:remChange(15);
              left:remChange(18);
              width: remChange(8);
              height: remChange(30);
              background-color: #FFF;
            }
            >.btn-pause:after{
              content: '';
              position: absolute;
              top:0;
              left:remChange(16);
              width: remChange(8);
              height: remChange(30);
              background-color: #FFF;
            }
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
    height: remChange(120);
  }
</style>
