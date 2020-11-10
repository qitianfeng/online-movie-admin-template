import request from "@/utils/request";

export default {
  // 获取电影展厅分类
  getAllHallSubject() {
    return request({
      url: "movie/playHall/getAllHallSubject",
      method: "get"
    });
  }
};
