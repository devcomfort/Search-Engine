import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpeg";
import WebResult from "./WebResult";
import VideoResult from "./VideoResult";
import ImageResult from "./ImageResult";
import BlogResult from "./BlogResult";

import { ChoiceTypeBox, MainName, LogoImg, Header, UserForm, UserInput, SubmitBtn, ChoiceBox, SearchType, MainResult } from "../styles/ChoiceTypeCSS";

const ChoiceType = () => {
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();

  const HOST = `https://dapi.kakao.com/v2/search/${choice}?query=${search}`;
  const API_KEY = import.meta.env.VITE_REACT_API_KEY;

  const getApiData = async () => {
    // Fetch를 통해 API랑 통신 및 promise 반환
    const data = await fetch(HOST, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });

    // JSON으로 파일 변환.
    const json = await data.json();

    // 변환된 JSON 객체를 State함수에 저장.
    setResult(json.documents);
  };

  const searchResult = (e) => {
    e.preventDefault();
    if (search === "") {
      return alert("공백은 금지 입니다.");
    }
    if (choice === "") {
      setSearch("");
      return alert("검색 항목을 선택해주셔야 합니다 !");
    }
    getApiData();
  };

  return (
    <ChoiceTypeBox>
      <MainName>SBDM</MainName>
      <Header>
        <LogoImg src={Logo} />
        <UserForm onSubmit={(e) => searchResult(e)} id="submit-info">
          <UserInput onChange={(e) => setSearch(e.target.value)} type="text" placeholder="검색어를 기입해주세요" value={search} />
        </UserForm>
        <SubmitBtn type="submit" form="submit-info">
          검색
        </SubmitBtn>
      </Header>

      <ChoiceBox>
        {/* 클릭시 CSS 기능 추가 예정 */}
        <SearchType onClick={() => setChoice("web")} className={choice === "web" ? "active" : ""}>
          🌐 웹 문서 🌐
        </SearchType>
        <SearchType onClick={() => setChoice("blog")} className={choice === "blog" ? "active" : ""}>
          📚 블로그 📚
        </SearchType>
        <SearchType onClick={() => setChoice("vclip")} className={choice === "vclip" ? "active" : ""}>
          📽️ 동영상 📽️
        </SearchType>
        <SearchType onClick={() => setChoice("image")} className={choice === "image" ? "active" : ""}>
          🌆 이미지 🌆
        </SearchType>
      </ChoiceBox>

      <MainResult>
        {choice === "web" && result ? <WebResult result={result} /> : null}
        {choice === "blog" && result ? <BlogResult result={result} /> : null}
        {choice === "vclip" && result ? <VideoResult result={result} /> : null}
        {choice === "image" && result ? <ImageResult result={result} /> : null}
      </MainResult>
    </ChoiceTypeBox>
  );
};

export default ChoiceType;
