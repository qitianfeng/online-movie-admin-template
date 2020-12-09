<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新电影</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写电影基本信息" />
      <el-step title="添加电影视频" />
      <el-step title="发布电影" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="电影名">
        <el-input
          v-model="movieInfo.title"
          placeholder=" 示例：当幸福来敲门，名称注意大小写"
        />
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="电影分类" class="m-small">
        <div class="app-container">
          <el-select
            class="m-small"
            v-model="movieInfo.subjectGeneresParentId"
            placeholder="全部类别"
            @change="subjectLevelOneGenresChanged"
          >
            <el-option
              v-for="subject in subjectGenresOneList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select
            class="m-small"
            v-model="movieInfo.subjectGeneresId"
            placeholder="惊悚"
          >
            <el-option
              v-for="subject in subjectGenresTwoList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>
        </div>

        <div class="app-container">
          <el-select
            class="m-small"
            v-model="movieInfo.subjectYearParentId"
            placeholder="全部年份"
            @change="subjectLevelOneYearChanged"
          >
            <el-option
              v-for="subject in subjectYearOneList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select
            class="m-small"
            v-model="movieInfo.subjectYearId"
            placeholder="2020"
          >
            <el-option
              v-for="subject in subjectYearTwoList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>
        </div>

        <div class="app-container">
          <el-select
            class="m-small"
            v-model="movieInfo.subjectParentId"
            placeholder="全部地区"
            @change="subjectLevelOneChanged"
          >
            <el-option
              v-for="subject in subjectOneList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select
            class="m-small"
            v-model="movieInfo.subjectId"
            placeholder="中国"
          >
            <el-option
              v-for="subject in subjectTwoList"
              :key="subject.id"
              :label="subject.label"
              :value="subject.id"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="电影播放厅">
        <el-select
          v-model="movieInfo.subjectHallParentId"
          placeholder="一级分类"
          @change="subjectLevelHallOneChanged"
        >
          <el-option
            v-for="subject in subjectOneHallList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="movieInfo.subjectHallId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoHallList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 电影简介-->
      <el-form-item label="电影简介">
        <tinymce :height="300" v-model="movieInfo.plotSimple" />
      </el-form-item>
      <!-- 电影封面-->
      <el-form-item label="电影封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/movieoss/file/upload'"
          class="avatar-uploader"
        >
          <img :src="movieInfo.poster" />
        </el-upload>
      </el-form-item>
      <el-form-item label="拍摄年代">
        <el-input v-model="movieInfo.year" placeholder=" 示例：2020" />
      </el-form-item>
      <!-- 导演列表-->
      <el-form-item label="导演列表">
        <tinymce :height="100" v-model="movieInfo.directors" />
      </el-form-item>
      <!-- 演员列表 -->
      <el-form-item label="演员列表">
        <tinymce :height="100" v-model="movieInfo.actors" />
      </el-form-item>
      <!--编剧列表  -->
      <el-form-item label="编剧列表">
        <tinymce :height="100" v-model="movieInfo.wriyer" />
      </el-form-item>

      <el-form-item label="电影对白语言">
        <el-input v-model="movieInfo.language" placeholder=" 示例：汉语" />
      </el-form-item>

      <el-form-item label="电影拍摄地">
        <el-input v-model="movieInfo.country" placeholder=" 示例：中国北京" />
      </el-form-item>
      <el-form-item label="电影院座位设置">
        <el-button type="text" @click="dialogVisible = true">设置</el-button>

        <el-dialog
          title="座位设置"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose"
        >
          <div class="box">
            <div id="room">
              <div class="row" style="margin-left: 25%">
                <div style="margin-left: 20px">
                  <div class="sit bg-sit"></div>
                  <div>可选座位</div>
                </div>

                <div style="margin-left: 20px">
                  <div class="sit bg-temp"></div>
                  <div>禁用座位</div>
                </div>
              </div>
              <div class="row" style="width: 100%; text-align: center">
                <span> 银幕中央 </span>
                <hr style="width: 90%" />
              </div>
              <div
                v-for="(item, i) in list"
                class="row"
                style="margin-left: 15%"
                :key="i"
              >
                <div class="sit bg-nosit" style="margin-right: 50px">
                  {{ i + 1 }}
                </div>
                <div
                  @click="selectSeat(item1, i, j)"
                  :class="[
                    'sit',
                    { 'bg-temp': item1 == 0 },

                    { 'bg-sit': item1 == 1 },
                  ]"
                  v-for="(item1, j) in item"
                  :key="j"
                ></div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="电影上线日期">
        <div class="block">
          <el-date-picker
            v-model="movieInfo.date"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="电影票价格">
        <el-input-number
          :min="0"
          v-model="movieInfo.price"
          controls-position="right"
          placeholder="免费电影请设置为0元"
        />元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import subject from "@/api/movie/subjectGenres.js";
import msubject from "@/api/movie/msubject.js";
import movie from "@/api/movie/movie.js";
import Tinymce from "@/components/Tinymce";
const defaultForm = {
  title: "", //电影名称
  subjectId: "", //二级分类id
  subjectParentId: "", //一级分类id
  directors: "", //影片导演列表
  actors: "", //影片演员列表
  country: "", //拍摄国家
  wriyer: "", //影片编剧列表
  year: "", //拍摄年代
  plotSimple: "", //电影描述
  poster: "/static/01.jpg", //电影海报,
  price: 0, //电影价格
  date: "", //发布日期
  language: "", //电影的对白语言
};

export default {
  components: { Tinymce },
  data() {
    return {
      // 座位状态数组
      list: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      msgCount: 0,
      dialogVisible: false,
      movieId: "",
      saveBtnDisabled: false,
      movieInfo: {
        title: "", //电影名称
        subjectId: "", //二级分类id
        subjectYearId: "", //二级分类id
        subjectGeneresId: "", //二级分类id
        subjectParentId: "", //一级分类id
        subjectYearParentId: "", //一级分类id
        subjectGeneresParentId: "", //一级分类id
        subjectHallParentId: "", //一级分类id
        subjectHallId: "", //一级分类id
        directors: "", //影片导演列表
        actors: "", //影片演员列表
        country: "", //拍摄国家
        wriyer: "", //影片编剧列表
        year: "", //拍摄年代
        plotSimple: "", //电影描述
        poster: "/static/01.jpg", //电影海报,
        price: 0, //电影价格
        date: "", //发布日期
        language: "", //电影的对白语言
        seat: "",
      },
      // 选座信息
      msg: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], //封装所有的讲师
      subjectOneList: [], //一级分类
      subjectTwoList: [], //二级分类
      subjectYearOneList: [], //一级分类
      subjectYearTwoList: [], //二级分类
      subjectGenresOneList: [], //一级分类
      subjectGenresTwoList: [], //二级分类
      subjectOneHallList: [], //一级分类
      subjectTwoHallList: [], //二级分类
    };
  },
  created() {
    //获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.movieId = this.$route.params.id;
      //调用根据id查询电影的方法
      this.getInfoById();
      this.subjectLevelOneChanged();
      this.subjectLevelOneYearChanged();
      this.subjectLevelOneGenresChanged();
    } else {
      //   //初始化一级分类
      this.getOneSubject();
      this.getAllHallSubject();
    }
  },
  methods: {
    // 选座时触发
    selectSeat(data, x, y) {
      if (this.list[x][y] === 1) {
        this.list[x][y] = 0;
      } else if (this.list[x][y] === 0) {
        this.list[x][y] = 1;
      }
      console.log(this.list);
      this.movieInfo.seat = this.list;
    },
    getTime() {
      console.log(movieInfo.date);
      let dateInfo = movieInfo.date;
      for (var i = 0; i < dateInfo.length; i++) {
        console.log(dateInfo[i]);
      }
    },
    getAllHallSubject() {
      msubject.getAllHallSubject().then((res) => {
        this.subjectOneHallList = res.data.list;
        console.log("----------------------" + this.subjectOneHallList);
      });
    },
    //根据id查询，当用户在要选择视频的时候点击上一步
    getInfoById() {
      movie.getMovieInfo(this.movieId).then((res) => {
        //在movie的基本信息中包含分类id
        this.movieInfo = res.data.movieVo;
        subject.getAllGenresSubject().then((res) => {
          this.subjectOneList = res.data.list;
          //3 把所有的一级分类数组进行遍历，
          for (var i = 0; i < this.subjectOneList.length; i++) {
            //获取每个一级分类
            var oneSubject = this.subjectOneList[i];
            //比较当前courseInfo里面一级分类id和所有的一级分类id
            if (this.movieInfo.subjectParentId == oneSubject.id) {
              //获取一级分类所有的二级分类
              this.subjectTwoList = oneSubject.children;
            }
          }
        });
      });
    },
    getOneSubject() {
      subject.getAllGenresSubject().then((res) => {
        this.subjectOneList = res.data.list;
        this.subjectYearOneList = res.data.list;
        this.subjectGenresOneList = res.data.list;
        console.log("+===================" + this.subjectOneList);
      });
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.movieInfo.poster = res.data.url;
      console.log("-------------------", this.movieInfo.poster);
    },

    subjectLevelOneChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children;
          //把二级分类id值清空
          this.movieInfo.subjectId = "";
        }
      }
    },

    subjectLevelOneYearChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectYearOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectYearOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectYearTwoList = oneSubject.children;
          //把二级分类id值清空
          this.movieInfo.subjectYearId = "";
        }
      }
    },

    subjectLevelOneGenresChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectGenresOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectGenresOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectGenresTwoList = oneSubject.children;
          //把二级分类id值清空
          this.movieInfo.subjectId = "";
        }
      }
    },

    subjectLevelHallOneChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneHallList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneHallList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectTwoHallList = oneSubject.children;
          //把二级分类id值清空
          this.movieInfo.subjectHallId = "";
        }
      }
    },
    addInfo() {
      console.log("-------addInfo----------");
      movie.saveMovieInfo(this.movieInfo).then((res) => {
        this.$message({
          message: "恭喜你，添加成功",
          type: "success",
        });
        this.$router.push({ path: "/movie/manager/video/" + res.data.movieId });
      });
    },
    updateInfo() {
      movie.updateMovieInfo(this.movieInfo).then((res) => {
        this.$message({
          message: "恭喜你，修改成功",
          type: "success",
        });
        this.$router.push({ path: "/movie/manager/video/" + this.movieId });
      });
    },
    saveOrUpdate() {
      console.log("-------saveOrUpdate----------");
      if (this.movieId.id === "") {
        this.addInfo();
      } else {
        this.updateInfo();
      }
    },
  },
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
.m-m-small {
  width: 150px;
}

