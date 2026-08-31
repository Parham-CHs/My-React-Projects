export default function GameOver({resetGameTurns,winner}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {(winner==="draw") ? <p>Its a draw!</p> : <p>{winner} has won!</p>}
            <p><button onClick={resetGameTurns}>Rematch!</button></p>
        </div>
    );
};