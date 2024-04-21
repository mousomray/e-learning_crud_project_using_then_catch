import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout'
import { getData } from '../Service/Api'
import { deleteData } from '../Service/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Common/Loader'

const Allstudent = () => {

    const [all, setAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadmore, setLoadmore] = useState(4)

    const fetchData = async () => {
        const response = await getData()
        setAll(response.data.data)
        setLoading(false)
    }
    useEffect(() => {
        setTimeout(() => {
            fetchData()
        }, 2000);
    }, [])

    const handleLoadmore = () => {
        setLoadmore(prev => prev + 4)
    }

    if (loading) {
        return (
            <h1 style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
            }}>
                <Loader />
            </h1>
        )
    }

    // Handle delete 
    const handleOnDelete = async (id) => {
        await deleteData(id)
            .then((response) => {
                console.log(response);
                fetchData()
                toast.warn(response.data.msg)
            })
            .catch((error) => {
                console.log(error);
                toast.error(response.data.msg)
            })
    }

    return (
        <>
            <ToastContainer style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)', alignItems: 'center', textAlign: 'center' }} />

            <Layout>
                {/* <!-- Service Start --> */}
                <div class="text-center wow fadeInUp mt-5" data-wow-delay="0.1s">
                    <h6 class="section-title bg-white text-center text-primary px-3">All student</h6>
                    <h1 class="mb-5">Who did Registration</h1>
                </div>

                <div class="container-xxl py-5">
                    <div class="container">
                        <div class="row g-4">
                            {all?.slice(0, all.length).reverse().slice(0, loadmore).map((item) => {
                                return (
                                    <>
                                        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s" key={item._id}>
                                            <div class="service-item text-center pt-3">
                                                <div class="p-4">
                                                    <h5 class="mb-3">{item.name}</h5>
                                                    <p><b>Email : </b>{item.email}</p>
                                                    <p><b>Phone :</b>{item.phone}</p>
                                                    <p><b>Address : </b>{item.address}</p>
                                                    <p>City : {item.city}</p>
                                                    <p>Class : {item.class}</p>
                                                    <Link to={`/edit/${item._id}`}><button type="button" class="btn btn-success">Edit</button></Link>
                                                    <br /><br />
                                                    <button type="button" class="btn btn-danger" onClick={() => handleOnDelete(item._id)}>Delete</button>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                            {loadmore < all.length ? (
                                <div className="text-center mt-3">
                                    <button className="btn btn-primary" onClick={handleLoadmore} style={{ height: '50px' }}>Load More</button>
                                </div>
                            ) : null}

                        </div>
                    </div>
                </div>
                {/* <!-- Service End --> */}
            </Layout>
        </>
    )
}

export default Allstudent
