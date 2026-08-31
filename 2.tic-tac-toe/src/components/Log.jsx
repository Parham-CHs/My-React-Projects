export default function Log({ gameTurns }) {
    return <ol id="log">
        {gameTurns.map((turn) => <li key={`${turn.row}${turn.col}`}>
            Player {turn.player} Selected row {turn.row} column {turn.col}
        </li>)}
    </ol>
} 