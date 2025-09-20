import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import Card from "../Cards/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addInterested } from "../../Utils/connectionSlice";
import { baseUrl } from "../../Utils/base";

const Requests = () => {
  const select = useSelector((store) => store.userConnection.interestedItems);
  console.log(select, "data of selector");

  const dispatch = useDispatch();
  // Profile data - in real app this could come from props or API
  const [connectedUser, setConnectedUser] = useState([]);
  console.log("-------------------------", connectedUser);
  const getConnection = async () => { 
    if (select.length !== 0) {
      setConnectedUser(select);
      return null;
    }
    try {
      const res = await axios.get(
        `${baseUrl}/api/request/user/interested`,
        {
          withCredentials: true,
        }
      );
      console.log("-----", res.data);
      setConnectedUser(res.data);
      dispatch(addInterested(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const LocationIcon = () => (
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  useEffect(() => {
    getConnection();
  }, []);

  return (
    <Sidebar currentPath="/requests">
      {(!select || select.length === 0)
       ? (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center">
          {/* Icon / Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m9 1V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"
            />
          </svg>

          {/* Headline */}
          <h1 className="text-2xl font-bold text-gray-800">No Request Found</h1>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-x-4 gap-y-8 overflow-x-hidden overflow-y-auto">
          {select &&
            select.map((item) => {
              return (
                <Card
                  key={item._id}
                  user={item.fromUserId}
                  getConnection={getConnection}
                  interested='interested'
                />
              );
            })}
        </div>
      )}
    </Sidebar>
  );
};

export default Requests;
