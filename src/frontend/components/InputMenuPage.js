import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Select, message, Modal, Radio,Tooltip } from 'antd';
import styles from '../css/Button.css';
import '../css/InputPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image1 from '../img/exercise/img3.png';
import image2 from '../img/exercise/img1.png';
import image3 from '../img/exercise/img2.png';
import image4 from '../img/exercise/img4.png';
import image5 from '../img/exercise/img5.png';
import image6 from '../img/exercise/img6.png';
import image7 from '../img/exercise/img7.png';
import image8 from '../img/exercise/img8.png';
//한식(국)
import 김치찌개 from '../img/food/국/김치찌개.jpg'; // Add your food images here
import 된장찌개 from '../img/food/국/된장찌개.jpg';
import 추어탕 from '../img/food/국/추어탕.jpg'; 
import 감자탕 from '../img/food/국/감자탕.jpg';
import 떡만둣국 from '../img/food/국/떡만둣국.jpg'; 
import 부대찌개 from '../img/food/국/부대찌개.jpg'; 
import 육개장 from '../img/food/국/육개장.jpg';
import 샤브샤브 from '../img/food/국/샤브샤브.jpg'; 
import 콩나물국 from '../img/food/국/콩나물국.jpg'; 
import 미역국 from '../img/food/국/미역국.jpg'; 
import 순대국 from '../img/food/국/순대국.jpg'; 
import 설렁탕 from '../img/food/국/설렁탕.jpg'; 
import 닭볶음탕 from '../img/food/국/닭볶음탕.jpg'; 
import 북어국 from '../img/food/국/북어국.jpg'; 
import 소고기무국 from '../img/food/국/소고기무국.jpg'; 
import 오징어무국 from '../img/food/국/오징어무국.jpg';
import 삼계탕 from '../img/food/국/삼계탕.jpg'; 
import 전복죽 from '../img/food/국/전복죽.jpg'; 
import 호박죽 from '../img/food/국/호박죽.jpg';
import 비지찌개 from '../img/food/국/비지찌개.jpg'; 
import 청국장 from '../img/food/국/청국장.jpg';
import 돼지국밥 from '../img/food/국/돼지국밥.jpg';
//과일
import 귤 from '../img/food/과일/귤.jpg';
import 딸기 from '../img/food/과일/딸기.jpg';
import 레몬 from '../img/food/과일/레몬.jpg';
import 망고 from '../img/food/과일/망고.jpg';
import 바나나 from '../img/food/과일/바나나.jpg';
import 블루베리 from '../img/food/과일/블루베리.jpg';
import 오렌지 from '../img/food/과일/오렌지.jpg';
import 자두 from '../img/food/과일/자두.jpg';
import 키위 from '../img/food/과일/키위.jpg';
import 파인애플 from '../img/food/과일/파인애플.jpg';
import 포도 from '../img/food/과일/포도.jpg';
import 사과 from '../img/food/과일/사과.jpg';
import 수박 from '../img/food/과일/수박.jpg';
import 참외 from '../img/food/과일/참외.jpg';
import 복숭아 from '../img/food/과일/복숭아.jpg';

