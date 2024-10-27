import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import {useLayoutEffect, useRef, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

axios.defaults.baseURL = 'http://localhost:3000';
const Book = () => {
    const [books, setBooks] = useState<{ id: number, title: string, quantity: string }[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    useLayoutEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách:', error);
            }
        };
        fetchTodos();
    }, []);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tiêu đề không được để trống"),
        quantity: Yup.number().typeError("Số lượng phải là một số").required("Số lượng không được để trống").min(1, "Số lượng ít có 1")
    });
    const openDialog = (id: number) => {
        setSelectedBookId(id);
        dialogRef.current?.showModal();
    };
    const closeDialog = () => {
        setSelectedBookId(null);
        dialogRef.current?.close();
    };
    const handleDeleteTodo = async () => {
        if (selectedBookId !== null) {
            try {
                await axios.delete("/books/" + selectedBookId);
                setBooks(books.filter(book => book.id !== selectedBookId));
                closeDialog();
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
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
            <h1 className="text-center mb-4">Quản lý Sách</h1>
            <Formik initialValues={{title: "", quantity: ""}} validateOnMount={true} validationSchema={validationSchema}
                    onSubmit={async (values, {resetForm, setSubmitting}) => {
                        try {
                            if (selectedBookId !== null) {
                                const response = await axios.put('/books/' + selectedBookId, values);
                                setBooks(books.map(book => (book.id === selectedBookId ? {...book, ...values} : book)));
                                setSelectedBookId(null);
                            } else {
                                const response = await axios.post('/books', values);
                                setBooks([...books, response.data])
                            }
                            resetForm({values: {title: "", quantity: ""}});
                            setSubmitting(false);
                        } catch (error) {
                            console.error('Lỗi khi thêm:', error);
                        }
                    }}>
                {({isSubmitting, resetForm, isValid}) => (<>
                        <Form className="mb-4">
                            <div className="form-row">
                                <div className="col">
                                    <Field className="form-control my-3" name={"title"} placeholder="Tên sách"/>
                                    <ErrorMessage name={"title"}>
                                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="col">
                                    <Field className="form-control my-3" name="quantity" placeholder="Số lượng"/>
                                    <ErrorMessage name={"quantity"}>
                                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary my-3"
                                            disabled={!isValid || isSubmitting}>{selectedBookId ? "Lưu" : "Thêm mới"}
                                    </button>
                                </div>
                            </div>
                        </Form>
                        <div className="book-list">
                            <h2 className="text-center">Danh sách Sách</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    id="searchInput"
                                    className="form-control"
                                    placeholder="Tìm kiếm sách..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <table className="table table-bordered table-striped table-hover text-center">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Tên Sách</th>
                                    <th>Tác Giả</th>
                                    <th>Hành Động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.quantity}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm me-2"
                                                        onClick={() => openDialog(book.id)}>Xóa
                                                </button>
                                                <button className="btn btn-warning btn-sm ms-2" onClick={() => {
                                                    setSelectedBookId(book.id);
                                                    resetForm({values: book})
                                                }}>
                                                    Sửa
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
export {Book}