import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import Naviagtion from '../Components/Naviagtion';

const Viewpastuploads = () => {
    useEffect(() => {
        fetchData()
    }, [])


    const [reproposalsId, setReproposalsId] = useState()
    const [reproposalData, setReproposalData] = useState(null)
    const [modalShow, setModalShow] = React.useState(false);
    const [modal, setModal] = useState(false)
    const [data, setData] = useState([])
    const [files, setFiles] = useState({ file: null });
    const [proposalId, setProposalId] = useState()
    const handleFileUpload = (e) => {
        setFiles(e.target.files[0]);
    };
    const navigate = useNavigate();
    var count = 1;


    useEffect(() => {
        if (reproposalsId) {
            handleReproposals();
        }
    }, [reproposalsId])




    const handleReproposals = async () => {
        try {
            console.log("I am repro")
            let response = await fetch('http://localhost:5004/api/admin/adminReproposalCount', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ parentProposal: reproposalsId })
            })

            response = await response.json();
            setReproposalData(response);
            console.log(response)
            // console.log(response.first._id)

        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload = async (id) => {
        try {
            console.log(JSON.stringify(id));
            let response = await fetch('http://localhost:5004/api/admin/adminDownload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the correct Content-Type header
                },
                body: JSON.stringify({ id: id }), // Use id directly as an object property
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };


    const modalFunc = () => {
        setModal(true);
        console.log("I am c")
        var doc = document.getElementById('modalButton');
        doc.click();
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('parentProposal', proposalId)
            formData.append('uploadedFile', files); // Append the file to the FormData
            console.log(formData.get('uploadedFile'))
            const response = await fetch("http://localhost:5004/api/user/userResubmit", {
                method: 'POST',
                headers: {
                    "auth-Token": localStorage.getItem('auth-Token')
                },
                body: formData
            })

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                // setAlert({ color: "danger", message: "Form Not Submitted" })
                console.log("Form not submitted")
            }
            else {
                // setAlert({ color: "success", message: "Form Submitted Successfully" })
                alert("Form Submitted Successfully")
                console.log("Form Submitted Successfully");
                navigate('/');
                window.location.reload();


            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        let res = await fetch('http://localhost:5004/api/user/userGetProposals', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "auth-Token": localStorage.getItem("auth-Token")
            }
        });

        res = await res.json();
        setData(res);
        console.log(res);
    }
    
    useEffect(() => {
        AOS.init({ duration: 1000, });
    }, [])
    return (
        <div>
            <Naviagtion/>
            <div>
                {modal ? <>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Proposal Resubmission</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='mb-2'>
                                        Select the file you want to upload
                                    </div>
                                    <input type="file" accept='.pdf' encType="multipart/form-data" required className="form-control-file" id="exampleFormControlFile1" name='uploadedFile' onChange={handleFileUpload} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => { handleSubmit(); }}>Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <></>}

                <h3 className='text-center my-4' data-aos="fade-up">Past Uploads</h3>
                {reproposalData && (

                    <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Past Revisions</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Submitted On</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope='row'>{reproposalData.first.proposal_file_time}</th>
                                        <td> <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleDownload(reproposalData.first._id, "proposal") }}>View</button></td>
                                    </tr>
                                    {reproposalData.second.map((e) => {
                                        return <tr key={e._id}>
                                            <th scope="row">{e.proposal_file_time}</th>
                                            <td> <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleDownload(e._id, "reproposal") }}>View</button></td>
                                        </tr>

                                    })}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center'>
                            <Button variant="primary" style={{ width: '10vw' }} onClick={() => setModalShow(false)}>
                                Ok
                            </Button>
                            {/* <Button variant="success" onClick={() => console.log('Yes clicked')}>
            Yes
        </Button> */}
                        </Modal.Footer>
                    </Modal>
                )}

                <div className='mx-4 my-3'>
                    {/* {console.log("I am admin")} */}
                    <div className='row'>
                        <div className='col-2'>

                            <Link to='/MyProfile'><button type="button" className="btn sideButtons btn-warning my-2">My Profile</button></Link>
                            {/* <button type="button" className="btn sideButtons btn-warning my-2">Category 1 <span>({cat1})</span></button> */}
                            <button type="button" className="btn sideButtons btn-danger my-2" onClick={() => { localStorage.clear(); navigate('/Login') }}>LogOut</button>

                        </div>
                        <div className='col-10 pr-3'>

                            <table className="table table-striped" data-aos="fade-left">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Sno.</th>
                                        <th scope="col">Proposal Id</th>
                                        <th scope="col">Submitted On</th>
                                        <th scope="col">Proposal Type</th>
                                        <th scope="col">Project Title</th>
                                        <th scope="col">Chief Investigator Details</th>
                                        <th scope="col text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((e) => {
                                        return <tr key={count}>
                                            <td scope='col' style={{ 'width': '5%' }}>{count++}.</td>
                                            <td scope='col' style={{ 'width': '10%' }}>{e.proposalId}</td>
                                            <td scope='col' style={{ 'width': '10%' }}>{e.proposal_file_time}</td>
                                            <td scope='col' style={{ 'width': '10%' }}>{e.category}</td>
                                            <td scope='col' style={{ 'width': '10%' }}>{e.project_title}</td>
                                            <td scope='col ' style={{ "width": "30%" }}><b>Name:</b> {e.cid_name}<br /><b>Designation:</b> {e.cid_designation}<br /><b>Department:</b> {e.cid_department}<br /><b>Email:</b> {e.cid_email}<br /><b>Phone:</b> {e.cid_phone}</td>
                                            <td scope='col' style={{ 'width': '15%' }}>
                                                {(!e.proposal_submit) ? <>
                                                    <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleDownload(e._id, "proposal") }}>View</button>
                                                </> : <>
                                                    <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { setModalShow(true); setReproposalsId(e._id); }}>View Past Revisions</button>
                                                </>}                      {(e.proposal_access === true) ? <>
                                                    <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { modalFunc(); setProposalId(e._id) }} >Resubmit</button>

                                                </> : <>
                                                    <span data-toggle="tooltip" data-placement="top" title="Wait For Admin to approve your proposal">
                                                        <button type="button" disabled className="btn adminButtons btn-warning my-1 cursor-disabled">
                                                            Resubmit
                                                        </button>
                                                    </span>

                                                </>}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" id='modalButton' className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>
        </div>
    )
}

export default Viewpastuploads