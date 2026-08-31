export default function UserInput({ userInput, setInput }) {

    const handleChange = setInput;

    return (
        <section id='user-input'>
            <div className="input-group">
                <p>
                    <label>
                        Initial Investment
                    </label>
                    <input type='number' value={userInput.initialInvestment} required
                        onChange={(event) => handleChange({
                            inputID: 'initialInvestment',
                            value: event.target.value
                        })}>
                    </input>
                </p>
                <p>
                    <label>
                        Annual Investment
                    </label>
                    <input type='number' value={userInput.annualInvestment} required
                        onChange={(event) => handleChange({
                            inputID: "annualInvestment",
                            value: event.target.value
                        })}>
                    </input>
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>
                        Expected Return(%)
                    </label>
                    <input type='number' value={userInput.expectedReturn} required
                        onChange={(event) => handleChange({
                            inputID: "expectedReturn",
                            value: event.target.value
                        })}>
                    </input>
                </p>
                <p>
                    <label>
                        Duration
                    </label>
                    <input type='number' value={userInput.duration} required
                        onChange={(event) => handleChange({
                            inputID: "duration",
                            value: event.target.value
                        })}>
                    </input>
                </p>
            </div>
        </section>
    )
}