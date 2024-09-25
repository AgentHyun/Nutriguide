from flask import Flask, request, jsonify
import openai
import pandas as pd
import numpy as np
from flask_cors import CORS
import math
app = Flask(__name__)
CORS(app)


# 데이터 로드
pill_data = pd.read_csv('Final_Pill_Standardization_Content_Dataset.csv', header=0, encoding='cp949') #영양제 영양소 함량 데이터셋
food_data = pd.read_csv('food_dataset.csv', encoding='cp949') #평균 섭취량을 구하기 위한 음식 데이터셋
Final_Pill_Dataset = pd.read_csv('Final_Pill_Dataset.csv',header=0, encoding='cp949')
Final_Pill_Dataset_KIDS = pd.read_csv('Final_Pill_Dataset+KIDS.csv',header=0, encoding='cp949')
food_data_recommand = pd.read_csv('MinMax_food_data.csv', encoding='cp949') #평균 섭취량을 구하기 위한 음식 데이터셋
child_pill_index = [2,33,40,50,63,69,85,87,89,106,129,142,143,148,161,164,
                    166,168,182,188,191,200,210,225,232,235,237,238,245,246,
                    258,265,266,269,271,274,296,304,308,315,343,348,350,353,
                    376,383,386,394,395,397,413,423,424,428,430,435,440,455,
                    457,484,488,493,502,536,539,544,545,594,604,614,617,621,
                    624,639,647,648,649,665,678,679,684,701,712,725,731,747,
                    749,750,791,804,811,821,849,850,851,868,879,888,897,901,
                    912,921,933,937,946,962,974,999,1026,1030,1039,1040,1044,
                    1061,1079,1086,1095,1106,1107,1113,1118,1122,1126,1140,
                    1144,1147,1173,1174,1176,1192,1193,1195,1204,1212,1237,
                    1240,1242,1245,1251,1258,1260,1266,1278,1281,1286]

# 제외할 영양제 인덱스
except_list_index = [6,15,35,41,67,77,79,80,89,90,109,115,121,126,142,164,
                    202,213,237,255,259,276,277,278,285,290,298,319,324,
                    333,336,337,339,341,342,345,346,349,355,366,391,403,
                    411,421,443,448,475,484,491,497,536,600,608,627,629,
                    632,634,636,644,647,648,649,651,655,656,660,668,689,
                    690,701,723,728,745,746,747,753,755,756,760,782,789,
                    792,828,841,852,857,862,868,869,874,879,885,886,904,
                    916,935,946,968,974,1044,1061,1072,1073,1106,1109,1113,
                    1114,1115,1134,1147,1148,1153,1164,1169,1186,1188,1209,
                    1226,1230,1231,1240,1254,1263,1264,1266,1271,1286,1291]

# 연령별 권장 섭취량 데이터
recommended_intake_by_age = {
    "01-02": (850, 130, 13, 30, 0, 14, 1000),
    "03-05": (1350, 150, 20, 35, 0, 19, 1200),
    "06-11": (2100, 250, 40, 60, 0, 31, 2000),
    "12-18": (2600, 330, 60, 70, 0, 39, 2300),
    "19-29": (3100, 430, 75, 80, 0, 45, 2400),
    "30-49": (2900, 420, 70, 80, 0, 45, 2400),
    "50-64": (2700, 380, 70, 80, 0, 40, 2400),
    "≥ 65": (2500, 360, 70, 75, 0, 35, 2400)
}

