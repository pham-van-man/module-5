import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const listPerson = [
    {id: 1, name: 'John', age: 20},
    {id: 2, name: 'Man', age: 24},
    {id: 3, name: 'Vy', age: 26},
    {id: 4, name: 'Brando', age: 28}
]
const DetailPerson = () => {
    return (
        <div className={"container"}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                </tr>
                </thead>
                <tbody>
                {listPerson.map(person => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DetailPerson;