import React, { useState, useEffect } from 'react';
import '../css/QuestionPage.css';
import { Tooltip, Input } from 'antd';
import yourImage from '../img/robot.png'; // 이미지 경로를 가져옵니다.

const QuestionPage = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false); // 클릭 여부 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
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

    return (
        <div className='question-page'>
            <div className="header">
                
                <h1>AI에게 건강 조언을 받아보세요!</h1>
            </div>
            <form className='question-form' onSubmit={handleSubmit}>
                <label className='question-label'>
                    질문:
                    <Tooltip placement="topLeft" title={renderTooltipContent}>
                        <Input
                            type="text"
                            value={question}
                            onChange={handleQuestionChange}
                            className='question-input'
                        />
                    </Tooltip>
                </label>
                <button type="submit" className='question-button'>질문하기</button>
            </form>
            <div className='under-section'>
            {/* 로딩 중일 때 로딩 표시 */}
            {loading && <div className='loading'>생각중...</div>}
            {/* showAnswer 상태가 true이고 로딩이 완료된 경우에만 답변을 표시 */}
            {showAnswer && !loading && (
                <div className='answer-container'>
                    {answer && <div className='answer'>답변: {answer}</div>}
                </div>
            )}
            <img src={yourImage} alt="Your Logo" className="logo-image" />
            </div>
        </div>
    );
};

export default QuestionPage;