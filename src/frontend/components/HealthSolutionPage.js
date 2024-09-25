import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import '../css/ProductPage.css';

const HealthSolutionPage = () => {
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 추가

  // 모달 열기 함수
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const healthIssues = [
    { title: "스트레스", link: "/health-solutions/stress" },
    { title: "면역력", link: "/health-solutions/immunity" },
    { title: "뼈 건강", link: "/health-solutions/bone-health" },
    { title: "눈 건강", link: "/health-solutions/eye-health" },
    { title: "장 건강", link: "/health-solutions/intestine-health" },
    // 다른 건강 고민에 대한 정보를 추가할 수 있습니다.
  ];

  return (
    <div className="page-container">
      <div className="navbar">
        {healthIssues.map((issue, index) => (
          <Link key={index} to={issue.link} className="nav-link">{issue.title}</Link>
        ))}
      </div>
      <div className="supplements-section">
        <h1 className="page-title">추천 영양제</h1>
        <div className="card-container">
          <div className="supplement-card">
            <img className="supplement-image" src="/supple1.jpg" alt="영양제 이미지" />
            <h3 className="supplement-title">추천 영양제1</h3>
            <p className="supplement-description">추천도: 높음</p>
            <p className="supplement-description">성분정보: ABC</p>
            <Button className='Button' type="primary" onClick={handleOpenModal}>상세 정보</Button>
          </div>
          {/* 다른 추천 영양제 카드들을 추가하세요 */}
        </div>
      </div>
      {/* 모달 */}
      <Modal
        title="영양제 상세 정보"
        visible={modalVisible} // 모달의 visible 속성
        onCancel={handleCloseModal} // 모달 닫기 버튼 클릭 시 실행되는 함수
        footer={[
          <Button key="close" onClick={handleCloseModal}>닫기</Button>
        ]}
      >
        <p>영양제의 상세 정보를 여기에 표시합니다.</p>
      </Modal>
    </div>
  );
};

export default HealthSolutionPage;
