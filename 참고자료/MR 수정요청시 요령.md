# 1. MR 수정요청시 요령

Merge Request를 보내고 메인테이너에 의해 수정요청이 들어온 경우 대처하는 방법을 상황에 따라 알아보자.



###  1.1 나만 해당 브랜치에서 작업하고 있다

이 경우 Git 이력을 조작해 메인테이너의 수정요청에 대한 결과물만을 이력으로 남길 수 있다. 실제로 협업에서 이력을 강제조작하는 것은 위험하므로 확실한 상황인 경우에만 진행하자.

다음과 같은 상황에서 'API endpoints 추가'라는 메세지의 커밋을 수정하고자 한다.

```bash
$ git log
commit 14d1bedc3c61bfb6d9d4f9f4c8c172530fa39e87 (HEAD -> feature/django-infra, origin/feature/django-infra)
Author: 강민석 <kim12503@naver.com>
Date:   Wed Jul 22 15:50:35 2020 +0900

    API endpoints 추가

commit 6b40627033411b7edce9beb6425da97f49e7f121 (origin/develop)
Merge: 9d4b448 a4029c6
Author: 강민석 <kim12503@naver.com>
Date:   Wed Jul 22 06:11:57 2020 +0000

    Merge branch 'feature/django-infra' into 'develop'

    [참고자료] 백엔드와git 사용요령 추가

    See merge request s03-webmobile2-sub2/s03p12b307!16

```



이 경우, 먼저 이전의 커밋인 'Merge branch~~'의 이력으로 돌아갈 필요가 있다(아래 명령어의 경우 이력만 변경되고 로컬은 변하지 않음. 더 알아보기 위해서는 구글링!).

```bash
$ git reset {돌아가려는 commit의 hash}
```

> $ git reset 6b40627033411b7edce9beb6425da97f49e7f121



위의 명령어를 사용하면 다음과 같이 이력이 변경된다.

```bash
$ git log
commit 6b40627033411b7edce9beb6425da97f49e7f121 (HEAD -> feature/django-infra, origin/develop)
Merge: 9d4b448 a4029c6
Author: 강민석 <kim12503@naver.com>
Date:   Wed Jul 22 06:11:57 2020 +0000

    Merge branch 'feature/django-infra' into 'develop'

    [참고자료] 백엔드와git 사용요령 추가

    See merge request s03-webmobile2-sub2/s03p12b307!16
```



이 상태에서 마치 처음 commit을 하는 것처럼 add -> commit을 진행하고 `git push -f origin master`와 같이 `--force`를 넣어 푸쉬해준다(커밋을 강제로 바꾸는 행위임을 다시 한번 명심).



### 1.2 해당 브랜치에서 여러명이 작업하고 있고, 나는 지금 당장 수정할 여력이 없다.

이 경우, 다른 개발자들을 위해 빠르게 내 똥(?)을 치워야 한다. 커밋 이력을 다시 돌리되 `reset`과 `push -f`를 사용하는 무서운짓은 하지말자. 이 때는 `revert`가 추천된다.

#### reset과 revert의 차이

`reset`의 경우, 사실 로컬에서 이력을 변경하기 위해 사용되며, `push -f`와 함께 하지 않으면 원격 저장소와 버전을 맞추기 전에는 `push`할 수 없다. 만약  `push -f`와 같이 사용할 경우, 기존의 원격 저장소 이력을 무시하고 본인의 로컬의 이력으로 덮어쓰게 되므로 주의가 요구된다.

`revert`의 경우, 새로운 revert 커밋을 생성하여, 버그가 있는 본인 커밋의 이전으로 버전을 다운그레이드한다. 협업을 하고 이미 `push`를 한 경우 `revert`를 사용하도록 하자.

실제로 `reset`은 깔끔한 이력을 남길 수 있는 반면에, `revert`는 다수의 커밋을 남기는대신 안전하다. 이를 고려해서 사용하자.



### 1.3 해당 브랜치에서 여러명이 작업하고 있고, 지금 수정할 수 있다.

해당 브랜치에서 수정을 하고 새로운 커밋을 푸쉬하자.





