import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = "http://localhost:8000/api";


const TOKEN = localStorage.getItem("access_token");

const headers = {
    Authorization: `Bearer ${TOKEN}` 
};

export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers,
  });






export const getAllProperties = async()=>{
    try {
        const response = await publicRequest.get("/residency/allresd", {
            timeout: 10 * 1000,
          });
          if (response.status === 400 || response.status === 500) {
            throw response.data;
          }
          return response.data;
        
    } catch (error) {
        toast.error('Something went wrong')
        throw error
    }
}

export const getProperty = async(id)=>{
    try {

        const response = await publicRequest.get(`/residency/${id}`, {
            timeout: 10 * 1000,
          });

        if (response.status === 400 || response.status === 500) {
            throw response.data;
          }
          return response.data;
        
    } catch (error) {
        toast.error('Something went wrong')
        throw error
    }
}

export const createUser = async(email)=>{
    try {

        await userRequest.post(
            `/user/register`,
            { email },
           
          
        );
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const bookVisit = async(date,propertyId,email)=>{
    try {

        await userRequest.post(
            `/user/bookVisit/${propertyId}`,
            { email, date },
           
          
        );
    } catch (error) {
        toast.error(error)
        throw error
    }
}



export const removeBooking = async(id,email)=>{
    try {

        await userRequest.post(
            `/user/removeBooking/${id}`,
            { id, email },
           
          
        );
    } catch (error) {
        toast.error(error)
        throw error
    }
}


export const addToFav = async(id,email)=>{
    try {

        await userRequest.post(
            `/user/fav/${id}`,
            { id, email },
           
          
        );
    } catch (error) {
        toast.error(error)
        throw error
    }
}

export const allFav = async(email)=>{

    try {
        const res = await userRequest.post("/user/allFav",{email})

        return res.data.favResidencies;
        
    } catch (error) {
        toast.error('Something went wrong')
        throw error
    }
}

export const getAllBookings = async(email)=>{

    try {
        const res = await publicRequest.post("/user/allBookings",{email})

        return res.data.bookedVisits;
        
    } catch (error) {
        toast.error('Something went wrong')
        throw error
    }
}

export const createResidency = async(data)=>{
    try{
        const res = await userRequest.post(
          `/residency/create`,
          {
            data
          }
        )
      }catch(error)
      {
        toast.error(error)
        throw error
      }
}