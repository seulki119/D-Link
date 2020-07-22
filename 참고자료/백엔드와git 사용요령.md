# 1. Django 백엔드 세팅

1. develop pull하기
   
   > $ git pull origin develop
   
2. backend폴더로 이동

   > $ cd backend

3. virtualenv설치

   > $ pip install  virtualenv

4. 가상환경

   > $ virtualenv --python=python3.5.3 venv
   >
   > $ source venv/Scripts/activate

5. vscode에서 기본 터미널을 `git bash`로 설정

   > vscode에서 `ctrl`+`shift`+`p`입력 후 `Terminal: Select default shell`->`bash`

6. requirements 설치

   > $ pip install -r requirements.txt



#### 런서버

`manage.py`가 있는 디렉토리에서 다음 명령어를 사용

```
$ python manage.py runserver {포트번호}
```



# 2. Git 사용요령

1. 기능개발을 위한 브랜치 생성

   > $ git checkout -b feature/{F- or B-}{기능명}
   >
   > F-와 B-는 각각 Frontend Backend를 나타냄
   >
   > ex) git checkout -b feature/B-login

2. 기능개발에 들어가기전에 pull을 진행

   > $ git pull origin develop

3. 기능개발 후 commit 까지 진행

4. 다시 한번 pull을 진행

5. feature브랜치로 push

   > $ git push origin feature/...

6. MR요청하기(develop을 타겟으로)