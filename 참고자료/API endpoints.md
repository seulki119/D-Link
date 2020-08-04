# API endpoints

| 메소드 | 기능                         | url                                                          | 동작 |
| ------ | ---------------------------- | ------------------------------------------------------------ | ---- |
| POST   | 회원가입                     | http://127.0.0.1:8000/rest-auth/signup/                      | O    |
| POST   | 로그인                       | http://127.0.0.1:8000/rest-auth/login/                       | O    |
| GET    | 로그아웃                     | http://127.0.0.1:8000/rest-auth/logout/                      | O    |
| GET    | 유저정보                     | http://127.0.0.1:8000/rest-auth/user/                        | O    |
| POST   | 마이페이지                   | http://127.0.0.1:8000/accounts/{username}/                   | O    |
| PUT    | 프로필 수정                  | http://127.0.0.1:8000/accounts/{username}/                   | O    |
| PUT    | 프로필 이미지 수정           | http://127.0.0.1:8000/accounts/{username}/image/             | O    |
| DEL    | 회원 탈퇴                    | http://127.0.0.1:8000/accounts/{username}/                   | O    |
| PUT    | 비밀번호변경                 | http://127.0.0.1:8000/accounts/password/                     | O    |
| GET    | 피드 리스트                  | http://127.0.0.1:8000/articles/                              | O    |
| POST   | 피드 생성                    | http://127.0.0.1:8000/articles/                              | O    |
| GET    | 피드 디테일                  | http://127.0.0.1:8000/articles/{article.id}/                 | O    |
| PUT    | 피드 업데이트                | http://127.0.0.1:8000/articles/{article.id}/                 | O    |
| DELETE | 피드 삭제                    | http://127.0.0.1:8000/articles/{article.id}/                 | O    |
| POST   | 댓글 생성                    | http://127.0.0.1:8000/articles/{article.id}/comment/         | O    |
| PUT    | 댓글 수정                    | http://127.0.0.1:8000/articles/{article.id}/comment/{comment.id} | O    |
| DELETE | 댓글 삭제                    | http://127.0.0.1:8000/articles/{article.id}/comment/{comment.id} | O    |
| POST   | 대댓글 생성                  | http://127.0.0.1:8000/articles/comment/{comment.id}/recomment/ | O    |
| PUT    | 대댓글 수정                  | http://127.0.0.1:8000/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| DELETE | 대댓글 삭제                  | http://127.0.0.1:8000/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| POST   | 취향 서베이 적용             | http://127.0.0.1:8000/accounts/taste/                        | O    |
| POST   | 이메일 중복체크              | http://localhost:8000/accounts/duplicated/email/             | O    |
| POST   | 닉네임 중복체크              | http://localhost:8000/accounts/duplicated/username/          | O    |
| POST   | 비밀번호리셋(이메일로요청)   | http://127.0.0.1:8000/rest-auth/password/reset/              | X    |
| POST   | 비밀번호리셋(새로운비번등록) | http://127.0.0.1:8000/rest-auth/password/reset/confirm/      | X    |



- 백엔드에서 추가하는대로 업데이트하고 있습니다.
- 필요한 API는 말씀해주세요 :)