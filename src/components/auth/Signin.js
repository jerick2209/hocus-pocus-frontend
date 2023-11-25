import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react"
import { authenticate } from './auth-helper.js';
import { signin } from "../../datasource/api-auth.js";

const Signin = () =>{
    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    let navigate = useNavigate();
    
    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        signin(user).then((data) => {
            if (data && data.success) {
                authenticate(data.token, () => {
                    navigate(from, {replace: true});
                });
            }
            else {
                setErrorMsg(data.message);
            }
        }).catch(err => {
            setErrorMsg(err.message);
            console.log(err)
        });
    };

    return (
        // -- Content for the Add_Edit page --
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Signin</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="emailTextField">Email</label>
                            <input type="text" className="form-control"
                                id="emailTextField"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passowordTextField">Password</label>
                            <input type="password" className="form-control"
                                id="passowordTextField"
                                placeholder=""
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />

                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>

                        <Link href="#" to="/ads/listActive" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Signin;
