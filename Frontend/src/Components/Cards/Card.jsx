import React from "react";
import axios from 'axios'

const Card = ({user, getConnection, interested}) => {


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

  const acceptRequest = async () => {
    try{

      const res = await axios.put(`http://localhost:8080/api/request/review/accepted/${user._id}`, {
        withCredentials: true,
      })

      console.log("accepted successfully", user);
      getConnection();

    }catch(error){
      console.error(error);
    }
  }

  const rejectRequest = async () => {
    try{

      const res = await axios.put(`http://localhost:8080/api/request/review/rejected/${user._id}`, {
        withCredentials: true,
      })

      console.log("rejected successfully", user);
      getConnection();

    }catch(error){
      console.error(error);
    }
  }

  const messageRequest = async () => {
    //message
    console.log("message")
  }


    return (
        <div className="p-6 bg-white border-1 border-zinc-200 rounded-xl sm:p-8 w-100">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                alt={`${user.firstName}'s avatar`}
                className="h-24 w-24 rounded-full object-cover"
                src={
                  user.profileUrl ||
                  "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg"
                }
                onError={(e) => {
                  e.currentTarget.src = "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg"; // swap in fallback if the URL 404s
                }}
              />

            {
              interested === "interested" ? 
              <div>
              <button
            onClick={() => {
              acceptRequest()
            }}
            className="bg-[#AE75DA] w-25 mt-4 mb-2 text-white px-6 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Accept
          </button>
         <br></br>

         <button
            onClick={() => {
              rejectRequest()
            }}
            className="bg-[#EA2264] w-25 text-white px-6 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >Reject</button>
          </div>
          :
            <button
            onClick={() => {
              messageRequest()
            }}
            className="bg-[#EA2264] my-3 text-white px-6 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >Message</button>
          }

            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName + " " + user.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{user.gender}</p>
              <div className="flex items-center text-gray-600 mt-2 text-sm">
                <LocationIcon />
                {user.location}
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
    )
}

export default Card;