//채소
import 브로콜리 from '../img/food/채소/브로콜리.jpg';
import 옥수수 from '../img/food/채소/옥수수.jpg';
import 아보카도 from '../img/food/채소/아보카도.jpg'; 
import 토마토 from '../img/food/채소/토마토.jpg'; 
import 시금치 from '../img/food/채소/시금치.jpg'; 
import 케일 from '../img/food/채소/케일.jpg'; 
import 감자 from '../img/food/채소/감자.jpg'; 
import 고구마 from '../img/food/채소/고구마.jpg'; 
import 밤 from '../img/food/채소/밤.jpg'; 
import 호두 from '../img/food/채소/호두.jpg'; 
import 고추 from '../img/food/채소/고추.jpg'; 
import 콜리플라워 from '../img/food/채소/콜리플라워.jpg'; 
import 당근 from '../img/food/채소/당근.jpg'; 
import 부추 from '../img/food/채소/부추.jpg'; 
import 생강 from '../img/food/채소/생강.jpg'; 
import 쑥갓 from '../img/food/채소/쑥갓.jpg'; 
import 아스파라거스 from '../img/food/채소/아스파라거스.jpg'; 
import 양상추 from '../img/food/채소/양상추.jpg'; 
import 연근 from '../img/food/채소/연근.jpg'; 
import 콜라비 from '../img/food/채소/콜라비.jpg'; 
import 파프리카 from '../img/food/채소/파프리카.jpg'; 
import 버섯 from '../img/food/채소/버섯.jpg'; 
import 비트 from '../img/food/채소/비트.jpg'; 
import 마늘 from '../img/food/채소/마늘.jpg'; 
import 파 from '../img/food/채소/파.jpg'; 
import 양배추샐러드 from '../img/food/채소/양배추샐러드.jpg';
//분식
import 돈까스 from '../img/food/분식/돈까스.jpg'; 
import 어묵 from '../img/food/분식/어묵.jpg'; 
import 어묵탕 from '../img/food/분식/어묵탕.jpg'; 
import 순대 from '../img/food/분식/순대.jpg'; 
import 떡볶이 from '../img/food/분식/떡볶이.jpg'; 
import 김밥 from '../img/food/분식/김밥.jpg'; 
import 칼국수 from '../img/food/분식/칼국수.jpg'; 
import 잔치국수 from '../img/food/분식/잔치국수.jpg'; 
import 만두 from '../img/food/분식/만두.jpg'; 
import 냉면 from '../img/food/분식/냉면.jpg'; 
import 튀김 from '../img/food/분식/튀김.jpg'; 
import 수제비 from '../img/food/분식/수제비.jpg'; 
import 김치볶음밥 from '../img/food/분식/김치볶음밥.jpg'; 
import 치킨마요뎦밥 from '../img/food/분식/치킨마요덮밥.jpg'; 
import 참치뎦밥 from '../img/food/분식/참치덮밥.jpg'; 
import 스팸마요덮밥 from '../img/food/분식/스팸마요덮밥.jpg'; 
import 우동 from '../img/food/분식/우동.jpg'; 
//중식
import 탕후루 from '../img/food/중식/탕후루.jpg'; 
import 마라탕 from '../img/food/중식/마라탕.jpg';
import 자장면 from '../img/food/중식/자장면.jpg';
import 짬뽕 from '../img/food/중식/짬뽕.jpg'; 
import 탕수육 from '../img/food/중식/탕수육.jpg';
import 볶음밥 from '../img/food/중식/볶음밥.jpg';
import 멘보샤 from '../img/food/중식/멘보샤.jpg';
import 양장피 from '../img/food/중식/양장피.jpg';
import 팔보채 from '../img/food/중식/팔보채.jpg';
import 고추잡채 from '../img/food/중식/고추잡채.jpg';
import 크림새우 from '../img/food/중식/크림새우.jpg';
import 유산슬 from '../img/food/중식/유산슬.jpg';
import 마라샹궈 from '../img/food/중식/마라샹궈.jpg';
import 짜장밥 from '../img/food/중식/자장밥.jpg';
import 짬뽕밥 from '../img/food/중식/짬뽕밥.jpg';
import 깐쇼새우 from '../img/food/중식/깐쇼새우.jpg';
import 마파두부 from '../img/food/중식/마파두부.jpg';
import 군만두 from '../img/food/중식/군만두.jpg';
import 깐풍기 from '../img/food/중식/깐풍기.jpg';
//양식
import 토마토스파게티 from '../img/food/양식/토마토스파게티.jpg'; 
import 까르보나라 from '../img/food/양식/까르보나라.jpg';
import 피자 from '../img/food/양식/피자.jpg';
import 햄버거 from '../img/food/양식/햄버거.jpg'; 
import 감자튀김 from '../img/food/양식/프렌치프라이.jpg';
import 머핀 from '../img/food/양식/머핀.jpg';
import 리조또 from '../img/food/양식/리조또.jpg'; 
import 생선까스 from '../img/food/양식/생선까스.jpg';
import 수프 from '../img/food/양식/수프.jpg';
import 스테이크 from '../img/food/양식/스테이크.jpg';
import 오징어링 from '../img/food/양식/오징어링.jpg';
import 치킨 from '../img/food/양식/치킨.jpg';
import 미트볼 from '../img/food/양식/미트볼.jpg'; 
import 랍스터 from '../img/food/양식/랍스터.jpg';
import 와인 from '../img/food/양식/와인.jpg';
import 오믈렛 from '../img/food/양식/오믈렛.jpg';
import 베이컨 from '../img/food/양식/베이컨.jpg';
import 로스트덕 from '../img/food/양식/로스트덕.jpg';
//한식
import 비빔밥 from '../img/food/한식/비빔밥.jpg';
import 불고기 from '../img/food/한식/불고기.jpg';
import 제육볶음 from '../img/food/한식/제육볶음.jpg';
import 족발 from '../img/food/한식/족발.jpg';
import 보쌈 from '../img/food/한식/보쌈.jpg';
import 두부김치 from '../img/food/한식/두부김치.jpg';
import 삼겹살 from '../img/food/한식/삼겹살.jpg';
import 장조림 from '../img/food/한식/장조림.jpg';
import 나물무침 from '../img/food/한식/나물무침.jpg';
import 김치 from '../img/food/한식/김치.jpg';
import 떡갈비 from '../img/food/한식/떡갈비.jpg';
import 생선구이 from '../img/food/한식/생선구이.jpg';
import 곱창 from '../img/food/한식/곱창.jpg';
import 막창 from '../img/food/한식/막창.jpg';
import 전종류 from '../img/food/한식/전종류.jpg';
import 오징어볶음 from '../img/food/한식/오징어볶음.jpg';
import 돼지갈비 from '../img/food/한식/돼지갈비.jpg';
import 공기밥 from '../img/food/한식/공기밥.jpg';
import 조미김 from '../img/food/한식/조미김.jpg';
import 잡곡밥 from '../img/food/한식/잡곡밥.jpg';

