import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const Alert = (props: { text: string }) => {
    return (
        <div className="alert alert-warning" role="alert">
            {props.text}
        </div>
    )
}
export default Alert;