recommended_intake_by_age_gender = {
    "01-02": {
        "남성": (850, 130, 13, 30, 0, 14, 1000),
        "여성": (800, 120, 12, 30, 0, 14, 1000)
    },
    "03-05": {
        "남성": (1350, 150, 20, 35, 0, 19, 1200),
        "여성": (1250, 140, 18, 30, 0, 17, 1200)
    },
    "06-11": {
        "남성": (2100, 250, 40, 60, 0, 31, 2000),
        "여성": (1900, 220, 35, 55, 0, 25, 1600)
    },
    "12-18": {
        "남성": (2600, 330, 60, 70, 0, 39, 2300),
        "여성": (2200, 280, 50, 60, 0, 25, 2000)
    },
    "19-29": {
        "남성": (3100, 430, 75, 80, 0, 45, 2400),
        "여성": (2700, 370, 60, 70, 0, 25, 2200)
    },
    "30-49": {
        "남성": (2900, 420, 70, 80, 0, 45, 2400),
        "여성": (2600, 380, 65, 70, 0, 25, 2200)
    },
    "50-64": {
        "남성": (2700, 380, 70, 80, 0, 40, 2400),
        "여성": (2500, 350, 55, 60, 0, 25, 2200)
    },
    "≥ 65": {
        "남성": (2500, 360, 70, 75, 0, 35, 2400),
        "여성": (2300, 320, 55, 60, 0, 25, 2200)
    }
}
def get_recommended_intake(age, gender):
    age_group = get_age_group(age)
    recommended_intake = recommended_intake_by_age_gender[age_group][gender]
    print(f"Age: {age}, Gender: {gender}, Age Group: {age_group}, Recommended Intake: {recommended_intake}")
    return {
        '에너지(Kcal)': recommended_intake[0], 
        '탄수화물(g)': recommended_intake[1], 
        '단백질(g)': recommended_intake[2], 
        '지방(g)': recommended_intake[3], 
        '콜레스트롤(g)': recommended_intake[4], 
        '식이섬유(g)': recommended_intake[5], 
        '나트륨(mg)': recommended_intake[6],
    }

# BMI 계산 함수
def bmicalc(x):
    if x < 18.5:
        y = "저체중"
    elif 18.5 <= x < 23:
        y = "정상 체중"
    elif 23 <= x < 25:
        y = "과체중"
    elif 25 <= x < 30:
        y = "경도 비만"
    else:
        y = "고도 비만"
        
    return y

# 성별에 따른 나이대 가져오는 함수
def get_age_group(age):
    if age <= 2:
        return '01-02'
    elif age <= 5:
        return '03-05'
    elif age <= 11:
        return '06-11'
    elif age <= 18:
        return '12-18'
    elif age <= 29:
        return '19-29'
    elif age <= 49:
        return '30-49'
    elif age <= 64:
        return '50-64'
    else:
        return '≥ 65'
# 평균 섭취량 계산 함수
def calculate_average_intake(daily_intakes):
    total_intake = {nutrient: 0.0 for nutrient in daily_intakes[0]}
    count = len(daily_intakes)
    
    for daily_intake in daily_intakes:
        for nutrient, value in daily_intake.items():
            try:
                total_intake[nutrient] += float(value)
            except ValueError:
                # 숫자로 변환할 수 없는 값이 포함된 경우에 대한 예외 처리
                print(f"Could not convert value to float: {value}. Skipping...")
    
    # 각 영양소의 평균을 계산
    average_intake = {nutrient: round(total / count, 1) for nutrient, total in total_intake.items()}
    
    return average_intake

def get_nutrient_info(food_name):
    try:
        nutrient_info = food_data_recommand[food_data_recommand['음식명'] == food_name].iloc[:, 1:].fillna(0).squeeze()
        return nutrient_info.to_dict() if not nutrient_info.empty else {}
    except Exception as e:
        print(f"Error while fetching nutrient info for food '{food_name}': {e}")
        return {}
def find_deficient_nutrients(diet, recommended_intake):
    deficient_nutrients = {}
    for nutrient, intake in recommended_intake.items():
        if nutrient in diet:
            diet_value = diet[nutrient]
            print(f"Nutrient: {nutrient}, Diet Value: {diet_value}, Recommended Intake: {intake}")  # 디버깅용 출력
            diff = intake - diet_value
            if diff > 0:
                deficient_nutrients[nutrient] = diff
    print(f"Deficient Nutrients: {deficient_nutrients}")  # 디버깅용 출력
    return deficient_nutrients




