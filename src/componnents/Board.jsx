import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Board(props) {
  const handleQuitGame = () => {
    props.quitOneGame(props.index);
  };

  const handleNewGameIndex = () => {
    props.handleNewGame(props.game);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2>{props.game.player.userName}</h2>
        <br />
        {props.game.isWin ? (
          <div className="win-message">
            <h4>You Did It!</h4>
            <p>You have won the game!</p>
            <button className="btn btn-warning" style={{ color: 'white', border: 'none' }} onClick={handleNewGameIndex}>
              New Game
            </button>
            <button className="btn btn-danger" onClick={handleQuitGame}>
              Quit
            </button>
          </div>
        ) : (
          <>
            <span className='blink'>{props.game.disable ? 'Waiting..' : 'Your turn..'}</span>
            {props.game.number && <p>Random Number: {props.game.number}</p>}
            <div>
              <Button variant="btn btn-warning" style={{ color: 'white', border: 'none' }} disabled={props.game.disable} className="btn btn-primary mr-2" onClick={() => props.handleMove('/ 2', props.index)}>
                /2
              </Button>
              <Button variant="btn btn-warning" style={{ color: 'white', border: 'none' }} disabled={props.game.disable} className="btn btn-primary mr-2" onClick={() => props.handleMove('* 2', props.index)}>
                *2
              </Button>
              <Button variant="btn btn-warning" style={{ color: 'white', border: 'none' }} disabled={props.game.disable} className="btn btn-primary mr-2" onClick={() => props.handleMove('+ 1', props.index)}>
                +1
              </Button>
              <Button variant="btn btn-warning" style={{ color: 'white', border: 'none' }} disabled={props.game.disable} className="btn btn-primary" onClick={() => props.handleMove('- 1', props.index)}>
                -1
              </Button>
            </div>
          </>
        )}

        {props.game.number && <span>steps: {props.game.numberOfSteps}</span>}
      </div>
    </div>
  );
}

export default Board;