//간식

import 핫도그 from '../img/food/간식/핫도그.jpg';
import 삼각김밥 from '../img/food/간식/삼각김밥.jpg';
import 라면 from '../img/food/간식/라면.jpg';
import 씨리얼 from '../img/food/간식/씨리얼.jpg';
import 요거트 from '../img/food/간식/요거트.jpg';
import 쿠키 from '../img/food/간식/쿠키.jpg';
import 삶은계란 from '../img/food/간식/삶은 계란.jpg';
import 핫바 from '../img/food/간식/핫바.jpg';
import 커피 from '../img/food/간식/커피.jpg';
import 빙수 from '../img/food/간식/빙수.jpg';
import 아이스크림 from '../img/food/간식/아이스크림.jpg';
import 과자 from '../img/food/간식/과자.jpg';
import 아메리카노 from '../img/food/간식/아메리카노.jpg';
import 오렌지주스 from '../img/food/간식/오렌지주스.jpg';
import 사이다 from '../img/food/간식/사이다.jpg';
import 초코바 from '../img/food/간식/초코바.jpg';
import 젤리 from '../img/food/간식/젤리.jpg';
import 도넛 from '../img/food/간식/도넛.jpg';
import 마카롱 from '../img/food/간식/마카롱.jpg';
import 팝콘 from '../img/food/간식/팝콘.jpg';
import 사탕 from '../img/food/간식/사탕.jpg';
import 티라미수 from '../img/food/간식/티라미수.jpg';


