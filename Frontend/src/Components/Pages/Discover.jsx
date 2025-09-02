import React, { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../../Utils/feedSlice";


const Discover = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.userFeed);

  const getFeed = async () => {
    try{
      if(!userFeed){
        return null;
      }

      const res = await axios.get(
        "http://localhost:8080/api/request/user/feed?page=2&limit=2",
        {
          withCredentials: true,
        }
      )
      console.log(res.data);
      dispatch(addfeed(res.data));


    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{

    getFeed();
  }, [])

  return (
    <div className="">
    <Sidebar currentPath='/discover'>
    <h1>lies</h1>
    </Sidebar>
    
    </div>
  );
};

export default Discover;
