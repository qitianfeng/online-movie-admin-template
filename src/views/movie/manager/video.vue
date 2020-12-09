<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新电影</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写电影基本信息" />
      <el-step title="添加电影视频" />
      <el-step title="发布电影" />
    </el-steps>
    <el-button type="text" @click="openVideo()">添加电影</el-button>
    <ul class="chanpterList" v-if="a.id">
      <li>
        <p>
          {{ a.title }}
          <span class="acts">
            <el-button type="text" @click="removeVideo(a.id)">删除</el-button>
          </span>
        </p>
      </li>
    </ul>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加电影">
      <el-form :model="movieVideo" label-width="120px">
        <el-form-item label="上传视频">
          <!-- action 修改为自定义上传接口localhost:8849/movieVod/video/uoloadVideo
          
            on-success :handleVodUploadSuccess2
            -->
          <el-upload
            class="upload-demo"
            :on-success="handleVodUploadSuccess"
            :action="BASE_API + '/movieVod/video/uploadVideoToAliyun'"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，
                <br />支持3GP、ASF、AVI、DAT、DV、FLV、F4V、
                <br />GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、
                <br />MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、
                <br />SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>

              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import videos from "@/api/movie/video.js";
let judge = false;
let movieId = "";
export default {
  data() {
    return {
      fileList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      movieId: "",
      chapterNestList: [],
      saveBtnDisabled: false, // 保存按钮是否禁用
      saveVideoBtnDisabled: false,

      movieVideo: {
        id: "",
        movieId: "",
        title: "",
        videoSourceId: "",
        videoOriginalName: "",
      },
      a: {
        id: "",
        movieId: "",
        title: "",
        videoSourceId: "",
        videoOriginalName: "",
      },
      dialogVideoFormVisible: false, //小节弹框
    };
  },
  created() {
    //获取路由id值

    if (this.$route.params && this.$route.params.id) {
      this.movieId = this.$route.params.id;
      console.log(this.movieId);
    }
    this.getVideoById();
  },
  methods: {
    getVideoById() {
      videos.getVideoId(this.movieId).then((res) => {
        this.movieVideo = res.data.video;
      });
      // console.log("---------------", this.video.title);
    },
    handleRemove() {
      //调用接口的删除视频的方法
      videos.deleteVideoById(this.video.videoSourceId).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "删除视频成功!",
        });
        //把文件列表清空
        this.fileList = [];
        //把video视频id和视频名称值清空
        //上传视频id赋值
        this.video.videoSourceId = "";
        //上传视频名称赋值
        this.video.videoOriginalName = "";
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },

    //视频上传成功回调
    handleVodUploadSuccess(response, file, fileList) {
      console.log("hello");
      console.log(this.a);
      this.a.videoSourceId = response.data.videoId;
      // console.log("=================" + this.video.videoSourceId);
      this.a.videoOriginalName = file.name;
    },

    //视频上传成功回调
    handleVodUploadSuccess2(response, file, fileList) {
      console.log("hello");
      console.log(this.a);
      this.a.videoSourceId = response.data.videoId;

      // console.log("=================" + this.video.videoSourceId);
      this.a.videoOriginalName = response.data.newVideopath;
    },

    handleExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },

    removeVideo(id) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        videos.deleteVideoById(id).then((response) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getVideoById();
        });
      }); //点击取消，执行catch方法
    },
    //添加弹框的方法
    openVideo() {
      //弹框
      console.log("弹框", this.movieId, this.a.title);

      this.dialogVideoFormVisible = true;
      //表单数据清空
      this.a.title = "";
      this.a.movieId = this.movieId;
      this.judge = true;
      //弹框
      this.dialogVideoFormVisible = true;
      // this.movieVideo.videoSourceId = "";
      // this.movieVideo.videoOriginalName = "";
      console.log(this.a);
    },
    getVideoId() {
      videos.getVideoId(this.movieId).then((res) => {});
    },
    addVideo() {
      console.log("-------------------------------", this.video);
      //把文件列表清空
      this.fileList = [];
      //设置id
      this.a.movieId = this.movieId;
      videos.addVideo(this.a).then((response) => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.dialogVideoFormVisible = false;
        this.a = response.data.video;
        // //刷新页面
      });
    },

    saveOrUpdateVideo() {
      this.addVideo();
    },

    previous() {
      this.$router.push({ path: "/movie/manager/info/" + this.movieId });
    },
    next() {
      //跳转到第二步
      this.$router.push({ path: "/movie/manager/publish/" + this.movieId });
    },
  },
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>