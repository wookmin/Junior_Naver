import React, { useState, useEffect } from 'react';
import { fetchAllRankings, deleteScore, updateNickname } from '../api';
import './Leaderboard.css';
import { Link } from 'react-router-dom';

const Leaderboard = ({ onGoHome }) => {
  const [rankings, setRankings] = useState({});
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editingNickname, setEditingNickname] = useState('');

  const [selectedGame, setSelectedGame] = useState('All'); // 게임 필터
  const [filterInput, setFilterInput] = useState(''); // 입력 중인 필터 텍스트
  const [filterName, setFilterName] = useState(''); // 확인된 필터 (적용됨)

  const gameNames = {
    AbsolutePitch: '절대음감 테스트',
    ReactionSpeed: '반응속도 테스트',
    MoleCatch: '두더지 잡기 게임',
    FallingBlocks: '블럭 피하기 게임',
  };

  const loadRankings = async () => {
    setLoading(true);
    const data = await fetchAllRankings();
    setRankings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('이 점수를 삭제하시겠습니까?')) return;

    const success = await deleteScore(id);
    if (success) {
      await loadRankings();
      if (editingId === id) {
        setEditingId(null);
        setEditingNickname('');
      }
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditingNickname(item.nickname);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingNickname('');
  };

  const handleEditSave = async (item) => {
    const newName = editingNickname.trim();
    if (!newName) {
      alert('닉네임을 입력해줘!');
      return;
    }

    const ok = await updateNickname(item.id, item.gameName, item.score, newName);
    if (!ok) {
      alert('닉네임 수정 중 오류가 났어 ㅠㅠ');
      return;
    }

    await loadRankings();
    setEditingId(null);
    setEditingNickname('');
  };

  const handleGameFilterChange = (e) => {
    setSelectedGame(e.target.value);
  };

  const handleSearchChange = (e) => {
    setFilterInput(e.target.value);
  };

  const filteredRankings = Object.keys(rankings).reduce((acc, gameKey) => {
    // 게임 필터링: selectedGame이 'All'이 아니면 해당 게임만 필터링
    if (selectedGame === 'All' || gameNames[gameKey] === selectedGame) {
      const list = rankings[gameKey] || [];
      if (!filterName) {
        acc[gameKey] = list;
      } else {
        const name = filterName.trim().toLowerCase();
        // 정확히 일치하는 닉네임만 남김
        const matched = list.filter((item) => (item.nickname || '').toLowerCase() === name);
        acc[gameKey] = matched;
      }
    }
    return acc;
  }, {});

  if (loading) {
    return <div className="leaderboard-fullscreen">로딩 중...</div>;
  }

  return (
    <div className="leaderboard-fullscreen">
      <h1>🏆 게임 순위</h1>

      {/* 게임 필터링 드롭다운 */}
      <div className="filters">
        <select value={selectedGame} onChange={handleGameFilterChange}>
          <option value="All">모든 게임</option>
          {Object.keys(gameNames).map((gameKey) => (
            <option key={gameKey} value={gameNames[gameKey]}>
              {gameNames[gameKey]}
            </option>
          ))}
        </select>

        {/* 닉네임 필터: 입력 후 확인 버튼으로 적용 */}
        <input
          type="text"
          placeholder="닉네임 검색"
          value={filterInput}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setFilterName(filterInput.trim());
          }}
        />
        <button className="confirm-filter-btn" onClick={() => setFilterName(filterInput.trim())}>확인</button>
        <button
          className="clear-filter-btn"
          onClick={() => {
            setFilterInput('');
            setFilterName('');
          }}
        >
          필터 해제
        </button>
      </div>

      <div className="rankings-grid">
        {Object.keys(gameNames).map((gameKey) => (
          // 게임 필터링 후 해당 게임만 보이도록 조건 추가
          (selectedGame === 'All' || gameNames[gameKey] === selectedGame) && (
            <div key={gameKey} className="ranking-card">
              <h3>{gameNames[gameKey]}</h3>

              {filteredRankings[gameKey] && filteredRankings[gameKey].length > 0 ? (
                <div className="ranking-list">
                  {filteredRankings[gameKey].map((item) => {
                    const origList = rankings[gameKey] || [];
                    const origIndex = origList.findIndex((it) => it.id === item.id);
                    const displayRank = origIndex >= 0 ? origIndex + 1 : '-';

                    return (
                      <div
                        key={item.id}
                        className={`ranking-item ${origIndex < 3 && origIndex >= 0 ? `rank-${origIndex + 1}` : ''
                          }`}
                      >
                        <span className="rank">{displayRank}</span>

                        <span className="nickname">
                          {editingId === item.id ? (
                            <input
                              className="nickname-input"
                              value={editingNickname}
                              onChange={(e) => setEditingNickname(e.target.value)}
                            />
                          ) : (
                            item.nickname
                          )}
                        </span>

                        <span className="score">{item.score}</span>

                        <span className="actions">
                          {editingId === item.id ? (
                            <>
                              <button
                                className="edit-save-btn"
                                onClick={() => handleEditSave(item)}
                              >
                                저장
                              </button>
                              <button
                                className="edit-cancel-btn"
                                onClick={handleEditCancel}
                              >
                                취소
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="edit-btn"
                                onClick={() => handleEditClick(item)}
                              >
                                수정
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDelete(item.id)}
                                title="삭제"
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </span>
                      </div>
                    ); // 1. return 닫기
                  })} {/* 2. map 함수의 블록 닫기 및 괄호 닫기 */}
                </div>
              ) : (
                <p className="no-data">등록된 점수가 없습니다.</p>
              )}
            </div>
          )
        ))}
      </div>

      <button className="home-button">
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default Leaderboard;
