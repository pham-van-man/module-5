import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import {useLayoutEffect, useRef, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

axios.defaults.baseURL = 'http://localhost:3000';
const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    useLayoutEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('/todos');
                setTodos(response.data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách todos:', error);
            }
        };
        fetchTodos();
    }, []);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tiêu đề không được để trống"),
    });
    const openDialog = (id: number) => {
        setSelectedTodoId(id);
        dialogRef.current?.showModal();
    };
    const closeDialog = () => {
        setSelectedTodoId(null);
        dialogRef.current?.close();
    };
    const handleDeleteTodo = async () => {
        if (selectedTodoId !== null) {
            try {
                await axios.delete(`/todos/${selectedTodoId}`);
                setTodos(todos.filter(todo => todo.id !== selectedTodoId));
                closeDialog();
            } catch (error) {
                console.error('Lỗi khi xóa todo:', error);
            }
        }
    };
    return (
        <div className="container mt-5">
            <dialog ref={dialogRef} style={{borderRadius: "10px"}}>
                <h2>Xác nhận xóa</h2>
                <p>Bạn có chắc chắn muốn xóa todo này không?</p>
                <div className="col d-flex justify-content-end px-1">
                    <button className="btn btn-danger btn-sm mx-1" onClick={handleDeleteTodo}>Xóa</button>
                    <button className="btn btn-secondary btn-sm mx-1" onClick={closeDialog}>Hủy</button>
                </div>
            </dialog>
            <h1 className="text-center mb-4">Todo List</h1>
            <Formik
                initialValues={{title: ""}}
                validationSchema={validationSchema}
                onSubmit={async (values, {resetForm}) => {
                    try {
                        const response = await axios.post('/todos', {title: values.title});
                        setTodos([...todos, response.data]);
                        resetForm();
                    } catch (error) {
                        console.error('Lỗi khi thêm todo:', error);
                    }
                }}
            >
                {() => (
                    <>
                        <Form className="mb-4">
                            <div className="form-row">
                                <div className="col">
                                    <Field type="text" className="form-control" name="title"
                                           placeholder="Nhập tên todo"/>
                                    <ErrorMessage name="title" component="div"
                                                  render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary my-3">Thêm</button>
                                </div>
                            </div>
                        </Form>
                        <div>
                            <table className="table table-bordered table-striped table-hover text-center">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Tên Todo</th>
                                    <th>Hành Động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {todos.map((element) => (
                                    <tr key={element.id}>
                                        <td>{element.title}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={() => openDialog(element.id)}>Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
}
export {TodoList}