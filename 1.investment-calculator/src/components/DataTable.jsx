import { calculateInvestmentResults, formatter } from "../util/investment.js"


export default function DataTable({ userInput }) {

    const result = calculateInvestmentResults(userInput)
    console.log(result)
    return (
        <table id="result" >
            <thead>
                <tr>
                    <th>year</th>
                    <th>investment value</th>
                    <th>interst(year)</th>
                    <th>total interest</th>
                    <th>invested capital</th>
                </tr>
            </thead>

            <tbody>
                {result.map(eachRow =>
                    <tr>
                        <td>{eachRow.year}</td>
                        <td>{formatter.format(eachRow.valueEndOfYear)}</td>
                        <td>{formatter.format(eachRow.interest)}</td>
                        <td>{formatter.format(eachRow.totalInterest)}</td>
                        <td>{formatter.format(eachRow.investedCapital)}</td>
                    </tr>
                )}


            </tbody>

        </table>

    );
}