def recommend_pill(daily_intakes, age, gender):
    recommended_intake = {
        '루테인(mg)': 0, 
        '비타민A(ug)': 0, 
        '비타민D(ug)': 0, 
        '비타민E(mg)': 15, 
        '비타민K(ug)': 120, 
        '비타민C(mg)': 90, 
        '비타민B2(mg)': 1.3, 
        '아연(mg)': 11, 
        '셀렌(ug)': 55, 
        '철(mg)': 8, 
        '마그네슘(mg)': 400, 
        'EPA(mg)': 0, 
        '프로바이오틱스(CFU)': 0, 
        '실리마린(mg)': 0, 
        '나이아신(mg)': 16, 
        '올리고당(g)': 0, 
        '칼슘(mg)': 1000, 
        '비타민B6(mg)': 1.7, 
        '베타카로틴(mg)': 900, 
        '판토텐산(mg)': 5, 
        '비오틴(ug)': 30, 
        '망간(mg)': 2.3, 
        '크롬(ug)': 0, 
        '엽산(ug)': 400, 
        '구리(mg)': 0.9, 
        '몰리브덴(ug)': 55
    }

    # 부족한 영양소 확인
    deficient_nutrients = find_deficient_nutrients(daily_intakes, recommended_intake)
    print("Deficient Nutrients:", deficient_nutrients)  # 디버깅용 출력
    
    # 영양제 추천을 위한 기준 설정
    nutrient_weights = {
        '루테인(mg)': 1.5, '비타민A(ug)': 1.2, '비타민D(ug)': 1.3, '비타민E(mg)': 1.1, '비타민K(ug)': 1.1, 
        '비타민C(mg)': 1.3, '비타민B2(mg)': 1.1, '아연(mg)': 1.2, '셀렌(ug)': 1.1, '철(mg)': 1.2, 
        '마그네슘(mg)': 1.1, 'EPA(mg)': 1.2, '프로바이오틱스(CFU)': 1.1, '실리마린(mg)': 1.1, '나이아신(mg)': 1.1, 
        '올리고당(g)': 1.1, '칼슘(mg)': 1.2, '비타민B6(mg)': 1.1, '베타카로틴(mg)': 1.1, '판토텐산(mg)': 1.1, 
        '비오틴(ug)': 1.1, '망간(mg)': 1.1, '크롬(ug)': 1.1, '엽산(ug)': 1.1, '구리(mg)': 1.1, '몰리브덴(ug)': 1.1
    }
    
    pill_distance_list = []
    for i, pill in pill_data.iterrows():
        pill_distance = 0.0
        for nutrient, weight in nutrient_weights.items():
            pill_nutrient_value = pill.get(nutrient, 0)
            diet_nutrient_value = deficient_nutrients.get(nutrient, 0)

   
            nutrient_diff = abs(pill_nutrient_value - diet_nutrient_value) 
            if nutrient_diff > 0: 
                pill_distance += weight * nutrient_diff 
        
        pill_distance = math.sqrt(pill_distance)  # 유클리드 거리 계산
      
        pill_distance_list.append((i, pill_distance))
        
    # 거리 기준으로 정렬
    sorted_pill_distance_list = sorted(pill_distance_list, key=lambda x: x[1])

    # 나이에 따라 다른 데이터셋 선택
    if age > 20:
        pill_dataset = Final_Pill_Dataset
    else:
        pill_dataset = Final_Pill_Dataset_KIDS

    recommendation = {}
    for idx, distance in sorted_pill_distance_list[:3]:  # 상위 3개의 영양제를 추천
        recommendation[idx] = {
            '영양제명': pill_dataset.loc[idx, '영양제명'],
            '거리': distance,
            'IFTKN_ATNT_MATR_CN': pill_dataset.loc[idx, 'IFTKN_ATNT_MATR_CN'],
            'STDR_STND': pill_dataset.loc[idx, 'STDR_STND'],
            'PRIMARY_FNCLTY': pill_dataset.loc[idx, 'PRIMARY_FNCLTY']
        }

    return recommendation