const foodCategories = {
  soup: [
    { name: '김치찌개', image: 김치찌개 },
    { name: '감자탕', image: 감자탕 },
    { name: '된장찌개', image: 된장찌개 },
    { name: '떡만둣국', image: 떡만둣국 },
    { name: '추어탕', image: 추어탕 },
    { name: '부대찌개', image: 부대찌개 },
    { name: '육개장', image: 육개장 },
    { name: '콩나물국', image: 콩나물국 },
    { name: '샤브샤브', image: 샤브샤브 },
    { name: '미역국', image: 미역국 },
    { name: '순대국', image: 순대국 },
    { name: '설렁탕', image: 설렁탕 },
    { name: '닭볶음탕', image: 닭볶음탕 },
    { name: '북어국', image: 북어국 },
    { name: '소고기무국', image: 소고기무국 },
    { name: '오징어무국', image: 오징어무국 },
    { name: '삼계탕', image: 삼계탕 },
    { name: '전복죽', image: 전복죽 },
    { name: '호박죽', image: 호박죽 },
    { name: '비지찌개', image: 비지찌개 },
    { name: '청국장', image: 청국장 },
    { name: '돼지 국밥', image: 돼지국밥 },
  ],
  과일: [
    { name: '귤', image: 귤 },
    { name: '딸기', image: 딸기 },
    { name: '레몬', image: 레몬 },
    { name: '망고', image: 망고 },
    { name: '바나나', image: 바나나 },
    { name: '블루베리', image: 블루베리 },
    { name: '오렌지', image: 오렌지 },
    { name: '자두', image: 자두 },
    { name: '키위', image: 키위 },
    { name: '파인애플', image: 파인애플 },
    { name: '포도', image: 포도 },
    { name: '사과', image: 사과 },
    { name: '수박', image: 수박 },
    { name: '참외', image: 참외 },
    { name: '복숭아', image: 복숭아 },
  ],
  채소: [
    { name: '브로콜리', image: 브로콜리 },
    { name: '옥수수', image: 옥수수 },
    { name: '시금치', image: 시금치 },
    { name: '토마토', image: 토마토 },
    { name: '케일', image: 케일 },
    { name: '감자', image: 감자 },
    { name: '고구마', image: 고구마 },
    { name: '아보카도', image: 아보카도 },
    { name: '밤', image: 밤 },
    { name: '호두', image: 호두 },
    { name: '고추', image: 고추 },
    { name: '콜리플라워', image: 콜리플라워 },
    { name: '당근', image: 당근 },
    { name: '부추', image: 부추 },
    { name: '생강', image: 생강 },
    { name: '아스파라거스', image: 아스파라거스 },
    { name: '양상추', image: 양상추 },
    { name: '쑥갓', image: 쑥갓 },
    { name: '콜라비', image: 콜라비 },
    { name: '연근', image: 연근 },
    { name: '파프리카', image: 파프리카 },
    { name: '버섯', image: 버섯 },
    { name: '비트', image: 비트 },
    { name: '파', image: 파 },
    { name: '마늘', image: 마늘 },
    { name: '양배추 샐러드', image: 양배추샐러드 },
  ],
  분식: [
    { name: '돈까스', image: 돈까스 },
    { name: '어묵탕', image: 어묵탕 },
    { name: '어묵', image: 어묵 },
    { name: '순대', image: 순대 },
    { name: '떡볶이', image: 떡볶이 },
    { name: '김밥', image: 김밥 },
    { name: '칼국수', image: 칼국수 },
    { name: '잔치국수', image: 잔치국수 },
    { name: '냉면', image: 냉면 },
    { name: '우동', image: 우동 },
    { name: '만두', image: 만두 },
    { name: '튀김', image: 튀김 },
    { name: '수제비', image: 수제비 },
    { name: '김치볶음밥', image: 김치볶음밥 },
    { name: '치킨마요뎦밥', image: 치킨마요뎦밥 },
    { name: '참치뎦밥', image: 참치뎦밥 },
    { name: '스팸마요덮밥', image: 스팸마요덮밥 },
  ],
  중식: [
    { name: '탕후루', image: 탕후루 },
    { name: '자장면', image: 자장면 },
    { name: '짜장밥', image: 짜장밥 },
    { name: '짬뽕밥', image: 짬뽕밥 },
    { name: '마라탕', image: 마라탕 },
    { name: '짬뽕', image: 짬뽕 },
    { name: '볶음밥', image: 볶음밥 },
    { name: '팔보채', image: 팔보채 },
    { name: '양장피', image: 양장피 },
    { name: '탕수육', image: 탕수육 },
    { name: '크림새우', image: 크림새우 },
    { name: '깐쇼새우', image: 깐쇼새우 },
    { name: '멘보샤', image: 멘보샤 },
    { name: '고추잡채', image: 고추잡채 },
    { name: '유산슬', image: 유산슬 },
    { name: '마라샹궈', image: 마라샹궈 },
    { name: '마파두부', image: 마파두부 },
    { name: '군만두', image: 군만두 },
    { name: '깐풍기', image: 깐풍기 },
   
  ],
  양식: [
    { name: '토마토 스파게티', image: 토마토스파게티 },
    { name: '까르보나라', image: 까르보나라 },
    { name: '피자', image: 피자 },
    { name: '햄버거', image: 햄버거 },
    { name: '감자튀김', image: 감자튀김 },
    { name: '머핀', image: 머핀 },
    { name: '수프', image: 수프 },
    { name: '생선까스', image: 생선까스 },
    { name: '리조또', image: 리조또 },
    { name: '스테이크', image: 스테이크 },
    { name: '오징어링', image: 오징어링 },
    { name: '치킨', image: 치킨 },
    { name: '미트볼', image: 미트볼 },
    { name: '랍스터', image: 랍스터 }, 
    { name: '와인', image: 와인 }, 
    { name: '오믈렛', image: 오믈렛 }, 
    { name: '베이컨', image: 베이컨 }, 
    { name: '로스트 덕', image: 로스트덕}, 
   
   
   
  ],
   한식: [
    { name: '비빔밥', image: 비빔밥 },
    { name: '불고기', image: 불고기 },
    { name: '제육볶음', image: 제육볶음 },
    { name: '족발', image: 족발 },
    { name: '보쌈', image: 보쌈 },
    { name: '두부김치', image: 두부김치 },
    { name: '장조림', image: 장조림 },
    { name: '삼겹살', image: 삼겹살 },
    { name: '나물무침', image: 나물무침 },
    { name: '김치', image: 김치 },
    { name: '생선구이', image: 생선구이 },
    { name: '떡갈비', image: 떡갈비 },
    { name: '곱창', image: 곱창 },
    { name: '막창', image: 막창 },
    { name: '전종류', image: 전종류 },
    { name: '오징어볶음', image: 오징어볶음 },
    { name: '돼지갈비', image: 돼지갈비 },
    { name: '공기밥', image: 공기밥 },
    { name: '조미김', image: 조미김 },
    { name: '잡곡밥', image: 잡곡밥 },
   
   
   
  ],
  간식: [
    { name: '핫도그', image: 핫도그 },
    { name: '삼각김밥', image: 삼각김밥 },
    { name: '라면', image: 라면 },
    { name: '요거트', image: 요거트 },
    { name: '씨리얼', image: 씨리얼 },
    { name: '삶은 계란', image: 삶은계란 },
    { name: '쿠키', image: 쿠키 },
    { name: '핫바', image: 핫바 },
    { name: '커피', image: 커피 },
    { name: '빙수', image: 빙수 },
    { name: '아이스크림', image: 아이스크림 },
    { name: '과자', image: 과자 },
    { name: '아메리카노', image: 아메리카노 },
    { name: '오렌지 주스', image: 오렌지주스 },
    { name: '사이다', image: 사이다 },
    { name: '초코바', image: 초코바 },
    { name: '도넛', image: 도넛 },
    { name: '젤리', image: 젤리 },
    { name: '마카롱', image: 마카롱 },
    { name: '사탕', image: 사탕 },
    { name: '티라미수', image: 티라미수 },   
   { name: '팝콘', image: 팝콘 },
    
   
  ],
  
};

