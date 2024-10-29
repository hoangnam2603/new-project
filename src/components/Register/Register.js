import { useState } from "react"
import { api } from './../../api/index';

function Register() {
    //2 biến avatar và file này là tạo ra để 1 cái là mã hóa hình ảnh up lên thành chuỗi (avatar) 
    //1 cái là chứa toàn bộ thông tin ảnh (file)
    const [avatar, setAvatar] = useState("") //khi khai báo là rỗng (useState("")) thì ở dưới khai báo là (== "")
    const [file, setFile] = useState("") // khi khai báo là (useState([])) thì set là [0]. ví dụ như hàng 663 và 66 (file[0])

    const [register, setRegister] = useState({ 
        name: "",
        email: "",
        password: "",
        phone:"",
        address:"",
        avatar:"",
        level: 0,
    })
    const [errRegister, setErrRegister] = useState({}) //Biến này tạo ra để chứa lỗi 
    const handleRegister = (e) => {
        const nameRegister = e.target.name
        const value = e.target.value
        setRegister((state) => ({...state, [nameRegister]: value}))
        // console.log(nameRegister, value);
    }
    function handleSubmitRegister(e) {
        e.preventDefault()

        let errSubmitRegister = {}
        let flag = 1 // chú thích flag: nếu có flag thì sẽ bằng 1, nếu không thì bằng 2, cũng như "true" và "false"

        if(!register.name) {
            errSubmitRegister.name = "Enter name"
            flag = 2
        }
        if(!register.email) {
            errSubmitRegister.email = "Enter email"
            flag = 2
        }
        if(!register.password) {
            errSubmitRegister.password = "Enter pass"
            flag = 2
        }
        if(!register.address) {
            errSubmitRegister.address = "Enter address"
            flag = 2
        }
        if(!register.phone) {
            errSubmitRegister.phone = "Enter phone"
            flag = 2
        }
        if(!register.level) {
            errSubmitRegister.level = "Enter level"
            flag = 2
        }
        // neu cai nay chua co 
        if(file == "") {
            errSubmitRegister.avatar = "Select avatar"
            flag = 2
        } else {
            // console.log(file);

            if(!file[0].type.includes("image")) {
                errSubmitRegister.avatar = "File must be an image"
                flag = 2
            } else if (file[0].size > 1024 * 1024) {
                errSubmitRegister.avatar = "File size too large (max 1MB)"
                flag = 2
            }
        }
        //nếu có (flag) thì code tiếp tục thực thi, không thì báo lỗi
        if(flag) {
            api
            .post("/register", register)
            .then((res) => {
                // console.log(res);
                if(res.data.errors) { //kiểm tra nếu có lỗi thì set vào biến lỗi ("setErrRegister") nếu không có lỗi thì báo thành công
                    // setErrRegister(res.data.errors) // Cách 1: khi các thông tin rỗng sẽ báo lỗi hiển thị bên trong errors
                    setErrRegister(errSubmitRegister) // Cách 2: hiển thị các thông báo báo lỗi như đã làm trên phần (handleSubmitRegister)
                    // Chú ý: CẢ 2 CÁCH ĐỀU ĐƯỢC
                } else {
                    alert("SignUp Success!")
                }
            })
            .catch((err) => {
                // console.log(err);
            })
        } else {
             setErrRegister(errSubmitRegister);
        }
    }
   
    const handleFile = (e) => {
        const file = e.target.files
        setFile(file)
        // đây là quá trình mã hóa tgoong tin file upload lên thành 1 chuỗi
        const reader = new FileReader() 
        reader.onload = (e) => {
            setAvatar(e.target.result) //cai nay de gui qua api
            setRegister((prev) => ({ // => khi upload file mình chia cái này ra 2 file và set 2 file này vào 2 biến usestate cụ thể ở đây là "avatar" và "file"
                ...prev, avatar:e.target.result,
            }))
        }
        reader.readAsDataURL(file[0])
    }
    return(
        <>
        <div class="col-sm-4">
            <div class="signup-form">
                <h2>New User Signup!</h2>
                <form action="#" onSubmit={handleSubmitRegister} encType="multipart/form-data">
                    <div>
                        <input type="text" name="name" placeholder="Name" onChange={handleRegister} />
                        
                    </div>
                    {errRegister.name && <p>{errRegister.name}</p>}
                    <div>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleRegister} />
                    </div>
                    {errRegister.email && <p>{errRegister.email}</p>}
                    <div>
                        <input type="password" name="password" placeholder="Password" onChange={handleRegister}/>
                    </div>
                    {errRegister.password && <p>{errRegister.password}</p>}
                    <div>
                        <input type="text" name="phone" placeholder="Phone" onChange={handleRegister}/>
                    </div>
                    {errRegister.phone && <p>{errRegister.phone}</p>}
                    <div>
                        <input type="text" name="address" placeholder="Address" onChange={handleRegister}/>
                    </div>
                    {errRegister.address && <p>{errRegister.address}</p>}
                    <div>
                        <input type="file" name="avatar" placeholder="Avatar" onChange={handleFile}/>
                    </div>
                    <div>
                        <input type="text" name="level" placeholder="Level"/>
                    </div>
                    {errRegister.level && <p>{errRegister.level}</p>}
              
                    <button type="submit" class="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Register