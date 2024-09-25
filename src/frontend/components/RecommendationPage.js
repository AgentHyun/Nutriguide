import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../img/lemon.jpg'; 

const RecommendationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #ffffff;
   font-weight: 700; /* Adjust the font weight to make the text bolder */
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Slightly more intense shadow */
  font-family: "Gowun Dodum", sans-serif; /* Unified font */
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center; /* Centering the content */
  flex-wrap: wrap;
  max-width: 1000px;
  margin-bottom: 2rem;
`;

const DescriptionColumn = styled.div`
  flex: 1;
  padding: 1.5rem;
  max-width: 45%;
  margin: 1rem;
  background: rgba(0, 0, 0, 0.6); /* Darker semi-transparent background */
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* More pronounced shadow */
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Slightly stronger text shadow */
  font-family: "Gowun Dodum", sans-serif; /* Unified font */

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
`;

const DescriptionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #f7d06d; /* Highlighted color */
  font-family: "Gowun Dodum", sans-serif; /* Unified font */
`;

const DescriptionText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8; /* Increased line height for better readability */
  font-family: "Gowun Dodum", sans-serif; /* Unified font */
`;

const RecommendButton = styled(Link)`
  background-color: #ffffff;
  color: #333333;
  font-size: 1.5rem;
  padding: 1.25rem 2.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Gowun Dodum", sans-serif; /* Unified font */
  margin-left : 1200px;
  &:hover {
    background-color: #f7d06d;
  }
`;

const RecommendationPage = () => {
  return (
    <RecommendationPageContainer>
      <Title>AI 영양제 추천 서비스</Title>
      <DescriptionContainer>
        <DescriptionColumn>
          <DescriptionTitle>왜 영양제가 필요한가?</DescriptionTitle>
          <DescriptionText>
            현대인의 식사는 종종 균형 잡히지 않거나 필요한 영양소가 부족할 수 있습니다.
            영양제는 부족할 수 있는 비타민, 미네랄, 기타 필수 영양소를 보충해줍니다.
            특히 바쁜 일상 속에서 균형 잡힌 식사를 유지하기 어려운 경우,
            영양제는 중요한 역할을 할 수 있습니다.
          </DescriptionText>
        </DescriptionColumn>
        <DescriptionColumn>
          <DescriptionTitle>AI기반 추천의 장점은?</DescriptionTitle>
          <DescriptionText>
          AI 기술을 활용하면 유클리드 거리를 통해 개인의 식단과 영양제의 영양 성분을 정밀하게 분석하여, 
          
          부족한 영양소를 보충할 수 있는 최적의 영양제를 추천받을 수 있습니다.
          </DescriptionText>
        </DescriptionColumn>
      </DescriptionContainer>
      <RecommendButton to="/input/inputmenu">추천받기</RecommendButton>
    </RecommendationPageContainer>
  );
};

export default RecommendationPage;
