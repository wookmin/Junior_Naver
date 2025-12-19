# React Game Arcade & Leaderboard

React를 기반으로 개발한 **멀티 미니게임 플랫폼**입니다.
사용자는 4가지의 다른 미니게임을 즐길 수 있으며, **Firebase Firestore**와 연동된 실시간 리더보드를 통해 자신의 점수를 기록하고 다른 사용자들과 순위를 경쟁할 수 있습니다.

## 프로젝트 개요

* **프로젝트명**: React Game Arcade
* **개발 목적**: React의 핵심 개념(Hooks, Router)과 비동기 데이터 통신(Firebase) 학습 및 구현
* **주요 기능**: 4종의 미니게임 플레이, 실시간 랭킹 시스템(CRUD), 닉네임 관리
* **배포 URL**: (여기에 배포한 링크가 있다면 추가하세요)

---

## 사용 기술 (Tech Stack)

### Frontend
* **React.js**: 컴포넌트 기반 UI 구축 및 상태 관리
* **React Router**: SPA(Single Page Application) 라우팅 구현
* **HTML5 Canvas**: 고성능 그래픽 렌더링 (블럭 피하기 게임)
* **CSS3**: Flexbox & Grid 시스템을 활용한 반응형/파스텔톤 디자인

### Backend & Database
* **Firebase Firestore**: Serverless 기반의 실시간 NoSQL 데이터베이스
    * Mock API 대신 실제 DB를 구축하여 데이터 영속성 보장

### Libraries
* **Tone.js**: 웹 오디오 API 기반의 피아노 사운드 합성 (절대음감 게임)

---

## 게임 소개 (Game Features)

### 1. 절대음감 테스트 (Absolute Pitch)
* **설명**: 들려오는 피아노 소리를 듣고 해당하는 건반을 맞추는 청음 게임입니다.
* **기술적 특징**:
    * `Tone.js`를 활용하여 주파수 데이터를 실제 피아노 음원으로 변환
    * Lv.1 ~ Lv.6 단계별 난이도 시스템 (화음 개수 및 검은 건반 추가)
    * 정답/오답에 따른 시각적, 청각적 피드백 제공

### 2. 반응속도 테스트 (Reaction Speed)
* **설명**: 화면 색상이 초록색으로 변하는 순간 클릭하여 반응 속도(ms)를 측정합니다.
* **기술적 특징**:
    * `useState`를 활용한 4단계 상태 머신 (`Waiting` -> `Ready` -> `Now` -> `Finished`)
    * `useRef`와 `Date` 객체를 사용하여 렌더링 부하 없는 정밀한 시간 측정
    * 부정 출발(예측 클릭) 방지 로직 구현

### 3. 블럭 피하기 (Falling Blocks)
* **설명**: 하늘에서 떨어지는 블럭들을 좌우로 움직여 피하는 액션 게임입니다.
* **기술적 특징**:
    * **HTML5 Canvas API** 활용 (`useRef`로 DOM 접근)
    * `requestAnimationFrame`을 사용한 끊김 없는 게임 루프(Game Loop) 최적화
    * 점수가 오를수록 속도가 빨라지는 동적 난이도 알고리즘 적용

### 4. 두더지 잡기 (Mole Catch)
* **설명**: 제한 시간 내에 무작위로 튀어나오는 두더지를 클릭하여 점수를 획득합니다.
* **기술적 특징**:
    * CSS Grid Layout (`3x3`) 활용
    * `setInterval`과 `setTimeout`을 이용한 복합 타이머 관리
    * 게임 일시 정지(Pause) 및 재개 기능 구현

---

## 리더보드 및 데이터 관리

* **Create (점수 저장)**: 게임 종료 시 닉네임과 점수가 DB에 자동 저장됩니다.
* **Read (순위 조회)**: `fetchAllRankings`를 통해 전체 순위를 불러오며, 게임별 필터링이 가능합니다.
* **Update (닉네임 수정)**: 이미 등록된 기록의 닉네임을 실시간으로 수정할 수 있습니다.
* **Delete (기록 삭제)**: 원하지 않는 기록을 리더보드에서 영구적으로 삭제할 수 있습니다.
* **Search**: 특정 사용자의 닉네임을 검색하여 기록을 필터링할 수 있습니다.

---

## 폴더 구조 (Project Structure)

```bash
src/
├── api.js                # Firebase 설정 및 CRUD 함수 모음
├── App.js                # 메인 라우팅 및 레이아웃 설정
├── Leaderboard.js        # 순위표 컴포넌트 (필터/검색/수정/삭제)
├── Leaderboard.css       # 순위표 스타일
│
├── components/           # (또는 src 루트)
│   ├── AbsolutePitch.js  # 절대음감 게임 로직
│   ├── AbsolutePitch.css
│   ├── FallingBlocks.js  # 블럭 피하기 (Canvas)
│   ├── FallingBlocks.css
│   ├── MoleCatch.js      # 두더지 잡기
│   ├── MoleCatch.css
│   ├── ReactionSpeed.js  # 반응속도 테스트
│   └── ReactionSpeed.css
│
└── index.js              # Entry Point
