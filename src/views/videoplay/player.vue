<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>
<script>
import VideoPlayer from "./VideoPlayer";

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: "false", //"muted", //自动播放
        controls: true, //用户可以与之交互的控件
        loop: true, //视频一结束就重新开始

        muted: false, //默认情况下将使所有音频静音
        aspectRatio: "16:9", //显示比率
        muted: false, // 是否静音
        fullscreen: {
          options: { navigationUI: "hide" },
        },
        controlBar: {
          // 设置控制条组件
          /* 设置控制条里面组件的相关属性及显示与否
            'currentTimeDisplay':true,
            'timeDivider':true,
            'durationDisplay':true,
            'remainingTimeDisplay':false,
            volumePanel: {
            inline: false,
            }
            */
          /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
          children: [
            { name: "playToggle" }, // 播放按钮
            { name: "currentTimeDisplay" }, // 当前已播放时间
            { name: "progressControl" }, // 播放进度条
            { name: "durationDisplay" }, // 总时间
            {
              // 倍数播放
              name: "playbackRateMenuButton",
              playbackRates: [0.5, 1, 1.5, 2, 2.5],
            },
            {
              name: "volumePanel", // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: "FullscreenToggle" }, // 全屏
          ],
        },
        sources: [
          {
            src: require("D:\\Projectpicture\\websiteimages\\finshvideo\\skocawbiw2pfjo9a.mp4"),
            type: "video/mp4",
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
.vjs-big-play-centered .vjs-big-play-button {
  margin-top: -1.5em;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
</style>