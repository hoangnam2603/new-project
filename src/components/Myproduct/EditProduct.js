import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api";

function EditProduct() {
    let params  = useParams(); // Lấy ID từ URL
    const [editProduct, setEditProduct] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 1,
        sale: 0
    });

    useEffect(() => {
        handleGetEdit();
    }, [params.id]);
    console.log(params.id);

    const handleGetEdit = () => {
        const accessToken = localStorage.getItem("token");
        api
            .get("user/product/" + params.id, { // Gọi API để lấy thông tin sản phẩm theo ID
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            })
            .then((res) => {
                console.log(res);
                setEditProduct(res.data.data); // Cập nhật thông tin sản phẩm vào state
            })
            .catch((err) => {
                console.log("Lỗi khi lấy thông tin sản phẩm:", err);
            });
    };

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditProduct((state) => ({ ...state, [name]: value }));
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
                                        <h4 className="panel-title"><Link to="#">Account</Link></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/add-product"}>Add Product</Link></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><Link to={"/my-product"}>My Product</Link></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Edit Product</h2>
                            <div className="signup-form">
                                <form>
                                    <div>
                                        <input type="text" value={editProduct.name} name="name" placeholder="Name" onChange={handleEdit} />
                                    </div>
                                    <div>
                                        <input type="number" value={editProduct.price} name="price" placeholder="Price" onChange={handleEdit} />
                                    </div>
                                    <div>
                                        <input type="text" value={editProduct.category} name="category" placeholder="Category" onChange={handleEdit} />
                                    </div>
                                    <div>
                                        <input type="text" value={editProduct.brand} name="brand" placeholder="Brand" onChange={handleEdit} />
                                    </div>
                                    <div>
                                        <input type="text" value={editProduct.company} name="company" placeholder="Company" onChange={handleEdit} />
                                    </div>
                                    <div>
                                        <textarea value={editProduct.detail} name="detail" placeholder="Detail" onChange={handleEdit}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-default">Edit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditProduct;
