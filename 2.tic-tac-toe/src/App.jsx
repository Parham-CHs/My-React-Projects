import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx"

import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.JS";

import { useState } from "react";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,gameLength,playerName) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = playerName[firstSquare];
    }
  }
  if (gameLength >= 9 && winner == null) {
    winner = "draw"
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAMEBOARD.map(innerArray => [...innerArray])];;

  gameTurns.map((turn) => {
    gameBoard[turn.row][turn.col] = turn.player;
  })
  return gameBoard
}




function App() {

  const [playerName, setPlayerName] = useState(PLAYERS)

  function handleSavePlayerName(playerSymbol, playerSavedName) {
    setPlayerName((prevPlayerNames) => {
      const updatedPlayerNames = { ...prevPlayerNames, [playerSymbol]: playerSavedName }
      return updatedPlayerNames
    })
  }

  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard,gameTurns.length,playerName)


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [{ row: rowIndex, col: colIndex, player: deriveActivePlayer(prevTurns) }, ...prevTurns,]
      return updatedTurns
    })

  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActivePlayer={activePlayer === 'X'} onSaveName={handleSavePlayerName} />
          <Player name={PLAYERS.O} symbol="O" isActivePlayer={activePlayer === 'O'} onSaveName={handleSavePlayerName} />
        </ol>
        {winner && <GameOver resetGameTurns={() => setGameTurns([])} winner={winner} />}
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} winner={winner} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  )
}

export default App
