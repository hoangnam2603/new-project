import Register from "../Register/Register";
import Login from "./Login";

function Loginn() {
    return (
        <section id="form">

            <div class="container">
                <div class="row">
                    <Login/>
                    <Register/>
                </div>
            </div>

        </section>
        
    )
}
export default Loginn