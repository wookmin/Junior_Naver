
# Junior_Naver

간단한 미니게임 모음 프로젝트입니다. 교육용 목적으로 만든 React 기반 웹앱으로, 여러 가지 짧은 게임(절대음감, 반응속도, 두더지잡기, 블럭 피하기)을 포함하고 있으며, 각 게임은 점수 저장 및 리더보드 기능을 제공합니다.

## 목차
- 설치 및 실행
- 주요 기능
- 게임 설명
- 사용된 외부 API / 라이브러리
- 프로젝트 구조
- 기여 방법
- 라이선스

## 설치 및 실행
1. 저장소를 클론하거나 포크한 뒤 로컬로 이동합니다.

```bash
git clone https://github.com/your-username/Junior_Naver.git
cd Junior_Naver
```

2. 의존성 설치:

```bash
npm install
```

3. 개발 서버 실행:

```bash
npm start
```


## 주요 기능
- 4개의 미니게임: `AbsolutePitch` (절대음감), `ReactionSpeed` (반응속도), `MoleCatch` (두더지잡기), `FallingBlocks` (캔버스 기반 블럭 피하기)
- Mock API 기반 리더보드: 점수 저장/조회/삭제 기능
- 배경음악 재생(랜덤 선택) — 절대음감 게임 플레이 시 음악 자동 일시정지
- 닉네임 입력 기능: 닉네임이 있으면 점수가 리더보드에 반영

## 게임별 소개
- AbsolutePitch (절대음감)
	- 여러 레벨로 구성된 음계 식별 게임
	- Tone.js를 사용해 음을 합성 및 재생
	- 게임 완료 시 점수를 서버에 저장

- ReactionSpeed (반응속도)
	- 화면/스페이스바 반응 시간을 측정
	- 점수는 낮을수록 우수(리더보드 오름차순 정렬)

- MoleCatch (두더지잡기)
	- 5x5 격자에서 나타나는 두더지를 클릭하여 점수 획득
	- 시간이 지남에 따라 난이도 상승

- FallingBlocks (블럭 피하기)
	- HTML5 Canvas 2D API를 사용한 실시간 애니메이션 게임
	- 화살표키로 플레이어 이동, 떨어지는 블럭을 피함

## 사용된 외부 API / 라이브러리
- MockAPI (점수 저장용 REST API): https://69311fd011a8738467cd56f4.mockapi.io/gameRank
- 무료 음악(샘플): Mixkit / 외부 공개 음원 링크 (프로젝트 내에서 랜덤 재생)
- Tone.js: 절대음감 게임의 소리 합성에 사용된 오픈소스 라이브러리 (npm 패키지)

> 참고: Tone.js는 'Open API'(HTTP/REST)가 아니라 로컬에서 동작하는 JavaScript 오디오 라이브러리입니다. 이 프로젝트에서 Open API 요건은 MockAPI 및 외부 음원(HTTP URL)을 통해 충족됩니다.

## 프로젝트 구조 (요약)
```
Junior_Naver/
├─ package.json
├─ README.md
├─ public/
└─ src/
	 ├─ App.js
	 ├─ api.js                # MockAPI 연동 유틸
	 ├─ Games/
	 |  ├─ AbsolutePitch.js
	 |  ├─ ReactionSpeed.js
	 |  ├─ MoleCatch.js
	 |  └─ FallingBlocks.js   # Canvas 사용
	 └─ styles/ (CSS 파일들)
```



## 베포 URL
- 완성 후 추가예정

