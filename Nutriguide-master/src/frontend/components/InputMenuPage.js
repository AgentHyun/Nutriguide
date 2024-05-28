import React, { useState } from 'react';
import { Input, Form, Button, Select, message, Modal, Radio } from 'antd';
import styles from '../css/Button.css';
import '../css/InputPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function InputMenuPage() {
  const navigate = useNavigate();
  const { Option } = Select;
  const [serverResponse, setServerResponse] = useState(null);
  const [weeklyMenu, setWeeklyMenu] = useState({
    day1: [],
    day2: [],
    day3: []
  });
  const [selectedDay, setSelectedDay] = useState('day1');
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
 
  const onDescriptionChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onDayChange = (value) => {
    setSelectedDay(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newMenu = inputValue.split(/[, ]+/).filter(item => item.trim() !== '');
    setWeeklyMenu(prevMenu => ({
      ...prevMenu,
      [selectedDay]: newMenu
    }));
    setInputValue('');
    message.success(`${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}의 식단이 등록되었습니다: ${newMenu.join(', ')}`);
  };

  const deleteMenu = (day) => {
    setWeeklyMenu(prevMenu => ({
      ...prevMenu,
      [day]: []
    }));
    message.success(`${day.charAt(0).toUpperCase() + day.slice(1)}의 식단이 삭제되었습니다.`);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const calculateBMI = () => {

    const heightInMeter = height / 100;
    

    const bmi = weight / (heightInMeter * heightInMeter);
  
    return bmi.toFixed(2); // 소수점 둘째 자리까지 표시
  };
  const onComplete = async () => {
    try {
      // BMI 계산
      const bmi = calculateBMI();
      
      const response = await axios.post('http://localhost:5000/recommend_pill', {
        food_names: Object.values(weeklyMenu).flat(),
        age: parseInt(age),
        gender: gender,
        weight: parseInt(weight),
        height: parseInt(height),
        bmi: parseFloat(bmi) // BMI 값을 parseFloat로 변환하여 소수점을 포함한 값으로 전달
      });
      console.log('서버 응답:', response.data);
      setServerResponse(response.data);
     
    
      if (Object.keys(response.data).length > 0) {
        navigate('/product', { state: { serverResponse: response.data } }); // serverResponse를 state로 전달
      } else {
        message.error('서버 응답에 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('데이터 전송 실패:', error);
      message.error('데이터 전송에 실패했습니다');
    }
  };
  

  return (
    <div className='inputPage' style={{ backgroundColor: 'beige', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '700px', background: 'white', padding: '40px', borderRadius: '20px'}}>
        <div className='input-logo2'>건강 프로필</div>
        <Form onSubmit={onSubmit}>
          <Form.Item label="성별">
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
              <Radio value="male">남성</Radio>
              <Radio value="female">여성</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="나이(세)">
            <Input
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="키(cm)">
            <Input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="몸무게(kg)">
            <Input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="요일">
            <Select defaultValue="day1" onChange={onDayChange}>
              <Option value="day1">1일차</Option>
              <Option value="day2">2일차</Option>
              <Option value="day3">3일차</Option>
            </Select>
          </Form.Item>
          <Form.Item label="식단">
            <Input
              onChange={onDescriptionChange}
              value={inputValue}
            />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className={`${styles.btn} button-margin`} onClick={onSubmit}>
              등록하기
            </Button>
            <Button className='button-margin' onClick={showModal}>등록된 식단</Button>
            <Button className='button-margin' type="primary" onClick={onComplete}>완료하기</Button>
          </div>
        </Form>
      </div>
      <Modal
        title="등록된 식단"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>닫기</Button>
        ]}
      >
        {Object.keys(weeklyMenu).map(day => (
          <div key={day}>
            <p>{day.charAt(0).toUpperCase() + day.slice(1)}: {weeklyMenu[day].join(', ')}</p>
            <Button onClick={() => deleteMenu(day)} type="default">식단 삭제</Button>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default InputMenuPage;
