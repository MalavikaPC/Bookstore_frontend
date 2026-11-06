import axios from 'axios'
// const axios=require('axios')
const axiosInstance=axios.create({
    baseURL:'https://bookstore-backend-tzrg.onrender.com',
    timeout:'10000'
})

//request interceptors:handling token append to headers
axiosInstance.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem("token")
        if(token)
        {
           config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)


//response interceptors:handling global/common errors
axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("response recieved");
        return response
        
    },
    (error)=>{
        if(error.response)
        {
            const status=error.response.status
            if(status==401)
            {
                console.log("Un-Authorized");
                
            }
            else if(status==404)
            {
                console.log("API not found");
                
            }
            else if(status==500)
            {
                console.log("Server Error!");
                
            }
            else if(error.request)
            {
                console.log("client error");
                return error.request
               
                
            }
            else{
                console.log("Error"+error.message);
                
            }
            return Promise.reject(error)
 
        }
    }
)
export default axiosInstance