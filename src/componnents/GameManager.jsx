import React, { useState, useRef } from "react";
import Registeration from "./Registeration"
import Board from "./Board";

const MinNumber = 75;
const maxNumber = 95;

function GameManager() {
    const [currentGames, setCurrentGames] = useState([]);
    const [isGameStart, setIsGameStart] = useState(false);
    const isWinGame = useRef(false);

    const quitGame = (index) => {
        isWinGame.current = false;
        setCurrentGames((prevGames) => prevGames.filter((game, i) => i !== index));
      };

    const addPlayer = (player) => {
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

    const isOnePlayer = () => currentGames.length == 1;   
    
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
            })
          );
    };

    const handleNewGame = (gameToStart) => {
        isWinGame.current = false;
        setCurrentGames((prevGames) =>
          prevGames.map((game) =>
            game === gameToStart
              ? {
                  ...game,
                  disable: !isOnePlayer(),
                  number: Math.floor(
                    Math.random() * (maxNumber - MinNumber) + MinNumber
                  ),
                  isWin: false,
                  numberOfSteps: 0,
                }
              : game
          )
        );
      };

    return (
        <>
            <div className="container-fluid">
                {!isGameStart && (
                    <div className="start-game">
                        <Registeration addPlayer={addPlayer} />
                        <button type="button" onClick={startGame} disabled={!currentGames.length}>
                            <img src="https://media.giphy.com/media/EEf5PgJnnNZyGvhoSC/giphy.gif" alt="Start Game"/>
                        </button>
                    </div>
                )}
                
                <div className="row">
                    <div className="top-players">
                        <h3>Top Players will be shown here</h3>
                    </div>

                    <div className="game-board">
                        {currentGames.map((game, index) => (
                            <Board
                                className="col-4"
                                key={index}
                                index={index}
                                game={game}
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
