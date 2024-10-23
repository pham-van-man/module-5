import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const Body = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="container">
            <h1 style={{background: "green", color: "white"}} className={"py-3"}>Conditional Rendering</h1>
            <button onClick={() => setIsOpen(!isOpen)}
                    style={{borderRadius: "5px"}}>{isOpen ? 'Đóng giới thiệu' : 'Xem giới thiệu'}</button>
            {isOpen && (
                <>
                    <h3>Giới thiệu</h3>
                    <p>Trong ReactJs, đôi khi bạn có một số component và tùy thuộc vào từng điều kiện ví dụ như trạng
                        thái của state, props,... mà bạn muốn hiển thị một hoặc một số component nào đó. Khi đó bạn có
                        thể sử
                        dụng Conditional rendering để render ra component mà bạn mong muốn.</p>
                </>
            )}
        </div>
    );
}
export default Body;