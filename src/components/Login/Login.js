import { useState } from "react"
import { api } from "../../api"
import {useNavigate} from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: "",
        level: 0
    })
    const [errLogin, setErrLogin] = useState("") //Biến này tạo ra để chứa lỗi 

    const handleLogin = (e) => {
        const nameLogin = e.target.name
        const value = e.target.value
        setLogin((state) => ({...state, [nameLogin]: value}))
    }
    
    function handleSubmitLogin(e) {
        //Muốn biết flg để làm gì hãy xem lại trang Register
        e.preventDefault()
        let errSubmitLogin = {}
        let flag = true

        if(login.email=="") {
            errSubmitLogin.email = "Enter Email"
            flag = false
        }
        if(login.password ==""){
            errSubmitLogin.password = "Enter Password"
            flag = false
        }
        if(login.level=="") {
            errSubmitLogin.level = "Enter Level"
            flag = false
        }



       
        if(flag) {
            api
            .post("/login", login)

            .then((response) => {
                // console.log(response);  //dung hoac sai 

                if(response.data.errors) {//Kiểm tra nếu đăng nhập thành công khi đăng ký thành công dựa trên thông tin đăng ký bên Register (api trả về) thì báo thành công (Login success). 
                    setErrLogin(response.data.errors)
                } else {
                    localStorage.setItem("auth", JSON.stringify(response.data.Auth))
                    localStorage.setItem("token", response.data.token)

                    alert("Login Success")
                    navigate("/home")
                }

            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            setErrLogin(errSubmitLogin)
        }
    }
    return(
    <>
    <div class="col-sm-4 col-sm-offset-1">
        <div class="login-form">
            <h2>Login to your account</h2>
            <form action="#" onSubmit={handleSubmitLogin} encType="multipart/form-data">
                <div>
                    <input type="email" name="email" placeholder="Email Address" onChange={handleLogin} />
                </div>
                {errLogin.email && <p>{errLogin.email}</p>}
                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleLogin} />
                </div>
                {errLogin.password && <p>{errLogin.password}</p>}
                <div>
                    <input type="text" name="level" placeholder="Level" onChange={handleLogin} />
                </div>
                {errLogin.level && <p>{errLogin.level}</p>}
                <span>
                    <input type="checkbox" class="checkbox"/> 
                    Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
            </form>
        </div>
    </div>
    <div class="col-sm-1">
        <h2 class="or">OR</h2>
    </div>
    
    </>
        
    )
}
export default Login