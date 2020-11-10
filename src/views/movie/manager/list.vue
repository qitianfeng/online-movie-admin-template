<template>
  <div class="app-container">
    <!--查询表单-->

    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类：级联下拉列表 -->

      <!-- 一级分类 -->

      <el-form-item label="电影类别">
        <el-select
          v-model="searchObj.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->

        <el-select v-model="searchObj.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 标题 -->

      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="电影标题" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()"
        >查询</el-button
      >

      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{
          (page - 1) * limit + scope.$index + 1
        }}</template>
      </el-table-column>

      <el-table-column label="电影信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img
                :src="scope.row.poster"
                alt="scope.row.poster"
                width="150px"
              />
            </div>

            <div class="title">
              <a href>{{ scope.row.title }}</a>

              <p>{{ scope.row.runtime }}分钟</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{
          scope.row.gmtCreate.substr(0, 10)
        }}</template>
      </el-table-column>

      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">{{
          scope.row.gmtModified.substr(0, 10)
        }}</template>
      </el-table-column>

      <el-table-column label="价格" width="100" align="center">
        <template slot-scope="scope">
          {{
            Number(scope.row.price) === 0
              ? "免费"
              : "¥" + scope.row.price.toFixed(2)
          }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="'/movie/manager/info/' + scope.row.movieId">
            <el-button type="text" size="mini" icon="el-icon-edit"
              >编辑电影信息</el-button
            >
          </router-link>

          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.movieId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
import subject from "@/api/movie/subjectGenres.js";
import movie from "@/api/movie/movie.js";

export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      page: 1,
      limit: 3,
      total: 0,

      searchObj: {
        subjectParentId: "",
        subjectId: "",
        title: "",
        teacherId: "",
      }, // 查询条件

      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表,
    };
  },
  created() {
    //调用
    this.fetchData();

    this.initSubjectList();
  },
  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  methods: {
    fetchData(page = 1) {
      //分页
      console.log("加载列表");
      // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
      // 解决分页无效问题
      this.page = page;
      this.listLoading = true;
      movie
        .pageQueryParam(this.page, this.limit, this.searchObj)
        .then((response) => {
          // debugger 设置断点调试
          if (response.success === true) {
            this.list = response.data.rows;
            console.log("------------------------", this.list);
            this.total = response.data.total;
          }
          this.listLoading = false;
        });
    },
    removeDataById(movieId) {
      this.$confirm("此操作将删除电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定，执行then方法
          //调用删除的方法
          return movie.removeById(movieId).then((response) => {
            //删除成功
            //提示信息
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面
            this.fetchData();
          });
        })
        .catch((error) => {
          if (response.data.code === 20001) {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          }
        });
    },
    initSubjectList() {
      subject
        .getAllGenresSubject()
        .then((response) => {
          this.subjectNestedList = response.data.list;
        })
        .catch((err) => {});
    },

    //获取二级分类
    subjectLevelOneChanged(value) {
      for (let index = 0; index < subjectNestedList.length; index++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.searchObj.subjectId = "";
        }
      }
    },

    resetData() {
      (this.searchObj = {}), (this.subSubjectList = []), this.fetchData();
    },
  },
};
</script>
<style scoped>
.myClassList .info {
  width: 450px;

  overflow: hidden;
}

.myClassList .info .pic {
  width: 150px;
  height: 90px;
  overflow: hidden;
  float: left;
}

.myClassList .info .pic a {
  display: block;

  width: 100%;

  height: 100%;

  margin: 0;

  padding: 0;
}

.myClassList .info .pic img {
  display: block;

  width: 100%;
}

.myClassList td .info .title {
  width: 280px;

  float: right;

  height: 90px;
}

.myClassList td .info .title a {
  display: block;

  height: 48px;

  line-height: 24px;

  overflow: hidden;

  color: #00baf2;

  margin-bottom: 12px;
}

.myClassList td .info .title p {
  line-height: 20px;

  margin-top: 5px;

  color: #818181;
}
</style>