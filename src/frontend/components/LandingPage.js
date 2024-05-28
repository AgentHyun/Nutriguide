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
  const navigateToDetailPage = () => {
    // 디테일 페이지로 이동하는 함수
    navigate('/detail');
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
            <h1> Nutri Guide?</h1>
            <h2>
              AI 기술을 활용하여
              <br />
              <br />
              간편한 정보 입력만으로
              <br />
              <br />
              최적의 영양제를 추천해드립니다!
            </h2>
            <button type="default" className="custom-button-landing" onClick={navigateToDetailPage}>
              영양성분 설명
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
