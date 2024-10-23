import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./Style_SS_3_8.css"

const Table = () => {
    const [student, setStudent] = React.useState({
        name: "",
        phone: "",
        email: ""
    });
    const [students, setStudents] = React.useState([
        {
            name: "",
            phone: "",
            email: ""
        }
    ]);
    const [isValid, setIsValid] = React.useState("");
    const [indexTarget, setIndexTarget] = React.useState(-1);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setStudent({
            ...student,
            [name]: value
        })
        checkInvalidForm();
    }
    const handleSelect = (index: number) => {
        setStudent(students[index])
        setIndexTarget(index);
    }
    const checkInvalidForm = () => {
        const {name, phone, email} = student;
        const value = name && phone && email;
        setIsValid(value);
    }
    const handleUpdate = () => {
        if (indexTarget !== -1) {
            setStudents(prevStudents =>
                prevStudents.map((s, i) =>
                    i === indexTarget ? student : s
                )
            );
        } else {
            setStudents([...students, student]);
        }
        setIndexTarget(-1);
    };
    const handleDelete = (index: number) => {
        setStudents(prevStudents =>
            prevStudents.filter((_, i) => i !== index)
        );
    };
    return (
        <div>
            <div>
                <h1>Student List</h1>
                <div>
                    <label>Name: </label>
                    <input name="name" value={student.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" name="phone" value={student.phone} onChange={handleChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input name="email" value={student.email} onChange={handleChange}/>
                </div>
                <button onClick={handleUpdate} disabled={!isValid}>Submit
                </button>
                <table>
                    <thead>
                    <tr>
                        <th scope={"col"}>Name</th>
                        <th scope={"col"}>Phone</th>
                        <th scope={"col"}>Email</th>
                        <th scope={"col"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => handleSelect(index)}>Edit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Table;