import React, {ChangeEvent, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useSearchParams,
    LinkProps,
    useResolvedPath, useMatch, Outlet, Navigate, useNavigate
} from 'react-router-dom';
import "./SS_5_TH.css"

const FileUploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [url, setUrl] = React.useState<string | null>(null);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setIsFilePicked(true);
        }
    }
    const handleSubmission = () => {
        if (selectedFile) {
            console.log("Submitting file:", selectedFile);
        }
    }
    React.useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);
    return (
        <div>
            <input type="file" name="file" multiple={true} onChange={changeHandler}/>
            {isFilePicked ? (
                <>
                    {selectedFile && (
                        <>
                            <p>Tên file: {selectedFile.name}</p>
                            <p>Loại file: {selectedFile.type}</p>
                            <p>Kích thước (bytes): {selectedFile.size}</p>
                            <p>
                                Ngày sửa đổi lần cuối: {new Date(selectedFile.lastModified).toLocaleDateString()}
                            </p>
                            {selectedFile.type.startsWith("image/") ? (
                                <img src={url ? url : ""} alt="uploaded image"/>
                            ) : (
                                <video src={url ? url : ""} controls/>
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>Hãy chọn một file để xem chi tiết</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    );
}
const FormEx = () => {
    const [state, setState] = React.useState<{
        username: string,
        age: number
    }>({
        username: "",
        age: 0
    });
    const [error, setError] = React.useState<{
        username: boolean,
        age: boolean
    }>({
        username: false,
        age: false
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let nam = e.target.name;
        let val = e.target.value;
        if (nam === "age") {
            setState(prevState => ({
                ...prevState,
                age: Number(val)
            }));
            isValid(Number(val));
        } else {
            setState(prevState => ({
                ...prevState,
                [nam]: val
            }));
        }
    }
    const isValid = (age: number) => {
        if (isNaN(age) || age < 18) {
            setError(prevError => ({
                ...prevError,
                age: true
            }));
            return;
        }
        setError(prevError => ({
            ...prevError,
            age: false
        }));
    }
    return (
        <form>
            <h1>
                Hello {state.username} {state.age}
            </h1>
            <p>Enter your name:</p>
            <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
            />

            <p>Enter your age:</p>
            {error.age && (
                <span style={{color: "red"}}>
                    Tuổi phải là số và trên 18 tuổi.
                </span>
            )}
            <input
                type="number"
                name="age"
                value={state.age}
                onChange={handleChange}
            />
        </form>
    );
}
const sleep = (ms: number): Promise<string> => new Promise(resolve => setTimeout(resolve, ms));
const validate = (values: { username: string }) => {
    return sleep(2000)
        .then(() => {
            const errors: { username: string | null } = {username: null};
            if (['admin', 'null', 'god'].includes(values.username)) {
                errors.username = 'Nice try';
            }
            return errors;
        });
}
const SignupForm = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id={"email"} type="email" name="email"/>
                        <ErrorMessage name="email">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field id={"password"} type="password" name="password"/>
                        <ErrorMessage name="password">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}
const Home = () => {
    return <h1>Welcome to the Home Page</h1>;
}
const About = () => {
    return <h1>About Us</h1>;
}
const Contact = () => {
    return <h1>Contact Us</h1>;
}
const Apps = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
    );
}
const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}
const User = () => {
    const {userId} = useParams();
    return <div>User ID: {userId}</div>;
}
const Users = () => {
    const [searchParams] = useSearchParams();
    const sort = searchParams.get('sort');
    return <div>Sort by: {sort}</div>;
}
const CustomLink = ({children, to, ...props}: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});
    return (
        <div>
            <Link
                to={to}
                {...props}
            >
                {children}
            </Link>
            {match && " (active)"}
        </div>
    );
}
const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <CustomLink to="/">Home</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/about">About</CustomLink>
                    </li>
                </ul>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    );
}
const Login = () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace/>;
    }
    return <h2>Please log in</h2>;
}

interface FormField {
    value: string,
    error: string,
}

interface FormState {
    username?: FormField,
    email?: FormField,
    password?: FormField,
    confirmPassword?: FormField,
}

const MESSAGE_ERROR: Record<string, string> = {
    username: "Username error",
    email: "Email error",
    password: "Password error",
    confirmPassword: "Password must be the same"
}
const REGEX: Record<string, RegExp> = {
    username: /^[a-zA-Z]{2,}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/
}
const AppTH5_1 = () => {
    const [form, setForm] = useState<FormState>({});
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        let error = "";
        if (name === "password") {
            if (form.confirmPassword && form.confirmPassword.value) {
                error = value === form.confirmPassword.value ? "" : MESSAGE_ERROR[name];
            } else {
                error = REGEX[name].test(value) ? "" : MESSAGE_ERROR[name];
            }
        } else if (name === "confirmPassword") {
            error = value === form.password?.value ? "" : MESSAGE_ERROR[name];
        } else {
            error = REGEX[name].test(value) ? "" : MESSAGE_ERROR[name];
        }
        setForm({...form, [name]: {value, error}});
    }
    const handleSubmit = () => {
        const isFilled =
            form.username &&
            form.username.value &&
            form.email &&
            form.email.value &&
            form.password &&
            form.password.value &&
            form.confirmPassword &&
            form.confirmPassword.value;

        const isError =
            isFilled &&
            (form.username?.error ||
                form.email?.error ||
                form.password?.error ||
                form.confirmPassword?.error);

        alert(
            isFilled && !isError
                ? "Sign up successfully!!!"
                : "Please fill out all the fields!!!"
        );
    }
    return (
        <div>
            <h1>Sign up</h1>
            <form>
                <div className={`custom-input ${form.username?.error && "custom-input-error"}`}>
                    <label>Username </label>
                    <input
                        name="username"
                        value={form.username?.value || ""}
                        onChange={handleChange}
                    />
                    {form.username?.error && (
                        <p className="error">{form.username.error}</p>
                    )}
                </div>
                <div className={`custom-input ${form.email?.error && "custom-input-error"}`}>
                    <label>Email </label>
                    <input
                        name="email"
                        value={form.email?.value || ""}
                        onChange={handleChange}
                    />
                    {form.email?.error && (
                        <p className="error">{form.email.error}</p>
                    )}
                </div>
                <div className={`custom-input ${form.password?.error && "custom-input-error"}`}>
                    <label>Password </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password?.value || ""}
                        onChange={handleChange}
                    />
                    {form.password?.error && (
                        <p className="error">{form.password.error}</p>
                    )}
                </div>
                <div className={`custom-input ${form.confirmPassword?.error && "custom-input-error"}`}>
                    <label>Confirm password </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword?.value || ""}
                        onChange={handleChange}
                    />
                    {form.confirmPassword?.error && (
                        <p className="error">{form.confirmPassword.error}</p>
                    )}
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
export {FormEx, FileUploadPage, SignupForm, Apps, Navbar, AppTH5_1}