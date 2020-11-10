import request from "@/utils/request";

export default {
  // 获取电影展厅分类
  getAllGenresSubject() {
    return request({
      url: "movie/subject/getAllSubject",
      method: "get"
    });
  },

  // 删除电影展厅分类
  deleteAllGenres() {
    return request({
      url: "movie/subject/deleteAllSubject",
      method: "delete"
    });
  },
  // 批量删除电影展厅分类
  deleteBatchGenres(ids) {
    return request({
      url: "movie/subject/deleteBatchSubject",
      data: JSON.stringify(ids),
      method: "delete"
    });
  }
};
