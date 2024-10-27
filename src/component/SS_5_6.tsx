import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'letmein') {
            navigate('/employee', {state: {email}});
        } else {
            alert('Incorrect email or password');
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

function Employee() {
    const employees = [
        {id: 1, name: 'Hoa', age: 20},
        {id: 2, name: 'Khánh', age: 25},
        {id: 3, name: 'Tú', age: 22},
    ];
    const location = useLocation();
    const navigate = useNavigate();
    const {email} = location.state || {};
    const handleDetail = (employee: { id: number, name: string, age: number }) => {
        navigate(`/employee/${employee.id}`, {state: {employee}});
    };
    return (
        <div>
            <h2>Employee List</h2>
            <p>Logged in as: {email}</p>
            <table border={1}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.age}</td>
                        <td>
                            <button onClick={() => handleDetail(employee)}>Detail</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function EmployeeDetail() {
    const location = useLocation();
    const {employee} = location.state || {};
    return (
        <div>
            <h2>Employee Detail</h2>
            {employee ? (
                <div>
                    <p>ID: {employee.id}</p>
                    <p>Name: {employee.name}</p>
                    <p>Age: {employee.age}</p>
                </div>
            ) : (
                <p>No employee data available.</p>
            )}
        </div>
    );
}