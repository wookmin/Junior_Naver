import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AbsolutePitch from './Games/AbsolutePitch';
import ReactionSpeed from './Games/ReactionSpeed';
import MoleCatch from './Games/MoleCatch';
import Leaderboard from './Games/Leaderboard';
import FallingBlocks from './Games/FallingBlocks';

function App() {
  const [nickname, setNickname] = useState('');

  return (
    <Router>
      <div className="App">
        {/* Routes 설정 */}
        <Routes>
          {/* 메인 페이지 */}
          <Route
            path="/"
            element={
              <div className="App">
                <header className="App-header">
                  <h1>OSS Team Project</h1>
                  <p>다양한 미니 게임을 즐겨보세요!</p>

                  {/* 닉네임 입력 창 */}
                  <div className="nickname-section">
                    <input
                      type="text"
                      placeholder="닉네임을 입력하세요 (선택사항)"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="nickname-input"
                      maxLength="15"
                    />
                    <span className="nickname-hint">
                      {nickname ? `입력됨: ${nickname}` : '닉네임을 입력하면 점수가 순위에 반영됩니다'}
                    </span>
                  </div>

                  {/* 게임 메뉴 */}
                  <div className="game-menu">
                    <Link to="/absolute-pitch">
                      <button className="game-button">절대음감 테스트</button>
                    </Link>
                    <Link to="/reaction-speed">
                      <button className="game-button">반응속도 테스트</button>
                    </Link>
                    <Link to="/mole-catch">
                      <button className="game-button">두더지 잡기 게임</button>
                    </Link>
                    <Link to="/falling-blocks">
                      <button className="game-button">블럭 피하기 게임</button>
                    </Link>
                  </div>

                  {/* 순위 보기 버튼 */}
                  <Link to="/leaderboard">
                    <button className="leaderboard-toggle">순위 보기 🏆</button>
                  </Link>
                </header>
              </div>
            }
          />

          {/* 각 게임 페이지 */}
          <Route path="/absolute-pitch" element={<AbsolutePitch nickname={nickname} />} />
          <Route path="/reaction-speed" element={<ReactionSpeed nickname={nickname} />} />
          <Route path="/mole-catch" element={<MoleCatch nickname={nickname} />} />
          <Route path="/falling-blocks" element={<FallingBlocks nickname={nickname} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
