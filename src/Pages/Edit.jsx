import React, { useState, useEffect } from 'react'
import Layout from '../Common/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { editData, editgetData } from '../Service/Api';


const initialstate = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    class: ''
}

const Edit = () => {

    const { id } = useParams()

    const [student, setStudent] = useState(initialstate);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const validation = () => {
        let error = {}

        //For name 
        if (!student.name) {
            error.name = "Name is required"
        } else if (student.name.length < 3) {
            error.name = "Name must be atleast 3 characters"
        }

        // For email 
        if (!student.email) {
            error.email = "Email is Required"
        } else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(student.email)) {
            error.email = "Email should be abc@gmail.com format"
        }

        // For phone 
        if (!student.phone) {
            error.phone = "Phone is Required"
        } else if (student.phone.length !== 10) {
            error.phone = "Phone must be 10 characters"
        }

        // For address 
        if (!student.address) {
            error.address = "Address is Required"
        }

        // For city
        if (!student.city) {
            error.city = "City is Required"
        }

        // For class 
        if (!student.class) {
            error.class = "Class is Required"
        }
        return error
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setStudent({ ...student, [name]: value })

        // For name 
        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "Name is Required" })
                setStudent({ ...student, name: "" })
            } else {
                setError({ ...error, name: "" })
                setStudent({ ...student, name: value })
            }
        }

        // For email 
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is Required" })
                setStudent({ ...student, email: "" })
            } else {
                setError({ ...error, email: "" })
                setStudent({ ...student, email: value })
            }
        }

        // For phone 
        if (name === "phone") {
            if (value.length === 0) {
                setError({ ...error, phone: "Phone is Required" })
                setStudent({ ...student, phone: "" })
            } else {
                setError({ ...error, phone: "" })
                setStudent({ ...student, phone: value })
            }
        }

        // For address 
        if (name === "address") {
            if (value.length === 0) {
                setError({ ...error, address: "Address is Required" })
                setStudent({ ...student, address: "" })
            } else {
                setError({ ...error, address: "" })
                setStudent({ ...student, address: value })
            }
        }

        // For city 
        if (name === "city") {
            if (value.length === 0) {
                setError({ ...error, city: "city is Required" })
                setStudent({ ...student, city: "" })
            } else {
                setError({ ...error, city: "" })
                setStudent({ ...student, city: value })
            }
        }

        // For class 
        if (name === "class") {
            if (value.length === 0) {
                setError({ ...error, class: "Class is Required" })
                setStudent({ ...student, class: "" })
            } else {
                setError({ ...error, class: "" })
                setStudent({ ...student, class: value })
            }
        }

    }

    const getData = async () => {
        let response = await editgetData(id) // Call getUser edit function
        setStudent(response?.data)
        console.log(response);

    }
    useEffect(() => {
        getData()
    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        let ErrorList = validation()
        setError(validation())

        // Validation for Submit
        if (Object.keys(ErrorList).length === 0) {
            let reg = {
                name: student.name,
                email: student.email,
                phone: student.phone,
                address: student.address,
                city: student.city,
                class: student.class

            }
            console.log(reg)

        }

    }

    // This function is make to click on edit button
    const handleOnClick = async () => {
        let ErrorList = validation()
        setError(validation())
        // This is make for use validation
        if (Object.keys(ErrorList).length === 0) {
            await editData(student, id) // call editUser function 
                .then((response) => {
                    console.log(response);
                    toast.success(response.data.message);
                    setLoading(false)

                    setTimeout(() => {
                        setLoading(false);
                        navigate('/allstudent')
                    }, 2000);

                })
                .catch((error) => {
                    console.log(error);
                    toast.error("User is not edit");
                    setLoading(false);
                })
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

    }


    return (
        <>
            <ToastContainer style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)', alignItems: 'center', textAlign: 'center' }} />

            <Layout>
                {/* <!-- Contact Start --> */}
                <div class="container-xxl py-5">
                    <div class="container">
                        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 class="section-title bg-white text-center text-primary px-3">Register</h6>
                            <h1 class="mb-5">Student Registration</h1>
                        </div>
                        <div class="row g-4">
                            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <h5>Get In Touch</h5>
                                <p class="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                                        <i class="fa fa-map-marker-alt text-white"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="text-primary">Office</h5>
                                        <p class="mb-0">123 Street, New York, USA</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                                        <i class="fa fa-phone-alt text-white"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="text-primary">Mobile</h5>
                                        <p class="mb-0">+012 345 67890</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                                        <i class="fa fa-envelope-open text-white"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="text-primary">Email</h5>
                                        <p class="mb-0">info@example.com</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58906.14545488164!2d88.28142013124996!3d22.667427400000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89ce68e7cfa39%3A0xecc5dd803484eae5!2sUttarpara%20Co-operative%20Bank!5e0!3m2!1sen!2sin!4v1712406400333!5m2!1sen!2sin" frameborder="0" style={{ minHeight: '400px', border: '0' }} allowfullscreen="" aria-hidden="false"
                                    tabindex="0"></iframe>
                            </div>
                            <div class="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                <form method='post' onSubmit={handleOnSubmit}>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="name" name='name' placeholder="Your Name" value={student.name} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.name}</span>
                                                <label for="name">Enter your name</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="email" class="form-control" id="email" name='email' placeholder="Your Email" value={student.email} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.email}</span>
                                                <label for="email">Enter your email</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="phone" name='phone' placeholder="phone" value={student.phone} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.phone}</span>
                                                <label for="subject">Enter your phone number</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="address" name='address' placeholder="address" value={student.address} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.address}</span>
                                                <label for="subject">Enter your address</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="city" name='city' placeholder="city" value={student.city} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.city}</span>
                                                <label for="subject">Enter your city</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="class" name='class' placeholder="class" value={student.class} onChange={handleOnChange} />
                                                <span style={{ display: 'block', color: 'red' }}>{error.class}</span>
                                                <label for="subject">Enter your class</label>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-primary w-100 py-3" type="submit" onClick={handleOnClick}>
                                                {loading ? <div class="spinner-border" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div> : 'Edit'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Contact End --> */}
            </Layout>
        </>
    )
}

export default Edit
