import request from "@/utils/request";

export default {
  //获取对应电影的视频id
  getVideoId(movieId) {
    return request({
      url: `/movie/movieVideo/getVideoById/${movieId}`,
      method: "get"
    });
  },
  updateVideo(video) {
    return request({
      url: `/movie/movieVideo/updateVideo`,
      method: "post",
      data: video
    });
  },
  addVideo(video) {
    return request({
      url: `/movie/movieVideo/addVideo`,
      method: "post",
      data: video
    });
  },
  //删除电影视频
  deleteVideoById(id) {
    return request({
      url: `/movie/movieVideo/${id}`,
      method: "delete"
    });
  }
};
