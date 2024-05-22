import React, { useState, useRef } from "react";

function GameManager() {
    const [currentGames, setCurrentGames] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [isGameStart, setIsGameStart] = useState(false);
    const isWin = useRef(false);

    const quitGame = (index) => {
      };

    const addPlayer = (player) => {
    };

    const startGame = () => {
    };

    function winGame(game) {
        return;
      }
    
    const handleMove = (move, index) => {
    };

    const handleNewGame = (gameToStart) => {
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <h1>Still In Develop</h1>
                </div>
            </div>
        </>
    );
}

export default GameManager;
