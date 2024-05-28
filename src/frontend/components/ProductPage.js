import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, message, Tooltip } from 'antd'; // Tooltip import 추가
import '../css/ProductPage.css';

const BMIInfo = ({ serverResponse }) => {
  const { BMI } = serverResponse;

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

  const bmiStatus = calculateBMIStatus(BMI);

  return (
    <Tooltip title="키와 체중을 이용해 계산한 BMI">
    <div className="bmi-info-container">
      <div className="bmi-info-border">
        <h2 className="bmi-info-title">BMI 측정 결과</h2>
        <p className="bmi-info-value">당신의 BMI 지수: {BMI.toFixed(1)}</p>
        <p className="bmi-info-value"> <h4>{bmiStatus}</h4></p>
      </div>
    </div>
    </Tooltip>
  );
};
  

const ProductPage = () => {
  const location = useLocation();
  const serverResponse = location.state ? location.state.serverResponse : null;
  const [deficientNutrients, setDeficientNutrients] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const messageDisplayedRef = useRef(false);
  const [supplementDetails, setSupplementDetails] = useState(null);
  const [averageIntake, setAverageIntake] = useState(null);
  const handleOpenModal = (details) => {
    setSupplementDetails(details);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  useEffect(() => {
    if (serverResponse && serverResponse['average-intake']) {
      setAverageIntake(serverResponse['average-intake']);
    }
    if (serverResponse && serverResponse['deficient-nutritions']) {
      setDeficientNutrients(serverResponse['deficient-nutritions']);
    }
    if (!serverResponse && !messageDisplayedRef.current) {
      message.info('프로필을 입력하고 식단을 추가해주세요.');
      messageDisplayedRef.current = true; // Update ref to true
    }
  }, [serverResponse]);

  return (
    <div className="page-container">
      <div className="info-section">
        <Tooltip title="BMI 측정 결과">
          {serverResponse && <BMIInfo serverResponse={serverResponse} />}
        </Tooltip>
        <Tooltip title="평균 하루 동안 섭취한 영양소">
          <div className="average-intake-container">
            <div className="average-intake-border">
              <h2 className="average-intake-title">일일 평균 섭취량</h2>
       
              {averageIntake ? ( // averageIntake가 null이 아닌 경우에만 데이터를 표시합니다.
                <ul className="average-intake-value" style={{ listStyleType: 'none', padding: 0 }}>
                  {Object.keys(averageIntake).map((key) => (
                    <li key={key}>
                      {key}: {averageIntake[key]}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}

            </div>
          </div>
        </Tooltip>
        <Tooltip title="권장섭취량에 비해 부족한 영양소">
          <div className="insufficient-container">
            <div className="insufficient-border">
              <h2 className="insufficient-title">부족한 영양소</h2>
              {deficientNutrients ? ( // deficientNutrients가 null이 아닌 경우에만 데이터를 표시합니다.
                <ul className="insufficient-value" style={{ listStyleType: 'none', padding: 0 }}>
                  {Object.keys(deficientNutrients).map((key) => (
                    <li key={key}>
                      {key}: {deficientNutrients[key]}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </Tooltip>
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
                    src={require(`../img/pill_character${index + 1}.png`)}
                  />
                </div>
                <div className="character-text">
                  <h3 className="supplement-title">{index+1 + "." + " "}{serverResponse.recommendation[key].영양제명}</h3>
           
                  <Button className="Button" type="primary" onClick={() => handleOpenModal(serverResponse.recommendation[key])}>
                    상세 정보
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        title={<h2 style={{ fontSize: '24px' }}>영양제 상세 정보</h2>}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            닫기
          </Button>,
        ]}
      >
        {supplementDetails && ( // 데이터가 있을 때만 렌더링
          <div>
            <h3>영양제명:</h3>
            <p>{supplementDetails.영양제명}</p>
            <h3>주의할 점:</h3>
            <p>{supplementDetails.IFTKN_ATNT_MATR_CN}</p>
            <h3>영양소 성분:</h3>
            <p>{supplementDetails.STDR_STND}</p>
            <h3>영양제 효과:</h3>
            <p>{supplementDetails.PRIMARY_FNCLTY}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductPage;
