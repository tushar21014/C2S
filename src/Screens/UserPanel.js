import React, { useEffect, useState } from 'react'
import '../Css/User.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
const UserPanel = () => {
    const [formDetails, setformDetails] = useState({ category: "", organization_name: "", project_title: "", cid_name: "", cid_designation: "", cid_department: "", cid_email: "", cid_phone: "" });
    const [files, setFiles] = useState({
        file: null
    });
    const [Alert, setAlert] = useState({color: "", message:""});
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        setFiles(e.target.files[0]);
    };

    const handleChange = (e) => {
        setformDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (Alert) {
          const timer = setTimeout(() => {
            setAlert(null);
          }, 5000); // Alert will disappear after 5 seconds (adjust the duration as needed)
      
          return () => clearTimeout(timer);
        }
      }, [Alert]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('organization_name', formDetails.organization_name);
            formData.append('category', formDetails.category);
            formData.append('project_title', formDetails.project_title);
            formData.append('cid_name', formDetails.cid_name);
            formData.append('cid_designation', formDetails.cid_designation);
            formData.append('cid_department', formDetails.cid_department);
            formData.append('cid_email', formDetails.cid_email);
            formData.append('cid_phone', formDetails.cid_phone);
            formData.append('uploadedFile', files); // Append the file to the FormData
            console.log(formData.get('uploadedFile'))
            const response = await fetch("http://localhost:5004/api/user/userSubmission", {
                method: 'POST',
                headers: {
                    "auth-Token": localStorage.getItem('auth-Token')
                },
                body: formData
            })


            const json = await response.json();
            console.log(json);

            if (!json.submit) {
                setAlert({color:"danger", message:"Title cannot be same"})
                // alert('Title cannot be same ')
            }
            
            if (!json.success) {
                setAlert({color:"danger", message:"Form Not Submitted"})
                console.log("Form not submitted")
            }
            else {
                setAlert({color:"success", message:"Form Submitted Successfully"})
                // alert("Form Submitted Successfully")
                console.log("Form Submitted Successfully")
                setTimeout(() => {
                    navigate('/Viewpastuploads')
                }, 5000);
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        AOS.init({ duration: 1000, });
    }, [])

    return (

        <div className='container' id='form-container'>
            <h1 className='text-center my-4 '>Upload Proposal</h1>
            {localStorage.getItem('auth-Token') ? <>
            {Alert &&
                <div className={`alert alert-${Alert.color} alert-dismissible fade show`} role="alert">
                    <strong>{Alert.message}</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <form onSubmit={handleSubmit} method="post">
                    <div className="form-group">
                        <div className='row'>
                            <div className="col">
                                <label htmlFor="Salutation">Category</label>
                                <select className="form-control" required id="Category" aria-describedby="Category" name="category" onChange={handleChange} value={formDetails.category} placeholder="Select Category">
                                    <option value="">Select Category</option>
                                    <option value="Category 1">Category 1</option>
                                    <option value="Category 2">Category 2</option>
                                    <option value="Category 3">Category 3</option>
                                </select>
                            </div>

                            <div className='col'>
                                <label htmlFor="organization_name">Organisation Name</label>
                                <input type="text" name="organization_name" required placeholder='Enter Organization Name' value={formDetails.organization_name} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor="middle_name">Project Title</label>
                                <input type="text" className="form-control" required id="project_title" aria-describedby="project_title" name="project_title" onChange={handleChange} value={formDetails.project_title} placeholder="Project Title" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor="middle_name"><h4>Chief Investigator Details</h4></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor="middle_name">Chief Investigator Name</label>
                                <input type="text" className="form-control" id="cid_name" required aria-describedby="cid_name" name="cid_name" onChange={handleChange} value={formDetails.cid_name} placeholder="Chief Investigator Name" />
                            </div>
                            <div className='col'>
                                <label htmlFor="middle_name">Chief Investigator Designation</label>
                                <input type="text" className="form-control" id="cid_designation" required aria-describedby="cid_designation" name="cid_designation" onChange={handleChange} value={formDetails.cid_designation} placeholder="Chief Investigator Designation" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor="cid_department">Chief Investigator Department</label>
                                <input type="text" className="form-control" id="cid_department" required aria-describedby="cid_department" name="cid_department" onChange={handleChange} value={formDetails.cid_department} placeholder="Chief Investigator Department" />
                            </div>
                            <div className='col'>
                                <label htmlFor="middle_name">Chief Investigator Email</label>
                                <input type="text" className="form-control" id="cid_email" required aria-describedby="cid_email" name="cid_email" onChange={handleChange} value={formDetails.cid_email} placeholder="Chief Investigator Email" />
                            </div>
                            <div className='col'>
                                <label htmlFor="middle_name">Chief Investigator Phone</label>
                                <input type="text" className="form-control" id="cid_phone" required aria-describedby="cid_phone" name="cid_phone" onChange={handleChange} value={formDetails.cid_phone} placeholder="Chief Investigator Phone" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Upload Proposal File</label>
                        <input type="file" accept='.pdf' encType="multipart/form-data" required className="form-control-file" id="exampleFormControlFile1" name='uploadedFile' onChange={handleFileUpload}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </> : <></>}
        </div>
    )
}

export default UserPanel