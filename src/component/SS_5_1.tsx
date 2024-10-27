import React, {ChangeEvent, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

const ContactForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Tên là bắt buộc'),
        email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Email là bắt buộc')
            .matches(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'), 'Email không đúng định dạng'),
        phoneNumber: Yup.string()
            .matches(new RegExp("^(03|05|07|08|09)\\d{8}$"), 'Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09 và có 10 chữ số.')
            .required('Số điện thoại là bắt buộc'),
        message: Yup.string()
            .required('Tin nhắn là bắt buộc'),
    });
    return (
        <Formik
            initialValues={{
                name: "",
                email: '',
                phoneNumber: "",
                message: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form className="container mt-5">
                    <h1 className="text-center">Contact Form</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field id="name" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <Field id="email" type="email" name="email" className="form-control"/>
                        <ErrorMessage name="email" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <Field id="phoneNumber" name="phoneNumber" className="form-control"/>
                        <ErrorMessage name="phoneNumber" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <Field as="textarea" id="message" name="message" className="form-control"/>
                        <ErrorMessage name="message" component="div" className="text-danger"/>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}
export default ContactForm;