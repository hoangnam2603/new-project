import { useEffect, useState } from "react"
import { api } from "../../api"
import { Link } from "react-router-dom";


function AddProduct() {
    const [getFile, setFile] = useState([]) 
    const [addProduct, setAddProduct] = useState({
        name: "",
        price: "",
        category: "", 
        brand: "",
        company: "", 
        detail: "",
        status: 1,
        sale: 0
    });
    const [errAddProduct, setErrAddProduct] = useState({}); //Chứa lỗi
    const [category, setCategory] = useState([]);  
    const [brand, setBrand] = useState([]);        

    const handleGetProduct = () => {
        api
        .get("category-brand")
        .then((respon) => {
            console.log(respon);
            const category = respon.data.category;
            const brand = respon.data.brand;
            setCategory(category);
            setBrand(brand);
        })
    };

    useEffect(() => {
        handleGetProduct();
    }, []);


    const handleAddProduct = (e) => { //để cập nhật trạng thái của đối tượng addProduct khi có sự thay đổi trong các trường nhập liệu của form.
        const nameProduct = e.target.name; // lấy tên của người dùng đã nhập
        const value = e.target.value; //lấy giá trị mà người dùng đã nhập vào 
        setAddProduct((state) => ({...state, [nameProduct]: value}));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files); // Lưu file vào state
    };

    const handleStatusChange = (e) => {
        const value = e.target.value; //lấy giá trị của status
        setAddProduct((state) => ({ ...state, status: value }));
    };

    function renderCategory() { //html
        if(category.length > 0) {
            return(
                <div>
                    <select name="category" onChange={handleAddProduct}>
                        <option disabled selected hidden>Please choose category</option>
                        {category.map((item) => (
                            <option key={item.id} value={item.id}>{item.category}</option>
                        ))}
                    </select>
                    {errAddProduct.category && <p>{errAddProduct.category}</p>}
                </div>
            );
        }
        
    }

    function renderBrand() { //html
        if(brand.length > 0) {
            return(
                <div>
                    <select name="brand" onChange={handleAddProduct}>
                        <option disabled selected hidden>Please choose brand</option>
                        {brand.map((item) => (
                            <option key={item.id} value={item.id}>{item.brand}</option>
                        ))}
                    </select>
                    {errAddProduct.brand && <p>{errAddProduct.brand}</p>}
                </div>
            );
        }
        
    }

    function renderStatus() { //html
        return (
            <div>
                <select name="status" value={addProduct.status} onChange={handleStatusChange}>
                    <option value="1">New</option>  
                    <option value="0">Sale</option> 
                </select>
                {errAddProduct.status && <p>{errAddProduct.status}</p>}
                {/* Hiển thị ô nhập giá sale nếu chọn status là "Sale" */}
                {addProduct.status == 0 && (
                    <div>
                        <input
                            type="text"
                            placeholder="Sale Price"
                            name="sale"
                            value={addProduct.sale} //A Bảo sửa đoạn này
                            onChange={handleAddProduct}
                        />
                        {errAddProduct.sale && <p>{errAddProduct.sale}</p>}
                    </div>
                )}
            </div>
        );
    }

    const validateForm = () => { // Xác thực form, hiển thị lỗi
        let errSubmit = {};
        let flag = true;

        if (!addProduct.name) {
            errSubmit.name = "Enter Name";
            flag = false;
        }
        if (!addProduct.price) {
            errSubmit.price = "Enter price";
            flag = false;
        }
        if (!addProduct.category) {
            errSubmit.category = "Enter category";
            flag = false;
        }
        if (!addProduct.brand) {
            errSubmit.brand = "Enter brand";
            flag = false;
        }
        if (!addProduct.company) {
            errSubmit.company = "Enter company";
            flag = false;
        }
        if (!addProduct.detail) {
            errSubmit.detail = "Enter detail";
            flag = false;
        }
        if (!addProduct.status) {
            errSubmit.status = "Enter status";
            flag = false;
        }
        if (addProduct.status == "0" && !addProduct.sale) { // Kiểm tra nếu là sale và chưa nhập giá sale
            errSubmit.sale = "Enter sale price";
            flag = false;
        }
        if (getFile == "") {
            errSubmit.image = "Enter image";
            flag = false;
        } else {
            if (!getFile[0].type.includes("image")) { //getFile[0] khi khai báo state là [] thì ở dưới này set là [0]. Mở lại mã register để xem
                errSubmit.image = "File must be an image";
                flag = false;
            } else if (getFile[0].size > 1024 * 1024) {
                errSubmit.image = "File size too large (max 1MB)";
                flag = false;
            }
        }

        setErrAddProduct(errSubmit);
        return flag;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let userInfor = localStorage.getItem("auth");
        userInfor = JSON.parse(userInfor);
        const accessToken = localStorage.getItem("token");
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };

        if (validateForm()) {
            const formData = new FormData();
            formData.append("name", addProduct.name);
            formData.append("price", addProduct.price);
            formData.append("category", addProduct.category);
            formData.append("brand", addProduct.brand);
            formData.append("company", addProduct.company);
            formData.append("detail", addProduct.detail);
            formData.append("status", addProduct.status);
            formData.append("sale", addProduct.sale);
            

            Object.keys(getFile).map((item) => {
                formData.append("file[]", getFile[item])
                console.log(item);
            })

            api
            .post("user/product/add", formData, config)  
            .then((res) => {
                console.log(res);
                alert("thanhcong")
            })
            .catch((err) => {
                console.error("Error: ", err);
            }); 
        }
    };

    // console.log(addProduct);
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
                                        <h4 className="panel-title"><a href="#">Add product</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/my-product"}>My product</Link></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/edit-product"}>Edit product</Link></h4>
                                    </div>
                                </div>
                                
                            </div>   
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Update Product</h2>
                            <div className="signup-form">
                                <h2>Create Product!</h2>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div>
                                        <input type="text" placeholder="Name" name="name" onChange={handleAddProduct}/>
                                        {errAddProduct.name && <p>{errAddProduct.name}</p>}
                                    </div>
                                    <div>
                                        <input type="number" placeholder="Price" name="price" onChange={handleAddProduct}/>
                                        {errAddProduct.price && <p>{errAddProduct.price}</p>}
                                    </div>
                                    
                                    {renderCategory()}

                                    {renderBrand()}

                                    {renderStatus()}

                                    

                                    <div>
                                        <input type="text" placeholder="Company Profile" name="company" onChange={handleAddProduct} />
                                        {errAddProduct.company && <p>{errAddProduct.company}</p>}
                                    </div>

                                    <div>
                                        <input type="file" onChange={handleFileChange} />
                                        {errAddProduct.image && <p>{errAddProduct.image}</p>}
                                    </div>

                                    <div>
                                        <textarea placeholder="Detail" name="detail" onChange={handleAddProduct}></textarea>
                                        {errAddProduct.detail && <p>{errAddProduct.detail}</p>}
                                    </div>

                                    <button type="submit" className="btn btn-default">Create Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddProduct;
