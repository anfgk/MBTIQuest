import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { motion } from "framer-motion";
import { QuestionData } from "../assets/questiondata";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  font-family: sans-serif;
`;

const ProgressBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;

  .progress {
    height: 0.8rem;
    background: #e9ecef;
    border-radius: 1rem;
  }

  .progress-bar {
    background: #dc3545;
    border-radius: 1rem;
  }
`;

const QuestionContainer = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled(motion.div)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
  color: #2d3748;
  font-weight: 600;
  font-family: sans-serif;

  @media screen and (max-width: 780px) {
    font-size: 1.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 360px) {
    font-size: 1.2rem;
    padding: 0.8rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const AnswerButton = styled(motion.button)`
  width: 100%;
  padding: 1.5rem;
  font-size: 1rem;
  text-align: left;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.5;
  color: #4a5568;
  position: relative;
  font-family: sans-serif;
  /* overflow: hidden; */

  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    background: white;
  }

  &:disabled {
    transform: none;
    background: white;
  }

  @media screen and (max-width: 780px) {
    font-size: 1.1rem;
    padding: 1.2rem;
  }

  @media screen and (max-width: 360px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const QuestionNumber = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.9rem;
  color: #a0aec0;
  font-weight: 600;
  font-family: sans-serif;
`;

const Question = () => {
  // 현재 질문 번호 상태 관리
  const [questionNo, setQuestionNo] = useState(0);

  // 총 점수를 상태로 저장 (각 MBTI 항목에 대한 점수)
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);

  // 버튼 클릭 상태 관리 (중복 클릭 방지)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // 페이지 이동을 위해 useNavigate 사용
  const navigate = useNavigate();

  // 버튼 클릭 시 실행되는 함수
  const handleClickButton = (no, type) => {
    if (isButtonDisabled) return; // 이미 버튼이 비활성화되어 있으면 함수 실행 중지

    // 버튼 비활성화
    setIsButtonDisabled(true);

    // 선택된 유형(type)의 점수를 업데이트
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );

    // 업데이트된 점수 상태 저장
    setTotalScore(newScore);

    // 다음 질문으로 넘어가는 로직
    setTimeout(() => {
      if (QuestionData.length !== questionNo + 1) {
        setQuestionNo(questionNo + 1); // 질문 번호 증가
        setIsButtonDisabled(false); // 버튼 다시 활성화
      } else {
        // 모든 질문이 끝난 경우 MBTI 결과 계산
        const mbti = newScore.reduce(
          (acc, curr) =>
            acc +
            (curr.score >= 2
              ? curr.id.substring(0, 1)
              : curr.id.substring(1, 2)),
          ""
        );
        // 결과 페이지로 이동하며 MBTI 결과를 쿼리 파라미터로 전달
        navigate({
          pathname: "/result",
          search: `?${createSearchParams({
            mbti: mbti,
          })}`,
        });
      }
    }, 300); // 상태 업데이트와 다음 작업 사이에 짧은 지연 시간 추가
  };

  return (
    <Wrapper>
      <ProgressBarWrapper>
        <ProgressBar
          now={(questionNo / QuestionData.length) * 100}
          variant="danger"
        />
      </ProgressBarWrapper>

      <QuestionContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <QuestionNumber>
          Question {questionNo + 1} / {QuestionData.length}
        </QuestionNumber>

        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {QuestionData[questionNo].title}
        </Title>

        <ButtonGroup>
          <AnswerButton
            onClick={() => handleClickButton(1, QuestionData[questionNo].type)}
            disabled={isButtonDisabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {QuestionData[questionNo].answera}
          </AnswerButton>

          <AnswerButton
            onClick={() => handleClickButton(0, QuestionData[questionNo].type)}
            disabled={isButtonDisabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {QuestionData[questionNo].answerb}
          </AnswerButton>
        </ButtonGroup>
      </QuestionContainer>
    </Wrapper>
  );
};

export default Question;
