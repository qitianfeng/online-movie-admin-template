<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>


<script>
import subject from "@/api/movie/msubject";

export default {
  data() {
    return {
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    getAllSubjectList() {
      subject
        .getAllHallSubject()
        .then((response) => {
          console.log(`------------------getAllSubjectList-----------`);
          this.data2 = response.data.list;
          console.log(this.data2);
          console.log(this.defaultProps);
          console.log("sasdasdasdasdas", this.data2);
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

