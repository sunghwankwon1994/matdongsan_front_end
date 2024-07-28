import axios from "axios";
import qs from "qs";



//중개인 리스트
const getAgentList = (pageNo, size, filter, keyword) => {
  //GET: http://localhost/agent?pageNo=1&size=10
  return axios.get("/Agent", {
    params: {
      pageNo,
      size,
      byRate: filter.byRate,
      byComment: filter.byComment,
      byDate: filter.byDate,
      keyword: keyword,
    },
  });
};

//중개인 데이터
const getAgentDataByNumber = (anumber, pageNo, sort) => {
  return axios.get("/Agent/" + anumber, { params: { pageNo, sort } });
};
//중개인 데이터 업데이트
const updateAgentData = (agentData) => {
  return axios.put("/Agent/Mypage/MyInfomation", agentData);
};
//중개인 리뷰 페이지 불러오기
const getAgentReviewData = (anumber) => {
  return axios.get("/Agent/AgentReview/" + anumber);
};
//중개인 프로필 사진 다운로드
const agentAttachDownload = (anumber) =>
  //PathVariable로 데이터 전송
  axios.get("/Agent/aattach/" + anumber, { responseType: "blob" });

//중개인 리뷰 작성
const postAgentReview = (reviewData) => {
  return axios.post("/Agent/" + reviewData.arAnumber, qs.stringify(reviewData));
};
//중개인 리뷰 업데이트
const updateAgentReview = (editingReview) => {
  return axios.put(
    `/Agent/${editingReview.arAnumber}/${editingReview.arnumber}`,
    qs.stringify(editingReview)
  );
};
//중개인 리뷰 삭제
const deleteAgentReview = (anumber, arnumber) => {
  return axios.delete(`/Agent/${anumber}/${arnumber}`);
};
//중개인 매물 가져오기
const getAgentProperty = (anumber, pageNo) => {
  return axios.get("/Agent/Property/" + anumber, { params: { pageNo } });
};
//중개인 정렬
const sortAgentReview = (anumber, sort) => {
  return axios.get("/Agent", { params: { anumber, sort } });
};

// 부동산 검색
const postSearchKeyword = (keyword, pageNo) => {
  return axios.get("/Agent", { params: { pageNo, keyword } });
};
//좌표 부동산 가져오기
const getAgentDataByPosition = (lat, lng) => {
  return axios.get("/Agent/Position", { params: { lat, lng } });
};
export default {
  getAgentList,
  agentAttachDownload,
  getAgentDataByNumber,
  postAgentReview,
  deleteAgentReview,
  sortAgentReview,
  updateAgentReview,
  updateAgentData,
  getAgentReviewData,
  getAgentProperty,
  postSearchKeyword,
  getAgentDataByPosition,
};
