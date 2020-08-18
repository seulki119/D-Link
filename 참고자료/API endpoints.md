# API endpoints

| 메소드 | 기능                         | url                                                          | 동작 |
| ------ | ---------------------------- | ------------------------------------------------------------ | ---- |
| POST   | 회원가입                     | https://i3b307.p.ssafy.io/api/signup/                        | O    |
| POST   | 로그인                       | https://i3b307.p.ssafy.io/api/login/                         | O    |
| GET    | 로그아웃                     | https://i3b307.p.ssafy.io/api/logout/                        | O    |
| GET    | 유저정보                     | https://i3b307.p.ssafy.io/api/user/                          | O    |
| POST   | 마이페이지                   | https://i3b307.p.ssafy.io/api/accounts/{username}/           | O    |
| PUT    | 프로필 수정                  | https://i3b307.p.ssafy.io/api/accounts/{username}/           | O    |
| PUT    | 프로필 이미지 수정           | https://i3b307.p.ssafy.io/api/accounts/{username}/image/     | O    |
| DEL    | 회원 탈퇴                    | https://i3b307.p.ssafy.io/api/accounts/{username}/           | O    |
| PUT    | 비밀번호변경                 | https://i3b307.p.ssafy.io/api/accounts/password/             | O    |
| GET    | 피드 리스트                  | https://i3b307.p.ssafy.io/api/articles/                      | O    |
| GET    | 피드 검색                    | https://i3b307.p.ssafy.io/api/articles/search/               | O    |
| POST   | 피드 생성                    | https://i3b307.p.ssafy.io/api/articles/                      | O    |
| GET    | 피드 디테일                  | https://i3b307.p.ssafy.io/api/articles/{article.id}/         | O    |
| PUT    | 피드 업데이트                | https://i3b307.p.ssafy.io/api/articles/{article.id}/         | O    |
| DELETE | 피드 삭제                    | https://i3b307.p.ssafy.io/api/articles/{article.id}/         | O    |
| POST   | 댓글 생성                    | https://i3b307.p.ssafy.io/api/articles/{article.id}/comment/ | O    |
| PUT    | 댓글 수정                    | https://i3b307.p.ssafy.io/api/articles/{article.id}/comment/{comment.id} | O    |
| DELETE | 댓글 삭제                    | https://i3b307.p.ssafy.io/api/articles/{article.id}/comment/{comment.id} | O    |
| POST   | 대댓글 생성                  | https://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/ | O    |
| PUT    | 대댓글 수정                  | https://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| DELETE | 대댓글 삭제                  | https://i3b307.p.ssafy.io/api/articles/comment/{comment.id}/recomment/{recomment.id}/ | O    |
| POST   | 취향 서베이 적용             | https://i3b307.p.ssafy.io/api/accounts/taste/                | O    |
| POST   | 이메일 중복체크              | https://i3b307.p.ssafy.io/api/accounts/duplicated/email/     | O    |
| POST   | 닉네임 중복체크              | https://i3b307.p.ssafy.io/api/accounts/duplicated/username/  | O    |
| GET    | 알림 조회                    | https://i3b307.p.ssafy.io/api/alarms/{user.id}/              | O    |
| DELETE | 알림 삭제                    | https://i3b307.p.ssafy.io/api/alarms/{user.id}/              | O    |
| POST   | 비밀번호리셋(이메일로요청)   | https://i3b307.p.ssafy.io/api/password/reset/                | X    |
| POST   | 비밀번호리셋(새로운비번등록) | https://i3b307.p.ssafy.io/api/password/reset/confirm/        | X    |
| GET    | VS 리스트                    | https://i3b307.p.ssafy.io/api/versus/                        | O    |
| GET    | VS 디테일                    | https://i3b307.p.ssafy.io/api/versus/{topic_id}/             | O    |
| GET    | VS 투표                      | https://i3b307.p.ssafy.io/api/versus/{topic_id}/vote/        | O    |
| POST   | VS 댓글 생성                 | https://i3b307.p.ssafy.io/api/versus/{topic_id}/comment/     | O    |
| GET    | VS 채팅 기록 조회            | https://i3b307.p.ssafy.io/api/alarm/room/{room_id}/          | O    |
| POST   | 비밀번호리셋(새로운비번등록) | https://i3b307.p.ssafy.io/api/versus/{topic_id}/comment/{comment_id}/delete/ | O    |



# WS

| 주소                                               | 기능                          |
| -------------------------------------------------- | ----------------------------- |
| wss://i3b307.p.ssafy.io/ws/alarm/{token}/          | 알람 전송 및 수신을 위한 소켓 |
| wss://i3b307.p.ssafy.io/ws/chat/{token}/{room_id}/ | 채팅 전송 및 수신을 위한 소켓 |



- 백엔드에서 추가하는대로 업데이트하고 있습니다.
- 필요한 API는 말씀해주세요 :)