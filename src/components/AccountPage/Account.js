import { useEffect, useState } from "react"
import { api } from "../../api";
import { Link } from "react-router-dom";


function Account() {
    const [avatar, setAvatar] = useState("")
    const [file, setFile] = useState("");
    const [updateAccount, setUpdateAccount] = useState({
        name: "",
        email: "",
        password: "", 
        phone: "",
        address: "",
        avatar: "",
        level: 0,
    });
    
    const [errUpdate, setErrUpdate] = useState({});

    useEffect(() => {
        const updateUser = JSON.parse(localStorage.getItem("auth"))
        
        // console.log(updateUser);
        
        if(updateUser) {
           
            setUpdateAccount({
                name: updateUser.name,
                email: updateUser.email,
                phone: updateUser.phone,
                address: updateUser.address,
                avatar: updateUser.avatar,
                level: updateUser.level,
            })

            setAvatar(updateUser.avatar)
        }
    }, [])

    const handleUpdate = (e) => {
        const nameUpdate = e.target.name;
        const value = e.target.value;
        setUpdateAccount((state) => ({ ...state, [nameUpdate]: value }));
    };


    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        let errSubmitUpdate = {};
        let flag = true;
    
        if (!updateAccount.name) {
            errSubmitUpdate.name = "Enter Name";
            flag = false;
        }
        if (!updateAccount.address) {
            errSubmitUpdate.address = "Enter address";
            flag = false;
        }
        if (!updateAccount.phone) {
            errSubmitUpdate.phone = "Enter phone";
            flag = false;
        }
        if (!updateAccount.level) {
            errSubmitUpdate.level = "Enter level";
            flag = false;
        }
        if (file === "") {
            errSubmitUpdate.avatar = "Select avatar";
            flag = false;
        } else {
            if (!file[0].type.includes("image")) {
                errSubmitUpdate.avatar = "File must be an image";
                flag = false;
            } else if (file[0].size > 1024 * 1024) {
                errSubmitUpdate.avatar = "File size too large (max 1MB)";
                flag = false;
            }
        }
    
        if (flag) {
            const updateUser = JSON.parse(localStorage.getItem("auth"));
            let accessToken = localStorage.getItem("token");
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append("name", updateAccount.name);
            formData.append("email", updateAccount.email);  
            formData.append("phone", updateAccount.phone);
            formData.append("address", updateAccount.address);
            formData.append("level", updateAccount.level);
            formData.append("avatar", file[0]);
            formData.append("password", updateAccount.password ? updateAccount.password : ""); //Thuật toán 3 ngôi (nếu nhập vào thì nó là chính nó còn không nhập vào thì thôi) xxx.aa ? xxx.aa
            api
                .post("/user/update/" + updateUser.id, formData, config)
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.errors) {
                        setErrUpdate(res.data.errors);
                    } else {
                        alert("Update Success!");
                        const newAuth = res.data.Auth;
                        const newToken = res.data.token;
                        // console.log(newAuth);
                        // console.log(newToken);

                        // Set lại AUTH và TOKEN vào localStorage
                        // localStorage.setItem("auth", JSON.stringify(newAuth));
                        // localStorage.setItem("token", newToken);

                        localStorage.setItem("auth", JSON.stringify(newAuth))
                        localStorage.setItem("token", newToken)
                        

                        // localStorage.setItem("auth", JSON.stringify(response.data.Auth))
                        // localStorage.setItem("token", response.data.token)


                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setErrUpdate(errSubmitUpdate);
        }
    };
    
    
    const handleFile = (e) => {
        const selectedFile = e.target.files;
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setUpdateAccount((prev) => ({
                ...prev,
                avatar: e.target.result,
            }));
        };
        reader.readAsDataURL(selectedFile[0]);
    };




    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                            <h2>Account</h2>
                            <div className="panel-group category-products" id="accordian">
                                
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">account</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/add-product"}>Add product</Link></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/my-product"}>My product</Link></h4>
                                    </div>
                                </div>
                                
                                
                            </div>
                        
                            
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Update user</h2>
                            <div className="signup-form">
                            <h2>User Update</h2>
                            <form action="#" onSubmit={handleSubmitUpdate} encType="multipart/form-data">
                            <di>
                                <input type="text" name="name" placeholder="Name" value={updateAccount.name} onChange={handleUpdate} />
                            </di>
                            {errUpdate.name && <p>{errUpdate.name}</p>}
                            <di>
                                <input type="email" name="email" placeholder="Email Address" value={updateAccount.email} readOnly />
                            </di>
                            <di>
                                <input type="password" name="password" placeholder="New Password" onChange={handleUpdate}/>
                            </di>
                            {errUpdate.password && <p>{errUpdate.password}</p>}
                            <di>
                                <input type="text" name="phone" placeholder="Phone" value={updateAccount.phone} onChange={handleUpdate}/>
                            </di>
                            {errUpdate.phone && <p>{errUpdate.phone}</p>}
                            <di>
                                <input type="text" name="address" placeholder="Address" value={updateAccount.address} onChange={handleUpdate}/>
                            </di>
                            {errUpdate.address && <p>{errUpdate.address}</p>}
                            <di>
                                <input type="file" name="avatar" placeholder="Avatar" onChange={handleFile} />
                            </di>
                            {errUpdate.avatar && <p>{errUpdate.avatar}</p>}
                            <di>
                                <input type="text" name="level" placeholder="Level" value={updateAccount.level} onChange={handleUpdate}/>
                            </di>
                            {errUpdate.level && <p>{errUpdate.level}</p>}
                                <button type="submit" className="btn btn-default">Update</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Account