# API endpoints

| 메소드 | 기능                         | url                                                          | 동작 |
| ------ | ---------------------------- | ------------------------------------------------------------ | ---- |
| POST   | 회원가입                     | http://i3b307.p.ssafy.io/api/signup/                         | O    |
| POST   | 로그인                       | http://i3b307.p.ssafy.io/api/login/                          | O    |
| GET    | 로그아웃                     | http://i3b307.p.ssafy.io/api/logout/                         | O    |
| GET    | 유저정보                     | http://i3b307.p.ssafy.io/api/user/                           | O    |
| POST   | 마이페이지                   | http://i3b307.p.ssafy.io/api/accounts/{username}/            | O    |
| PUT    | 프로필 수정                  | http://i3b307.p.ssafy.io/api/accounts/{username}/            | O    |
| PUT    | 프로필 이미지 수정           | http://i3b307.p.ssafy.io/api/accounts/{username}/image/      | O    |
| DEL    | 회원 탈퇴                    | http://i3b307.p.ssafy.io/api/accounts/{username}/            | O    |
| PUT    | 비밀번호변경                 | http://i3b307.p.ssafy.io/api/accounts/password/              | O    |
| GET    | 피드 리스트                  | http://i3b307.p.ssafy.io/api/articles/                       | O    |
| GET    | 피드 검색                    | http://i3b307.p.ssafy.io/api/articles/search/                | O    |
| POST   | 피드 생성                    | http://i3b307.p.ssafy.io/api/articles/                       | O    |
| GET    | 피드 디테일                  | http://i3b307.p.ssafy.io/api/articles/{article.id}/          | O    |
| PUT    | 피드 업데이트                | http://i3b307.p.ssafy.io/api/articles/{article.id}/          | O    |
| DELETE | 피드 삭제                    | http://i3b307.p.ssafy.io/api/articles/{article.id}/          | O    |
| POST   | 댓글 생성                    | http://i3b307.p.ssafy.io/api/articles/{article.id}/comment/  | O    |
| PUT    | 댓글 수정                    | http://i3b307.p.ssafy.io/api/articles/{article.id}/comment/{comment.id} | O    |
| DELETE | 댓글 삭제                    | http://i3b307.p.ssafy.io/api/articles/{article.id}/comment/{comment.id} | O    |
| POST   | 대댓글 생성                  | http://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/ | O    |
| PUT    | 대댓글 수정                  | http://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| DELETE | 대댓글 삭제                  | http://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| POST   | 취향 서베이 적용             | http://i3b307.p.ssafy.io/api/accounts/taste/                 | O    |
| POST   | 이메일 중복체크              | http://i3b307.p.ssafy.io/api/accounts/duplicated/email/      | O    |
| POST   | 닉네임 중복체크              | http://i3b307.p.ssafy.io/api/accounts/duplicated/username/   | O    |
| GET    | 알림 조회                    | http://i3b307.p.ssafy.io/api/alarms/{user.id}/               | O    |
| DELETE | 알림 삭제                    | http://i3b307.p.ssafy.io/api/alarms/{user.id}/               | O    |
| POST   | 비밀번호리셋(이메일로요청)   | http://i3b307.p.ssafy.io/api/password/reset/                 | X    |
| POST   | 비밀번호리셋(새로운비번등록) | http://i3b307.p.ssafy.io/api/password/reset/confirm/         | X    |



- 백엔드에서 추가하는대로 업데이트하고 있습니다.
- 필요한 API는 말씀해주세요 :)