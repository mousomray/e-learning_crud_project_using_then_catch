import  Axios  from "axios";



// Post Data 
const postapi = "https://restapinodejs.onrender.com/api/student"

export const postData = async(data) =>{
    try{
        return await Axios.post(postapi,data) 
    }
    catch(error){
        console.log("Data is Not fetching");
    }
}

// Get Data 
const getapi = "https://restapinodejs.onrender.com/api/allstudent"

export const getData = async() =>{
    try{
        return await Axios.get(getapi)
    }
    catch(error){
        console.log("Data is not fetch")
    }
}

// Delete Data 
const deleteapi = "https://restapinodejs.onrender.com/api/delete"

export const deleteData = async(id) =>{
    try{
        return await Axios.delete(`${deleteapi}/${id}`)
    }
    catch(error){
        console.log("Data is not fetch");
    }
}

// Edit Data 
const editgetapi = "https://restapinodejs.onrender.com/api/edit"
const editapi = "https://restapinodejs.onrender.com/api/update"

export const editgetData = async(id) =>{
    try{
        return await Axios.get(`${editgetapi}/${id}`)
    }
    catch{
        console.log("Data is not fetching");
    }
}
export const editData = async(data,id) =>{
    try{
        return await Axios.post(`${editapi}/${id}`,data)
    }
    catch{
        console.log("Data is not fetching");
    }
}




