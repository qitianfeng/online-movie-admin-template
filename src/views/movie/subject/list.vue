<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <div class="app-container">
      <span style="color:red">功能区：</span>
      <el-button type="primary" icon="el-icon-plus" @click="openGenres()">添加新电影类别</el-button>
      <el-button type="danger" @click="deleteAllGenres()">一键删除所有类别</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteBatchGenres()">批量删除</el-button>
    </div>

    <el-tree
      ref="tree"
      :data="data2"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      highlight-current
      :filter-node-method="filterNode"
      class="filter-tree"
      :expand-on-click-node="false"
      default-expand-all
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <!-- <el-button type="text" size="mini" @click="() => append(data)">Append</el-button> -->
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogFormVisible" title="添加电影新类别">
      <el-form :model="video" label-width="120px">
        <el-form-item label="一级分类">
          <el-select v-model="genres.firstTitle" filterable placeholder="请选择">
            <el-option
              v-for="item in subjectOneList"
              :key="item.id"
              :label="item.firstTitle"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input v-model="genres.firstTitle" />
        </el-form-item>
        <el-form-item label="二级分类">
          <el-input v-model="genres.secondTitle" />
          <el-select v-model="genres.secondTitle" filterable placeholder="请选择">
            <el-option
              v-for="itemTwo in subjectTwoList"
              :key="itemTwo.id"
              :label="itemTwo.title"
              :value="itemTwo.id"
            ></el-option>
          </el-select>
          <!-- <el-input-number v-model="genres.secondTitle" :min="0" controls-position="right" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveGenres">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import subject from "@/api/movie/subjectGenres";

export default {
  data() {
    return {
      genres: {
        id: "",
        firstTitle: "",
        secondTitle: "",
      },
      saveBtnDisabled: false,
      dialogFormVisible: false, //添加电影类别弹框
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      subjectOneList: [], //一级分类
      subjectTwoList: [], //二级分类
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  created() {
    this.getAllSubjectList();
  },

  methods: {
    /*****批量删除 */
    deleteBatchGenres() {
      var str = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      subject.deleteBatchGenres(str).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
      console.log(str);
    },
    /*****删除所有类别 */
    deleteAllGenres() {
      subject.deleteAllGenres().then((response) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
      this.getAllSubjectList();
    },

    openGenres() {
      this.dialogFormVisible = true;
    },
    saveGenres() {},
    append(data) {
      console.log(data);
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      console.log(data.id + "-----------------");
      let arr = [];
      arr.push(data.id);
      subject.deleteBatchGenres(arr).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
      this.getAllSubjectList();
    },

    getAllSubjectList() {
      subject
        .getAllGenresSubject()
        .then((response) => {
          // console.log(`------------------getAllGenresSubject-----------`);
          this.data2 = response.data.list;
          this.subjectOneList = response.data.list;
          //2 获取所有一级分类
          console.log("coming into getAllSubject");
          this.subjectOneList = response.data.list;
          console.log(` this.subjectOneList --- ${this.subjectOneList}`);
          //3 把所有的一级分类数组进行遍历，
          for (var i = 0; i < this.subjectOneList.length; i++) {
            //获取每个一级分类
            var oneSubject = this.subjectOneList[i];
            //比较当前courseInfo里面一级分类id和所有的一级分类id
            if (this.courseInfo.subjectParentId == oneSubject.id) {
              //获取一级分类所有的二级分类
              this.subjectTwoList = oneSubject.children;
            }
          }
        })
        .catch((err) => {});
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>