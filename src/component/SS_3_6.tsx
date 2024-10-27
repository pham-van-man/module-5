import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./Style_SS_3_6.css"

const Login = ({onLogOut}: { onLogOut: () => void }) => {
    React.useEffect(() => {
        return () => {
            alert("Goodbye!!!");
        }
    }, []);
    return (
        <div className="container d-flex align-items-center text-center">
            <div className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Welcome</h1>
                <button className="w-100 btn btn-lg btn-primary" type="button" onClick={onLogOut}>Log out
                </button>
            </div>
        </div>
    );
}
const LogOut = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isValid, setIsValid] = React.useState("");
    const [form, setForm] = React.useState({
        email: "",
        password: "",
        isRemember: false
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
        checkValidForm();
    }
    const handleChangeCheckbox = () => {
        setForm(prevForm => ({
            ...prevForm,
            isRemember: !prevForm.isRemember
        }));
    }
    const checkValidForm = () => {
        const isValidForm = form.email && form.password;
        setIsValid(isValidForm);
    }
    const handleSubmit = () => {
        if (isValid) {
            setIsLoggedIn(true);
        }
    }
    if (isLoggedIn) {
        return <Login onLogOut={() => setIsLoggedIn(false)}/>;
    }
    return (
        <div className="container d-flex align-items-center text-center">
            <div className="form-signin">
                <form>
                    <img className="mb-4"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png"
                         alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                        <input className="form-control email" type="email" name="email"
                               placeholder="name@example.com" value={form.email}
                               onChange={handleChange}/>
                        <label>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control password" type="password" name="password"
                               placeholder="Password" value={form.password}
                               onChange={handleChange}/>
                        <label>Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" checked={form.isRemember}
                                   onChange={handleChangeCheckbox}/> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleSubmit}
                            disabled={!isValid}>Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        </div>
    )
}
export default LogOut;
