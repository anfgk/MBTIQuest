import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { CompatibilityData } from "../assets/compatibilityData";

const CompatibilityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const MatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const MatchBadge = styled(motion.span)`
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;

  &.best {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  &.good {
    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
    color: #2d3748;
    box-shadow: 0 4px 15px rgba(132, 250, 176, 0.3);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  padding: 1rem;
  background: rgba(247, 250, 252, 0.8);
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const MBTICompatibility = ({ userMBTI }) => {
  const compatibility = CompatibilityData[userMBTI] || {
    bestMatches: [],
    goodMatches: [],
    description: "해당 MBTI 유형의 궁합 정보를 찾을 수 없습니다.",
  };

  return (
    <CompatibilityCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>{userMBTI}의 궁합</Title>

      <Section>
        <SectionTitle>✨ 최고의 궁합</SectionTitle>
        <MatchContainer>
          {compatibility.bestMatches.map((type) => (
            <MatchBadge
              key={type}
              className="best"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {type}
            </MatchBadge>
          ))}
        </MatchContainer>
      </Section>

      <Section>
        <SectionTitle>👍 좋은 궁합</SectionTitle>
        <MatchContainer>
          {compatibility.goodMatches.map((type) => (
            <MatchBadge
              key={type}
              className="good"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {type}
            </MatchBadge>
          ))}
        </MatchContainer>
      </Section>

      <Description
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {compatibility.description}
      </Description>
    </CompatibilityCard>
  );
};

export default MBTICompatibility;
