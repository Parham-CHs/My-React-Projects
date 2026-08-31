import { useState } from "react";

export default function Player({ name, symbol, isActivePlayer, onSaveName }) {
    const [isEditing, setEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function handleEditClick() {
        setEditing((editing) => !editing);
        // if (isEditing) {
        //     onSaveName(symbol, playerName)
        // }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
        onSaveName(symbol,event.target.value)
    }


    return (
        <li className={isActivePlayer ? 'active' : undefined}>
            <span className="player">
                {!isEditing ? (
                    <span className="player-name">{playerName}</span>
                ) : (
                    <input type="text" required value={playerName} onChange={handleNameChange}></input>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
