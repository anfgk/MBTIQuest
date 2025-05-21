import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { ResultData } from "../assets/resultData";
import KakaoShareButton from "../components/KakaoShareButton";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(10px);
`;

const Header = styled(motion.div)`
  font-size: 2rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  color: #2d3748;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 700;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.6rem 1rem;
  }
`;

const Contents = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

const ResultCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    object-fit: cover;
  }

  @media screen and (max-width: 480px) {
    img {
      width: 250px;
      height: 250px;
    }
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ResultTitle = styled.div`
  background: #ff69b4;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1.5rem;
  text-align: center;
`;

const ResultDesc = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 192, 203, 0.2);
  border-radius: 12px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  justify-content: center;

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
    border-radius: 12px;
    font-weight: 600;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Result = () => {
  const [resultData, setResultData] = useState({});
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <AnimatePresence>
      <Wrapper variants={containerVariants} initial="hidden" animate="visible">
        <Header variants={itemVariants}>나의 MBTI 결과</Header>
        <Contents>
          <ResultCard variants={itemVariants}>
            <CardContent>
              <ImageSection>
                <motion.img
                  src={resultData.image}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </ImageSection>
              <InfoSection>
                <ResultTitle>
                  당신의 MBTI는 {resultData.best}형 {resultData.name} 입니다.
                </ResultTitle>
                <ResultDesc>{resultData.desc}</ResultDesc>
                <ButtonGroup variants={itemVariants}>
                  <Button
                    variant="outline-primary"
                    onClick={handleClickButton}
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    다시 테스트하기
                  </Button>
                  <KakaoShareButton data={resultData} />
                </ButtonGroup>
              </InfoSection>
            </CardContent>
          </ResultCard>
        </Contents>
      </Wrapper>
    </AnimatePresence>
  );
};

export default Result;
