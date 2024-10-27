import "bootstrap/dist/css/bootstrap.css";
import React, {ChangeEvent, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import "./SS_5_4.css";

const HealthDeclaration = () => {
    const [value, setValue] = useState<{
        fullName: string,
        idNumber: string,
        birthYear: string,
        gender: boolean,
        nationality: string,
        employer: string,
        department: string,
        hasHealthInsurance: boolean,
        city: string,
        district: string,
        ward: string,
        houseNumber: string,
        phoneNumber: string,
        emailAddress: string
    }>();
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Tên đầy đủ là bắt buộc')
            .min(2, 'Tên đầy đủ phải có ít nhất 2 ký tự'),
        idNumber: Yup.string()
            .required('Số chứng minh nhân dân là bắt buộc')
            .matches(/^\d{9}|\d{12}$/, 'Số CMND không hợp lệ (9 hoặc 12 chữ số)'),
        birthYear: Yup.string()
            .required('Năm sinh là bắt buộc')
            .matches(/^\d{4}$/, 'Năm sinh phải là 4 chữ số'),
        gender: Yup.boolean()
            .required('Giới tính là bắt buộc'),
        nationality: Yup.string()
            .required('Quốc tịch là bắt buộc'),
        employer: Yup.string()
            .required('Công ty làm việc là bắt buộc'),
        department: Yup.string()
            .required('Bộ phận làm việc là bắt buộc'),
        hasHealthInsurance: Yup.boolean()
            .required('Thông tin bảo hiểm y tế là bắt buộc'),
        city: Yup.string()
            .required('Tỉnh/Thành phố là bắt buộc'),
        district: Yup.string()
            .required('Quận/Huyện là bắt buộc'),
        ward: Yup.string()
            .required('Phường/Xã là bắt buộc'),
        houseNumber: Yup.string()
            .required('Số nhà là bắt buộc'),
        phoneNumber: Yup.string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số'),
        emailAddress: Yup.string()
            .required('Địa chỉ email là bắt buộc')
            .email('Địa chỉ email không hợp lệ'),
    });
    const initialValues = {
        fullName: '',
        idNumber: '',
        birthYear: '',
        gender: true,
        nationality: '',
        employer: '',
        department: '',
        hasHealthInsurance: false,
        city: '',
        district: '',
        ward: '',
        houseNumber: '',
        phoneNumber: '',
        emailAddress: '',
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >
            {({setFieldValue, isSubmitting, isValid}) => (
                <Form className={"container"}>
                    <div>
                        <label>Tên đầy đủ</label>
                        <Field name="fullName"/>
                        <ErrorMessage name="fullName" component="div"/>
                    </div>
                    <div>
                        <label>Số CMND</label>
                        <Field name="idNumber"/>
                        <ErrorMessage name="idNumber" component="div"/>
                    </div>
                    <div>
                        <label>Năm sinh</label>
                        <Field name="birthYear"/>
                        <ErrorMessage name="birthYear" component="div"/>
                    </div>
                    <div>
                        <label>Giới tính</label>
                        <div className={"d-flex justify-content-center align-items-center row"}>
                            <label className={"d-inline-block col-3"}>Nam</label>
                            <Field
                                type="radio"
                                name="gender"
                                value={true}
                                onChange={() => setFieldValue('gender', true)}
                                className={"d-block col-9"}
                            />
                        </div>
                        <div className={"d-flex justify-content-center align-items-center row"}>
                            <label className={"d-inline-block col-3"}>Nữ</label>
                            <Field
                                type="radio"
                                name="gender"
                                value={false}
                                onChange={() => setFieldValue('gender', false)}
                                className={"d-block col-9"}
                            />
                        </div>
                        <ErrorMessage name="gender" component="div"/>
                    </div>
                    <div>
                        <label>Quốc tịch</label>
                        <Field name="nationality"/>
                        <ErrorMessage name="nationality" component="div"/>
                    </div>
                    <div>
                        <label>Công ty làm việc</label>
                        <Field name="employer"/>
                        <ErrorMessage name="employer" component="div"/>
                    </div>
                    <div>
                        <label>Bộ phận làm việc</label>
                        <Field name="department"/>
                        <ErrorMessage name="department" component="div"/>
                    </div>
                    <div className={"d-flex align-items-start row"}>
                        <label className={"col-7"}>Bảo hiểm y tế</label>
                        <div className={"col-5 form-check"}>
                            <Field type="checkbox" name="hasHealthInsurance" className={"form-check-input"}
                                   style={{marginLeft: "-18px"}}/>
                        </div>
                    </div>
                    <div>
                        <label>Tỉnh/Thành phố</label>
                        <Field name="city"/>
                        <ErrorMessage name="city" component="div"/>
                    </div>
                    <div>
                        <label>Quận/Huyện</label>
                        <Field name="district"/>
                        <ErrorMessage name="district" component="div"/>
                    </div>
                    <div>
                        <label>Phường/Xã</label>
                        <Field name="ward"/>
                        <ErrorMessage name="ward" component="div"/>
                    </div>
                    <div>
                        <label>Số nhà</label>
                        <Field name="houseNumber"/>
                        <ErrorMessage name="houseNumber" component="div"/>
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <Field name="phoneNumber"/>
                        <ErrorMessage name="phoneNumber" component="div"/>
                    </div>
                    <div>
                        <label>Email</label>
                        <Field name="emailAddress"/>
                        <ErrorMessage name="emailAddress" component="div"/>
                    </div>
                    <button type="submit" disabled={isSubmitting || !isValid}>Gửi</button>
                </Form>
            )}
        </Formik>
    );
}
export default HealthDeclaration;