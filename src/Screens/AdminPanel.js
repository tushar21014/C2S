import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';


import '../Css/AdminPanel.css'
const AdminPanel = () => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [reproposalsId, setReproposalsId] = useState()
  const [reproposalData, setReproposalData] = useState(null)
  const [modalShow, setModalShow] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([])
  const [tempId, setTempId] = useState()
  const [cat1, setCat1] = useState(0)
  const [cat2, setCat2] = useState(0)
  const [cat3, setCat3] = useState(0)
  const [totalCat, setTotalCat] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
    counting();

  }, [])

  useEffect(() => {
    if (reproposalsId) {
      handleReproposals();
    }
  }, [reproposalsId])


  var count = 1;
  
  const handleFilterCategory = (category) => {
    setCategoryFilter(category);
  };

  const modalFunc = () => {
    setModal(true);
    // console.log("I am c")
    var doc = document.getElementById('modalButton');
    doc.click();
  }


  const handleDownload = async (id, type) => {
    try {
      console.log(JSON.stringify(id));
      let response = await fetch('http://localhost:5004/api/admin/adminDownload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the correct Content-Type header
        },
        body: JSON.stringify({ id: id, type: type }), // Use id directly as an object property
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProposal = async (id) => {
    try {
      console.log(JSON.stringify(id));
      let response = await fetch('http://localhost:5004/api/admin/adminProposalResubmission', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Set the correct Content-Type header
        },
        body: JSON.stringify({ id: id }), // Use id directly as an object property
      });

      if (response.status === 200) {
        alert("Success")
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const counting = async () => {
    try {
      let response = await fetch('http://localhost:5004/api/admin/adminCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(["Category 1", "Category 2", "Category 3"]),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data[0]);
        setCat1(data[0]["Category 1"]);
        setCat2(data[1]["Category 2"]);
        setCat3(data[2]["Category 3"]);
        setTotalCat(data[3]["Total"]);
        // console.log(cat1);

      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const fetchData = async () => {
    try {
      let response = await fetch('http://localhost:5004/api/admin/admingetForms', {
        method: 'POST',
        headers: {
          'Content-type': "application/json"
        }
      })

      response = await response.json();
      setData(response);
      console.log(response)

    } catch (error) {
      console.log(error);
    }
  }


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
      // setData(response);
      setReproposalData(response);
      console.log(response)
      console.log(response.first._id)

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    AOS.init({ duration: 1000, });
  }, [])

  return (
    <div >

      {modal && (
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
                Are you sure to resubmit this proposal?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-success" onClick={() => { handleProposal(tempId); setModal(false) }}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <h3 className='text-center my-4' data-aos="fade-up">Admin Dashboard</h3>
      <div className='mx-4 my-3'>
        {/* {console.log("I am admin")} */}
        <div className='row'>
          <div className='col-2'>
            <button type="button" data-aos="fade-right" data-aos-delay="50" className="btn sideButtons btn-warning my-2" onClick={() => { handleFilterCategory('') }}>Total <span>({totalCat})</span></button>
            <button type="button" data-aos="fade-right" data-aos-delay="100" className="btn sideButtons btn-warning my-2" onClick={() => { handleFilterCategory('Category 1') }}>Category 1 <span>({cat1})</span></button>
            <button type="button" data-aos="fade-right" data-aos-delay="150" className="btn sideButtons btn-warning my-2" onClick={() => { handleFilterCategory('Category 2') }}>Category 2 <span>({cat2})</span></button>
            <button type="button" data-aos="fade-right" data-aos-delay="200" className="btn sideButtons btn-warning my-2" onClick={() => { handleFilterCategory('Category 3') }}>Category 3 <span>({cat3})</span></button>
            <button type="button" data-aos="fade-right" data-aos-delay="250" className="btn sideButtons btn-danger my-2" onClick={() => { localStorage.clear(); navigate('/Login') }}>LogOut</button>

          </div>
          <div className='col-10 pr-3'>

            <table data-aos="fade-left" className="table table-striped">
              <thead className="thead-dark">
                <tr >
                  <th scope="col">Sno.</th>
                  <th scope="col">Proposal Id</th>
                  <th scope="col">Submitted On</th>
                  <th scope="col">Proposal Type</th>
                  <th scope="col">Submitted By</th>
                  <th scope="col">Project Title</th>
                  <th scope="col">Chief Investigator Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, index) => {
                  if (!categoryFilter || e.category.includes(categoryFilter)) {
                    return (<tr key={count} data-aos="fade-left">
                      <td scope='col'>{count++}.</td>
                      <td scope='col'>{e.proposalId}</td>
                      <td scope='col'>{e.proposal_file_time}</td>
                      <td scope='col'>{e.category}</td>
                      <td scope='col'>{e.organization_name}</td>
                      <td scope='col'>{e.project_title}</td>
                      <td scope='col' style={{ width: '20vw' }}><b>Name:</b> {e.cid_name}<br /><b>Designation:</b> {e.cid_designation}<br /><b>Department:</b> {e.cid_department}<br /><b>Email:</b> {e.cid_email}<br /><b>Phone:</b> {e.cid_phone}</td>
                      <td scope='col' style={{ width: '10vw' }}>
                        {(!e.proposal_submit) ? <>
                          <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleDownload(e._id, "proposal") }}>View</button>
                        </> : <>
                          <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { setModalShow(true); setReproposalsId(e._id); }}>View Past Revisions</button>
                        </>}
                        {/* <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleDownload(e._id) }}>Download</button> */}
                        {(e.proposal_access === false) ? <>
                          {/* <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { handleProposal(e._id) }}>Proposal Resubmission</button> */}
                          <button type="button" className="btn adminButtons btn-warning my-1" onClick={() => { modalFunc(); setTempId(e._id) }}>Proposal Resubmission</button>
                        </> : <>
                          <button type="button" className="btn adminButtons btn-warning my-1" disabled>Proposal Resubmission</button>
                        </>}
                      </td>
                    </tr>)
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button type="button" id='modalButton' className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>
    </div>
  )
}

export default AdminPanel