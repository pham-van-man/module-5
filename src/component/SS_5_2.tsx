import "bootstrap/dist/css/bootstrap.css";
import React, {ChangeEvent, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import "./SS_5_2.css";

const Library = () => {
    const [list, setList] = useState<{
        title: string,
        quantity: string
    }[]>([]);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Tiêu đề không được để trống'),
        quantity: Yup.number().typeError('Số lượng phải là một số').required('Số lượng không được để trống').min(1, "Số lượng phải lớn hơn 0"),
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    return (
        <>
            <Formik
                initialValues={{
                    title: "",
                    quantity: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm}) => {
                    if (editingIndex !== null) {
                        setList(prevState =>
                            prevState.map((item, index) =>
                                index === editingIndex ? values : item
                            )
                        );
                        setEditingIndex(null);
                    } else {
                        setList(prevState => [...prevState, values]);
                    }
                    resetForm({values: {title: "", quantity: ""}});
                }}
            >
                {({isSubmitting, resetForm, setValues}) => (
                    <div className={"container"}>
                        <div>
                            <Form>
                                <h1>Library</h1>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" id="title"/>
                                    <ErrorMessage name="title">
                                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field name="quantity" id="quantity"/>
                                    <ErrorMessage name="quantity">
                                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <button type="submit" disabled={isSubmitting}>
                                    {editingIndex !== null ? "Update" : "Submit"}
                                </button>
                            </Form>
                        </div>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.title}</td>
                                        <td>{book.quantity}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setEditingIndex(index);
                                                    resetForm({values: book});
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setList(prevState =>
                                                        prevState.filter((_, i) => i !== index)
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>)}
            </Formik>
        </>
    );
}
export default Library;