#room {
  /* width: 300px; */
  float: left;
  width: 80%;
  border: 1px solid black;
  padding: 20px 20px 20px 20px;
}

.sit {
  float: left;
  height: 35px;
  width: 35px;
  min-height: 10px;
  min-width: 10px;
  margin: 4px 4px 4px 4px;
  background-size: cover;
  /* border: 1px solid black; */
}

/* 座位 */
.bg-sit {
  float: left;
  background-image: url("../../../assets/seat.png");
}

.bg-sit:hover {
  cursor: pointer;
  float: left;
}

/* 空位置 */
.bg-nosit {
  float: left;
  /* border: 1px solid white; */
}

/* 已禁用座位*/
.bg-temp {
  float: left;
  cursor: pointer;
  background-image: url("../../../assets/seat-select.png");
}

/* 已选座位号 */
.select-sit {
  float: left;
  border: 2px orange solid;
  border-radius: 10px;
  margin-left: 10px;
  padding: 4px 10px 4px 10px;
  background-color: rgba(255, 0, 0, 0.2);
}

.row {
  /* 清除格式并换行 */
  clear: both;
}

/* 确认选座按钮 */
.btn {
  float: left;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  /* padding: 4px 10px 4px 10px; */
  background-color: rgba(255, 0, 0, 0.8);
  font-size: 25px;
  color: white;
  font-family: "微软雅黑";
}

/* 右侧信息栏 */
.win-right {
  float: left;
  padding-left: 2%;
  padding-top: 2%;
  width: 27%;
  background-color: rgba(112, 112, 112, 0.2);
  border: 1px white solid;
  height: 100%;
}

/* 整体容器 */
.box {
  float: left;
  width: 90%;
  margin-left: 5%;
  height: 64%;
}
</style>