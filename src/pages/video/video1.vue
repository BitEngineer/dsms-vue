<template>
    <div class="player">
        <ul @click="selectVideo">
            <li class="video-item"><a href="#">HKS</a></li>
            <li class="video-item"><a href="#">channel</a></li>
            <li class="video-item"><a href="#">channel2</a></li>
            <li class="video-item"><a href="#">CCTV-1</a></li>
            <li class="video-item"><a href="#">CCTV-5</a></li>
        </ul>
        <videojs-player  class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true">
        </videojs-player>
    </div>
</template>

<script>
  // videojs在初始化播放器的时候一定要指定播放源，否则会报错
  // VIDEOJS: ERROR: (CODE:4 MEDIA_ERR_SRC_NOT_SUPPORTED) No compatible source was found for this media.
  export default {
    data() {
      return {
        playerOptions: {
          height: '360',
          autoplay: true,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          flash: {
            swf: "static/videojs-swf_5.4.1_video-js.swf"
          },
          sources: [{
            type: "rtmp/flv",
            src: "",
          }],
        }
      }
    },
    mounted() {
      
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
        selectVideo: function(event) {
            var target = event.target;
            var text = target.text;
            if("HKS" === text) {
                this.playerOptions.sources = [{
                    type: "rtmp/flv",
                    src: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                }];
            }else if("channel" === text) {
                this.playerOptions.sources = [{
                    type: "rtmp/flv",
                    src: "rtmp://localhost:10935/hls/stream_1",
                }];
            }else if("channel2" === text) {
                this.playerOptions.sources = [{
                    type: "rtmp/flv",
                    src: "rtmp://47.100.195.118:10935/hls/stream_1",
                }];
            }
        }
    }
  }
</script>