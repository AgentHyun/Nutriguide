import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Select, message, Modal, Radio ,Tooltip } from 'antd';
import styles from '../css/Button.css';
import '../css/InputPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image1 from '../img/exercise/Bicyling-in-the-Park.jpg';
import image2 from '../img/exercise/43069.jpg';
import image3 from '../img/exercise/Flat-Soccer-Players.jpg';
import image4 from '../img/exercise/The-Explorers.jpg';
import image5 from '../img/exercise/Yoga class vector 2.jpg';
import image6 from '../img/exercise/nutrition.jpg';
import image7 from '../img/exercise/treadmill_Mesa de trabajo 1.jpg';
import image8 from '../img/exercise/V0218_generated.jpg';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스

  useEffect(() => {
    // 이미지 자동 슬라이드 설정
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 이미지 변경
    return () => clearInterval(interval);
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  const images = [image1, image2, image3, image4, image5, image6,image7,image8];
  const imageDescriptions = [
    '자전거 타기는 심혈관 건강과 근력을 향상시키며, 체지방을 감소시키는 효과가 있는 유용한 유산소 운동입니다.',
    '균형 잡힌 식사는 체중을 조절하고 심혈관 건강을 증진시키며, 에너지 수준을 유지하는 데 도움이 되는 중요한 요소입니다.',
    '축구는 다양한 움직임으로 근력, 유연성, 심혈관 건강을 향상시키는 유산소 및 근력 운동입니다.',
    '등산은 심혈관 건강을 증진시키고 근육을 강화하며, 스트레스를 효과적으로 줄일 수 있는 전신 운동입니다.',
    '요가는 유연성과 근력을 향상시키며, 스트레스를 감소시키고 정신적 안정을 도모하는 효과가 있는 운동입니다.',
    '영양제는 영양 섭취량을 보충하여 건강을 유지하고 특정 건강 상태를 개선하는 데 도움을 줄 수 있는 보조 수단입니다.',
    '러닝은 심혈관 건강을 향상시키고 체지방을 감소시키며, 스트레스를 완화하고 균형을 유지하는 데 도움이 되는 유산소 운동입니다.',
    '수영은 전신을 균등하게 운동시키며 심혈관 기능을 향상시키고, 관절에 부담을 줄이고 체지방을 감소시키며 스트레스를 완화하는 효과가 있는 운동입니다.'
  ];

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
      [selectedDay]: [...prevMenu[selectedDay], ...newMenu]
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

    
    <div className='input-Page' >
     <div className='img-container' style={{ border: '2px solid #cccccc', padding: '20px', backgroundColor : 'white' ,borderRadius: '20px'}}>
  <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
  <div style={{ marginTop: '10px' }}>{imageDescriptions[currentImageIndex]}</div> {/* 이미지 설명 표시 */}
  
</div>
     <div className='input-container'>
      <div style={{ maxWidth: '700px', background: 'white', padding: '40px', borderRadius: '20px'}}>
        <div className='input-logo2'>건강 프로필</div>
        <Form onSubmit={onSubmit}>
          <Form.Item label="성별">
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
              <Radio value="남성">남성</Radio>
              <Radio value="여성">여성</Radio>
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
          <Tooltip title="여러 개의 항목을 입력할 때는 쉼표(,) 또는 공백으로 구분하세요.">
            <Input
              onChange={onDescriptionChange}
              value={inputValue}
            />
              </Tooltip>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className={`${styles.btn} button-margin`} onClick={onSubmit}>
              등록하기
            </Button>
            <Button className='button-margin' onClick={showModal}>등록된 식단</Button>
            <Button className='button-margin2' type="primary" onClick={onComplete}>완료하기</Button>
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
  
    </div>
    
  );
}

export default InputMenuPage;
