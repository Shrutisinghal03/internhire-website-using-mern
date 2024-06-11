import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null);

    const { isAuthorized, user } = useContext(Context);
   
    const navigateTo = useNavigate();

    const handleFileChange = (event) => {
        const resume = event.target.files[0];
        setResume(resume);
    };

    const { id } = useParams();

    const handleApplication = async (e) => {
        e.preventDefault();
        console.log("application ka user ",user); 
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("Contact", user.Contact);
        formData.append("Address", user.Address);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId", id);

        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/application/postApplication",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
         
            setCoverLetter("");
            setResume(null);
            toast.success(data.message);
            navigateTo("/job/getall");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthorized || (user && user.role === "Employer")) {
        navigateTo("/");
    }

    return (
        <section className="application">
            <div className="container">
                <h3>Application Form</h3>
                <form onSubmit={handleApplication}>
                   
                    <textarea
                        placeholder="CoverLetter..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                    />
                    <div>
                        <label
                            style={{ textAlign: "start", display: "block", fontSize: "20px" }}
                        >
                            Select Resume
                        </label>
                        <input
                            type="file"
                            accept=".pdf, .jpg, .png, .webp"
                            onChange={handleFileChange}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <button type="submit">Send Application</button>
                </form>
            </div>
        </section>
    );
};

export default Application;
