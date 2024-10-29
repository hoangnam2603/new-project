import { useEffect, useState } from "react"
import { api, productImage } from "../../api"
import { Link, useNavigate } from "react-router-dom";

function ImProduct() {
    
	const navigate = useNavigate()
	const [products, setProducts] = useState("");
	useEffect(() => {
		getProduct()
	}, [])
	
	const getProduct = () => {
		const accessToken = localStorage.getItem("token");
		api
		.get("user/my-product", {
			headers: {
				Authorization: "Bearer " + accessToken, // Khi cần gọi token vào api ta phải truyền token và headers ntn.
			}
		  })
		  .then((res) => {
			// console.log(res.data);
			setProducts(res.data.data)
		  })
		  .catch((err) => {
			console.log(err);
		  })
	}
	// đầu tiên là lấy id của sản phẩm rồi gửi qua api,
	//chỗ "user/product/delete/id" đuôi id đó là id của sp chứ không phải là chữ id
	//nhớ để onClick ở dưới chữ delete
	const deleteProduct = (id) => {
		const accessToken = localStorage.getItem("token");
		api
		  .get("user/product/delete/" + id, {
			headers: {
			  Authorization: "Bearer " + accessToken,
			},
		  })
		  .then((res) => {
			console.log("Xóa sản phẩm thành công:", res);
			// Cập nhật lại danh sách sản phẩm sau khi xóa
			setProducts(products.id !== id);
			// setProducts(products.filter((product) => product.id !== id));
			//.filter(): Đây là một phương thức của mảng trong JavaScript. 
			//Nó tạo ra một mảng mới từ mảng ban đầu (products), 
			//chỉ giữ lại các phần tử (sản phẩm) thỏa mãn điều kiện mà ta cung cấp bên trong hàm filter().
			})
		  .catch((err) => {
			console.log(err);
		  });
	  };
	// console.log(products);
	
	
	function renderProduct() {
		if(Object.keys(products).length > 0) {
			return Object.keys(products).map((key) => {
				const product = products[key]
				return(
					<table className="table table-condensed">
						<thead>
							<tr className="cart_menu">
								<td className="image">image</td>
								<td className="description">name</td>
								<td className="price">price</td>
								<td className="total">action</td>										
							</tr>
						</thead>
						<tbody>
							<tr key={key}>
								<td className="cart_product">
									<a href=""><img src={productImage + product.image} alt=""/></a>
								</td>
								<td className="cart_description">
									<h4>{product.name}</h4>
									
								</td>
								<td className="cart_price">
									<p>{product.price}</p>
								</td>
								
								<td className="cart_total">
								<Link to={"user/product/" + product.id}>Edit</Link>
							 |
								<a href="#" onClick={() => deleteProduct(product.id)}>Delete</a> 
								{/* goi ham xoa vs id sp  */}
								</td>
							</tr>
						</tbody>
					</table>
				)
			})
		}
		
	}
	// console.log(products);


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
										<h4 className="panel-title"><a href="#">My product</a></h4>
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
						<div className="table-responsive cart_info">
							{renderProduct()}
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}
export default ImProduct