

export default function GameBoard({ gameBoard, onSelectSquare, winner }) {

    const handleSelectSquare = onSelectSquare;

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) =>
                            <li key={colIndex}>
                                <button disabled={col || winner ? true : false} onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                                    {col}
                                </button>
                            </li>)}
                    </ol>
                </li>))}
        </ol>
    );
}