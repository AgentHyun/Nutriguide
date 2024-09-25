import React, { useState } from 'react';
import '../css/DetailPage.css';

function DetailPage() {
  // 모달 상태와 선택된 영양소의 인덱스를 관리하는 상태 변수
  const [modal, setModal] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null);

  // 영양소 목록
  const nutrition = [
    { id: 1, name: '루테인', intro: '눈 건강을 위한 카로티노이드 성분', effect: '황반을 보호하여 시력 유지에 도움을 줍니다.' },
    { id: 2, name: '비타민A', intro: '지용성 비타민으로, 시력과 피부 건강에 필수적', effect: '눈 건강 유지 및 면역력 강화에 도움을 줍니다.' },
    { id: 3, name: '비타민B2', intro: '세포 에너지 대사에 필요한 수용성 비타민', effect: '피로 회복과 피부, 눈 건강에 도움을 줍니다.' },
    { id: 4, name: '비타민B6', intro: '단백질 대사와 신경전달물질 합성에 중요한 비타민', effect: '신경 기능 유지와 면역력 강화에 도움을 줍니다.' },
    { id: 5, name: '비타민D', intro: '칼슘 흡수를 돕는 지용성 비타민', effect: '뼈 건강을 유지하고 면역력을 증진시킵니다.' },
    { id: 6, name: '비타민E', intro: '항산화 역할을 하는 지용성 비타민', effect: '세포 손상을 방지하고 피부 건강을 개선합니다.' },
    { id: 7, name: '비타민K', intro: '혈액 응고에 중요한 역할을 하는 지용성 비타민', effect: '뼈 건강을 유지하고 출혈을 방지합니다.' },
    { id: 8, name: '비타민C', intro: '항산화제 역할을 하는 수용성 비타민', effect: '면역력 증진과 피부 콜라겐 형성에 기여합니다.' },
    { id: 9, name: '아연', intro: '다양한 효소의 작용에 필수적인 미네랄', effect: '면역력 강화와 상처 치유에 기여합니다.' },
    { id: 10, name: '셀렌', intro: '항산화 효소의 중요한 구성 요소', effect: '세포 보호 및 면역 체계를 강화합니다.' },
    { id: 11, name: '철', intro: '산소 운반에 중요한 필수 미네랄', effect: '빈혈 예방과 에너지 생산에 도움을 줍니다.' },
    { id: 12, name: '마그네슘', intro: '근육과 신경 기능에 필수적인 미네랄', effect: '근육 이완, 신경 안정, 에너지 생산을 지원합니다.' },
    { id: 13, name: 'EPA', intro: '오메가-3 지방산의 일종', effect: '심장 건강을 유지하고 염증을 감소시킵니다.' },
    { id: 14, name: '프로바이오틱스', intro: '유익한 균으로 장내 미생물 균형을 유지', effect: '장 건강 증진과 면역력 강화에 도움을 줍니다.' },
    { id: 15, name: '실리마린', intro: '밀크시슬에서 추출되는 항산화 성분', effect: '간 건강을 보호하고 해독 기능을 지원합니다.' },
    { id: 16, name: '나이아신', intro: '에너지 대사와 DNA 복구에 필요한 비타민', effect: '피부 건강 개선과 콜레스테롤 수치 조절에 도움을 줍니다.' },
    { id: 17, name: '올리고당', intro: '장내 유익균의 먹이로 사용되는 탄수화물', effect: '장내 환경을 개선하고 소화를 촉진합니다.' },
    { id: 18, name: '칼슘', intro: '뼈와 치아 건강에 중요한 미네랄', effect: '골밀도 유지와 근육 기능에 필수적입니다.' },
    { id: 19, name: '베타카로틴', intro: '비타민 A로 변환되는 카로티노이드', effect: '항산화 작용과 눈 건강에 기여합니다.' },
    { id: 20, name: '판토텐산', intro: '에너지 생성에 관여하는 수용성 비타민', effect: '스트레스 감소와 피부 건강에 도움을 줍니다.' },
    { id: 21, name: '비오틴', intro: '탄수화물, 지방, 단백질 대사에 중요한 비타민', effect: '머리카락과 손톱 건강을 증진합니다.' },
    { id: 22, name: '망간', intro: '항산화 작용과 뼈 건강에 기여하는 미네랄', effect: '에너지 대사와 뼈 형성에 필수적입니다.' },
    { id: 23, name: '크롬', intro: '혈당 조절에 관여하는 미량 원소', effect: '인슐린 민감성을 개선하여 혈당 조절에 도움을 줍니다.' },
    { id: 24, name: '엽산', intro: 'DNA 합성과 세포 분열에 중요한 비타민', effect: '임신 중 태아 신경관 결손 예방에 필수적입니다.' },
    { id: 25, name: '구리', intro: '철 대사와 항산화 작용에 필요한 미네랄', effect: '철 흡수와 면역력 증진에 도움을 줍니다.' },
    { id: 26, name: '몰리브덴', intro: '효소 활성에 필요한 미량 미네랄', effect: '체내 독성 물질 대사에 기여합니다.' }
  ];

  // 모달을 열고 선택된 영양소의 인덱스를 설정
  const openModal = (index) => {
    setSelectedTitleIndex(index);
    setModal(true);
  };

  // 모달을 닫기
  const closeModal = () => {
    setModal(false);
    setSelectedTitleIndex(null);
  };

  return (
    <div className="detail-page">
      {/* 페이지 상단 타이틀과 설명 */}
      <div className="page-header">
        <h1>영양소 정보</h1>
        <p>아래의 영양소들은 AI 영양제 추천에 활용되며, 인간의 주요 필수 영양소와 그 효능에 대한 간략한 설명을 제공합니다.</p>
      </div>

      {/* 영양소 목록을 표시 */}
      <div className="nutrition-list">
        {nutrition.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openModal(index)}
            className="minibox"
          >
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>

      {/* 모달이 열려 있을 때만 표시 */}
      {modal && selectedTitleIndex !== null && (
        <Modal
          intro={nutrition[selectedTitleIndex].intro}
          effect={nutrition[selectedTitleIndex].effect}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

// 모달 컴포넌트
function Modal({ intro, effect, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
      <h2 className="modal-title"><span className="icon">📚</span> 설명</h2>
        <p>{intro}</p>
        <h2 className="modal-title"><span className="icon">💊</span> 효능</h2>
        <p>{effect}</p>
      </div>
      <button className="close-btn" onClick={onClose}>창 닫기</button>
    </div>
  );
}

export default DetailPage;
