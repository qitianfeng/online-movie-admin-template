<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新电影</h2>

    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写电影基本信息" />
      <el-step title="添加电影视频" />
      <el-step title="发布电影" />
    </el-steps>

    <div>
      <div class="ccInfo">
        <img :src="moviePublish.poster" />
        <div class="main">
          <h2>{{ moviePublish.title }}</h2>

          <p class="gray">
            <span>共{{ moviePublish.runtime }}分钟</span>
          </p>

          <p>
            <span
              >{{ moviePublish.subjectLevelOne }} : —
              {{ moviePublish.subjectLevelTwo }}</span
            >
          </p>
          <p>
            <span
              >{{ moviePublish.subjectLevelOneYear }}: —
              {{ moviePublish.subjectLevelTwoYear }}</span
            >
          </p>
          <p>
            <span
              >{{ moviePublish.subjectLevelOneGenres }} : —
              {{ moviePublish.subjectLevelTwoGenres }}</span
            >
          </p>
          演员列表
          <p style="color: red" v-html="moviePublish.actors"></p>
          导演列表：
          <p
            style="color: red; margin-top: -10px"
            v-html="moviePublish.directors"
          ></p>
        </div>
        <h3 class="ccInfo h3">价格:￥{{ moviePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>

      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish"
        >发布电影</el-button
      >
    </div>
  </div>
</template>

<script>
import movie from "@/api/movie/movie.js";
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "", // 所属课程
      moviePublish: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //获取路由id值
      if (this.$route.params && this.$route.params.id) {
        this.movieId = this.$route.params.id;
        //调用根据id查询电影的方法
        this.fetchMoviePublishInfoById();
      }
    },
    fetchMoviePublishInfoById() {
      movie
        .getMoviePublishInfoById(this.movieId)
        .then((response) => {
          this.moviePublish = response.data.publish;
          console.log(this.moviePublish);
          console.log(response.data.publish);
        })
        .catch((err) => {});
    },
    previous() {
      console.log("previous");
      this.$router.push({ path: "/movie/manager/video/" + this.movieId });
    },
    publish() {
      this.$confirm("此操作将发布电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        movie.publishMovie(this.movieId).then((response) => {
          //提示信息
          this.$message({
            type: "success",
            message: "发布成功!",
          });
          //跳转页面
          this.$router.push({ path: "/movie/manager/list" });
        });
      });
    },
  },
};
</script>
<style scoped>
.ccInfo {
  background: #f5f5f5;

  padding: 20px;

  overflow: hidden;

  border: 1px dashed #ddd;

  margin-bottom: 40px;

  position: relative;
}

.ccInfo img {
  background: #d6d6d6;

  width: 550px;

  height: 408x;

  display: block;

  float: left;

  border: none;
}

.ccInfo .main {
  margin-left: 590px;
}

.ccInfo .main h2 {
  font-size: 28px;

  margin-bottom: 30px;

  line-height: 1;

  font-weight: normal;
}

.ccInfo .main p {
  margin-bottom: 10px;

  word-wrap: break-word;

  line-height: 24px;

  max-height: 48px;

  overflow: hidden;
}

.ccInfo .main p {
  margin-bottom: 10px;

  word-wrap: break-word;

  line-height: 24px;

  max-height: 48px;

  overflow: hidden;
}

.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>