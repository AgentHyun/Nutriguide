import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';
import '../css/ProductPage.css';

const BMIInfo = ({ serverResponse }) => {
  const { BMI } = serverResponse; // 서버 응답에서 BMI 값 추출

  // BMI 계산 함수
  const calculateBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "저체중";
    } else if (bmi >= 18.5 && bmi < 23) {
      return "정상 체중";
    } else if (bmi >= 23 && bmi < 25) {
      return "과체중";
    } else if (bmi >= 25 && bmi < 30) {
      return "경도 비만";
    } else {
      return "고도 비만";
    }
  };

  const bmiStatus = calculateBMIStatus(BMI); // BMI에 따른 상태 계산

  return (
    <div className="bmi-info-container">
      <div className="bmi-info-border">
        <h2 className="bmi-info-title">BMI 측정 결과</h2>
        <p className="bmi-info-value">당신의 BMI 지수: {BMI.toFixed(1)}</p>
        <p className="bmi-info-value"> <h4>{bmiStatus}</h4></p>
      </div>
    </div>
  );
};
const ProductPage = () => {
  const location = useLocation();
  const serverResponse = location.state ? location.state.serverResponse : null;
  const [averageIntake, setAverageIntake] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  console.log(serverResponse);

  return (
    <div className="page-container">
      <div className="info-section">
        {serverResponse && <BMIInfo serverResponse={serverResponse} />} {/* BMI 정보 전달 */}
        <div className="average-intake-container">
          <div className="average-intake-border">
            <h2 className="average-intake-title">평균 섭취량</h2>
            <p className="average-intake-value">{averageIntake}</p>
          </div>
        </div>
        <div className="insufficient-container">
          <div className="insufficient-border">
            <h2 className="insufficient-title">부족한 영양소</h2>
            <p className="insufficient-value">당신에게 부족한 영양소: X</p>
          </div>
        </div>
      </div>
      <div className="supplements-section">
        <h1 className="page-title">추천 영양제</h1>
        <div className="card-container">
          {serverResponse &&
            Object.keys(serverResponse.recommendation).map((key, index) => (
              <div key={key}>
                <div className="character-image-container">
                  <img
                    className="character-image"
                    alt="영양제 이미지"
                    src={require(`../img/pill_character${index + 1}.png`)} // 이미지 URL 변경
                  />
                </div>
                <div className="character-text">
                  <h3 className="supplement-title">{serverResponse.recommendation[key].영양제명}</h3>
                  <p className="supplement-description">추천도 : {Math.round(serverResponse.recommendation[key].거리)}</p>
                  <Button className="Button" type="primary" onClick={handleOpenModal}>
                    상세 정보
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        title="영양제 상세 정보"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            닫기
          </Button>,
        ]}
      >
        <p>영양제의 상세 정보를 여기에 표시합니다.</p>
      </Modal>
    </div>
  );
};

export default ProductPage;
