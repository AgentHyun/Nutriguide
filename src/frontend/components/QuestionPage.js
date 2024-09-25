import React, { useState } from 'react';
import '../css/QuestionPage.css';
import { Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import yourImage from '../img/robot.png'; // 이미지 경로를 가져옵니다.
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome CSS 추가

const QuestionPage = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false); // 클릭 여부 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [showGuideline, setShowGuideline] = useState(false); // 가이드라인 표시 상태

    const renderTooltipContent = () => (
        <span>
            ChatGPT 모델이 답변을 제공해줍니다!
        </span>
    );

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // 데이터를 가져오는 동안 로딩 상태를 true로 설정

        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAnswer(data.answer);
            setShowAnswer(true); // 버튼 클릭 시 답변 표시
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // 데이터 가져오기가 완료되면 로딩 상태를 false로 설정
        }
    };

    const toggleGuideline = () => {
        setShowGuideline(!showGuideline); // 가이드라인 표시 상태를 토글
    };

    return (
        <div className='question-page'>
            <div className="header">
                <h1>AI에게 건강 조언을 받아보세요!</h1>
            </div>
            <div className='form-and-guideline'>
                <div className='right-section'>
                    <button onClick={toggleGuideline} className='question-button-top'>
                        가이드라인 보기
                    </button>
                    {showGuideline && (
                        <div className='guideline'>
                            <h2>질문 작성 가이드라인:</h2>
                            <ul>
                                <li>
                                    <h3 className='bigtitle'>
                                        명확한 질문
                                    </h3>
                                    <div className='question-content'>
                                        <div className='question1'>
                                            "몸에 좋은 영양제를 추천해주세요!"
                                        </div>
                                        <CloseCircleOutlined className='icon' />
                                    </div>
                                    <div className='question2'>
                                        "저는 자주 피로감을 느끼는데, 피로 회복에 도움이 될 만한 영양제를 추천해주실 수 있나요?"
                                    </div>
                                    <CheckCircleOutlined className='check-icon' />
                                </li>
                                <li>
                                    <h3 className='bigtitle'>
                                        배경 정보 제시
                                    </h3>
                                    <div className='question-content'>
                                        <div className='question1'>
                                            "스트레스 해소에 도움되는 영양제를 알려주세요."
                                        </div>
                                        <CloseCircleOutlined className='icon' />
                                    </div>
                                    <div className='question2'>
                                        "저는 최근 몇 달 동안 스트레스와 과도한 업무로 인해 심한 피로를 느끼고 있습니다. 이런 상태를 개선하기 위해 효과적인 영양제가 있을까요?"
                                    </div>
                                    <CheckCircleOutlined className='check-icon' />
                                </li>
                                <li>
                                    <h3 className='bigtitle'>
                                        단계적인 질문
                                    </h3>
                                    <div className='question-content'>
                                        <span className="number-icon">1</span> {/* 숫자 1 아이콘 */}
                                        <div className='question1'>
                                            "장 건강에 좋은 영양제를 추천해주세요"
                                        </div>
                                    </div>
                                    <div className='question2'>
                                        "락토바실러스(Lactobacillus)나 비피돌박테리움(Bifidobacterium) 등의 프로바이오틱스가 함유된 제품을 선택하시면 좋을 것 같습니다."
                                    </div>
                                    <div className='question-content'>
                                        <span className="number-icon">2</span> {/* 숫자 2 아이콘 */}
                                        <div className='question1'>
                                            "복용 방법을 알려주세요."
                                        </div>
                                    </div>
                                    <div className='question2'>
                                        "하루에 1~2회, 식사 전 또는 식사 후에 물과 함께 섭취하는 것이 좋습니다."
                                    </div>
                                </li>
                                <li>
                                    <h3 className='bigtitle'>
                                        원하는 답변의 예시 제공
                                    </h3>
                                    <div className='question-content'>
                                        <div className='question1'>
                                            "불면증에 좋은 영양제를 추천해 주세요."
                                        </div>
                                        <CloseCircleOutlined className='icon' />
                                    </div>
                                    <div className='question2'>
                                        "불면증에 도움이 되는 영양제를 추천해 주세요. 그런데 어떤 성분이 포함된 제품이 효과적인지, 하루에 얼마만큼 복용해야 하는지와 같은 구체적인 정보를 포함해 주세요."
                                    </div>
                                    <CheckCircleOutlined className='check-icon' />
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className='form-answer-container'>
                        <form className='question-form' onSubmit={handleSubmit}>
                            <label className='question-label'>
                                질문을 입력하세요:
                            </label>
                            <input
                                className='question-input'
                                type='text'
                                value={question}
                                onChange={handleQuestionChange}
                                placeholder='질문을 입력하세요...'
                                required
                            />
                            <button type='submit' className='question-button'>
                                질문하기
                            </button>
                        </form>
                       
                <div className='under-section'>
                {loading && <div className='loading'>질문을 처리하는 중...</div>}
                        {showAnswer && (
                            <div className='answer-container'>
                                <h3>답변:</h3>
                                <p className='answer'>{answer}</p>
                            </div>
                        )}
                    </div>
                </div>
                    <Tooltip placement='top' title={renderTooltipContent}>
                        <img src={yourImage} className='logo-image' alt='로고 이미지' />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
