import request from "@/utils/request";

export default {
  // 获取电影展厅分类
  getMovieInfo(id) {
    return request({
      url: `movie/movieInfo/${id}`,
      method: "get"
    });
  },
  //保存
  saveMovieInfo(movieInfo) {
    return request({
      url: `movie/saveMovieInfo`,
      method: "post",
      data: movieInfo
    });
  },
  //更新

  updateMovieInfo(movieInfo) {
    return request({
      url: `movie/updateMovieInfo`,
      method: "post",
      data: movieInfo
    });
  },
  removeMovieInfoById(id) {
    return request({
      url: `movie/remove/${id}`,
      method: "delete"
    });
  },
  //发布电影
  publishMovie(id) {
    return request({
      url: `/movie/publishMovie/${id}`,
      method: "put"
    });
  },
  //根据id查询发布电影
  getMoviePublishInfoById(id) {
    return request({
      url: `/movie/getMoviePublishInfoById/${id}`,
      method: "get"
    });
  },
  pageQueryParam(page, limit, Query) {
    return request({
      url: `/movie/${page}/${limit}`,
      method: "post",
      data: Query
    });
  },
  removeById(id) {
    return request({
      url: `/movie/deleteMovie/${id}`,
      method: "delete"
    });
  }
};
