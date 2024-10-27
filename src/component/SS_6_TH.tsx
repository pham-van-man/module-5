import axios from 'axios';
import {useEffect, useLayoutEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {string} from "yup";
// Thiết lập URL cơ bản cho các yêu cầu
axios.defaults.baseURL = 'http://localhost:3000';
// Interceptor cho yêu cầu để log thông tin trước khi gửi
axios.interceptors.request.use(
    config => {
        console.log('Gửi yêu cầu:', config.method?.toUpperCase(), config.url);
        return config;
    },
    error => Promise.reject(error)
);
// Interceptor cho phản hồi để log thông tin sau khi nhận
axios.interceptors.response.use(
    response => {
        console.log('Phản hồi nhận được:', response.status);
        return response;
    },
    error => Promise.reject(error)
);

// Hàm thực hiện các yêu cầu HTTP
const demoRequests = async () => {
    try {
        // GET request
        const getResponse = await axios.get('/posts');
        console.log('GET - Dữ liệu nhận được:', getResponse.data);
        // POST request
        const postResponse = await axios.post('/posts', {
            title: 'Axios POST Demo',
            body: 'Đây là một bài viết demo',
            userId: 1
        });
        console.log('POST - Dữ liệu tạo mới:', postResponse.data);
        // PUT request
        const putResponse = await axios.put('/posts/1', {
            title: 'Cập nhật bài viết',
            body: 'Nội dung đã được cập nhật',
            userId: 1
        });
        console.log('PUT - Dữ liệu sau cập nhật:', putResponse.data);
        // DELETE request
        const deleteResponse = await axios.delete('/posts/1');
        console.log('DELETE - Kết quả xóa:', deleteResponse.data);
    } catch ({message}) {
        console.error('Lỗi xảy ra:', message);
    }
}

// Gọi hàm để thực hiện các yêu cầu
// demoRequests();
const List = () => {
    const [list, setList] = useState<{ title: string }[]>([]);
    useLayoutEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("/post");
                setList(response.data);
            } catch ({message}) {
                console.error('Lỗi xảy ra:', message);
            }
        };
        fetch();
    }, []);
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Quản lý Sách</h1>
            <form id="bookForm" className="mb-4">
                <div className="form-row">
                    <div className="col">
                        <input type="text" id="bookTitle" className="form-control" placeholder="Tên sách"
                               required></input>
                    </div>
                    <div className="col">
                        <input type="text" id="bookAuthor" className="form-control" placeholder="Tác giả"
                               required></input>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Thêm Sách</button>
                    </div>
                </div>
            </form>
            <div className="book-list">
                <h2 className="text-center">Danh sách Sách</h2>
                <div className="mb-3">
                    <input type="text" id="searchInput" className="form-control" placeholder="Tìm kiếm sách..."/>
                </div>
                <table className="table table-bordered table-striped table-hover text-center">
                    <thead className="thead-dark">
                    <tr>
                        <th>Tên Sách</th>
                        <th>Tác Giả</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody id="bookList">
                    {
                        list.map((element, index) => (
                            <tr key={index}>
                                <td>{element.title}</td>
                                <td>{element.title}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm">Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export {List};