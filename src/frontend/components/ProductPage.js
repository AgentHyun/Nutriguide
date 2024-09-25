import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, message, Tooltip } from 'antd';
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

  let description = '';
  switch (bmiStatus) {
    case '저체중':
      description = "체중이 정상 범위보다 낮아 건강에 문제가 있을 수 있습니다. 균형 잡힌 식단과 충분한 영양 섭취가 필요합니다.";
      break;
    case '정상 체중':
      description = "체중이 정상 범위에 있습니다. 건강한 식습관과 규칙적인 운동을 유지하는 것이 좋습니다.";
      break;
    case '과체중':
      description = "체중이 정상 범위를 초과합니다. 체중 감량을 위해 식이 조절과 운동이 필요할 수 있습니다.";
      break;
    case '경도 비만':
      description = "체중이 비만 범위에 가까워지고 있습니다. 체중 감소를 위해 식습관 개선과 운동이 권장됩니다.";
      break;
    case '고도 비만':
      description = "체중이 비만 범위를 초과하여 건강에 큰 위험을 초래할 수 있습니다. 전문가의 조언과 함께 체중 감량 계획을 세우는 것이 중요합니다.";
      break;
    default:
      description = "BMI 상태에 대한 정보가 없습니다.";
  }
  const tooltipContent = "키와 체중을 이용해 구한 BMI 지수입니다.";
  
  return (
    <Tooltip title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}>
      <div className="bmi-info-container">
        <div className="bmi-info-border">
          <h2 className="bmi-info-title">BMI 측정 결과</h2>
          <p className="bmi-info-value">당신의 BMI 지수: {BMI.toFixed(1)}</p>
          <p className="bmi-info-value">{bmiStatus}</p>
          <img
            className="bmi-image"
            src={require('../img/bmi.png')}
            alt="BMI 이미지"
          />
          <p className="bmi-info-description">{description}</p>
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
  const [recommendations, setRecommendations] = useState(null);

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
    if (serverResponse && serverResponse.recommendation) {
      setRecommendations(serverResponse.recommendation);
    }
    if (!serverResponse && !messageDisplayedRef.current) {
      message.info('프로필을 입력하고 식단을 추가해주세요.');
      messageDisplayedRef.current = true;
    }
  }, [serverResponse]);

  // Sort recommendations by distance in descending order
  const sortedRecommendations = recommendations ? 
    Object.keys(recommendations)
      .map(key => ({ ...recommendations[key], key }))
      .sort((a, b) => b.거리 - a.거리) 
    : [];

  return (
    <div className="page-container">
      <div className="research-container">
        <div className="research-section">
          <h2>3일치 식단을 이용한 영양제 추천의 신뢰성</h2>
          <p>
            연구 결과에 따르면, 3일 동안의 식사 기록이 평균적인 영양소 섭취를 정확히 평가하는 데 충분하다는 것이 입증되었습니다. <br/><br/>
            <strong>"Ji, Y., Plourde, H., Bouzo, V., Kilgour, R. D., & Cohen, T. R. (2020). Validity and usability of a smartphone image-based dietary assessment app compared to 3-day food diaries in assessing dietary intake among Canadian adults: randomized controlled trial. JMIR mHealth and uHealth, 8(9), e16953."</strong>, <br/><br/>
            <strong>Yang, Y. J., Kim, M. K., Hwang, S. H., Ahn, Y., Shim, J. E., & Kim, D. H. (2010). Relative validities of 3-day food records and the food frequency questionnaire. Nutrition research and practice, 4(2), 142-148.</strong><br/> <br/>
            등의 연구 결과에서는 3일치 식사 기록이 영양소 섭취를 신뢰성 있게 추정할 수 있음을 보여주었습니다. 이 연구를 바탕으로, 3일치 식사 기록만으로도 충분히 정확한 영양제 추천이 가능합니다.
          </p>
          <div className="image-container">
            {/* Add image or content if needed */}
          </div>
        </div>
      </div>

      <div className="info-section">
        <Tooltip title="BMI 측정 결과">
          {serverResponse && <BMIInfo serverResponse={serverResponse} />}
        </Tooltip>
        <Tooltip title="추천도가 높을수록 부족한 영양소를 보충해 주는 영양제입니다.">
          <div className="average-intake-container">
            <div className="average-intake-border">
              <h2 className="average-intake-title">영양제 추천도</h2>
              {sortedRecommendations.length > 0 ? (
                <ul className="average-intake-value" style={{ listStyleType: 'none', padding: 0 }}>
                  {sortedRecommendations.map((item, index) => (
                    <li key={item.key}>
                      {index + 1 + '. ' + item.영양제명}: {item.거리.toFixed(4)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
              <div className="bar-chart-container">
                <div className="bar-chart">
                  <div className="bar">
                    <div className="segment" style={{ width: '10%', backgroundColor: '#ff9999' }}></div>
                    <div className="segment" style={{ width: '20%', backgroundColor: '#ffcc99' }}></div>
                    <div className="segment" style={{ width: '35%', backgroundColor: '#ffff99' }}></div>
                    <div className="segment" style={{ width: '35%', backgroundColor: '#99ff99' }}></div>
                  </div>
                  <div className="labels-percentages">
                    <div className="labels">
                      <div className="label" style={{ width: '10%' }}>낮음</div>
                      <div className="label" style={{ width: '20%' }}>보통</div>
                      <div className="label" style={{ width: '35%' }}>높음</div>
                      <div className="label" style={{ width: '35%' }}>매우 높음</div>
                    </div>
                    <div className="percentages">
                      <div className="percentage" style={{ width: '10%' }}>0-15%</div>
                      <div className="percentage" style={{ width: '20%' }}>15-30%</div>
                      <div className="percentage" style={{ width: '35%' }}>30-45%</div>
                      <div className="percentage" style={{ width: '35%' }}>45% 이상</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="recommendation-info-description">추천도의 최대값은 100이며, 높을수록 결핍된 영양소의 함량이 높은 영양제입니다.</p>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="권장섭취량에 비해 부족한 영양소입니다.">
          <div className="insufficient-container">
            <div className="insufficient-border">
              <h2 className="insufficient-title">부족한 영양소</h2>
              {deficientNutrients ? (
                <ul className="insufficient-value" style={{ listStyleType: 'none', padding: 0 }}>
                  {Object.keys(deficientNutrients).map((key) => {
                    const value = parseFloat(deficientNutrients[key]);
                    const formattedValue = value % 1 === 0 ? value.toString() : value.toFixed(1);
                    return (
                      <li key={key}>
                        {key}: {formattedValue}
                      </li>
                    );
                  })}
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
          {sortedRecommendations.map((item, index) => (
            <div key={item.key}>
              <div className="character-image-container">
                <img
                  className="character-image"
                  alt="영양제 이미지"
                  src={require(`../img/pill_character${index + 1}.png`)}
                />
              </div>
              <div className="character-text">
                <h3 className="supplement-title">{index + 1 + '. ' + item.영양제명}</h3>
                <p className="supplement-description">추천도: {item.거리.toFixed(4)}</p>
                <Button className="Button" type="primary" onClick={() => handleOpenModal(item)}>
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
        {supplementDetails && (
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
