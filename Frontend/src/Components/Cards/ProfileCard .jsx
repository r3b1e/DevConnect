import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({ getFeed, content }) => {
  const profile = {
    name: "Ethan Carter",
    role: "Software Engineer",
    location: "San Francisco, CA",
    bio: "A passionate software engineer with a knack for building elegant and efficient solutions. Loves to tackle challenging problems and contribute to open-source projects.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp4JCZwA7xI0UDilWCMPQvCtFbSGRGDEmpY8DiELSmZMlzskD3avJ2lvlbwj4DPzz_XgWAMLpzIrHW4RCSchMJbCQLHrDg9SBFoIhO8LdPsZS0oDZQfDZLmTl97_aCL8IraMYyQtZW7RHLHFIK0S286yc-0yvdvHcw5zNSq8CjZxlkNSeiVIMAVNisV7J15RDI4nZXZptPxTwnMiY-cOi01Mo26j-TIWP5kotBSSDXH8W8aaCZC3NpnRvuopH7Nm1XCO-ooAUWkEc",
    skills: {
      Frontend: ["React", "JavaScript", "Tailwind CSS"],
      Backend: ["Node.js", "Python", "Express.js"],
      Devops: ["AWS", "Docker"],
      Database: ["PostgreSQL"],
      Languages: [],
    },
  };

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, ${(
      Math.random() * 255
    ).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.4)`;
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

  return (
    <div className="h-full bg-blue-50/30 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                alt={`${content.firstName}'s avatar`}
                className="h-24 w-24 rounded-full object-cover"
                src={
                  content.profileUrl ||
                  "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg"
                }
                onError={(e) => {
                  e.currentTarget.src = "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg"; // swap in fallback if the URL 404s
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {content.firstName + " " + content.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{content.gender}</p>
              <div className="flex items-center text-gray-600 mt-2 text-sm">
                <LocationIcon />
                {content.location}
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {content.bio || profile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="px-6 sm:px-8 py-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="space-y-4">
            {/* Frontend Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills.Frontend.length != 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.Frontend.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.skills.Backend.length != 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.Backend.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cloud & Database Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills.Devops.length != 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Cloud & DevOps
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.Devops.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.skills.Database.length != 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Database
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.Database.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}

            {profile.skills.Languages.length != 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.Languages.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 sm:px-10 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            onClick={() => {
              getFeed("Ignore");
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              getFeed("Accept");
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
