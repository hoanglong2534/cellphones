import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Detail from "../components/detail/Detail";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
// import AppChat from "../components/AppChat/AppChat";
import { useSelector } from "react-redux";

function DetailPage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <Header></Header>
      <Detail></Detail>
      <Footer></Footer>
      {/* {userInfo ? <AppChat></AppChat> : ""} */}
      <ScrollToTop></ScrollToTop>
    </div>
  );
}

export default DetailPage;