function InputMenuPage() {
  const navigate = useNavigate();
  const { Option } = Select;
  const [serverResponse, setServerResponse] = useState(null);
  const [weeklyMenu, setWeeklyMenu] = useState({
    day1: [],
    day2: [],
    day3: [],
  });
  const [selectedDay, setSelectedDay] = useState('day1');
  const [selectedCategory, setSelectedCategory] = useState('soup');
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const images = [image1, image2, image3, image4, image5, image6, image7, image8];
  const imageDescriptions = [
    '키와 나이, 몸무게를 입력받아서 BMI 정보를 제공합니다.',
    '3일치 식단의 평균치를 구해서 부족한 영양소를 산출합니다.',
    '유클리드 거리를 구해서 부족한 영양소와 가장 유사한 영양제를 추천합니다.',
    '유클리드 거리가 가장 가까운 3개의 영양제를 선정합니다.',
    '3일동안 먹은 식단을 모두 선택해야 정확한 추천을 받을 수 있습니다.',
    '영양제는 영양 섭취량을 보충하여 건강을 유지하고 특정 건강 상태를 개선하는 데 도움을 줄 수 있는 보조 수단입니다.',
    '먹은 음식이 선택지에 없다면 비슷한 음식을 선택해주세요.',
    '권장 섭취량은 일반적인 성인을 기준으로 합니다.',
  ];

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const onDayChange = (value) => {
    setSelectedDay(value);
  };

  const addFoodToMenu = (food) => {
    setWeeklyMenu((prevMenu) => ({
      ...prevMenu,
      [selectedDay]: [...prevMenu[selectedDay], food.name],
    }));
    message.success(`${food.name}이(가) ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}의 식단에 추가되었습니다.`);

  };

  const deleteMenu = (day) => {
    setWeeklyMenu((prevMenu) => ({
      ...prevMenu,
      [day]: [],
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
    return bmi.toFixed(2);
  };

  const onComplete = async () => {
    try {
      const bmi = calculateBMI();
      const response = await axios.post('http://localhost:5000/recommend_pill', {
        food_names: Object.values(weeklyMenu).flat(),
        age: parseInt(age),
        gender: gender,
        weight: parseInt(weight),
        height: parseInt(height),
        bmi: parseFloat(bmi),
      });
      console.log('서버 응답:', response.data);
      setServerResponse(response.data);
      if (Object.keys(response.data).length > 0) {
        navigate('/product', { state: { serverResponse: response.data } });
      } else {
        message.error('서버 응답에 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('데이터 전송 실패:', error);
      message.error('데이터 전송에 실패했습니다');
    }
  };

  return (
    <div className='input-Page'>
      <div className='img-container' style={{ marginBottom: '50px', textAlign: 'center', border: '2px solid #cccccc', borderRadius: '20px', backgroundColor: 'white', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', borderRadius: '10px', transition: 'transform 0.2s' }} />

          </div>
          <div style={{ flex: 2, backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
            <p><h4>{imageDescriptions[currentImageIndex]}</h4></p>
          </div>
        </div>
      </div>
      <div className='input-container'>
        <div style={{ maxWidth: '700px', background: 'white', padding: '40px', borderRadius: '20px', marginTop: '100px' }}>
          <div className='input-logo2'>사용자 정보 입력</div>
          <Form>
          <Form.Item label="성별" className="custom-form-item">
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
              <Radio value="남성">남성</Radio>
              <Radio value="여성">여성</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="나이(세)" className="custom-form-item">
            <Input value={age} onChange={(e) => setAge(e.target.value)} />
          </Form.Item>
          <Form.Item label="키(cm)" className="custom-form-item">
            <Input value={height} onChange={(e) => setHeight(e.target.value)} />
          </Form.Item>
          <Form.Item label="몸무게(kg)" className="custom-form-item">
            <Input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </Form.Item>
          <Form.Item label="일차" className="custom-form-item">
            <Select defaultValue="day1" onChange={onDayChange}>
              <Option value="day1">1일차</Option>
              <Option value="day2">2일차</Option>
              <Option value="day3">3일차</Option>
            </Select>
          </Form.Item>
          <Form.Item label="식단 유형" className="custom-form-item">
            <Tooltip title="먹은 음식이 목록에 없으면 비슷한 음식을 선택해 주세요!">
              <Select defaultValue="soup" onChange={onCategoryChange}>
                <Option value="soup">국(한식)</Option>
                <Option value="과일">과일</Option>
                <Option value="간식">간식</Option>
                <Option value="채소">채소</Option>
                <Option value="한식">한식</Option>
                <Option value="분식">분식</Option>
                <Option value="중식">중식</Option>
                <Option value="양식">양식</Option>
              </Select>
            </Tooltip>
          </Form.Item>
          <div className="food-image-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '40px' }}>
            {foodCategories[selectedCategory].map((food) => (
              <div key={food.name} className="food-item" onClick={() => addFoodToMenu(food)} style={{ margin: '5px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={food.image} alt={food.name} className="food-image" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', transition: 'transform 0.2s' }} />
                  <div style={{ marginTop: '5px', textAlign: 'center', margin: '5px' }}>
                    <h4>{food.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button className="button-margin" onClick={showModal}>
              등록된 식단
            </Button>
            <Button className="button-margin2" type="primary" onClick={onComplete}>
              완료하기
            </Button>
          </div>
        </Form>
        </div>
        <Modal
          title="등록된 식단"
          visible={modalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>닫기</Button>,
          ]}
        >
          {Object.keys(weeklyMenu).map((day) => (
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