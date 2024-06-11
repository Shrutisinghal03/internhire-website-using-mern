import React, { useContext, useState, useEffect } from "react";
import { FaAddressCard, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [ Contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [Address, setAddress] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized && registrationComplete) {
      navigate('/');
    }
  }, [isAuthorized, registrationComplete, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        { name,  Contact, email, role, password,Address },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
      setRole("");
      setAddress("")
      setIsAuthorized(true);
      setRegistrationComplete(true);
    
      // Set this to true after registration is complete
    } catch (error) {
      toast("oowww owwww  not registration" );
    }
  };

  if (isAuthorized && registrationComplete) {
    toast("Registration Successful ");
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/needjob.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employee">Employer</option>
                  <option value="Jobseeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label> Contact Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  value={ Contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input
                  type="text"
                  placeholder="locality"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressCard />
              </div>
              </div>
            <button type="submit">
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.jpg" alt="login" />
        </div>
        <ToastContainer/>
      </section>
    </>
  );
};

export default Register;
