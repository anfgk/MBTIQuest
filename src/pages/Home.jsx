import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 가져오기
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 불러오기
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #000;
  font-family: sans-serif;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  img {
    width: 500px;
    height: 170px;
    @media screen and (max-width: 390px) {
      width: 300px;
      height: 100px;
    }
  }
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: white;
  background: #dc3545;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 53, 69, 0.6);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(220, 53, 69, 0.4);
  }

  @media screen and (max-width: 390px) {
    padding: 0.8rem 2rem;
    font-size: 1.2rem;
  }
`;

const Home = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅 사용

  // 버튼 클릭 시 실행되는 함수
  const handleClickButton = () => {
    navigate("/question"); // '/question' 경로로 이동
  };
  return (
    <Wrapper>
      {/* 상단 이미지 영역 */}
      <Header>
        <motion.img
          src="../img/title.png"
          alt="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
      </Header>
      {/* 메인 콘텐츠 영역 */}
      <Contents>
        {/* 시작하기 버튼 */}
        <StartButton
          onClick={handleClickButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MBTI 테스트
        </StartButton>
      </Contents>
    </Wrapper>
  );
};

export default Home;
