import axios from "axios";
import qs from "qs";

const memberJoin = (formData) => {
  //user Data
  // {
  //     mid: "youngzo",
  //     mname: "심기금",
  //     mpassword: "12345",
  //     uemail : "simpson@naver.com"
  // }
  //POST 방식 : raw/JSON 방식으로 데이터 전달
  return axios.post("/Member/Signup/MemberSignup", formData);
};


const getUserData = () => {
  return axios.get("/Agent/Mypage/MyInfomation");
};

// 유저 정보 불러오기 by uemail
const getUserDataByUemail = (uemail) => {
  return axios.get("/Member/Mypage/MyInfomation/" + uemail);
};

// 유저 정보 불러오기 by unumber
const getUserDataByUnumber = (unumber) => {
  return axios.get("/Member/getUserData/" + unumber);
};


//중개인 회원가입
function signup(formData) {
  return axios.post("/Member/Signup/AgentSignup", formData);
}

//일반 유저 프로파일
const memberAttachDownload = (mnumber) =>
  //PathVariable로 데이터 전송
  axios.get("/Member/mattach/" + mnumber, { responseType: "blob" });

//로그인
const login = (member) => {
  /*
        user = {
            mid: "user",
            mpassword: "12345"
        }
    */

  //POST 방식 : QueryString(mid=user&mpassword=12345) 방식으로 데이터 전달
  return axios.post("/Member/login", qs.stringify(member));
};
//일반 유저 데이터 업데이트
const updateMemberData = (memberData) => {
  return axios.put("/Member/Mypage/MyInfomation", memberData);
};
// 탈퇴
const deleteAccount = (currPw) => {
  return axios.put("/Member/MyPage/DeleteAccount", { currPw: currPw });
};

// 아이디 찾기 -> 개인정보이기 때문에 쿼리가 아닌 form데이터로 보냄
function findMemberEmail(formData){
  return axios.post("/Member/login/findMemberEmail", formData);
}

// 해당 회원이 존재하는 지 확인 (중개인도 같은거 사용)
function canResetPassword(formData){
  return axios.post("/Member/canResetPassword", formData);
}

// 회원 비밀번호 변경 (중개인도 같은거 사용)
function updatePassword(formData){
  return axios.put("/Member/updatePassword", formData);
}

// 회원 비밀번호 맞는 지 확인 (중개인도 같은거 사용)
function checkOldPassword(formData){
  return axios.post("/Member/checkOldPassword", formData);
}

// 아이디 찾기
const findAgentEmail = (formData) => {
  return axios.post("/Member/login/findAgentEmail", formData);
};

// 아이디 중복 확인
function getEmailUniqueCheck(uemail){
  return axios.get("/Member/signup/emailUniqueCheck",{params:{uemail:uemail}});
}



export default {
  memberJoin,
  signup,
  login,
  getUserData,
  getUserDataByUemail,
  getUserDataByUnumber,
  deleteAccount,
  memberAttachDownload,
  updateMemberData,
  findMemberEmail,
  canResetPassword,
  updatePassword,
  checkOldPassword,
  findAgentEmail,
  getEmailUniqueCheck
};
