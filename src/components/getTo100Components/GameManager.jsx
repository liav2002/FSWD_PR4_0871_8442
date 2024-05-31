import React, { useState, useRef } from "react";
import Registeration from "./Registeration";
import Board from "./Board";
import TopPlayersModal from "./TopPlayersModal";

const MinNumber = 98;
const maxNumber = 99;

function GameManager() {
    const [currentGames, setCurrentGames] = useState([]);
    const [isGameStart, setIsGameStart] = useState(false);
    const [loggedInPlayers, setLoggedInPlayers] = useState([]);
    const isWinGame = useRef(false);

    const quitGame = (index) => {
      setCurrentGames((prevGames) => {
          const nextGames = prevGames.filter((game, i) => i !== index);

          // Check if the quitting player is the current active player
          if (prevGames[index] && !prevGames[index].disable) {
              const nextPlayerIndex = (index + 1) % prevGames.length;
              if (nextGames.length > 0) {
                  nextGames[nextPlayerIndex % nextGames.length].disable = false;
              }
          }

          // Handle game ending
          if (isWinGame.current || nextGames.length === 0) {
              setIsGameStart(false);
              return [];
          }

          return nextGames;
      });

      setLoggedInPlayers((prevPlayers) => prevPlayers.filter((player, i) => i !== index));
      isWinGame.current = false;
  };

  const addPlayer = (player) => {
      setLoggedInPlayers(prevPlayers => [...prevPlayers, player]);
      setCurrentGames((prevGames) => [
          ...prevGames,
          { player: player, disable: true },
      ]);
  };

  const startGame = () => {
      isWinGame.current = false;
      setCurrentGames((prevGames) =>
          prevGames.map((game, i) => ({
              ...game,
              disable: i === 0 ? false : true,
              number: Math.floor(Math.random() * (maxNumber - MinNumber) + MinNumber),
              isWin: false,
              numberOfSteps: 0,
          }))
      );
      setIsGameStart(true);
  };

  function winGame(game) {
      if (!game.isWin) {
          let numberOfSteps = game.numberOfSteps + 1;
          let number = game.number + 1;
          let players = JSON.parse(localStorage.getItem("players")) || [];
          let player = game.player;
          let playerIndex = players.findIndex(
              (storagePlayer) => storagePlayer.email === player.email
          );
          if (playerIndex !== -1) {
              players[playerIndex].AllScores = [
                  ...players[playerIndex].AllScores,
                  numberOfSteps,
              ];
              localStorage.setItem("players", JSON.stringify(players));
          }
          return {
              player: player,
              number: number,
              numberOfSteps: numberOfSteps,
              isWin: true,
          };
      }
      return game;
  }

  const isOnePlayer = () => currentGames.length === 1;

  const handleMove = (move, index) => {
    setCurrentGames((prevGames) => 
        prevGames.map((game, i) => {
            if (i === index) {
                const newNumber = eval(`${game.number} ${move}`);
                const isWin = newNumber === 100;
                if (isWin && !isWinGame.current) {
                    isWinGame.current = true;
                    return winGame(game);
                } else {
                    return {
                        ...game,
                        disable: !isOnePlayer(),
                        number: newNumber,
                        numberOfSteps: game.numberOfSteps + 1,
                        isWin: isWin,
                    };
                }
            } else if ((index + 1) % prevGames.length === i) {
                return { ...game, disable: false };
            } else {
                return game;
            }
        }).map(game => {
            if (isWinGame.current) {
                return {
                    ...game,
                    disable: true,
                    gameOver: true,
                }
            }
            return game;
        })
    );
  };

  const handleNewGame = () => {
    setLoggedInPlayers([]);
    setCurrentGames(loggedInPlayers.map(player => ({ player: player, disable: true })));
    setIsGameStart(false);
    isWinGame.current = false;
  };

  return (
      <>
          <div className="container-fluid">
              {!isGameStart && (
                  <div className="start-game">
                      <TopPlayersModal/>
                      <Registeration addPlayer={addPlayer} currentGames={currentGames} />
                      <button type="button" onClick={startGame} disabled={!currentGames.length}>
                          <img src="https://media.giphy.com/media/EEf5PgJnnNZyGvhoSC/giphy.gif" alt="Start Game" />
                      </button>
                  </div>
              )}

              <div className="row">
                  <div className="game-board">
                      {currentGames.map((game, index) => (
                          <Board
                              className="col-4"
                              key={index}
                              index={index}
                              game={game}
                              isGameStart={isGameStart}
                              handleMove={handleMove}
                              currentGames={currentGames}
                              quitGame={quitGame}
                              handleNewGame={handleNewGame}
                          />
                      ))}
                  </div>
              </div>
          </div>
      </>
  );
}

export default GameManager;
