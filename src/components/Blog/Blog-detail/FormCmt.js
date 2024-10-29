import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../api"

function FormCmt() {
    let params = useParams() //Lấy ID trên URL
    const [data, setData] = useState("")
    const [comment, setComment] = useState("")
    const [idRely, setIdRely] = useState("");

    const handleRely = (e) => {
       setComment(e.target.value)
    }

    const handleGetCmt = () => {
        api
        .get("/blog/detail/" + params.id)
        .then((respon) => {
            // console.log(respon);
            setData(respon.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        handleGetCmt()
    }, [params.id])

    const handleSubmitCmt = (e) => {
        e.preventDefault()
        let userInfor = localStorage.getItem("auth")
        if(!userInfor) {
            alert("Vui long login")
            return
        }
        userInfor = JSON.parse(userInfor)

        if(!comment) {
            alert("Nhap binh luan")
        } else {
            let accessToken = localStorage.getItem("token")
            let config = {
                headers: {
                Authorization: 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
                }
            }
            const formData = new FormData()
            formData.append("id_blog", params.id)
            formData.append("id_user", userInfor.id);
            formData.append("id_comment", idRely || 0);
            formData.append("comment", comment);
            formData.append("image_user", userInfor.avatar);
            formData.append("name_user", userInfor.name);

            

            api
            .post("/blog/comment/" + params.id, formData, config)
            .then((res) => {
                // console.log(res);
                handleGetCmt()
                setComment() //xóa cmt đã nhập sau khi gửi
                setIdRely(0) // reset lại ID trả lời
            })

        }

    }
    return(
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea name="message" rows="11" onChange={handleRely}></textarea>
                        <a onClick={handleSubmitCmt} className="btn btn-primary" href="">post comment</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormCmt