import { useParams } from "react-router-dom"
import { mantwo } from "../../../images"
import { useRef, useState } from "react"
function MediaList(props) {
    let params = useParams()
    const [IdRely, setIdRely] = useState("")
    const listCmt = props.commentList
  
    const handleClickReply = (e) => {
        e.preventDefault()
        const id = e.target.id
    }



    function renderCmt() {
        if(listCmt.length > 0) {
            return listCmt.map((data) => {
                // console.log(data);
                if(data.id_comment == 0) {
                    return( 
                        <li className="media">                       
                            <a className="pull-left" href="#">
                                <img className="media-object" src={mantwo} alt=""/>
                            </a>
                            <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <p>{data.comment}</p>
                            <a id={listCmt.id}  onClick={handleClickReply} className="btn btn-primary"  href=""><i className="fa fa-reply" ></i>Replay</a>
                            </div>
                        </li>
                ) 
                }
            })
        }
        
           
    }

    return (
        <div className="response-area">
        <h2> {listCmt.length} RESPONSES</h2>
            <ul className="media-list">
                {renderCmt()}
            </ul>					
        </div>
    )
}
export default MediaList