# 거리 계산 메소드
def distance(x, y):
    x_values = x.values
    y_values = np.array(list(y.values()) + [0.0] * (len(x_values) - len(y)))
    a = np.linalg.norm(x_values - y_values)
    return a

# BMI 계산 메소드
def calc(vJson):
    height = vJson['height']
    height = int(height) / 100    
    weight = vJson['weight']   
    weight = int(weight)
    age = vJson['age']  
    age = int(age)
    gender = vJson['gender'] # 추가: 성별 정보
    
    # BMI 계산
    BMI = weight / (height * height)
    bmi_string = bmicalc(BMI)
    
    # BMI 정보 추가
    vJson['BMI'] = {
        'value': round(BMI, 2),
        'status': bmi_string
    }
    
    return vJson

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    user_question = data['question']

    # Use the user_question as the prompt for OpenAI Completion
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_question}
        ],
        temperature=0.7,
        max_tokens=2000
    )

    # Extract the generated answer from the OpenAI response
    answer = response.choices[0].message['content'].strip()

    return jsonify({'answer': answer})

@app.route('/recommend_pill', methods=['POST'])
def recommend_pill_route():
    data = request.json
    
    # 식단 정보 추출
    food_names = data['food_names']
    age = int(data['age'])  # 문자열을 정수로 변환
    gender = data['gender']
    
    # 나이와 성별에 따른 권장 섭취량 가져오기
    recommended_intake = {
    '루테인(mg)': 0, 
    '비타민A(ug)': 0, 
    '비타민D(ug)': 0, 
    '비타민E(mg)': 15, 
    '비타민K(ug)': 120, 
    '비타민C(mg)': 90, 
    '비타민B2(mg)': 1.3, 
    '아연(mg)': 11, 
    '셀렌(ug)': 55, 
    '철(mg)': 8, 
    '마그네슘(mg)': 400, 
    'EPA(mg)': 0, 
    '프로바이오틱스(CFU)': 0, 
    '실리마린(mg)': 0, 
    '나이아신(mg)': 16, 
    '올리고당(g)': 0, 
    '칼슘(mg)': 1000, 
    '비타민B6(mg)': 1.7, 
    '베타카로틴(mg)': 900, 
    '판토텐산(mg)': 5, 
    '비오틴(ug)': 30, 
    '망간(mg)': 2.3, 
    '크롬(ug)': 0, 
    '엽산(ug)': 400, 
    '구리(mg)': 0.9, 
    '몰리브덴(ug)': 55
}

  
    # 신체 정보 추출
    weight = int(data['weight'])
    height = int(data['height'])
    
    # BMI 계산
    BMI = calc_bmi(weight, height)
    
    # 식단 정보를 기반으로 영양소 정보 추출
    daily_intakes = [get_nutrient_info(food_name) for food_name in food_names]
    average_intake = calculate_average_intake(daily_intakes)  # 수정된 부분
    deficient_nutrients = find_deficient_nutrients(average_intake, recommended_intake)
    
    # 영양제 추천
    recommendation = recommend_pill(average_intake, age, gender)
    
       # 디버깅을 위한 코드 추가
    for pill_index, pill_info in recommendation.items():
        print(f"Pill Index: {pill_index}")
        print(f"Pill Info: {pill_info}")
    
    # 응답 구성
    response = {
        "recommendation": recommendation,
        "BMI": BMI,
        "average-intake": average_intake,  # 수정된 부분
        "deficient-nutritions": deficient_nutrients
    }
    return jsonify(response)

    
    # 추천 결과를 JSON 형식으로 반환
 

def calc_bmi(weight, height):
    return weight / ((height / 100) ** 2)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
