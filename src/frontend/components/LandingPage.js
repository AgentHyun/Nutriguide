import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import myImage from '../img/logo.png'; 
import '../css/LandingPage.css';
import styled from 'styled-components';
function LandingPage() {
  const navigate = useNavigate();
  const DetailButton = styled(Link)`
  background-color: #ffffff;
  color: #333333;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f7d06d;
  }
`;
  const navigateToQuestionPage = () => {
    // 디테일 페이지로 이동하는 함수
    navigate('/question');
  };
  const navigateToRecommendationPage = () => {
    // 디테일 페이지로 이동하는 함수
    navigate('/recommendation');
  };
  return (
    <div className='landing-page2'>
      <div className='container-landing'>
        <div className='landing-content'>
          <div className='landing-img'>
            <Link to="/detail">
              <img src={myImage} alt="My Image" style={{ width: '700px', height: 'auto' }} />
            </Link>
          </div>
          <div className='landing-text'>
            <h1 className='title'> Nutri Guide?</h1>
            <h2>
            <strong className='bigname'>NutriGuide</strong> 는 사용자 개개인의 건강 상태에 맞춰 영양제를<br/> <br/> 추천해주는 웹사이트입니다.<br/><br/>
<strong className='bigname'>AI 건강 상담</strong> 에서 가이드라인에 따른 맞춤형 건강 조언을<br/><br/> AI에게 받아보세요.<br/><br/>
<strong className='bigname'>AI 영양제 추천</strong> 에서 사용자의 정보를 입력하면, <br/><br/>인공지능이 최적의 영양제를 추천해드립니다.<br/><br/>
            </h2>
            <button type="default" className="custom-button-landing" onClick={navigateToQuestionPage}>
            AI 건강 상담 
            </button>
            <button type="default" className="custom-button-landing" onClick={navigateToRecommendationPage}>
              AI 영양제 추천  
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
