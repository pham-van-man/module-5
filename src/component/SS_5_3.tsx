import "bootstrap/dist/css/bootstrap.css";
import React, {ChangeEvent, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import "./SS_5_3.css";

const MailForm = () => {
    const [email, setEmail] = useState<{
        to: string,
        title: string,
        message: string,
        file: File[]
    }>({
        to: "",
        title: "",
        message: "",
        file: []
    })
    const validationSchema = Yup.object().shape({
        to: Yup.string().required('Người nhận không được để trống'),
        title: Yup.string(),
        message: Yup.string(),
        file: Yup.array().of(Yup.mixed().required('Tệp không được để trống')).nullable().notRequired()
    });
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const files: File[] = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
        setFieldValue('file', files);
        const urls = files.map(file => URL.createObjectURL(file));
        setImageUrls((prevState) => [...prevState, ...urls]);
    }
    return (
        <Formik
            initialValues={{
                to: "",
                title: "",
                message: "",
                file: []
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2));
            }}
        >
            {({setFieldValue, isSubmitting}) => (
                <Form className={"container"}>
                    <div>
                        <label>To: </label>
                        <Field name="to"/>
                        <ErrorMessage name="to">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label>Title: </label>
                        <Field name="title"/>
                        <ErrorMessage name="title">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label>Message: </label>
                        <Field name="message"/>
                        <ErrorMessage name="message">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label>Files: </label>
                        <input
                            name="file"
                            type="file"
                            multiple
                            onChange={(event) => handleFileChange(event, setFieldValue)}
                        />
                        <ErrorMessage name="file">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className="image-preview">
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={"Preview " + {index}}
                                 style={{width: '100px', margin: '5px'}}/>
                        ))}
                    </div>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    );
}
export default MailForm;

