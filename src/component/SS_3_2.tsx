import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const Calculator = () => {
    const [num1, setNum1] = React.useState('');
    const [num2, setNum2] = React.useState('');
    const [result, setResult] = React.useState('');
    const [operation, setOperation] = React.useState('+');
    const [error, setError] = React.useState(false);
    const handleCalculate = () => {
        const number1 = parseInt(num1);
        const number2 = parseInt(num2);
        if (isNaN(number1) || isNaN(number2)) {
            setResult('Invalid input');
            setError(true);
            return;
        }
        let res: any;
        switch (operation) {
            case '+':
                res = number1 + number2;
                break;
            case '-':
                res = number1 - number2;
                break;
            case 'x':
                res = number1 * number2;
                break;
            case '/':
                if (number2 !== 0) {
                    res = number1 / number2
                } else {
                    res = 'Cannot divide by zero';
                    setResult(res);
                    setError(true);
                    return;
                }
                break;
            default:
                res = '';
        }
        setResult(res);
        setError(false);
    }
    return (
        <div className="container border border-black p-3">
            <h1 className="text-center mb-4">Calculator</h1>
            <div className="mb-3">
                <input
                    type="text"
                    value={num1}
                    onChange={e => setNum1(e.target.value)}
                    placeholder="Enter first number"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <select
                    value={operation}
                    onChange={e => setOperation(e.target.value)}
                    className="form-select"
                >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="x">x</option>
                    <option value="/">/</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    value={num2}
                    onChange={e => setNum2(e.target.value)}
                    placeholder="Enter second number"
                    className="form-control"
                />
            </div>
            <div className="mb-4">
                <button onClick={handleCalculate} className="btn btn-primary w-100">Calculate</button>
            </div>
            <h2 className="text-center">Result</h2>
            <h2 className="text-center" style={{color: error ? "red" : "green"}}>{result}</h2>
        </div>
    );
}
export default Calculator;
