import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const Timer = () => {
    const [time, setTime] = React.useState(10);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((time) => {
                if (time > 0) {
                    return time - 1;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    React.useEffect(() => {
        if (time === 0) {
            alert("Time's up");
        }
    });
    return <h1>Count down from {time}</h1>;
};
export default Timer;