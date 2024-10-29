import { useParams } from "react-router-dom";
import {
  Blogone,
  manfour,
  manone,
  manthree,
  mantwo,
  shipping,
} from "../../../images";
import { useEffect, useState } from "react";
import { api, blogUrlImage } from "../../../api";
import Rate from "./Rate";
import MediaList from "./MediaList";
import FormCmt from "./FormCmt";
function BlogDetail() {
  let params = useParams(); //lấy ID trên URL
  const [data, setData] = useState("");
  const [comment, setComment] = useState([]);
  const [idRely, setIdRely] = useState("");
  const [commentList, setCommentList] = useState([]);

  
  

  const handleGetCmt = () => { // biến này tạo ra để get api về và tạo ra useEffect rồi gọi nó vào (để làm đơn giản code)
    api
    .get("/blog/detail/" + params.id)
    .then((res) => {
      // console.log(res.data.data);
      setData(res.data.data);
      // console.log(res.data.data.comment);
      setCommentList(res.data.data.comment)
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  useEffect(() => {
    handleGetCmt() // gọi biến vào useEff 
  }, [params.id]);

  function renderDetailBlog() {
    return (
      <div className="single-blog-post">
        <h3>{data.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user"></i> Mac Doe
            </li>
            <li>
              <i className="fa fa-clock-o"></i> 1:33 pm
            </li>
            <li>
              <i className="fa fa-calendar"></i> DEC 5, 2013
            </li>
          </ul>
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
          </span>
        </div>
        <a href="">
          <img src={blogUrlImage + data.image} alt="" />
        </a>
        <p>{data.content}</p>

        <div className="pager-area">
          <ul className="pager pull-right">
            <li>
              <a href="#">Pre</a>
            </li>
            <li>
              <a href="#">Next</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">{/* Sidebar content */}</div>
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {renderDetailBlog()}
            </div>
            <Rate
            blogId = {params.id}
             />
            <div class="socials-share">
              <a href="">
                <img src="images/blog/socials.png" alt="" />
              </a>
            </div>

            <MediaList 
            
            commentList={commentList}
             />

            <FormCmt />
          </div>
        </div>
      </div>
    </section>
  );
}
export default BlogDetail;
