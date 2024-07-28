import axios from "axios";
import qs from "qs";

// 전체 매물 리스트
const getPropertyList = (pageNo, size, filter, keyword, lat, lng) => {
  //GET: http://localhost/board/list?pageNo=1

  console.log("FILTER IN AXIOS : " + JSON.stringify(filter));

  return axios.get("/Property", { params: { 
    pageNo, 
    size, 
    rentType: filter.byCategory,
    floorType: filter.byFloortype,
    price: filter.byPrice,
    date: filter.byDate,
    keyword: keyword,
    lat, 
    lng },
   });
};

//매물 데이터 가져오기
const getPropertyDataByPnumber =(pnumber) => {
  return axios.get("/Property/DetailData/"+pnumber);
}

// 유저 매물 리스트
const getUserPropertyList = (pageNo, filterKeyword) => {
  return axios.get("/Property/Mypage/ManageMyProperty", { params: { pageNo, filterKeyword } });
};

// 매물 썸네일 사진 다운로드
const propertyAttachDownload = (pnumber) =>
  //PathVariable로 데이터 전송
  axios.get("/Property/pattach/" + pnumber, { responseType: "blob" });

// 매물 디테일 사진 다운로드
const detailPropertyAttachDownload = (ppnumber) =>
  axios.get("/Property/detailPattach/" + ppnumber, { responseType: "blob" });

// 매물 삭제
const deleteProperty = (pnumber) => {
  return axios.delete("/Property/deleteProperty/" + pnumber);
};

// 인기 매물 리스트
const getPopularPropertyList = () => {
  return axios.get("/Property/popularProperty");
};

// 매물 데이터
const getPropertyData = (pnumber, date, pageNo) => {
  return axios.get("/Property/" + pnumber, { params: { date, pageNo } });
};

// 댓글 작성
const postPropertyComment = (userComment) => {
  console.log("userComment.ucPnumber : " + userComment.ucPnumber);
  return axios.post(
    "/Property/" + userComment.ucPnumber,
    qs.stringify(userComment)
  );
};

// 댓글 수정
const editPropertyComment = (editingComment) => {
  return axios.put(
    `/Property/${editingComment.ucUnumber}/${editingComment.ucnumber}`,
    qs.stringify(editingComment)
  );
};

// 댓글 삭제
const deletePropertyComment = (pnumber, ucnumber) => {
  return axios.delete(`/Property/${pnumber}/${ucnumber}`);
};

// 매물 신고
const postReportProperty = (report) => {
  console.log("report : " + report.rcontent);
  console.log("report : " + report.rPnumber);
  return axios.post(
    "/Property/createPropertyReport/" + report.rPnumber,
    qs.stringify(report)
  );
};

// 매물 신고 리스트
const getReportList = (pageNo,filterKeyword) => {
  return axios.get("/Property/Mypage/ReportFalseListing", { params: { pageNo,filterKeyword } });
};
// 매물 신고 삭제
const deletePropertyReport = (pnumber) => {
  console.log("pnumber : " + pnumber);
  return axios.delete("/Property/deletePropertyReport/" + pnumber);
};

// 매물 신고 여부
const checkIsReported = (pnumber) => {
  return axios.get("/Property/isReported/" + pnumber);
};

//매물 등록권 소유 여부 체크
const checkPropertyListing = () => {
  return axios.get("/Property/paymentHistory");
};

//매물 등록권 구매
const purchasePropertyListing = (product) => {
  return axios.post("/Property/Payment/PaymentResult/" + product);
};

// 매물 등록
const postProperty = (formData) => {
  return axios.post("/Property/PropertyForm", formData);
};

//  매물 수정
const updateProperty = (pnumber, formData) => {
  return axios.put("/Property/PropertyForm/" + pnumber, formData);
};

// 매물 상태 수정
const updatePropertyStatus = (pnumber, pstatus) => {
  console.log("pstatus + pnumber in axios : " + pnumber + pstatus);
  return axios.put(
    "/Property/updatePropertyStatus/" + pnumber,
    qs.stringify({ pstatus })
  );
};

// 해당 좌표 매물 번호 가져오기
const getPropertyDataByPosition = (lat, lng) => {
  console.log("lat: " + lat + " lng: " + lng);
  return axios.get("/Property/Position", { params: { lat, lng } });
};
// 좋아요
const likeProperty = (pnumber) => {
  return axios.post("/Property/likeProperty/" + pnumber);
};

// 좋아요 취소
const cancelLikeProperty = (pnumber) => {
  return axios.delete("/Property/cancelLikeProperty/" + pnumber);
};

// 좋아요 확인
const isPropertyLiked = (pnumber) => {
  return axios.get("/Property/isPropertyLiked/" + pnumber);
};

// 등록권 수량 가져오기
const  getListingRemain = (uemail) => {
  return axios.get("/Property/getListingRemain",{params:{uemail}})
}

const getFavoriteList = (pageNo = 1,size) => {
  //GET: http://localhost/board/list?pageNo=1

  return axios.get(`/Property/FavoriteProperty`, { params: { pageNo,size } });
};

export default {
  getPropertyList,
  getUserPropertyList,
  getPropertyDataByPnumber,
  propertyAttachDownload,
  deleteProperty,
  getPopularPropertyList,
  detailPropertyAttachDownload,
  getPropertyData,
  postReportProperty,
  getReportList,
  deletePropertyReport,
  checkIsReported,
  checkPropertyListing,
  purchasePropertyListing,
  postProperty,
  updateProperty,
  updatePropertyStatus,
  postPropertyComment,
  deletePropertyComment,
  editPropertyComment,
  likeProperty,
  cancelLikeProperty,
  isPropertyLiked,
  getPropertyDataByPosition,
  getListingRemain,
  getFavoriteList
};
