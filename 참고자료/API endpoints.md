# API endpoints

| 메소드 | 기능                         | url                                                     | 동작 |
| ------ | ---------------------------- | ------------------------------------------------------- | ---- |
| POST   | 회원가입                     | http://127.0.0.1:8000/rest-auth/signup/                 | O    |
| POST   | 로그인                       | http://127.0.0.1:8000/rest-auth/login/                  | O    |
| GET    | 로그아웃                     | http://127.0.0.1:8000/rest-auth/logout/                 | O    |
| GET    | 유저정보                     | http://127.0.0.1:8000/rest-auth/user/                   | O    |
| POST   | 마이페이지                   | http://127.0.0.1:8000/accounts/{username}/              | O    |
| POST   | 비밀번호변경                 | http://127.0.0.1:8000/rest-auth/password/change/        | X    |
| POST   | 비밀번호리셋(이메일로요청)   | http://127.0.0.1:8000/rest-auth/password/reset/         | X    |
| POST   | 비밀번호리셋(새로운비번등록) | http://127.0.0.1:8000/rest-auth/password/reset/confirm/ | X    |

