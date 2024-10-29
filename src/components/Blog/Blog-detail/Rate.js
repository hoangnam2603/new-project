import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react"; 
import { api } from '../../../api';

function Rate({ blogId }) {
    const [rating, setRating] = useState(0);
    const [totalRating, setTotalRating] = useState(0); // Tổng số điểm
    const [totalUsers, setTotalUsers] = useState(0); // Số người đánh giá
    const [averageRating, setAverageRating] = useState(0); // Điểm trung bình

    
    const handleGetAverage = () => {
        api
            .get("/blog/rate/" + blogId)
            .then((res) => {
                const data = res.data.data;
    
                // Số người đánh giá
                const totalUsers = Object.keys(data).length;

                // tạo biến tổng rate
                let totalRate = 0;

                // Sử dụng map để duyệt qua các giá trị rate 
                Object.keys(data).map((key) => {
                    totalRate += data[key].rate; // Cộng dồn rate vào biến totalRate(tổng số rate)
                });
    
                // Tính điểm trung bình
                const averageRating = totalRate / totalUsers;
    
                // Cập nhật các giá trị state 
                setTotalUsers(totalUsers);
                setTotalRating(totalRate);
                setAverageRating(averageRating);
    
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

    useEffect(() => {
        handleGetAverage();
    }, [blogId]);

    function changeRating(newRating, name) {
        let userInfor = localStorage.getItem("auth");
        if (!userInfor) {
            alert("Vui lòng đăng nhập để gửi đánh giá.");
            return
        } else {
           
            userInfor = JSON.parse(userInfor);
            const accessToken = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            };
            const formData = new FormData()
            formData.append("user_id", userInfor.id)
            formData.append("blog_id", blogId)
            formData.append("rate", newRating)

            api.post("/blog/rate/" + blogId, formData, config)
                .then((response) => {
                    console.log(response); // Kiểm tra dữ liệu trả về
                    setRating(newRating); // Cập nhật rating sau khi gửi thành công
                    alert("Đánh giá thành công ");
                    
                })
                .catch((error) => {
                    console.error(error);
                    alert("Đã xảy ra lỗi khi gửi đánh giá.");
                });
        }
    }
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    changeRating={changeRating}
                    numberOfStars={5} // Số sao đánh giá
                    name="rating"
                />
                <li>Điểm trung bình: {averageRating.toFixed(1)}</li> {/* Hiển thị điểm trung bình */}
                <li>Tổng số điểm: {totalRating}</li> {/* Hiển thị tổng số điểm */}
                <li>Số người đánh giá: {totalUsers}</li> {/* Hiển thị số người đánh giá */}
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li>
                    <a className="color" href="">
                        Pink <span>/</span>
                    </a>
                </li>
                <li>
                    <a className="color" href="">
                        T-Shirt <span>/</span>
                    </a>
                </li>
                <li>
                    <a className="color" href="">
                        Girls
                    </a>
                </li>
            </ul>
        </div>
    );
}
//tiếp tục làm tiếp phần đánh giá, gửi điểm qua api hay gif đó (tìm hiểu tiếp)
//tạo biến, tính tbc
export default Rate;
