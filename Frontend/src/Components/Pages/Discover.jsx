import React, { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addfeed, removeFeed } from "../../Utils/feedSlice";
import ProfileCard from "../Cards/ProfileCard ";
import { useState } from "react";

const Discover = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.userFeed);
  const userData = useSelector((store) => store.user);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [pointer, setPointer] = useState(0);

  const getFeed = async (status) => {
    try {
      console.log(status);
      console.log("user DATA: -----", userData);

        if(status){
  
        const ignored = await axios.post(
          `http://localhost:8080/api/request/send/${status}/${data[pointer]?._id}`,
          {},
          { withCredentials: true }
        );
         console.log("response", data[pointer].firstName, "Successfully", ignored);
        }

      console.log(pointer, ":pointer");
      setPointer(pointer + 1);
      if (data.length - 1 !== pointer && feed.items.length !== 0) {
        return null;
      }

      const res = await axios.get(
        `http://localhost:8080/api/request/user/feed?page=${page}&limit=5`,
        {
          withCredentials: true,
        }
      );
      setPage(page + 1);
      console.log(data);
      dispatch(addfeed(res.data));
      setData((prev) => {
        return [...prev, ...res.data];
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data);

  useEffect(() => {
    console.log("working");
    if (!feed.items || feed.items.length === 0) {
      console.log("not");
      getFeed();
    }

    return () => {
      console.log("changeing");
      dispatch(removeFeed());
    };
  }, []);

  return (
    <div className="">
      <Sidebar currentPath="/discover">
        {data[pointer] && (
          <ProfileCard getFeed={getFeed} content={data[pointer]} />
        )}
      </Sidebar>
    </div>
  );
};

export default Discover;
