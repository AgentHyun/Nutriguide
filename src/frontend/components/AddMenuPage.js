import React, { useState } from 'react';
import { notification } from 'antd';  // antd의 notification import
import 'antd/dist/reset.css'; // Ant Design의 기본 스타일을 적용합니다.
import '../css/AddMenuPage.css';

function AddMenuPage() {
  const [foodInput, setFoodInput] = useState('');
  const [foodList, setFoodList] = useState([]);

  const handleInputChange = (event) => {
    setFoodInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (foodInput.trim()) {
      setFoodList([...foodList, foodInput.trim()]);
      setFoodInput('');
      notification.success({
        message: '성공',
        description: '음식이 검토후 등록될 것입니다!',
        placement: 'topRight',
      });
    }
  };

  return (
    <div className="add-menu-page-container">
      <div className="add-menu-page-header">
        <h1 className="add-menu-page-title">음식 추가 요청</h1>
        <p className="add-menu-page-description">
        새로운 음식을 제안하셔서 메뉴를 더욱 풍성하게 만들어 주세요!<br/> 등록하신 음식은 아래 목록에서 확인하실 수 있습니다.
        </p>
      </div>
      <div className="add-menu-page-content">
        <form className="add-menu-page-form" onSubmit={handleSubmit}>
          <label htmlFor="food-input" className="add-menu-page-label">음식 이름:</label>
          <input
            type="text"
            id="food-input"
            className="add-menu-page-input"
            value={foodInput}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="add-menu-page-button">추가하기</button>
        </form>
        <div className="add-menu-page-board">
          <h2 className="add-menu-page-board-title">등록된 음식 목록</h2>
          <ul className="add-menu-page-list">
            {foodList.length ? (
              foodList.map((food, index) => (
                <li key={index} className="add-menu-page-list-item">{food}</li>
              ))
            ) : (
              <li className="add-menu-page-empty">등록된 음식이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddMenuPage;
