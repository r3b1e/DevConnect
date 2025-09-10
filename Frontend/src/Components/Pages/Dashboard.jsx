import React, { useState, useEffect } from 'react'
import { Sidebar } from '../Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const [dashboardData, setDashboardData] = useState({
    connections: 127,
    skills: 30,
    interestedRequests: 5,
    profileCompletion: 75
  })

  // Calculate profile completion remainder
  
  const dashboardDetails = useSelector((store) => store.user);
  const profileRemainder = 100 - dashboardDetails?.completion;
  const navigate = useNavigate();

  // Icon components
  const IconComponent = ({ icon, className = "h-6 w-6" }) => {
    const icons = {
      users: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      award: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      heart: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      user: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      trendingUp: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
    
    return icons[icon] || null
  }

  // Circular progress component
  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard cards data
  const dashboardCards = [
    {
      title: "Connections",
      value: dashboardDetails?.connection,
      icon: "users",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "New"
    },
    {
      title: "Skills",
      value: dashboardDetails?.skill?.length,
      icon: "award",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "New"
    },
    {
      title: "Interested Requests",
      value: dashboardDetails?.interested,
      icon: "heart",
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "New"
    }
  ]

  return (
    <Sidebar currentPath='/dashboard'>
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your profile.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <IconComponent icon={card.icon} className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="text-sm text-gray-500">{card.title}</div>
                <div className={`text-xs ${card.textColor} font-medium mt-1`}>
                  {card.trend}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Profile Completion Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Completion</h3>
              <CircularProgress percentage={dashboardDetails?.completion} />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {profileRemainder}% remaining to complete
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Complete Profile →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => {
            navigate('/discover');
          }} className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <IconComponent icon="users" className="h-5 w-5 mr-2" />
            Find Connections
          </button>
          <button onClick={() => {
            navigate('/connections');
          }} className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <IconComponent icon="award" className="h-5 w-5 mr-2" />
            Your Connections
          </button>
          <button onClick={() => {
            navigate('/requests');
          }} className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <IconComponent icon="heart" className="h-5 w-5 mr-2" />
            View Requests
          </button>
          <button onClick={() => {
            navigate('/profile/edit');
          }} className="flex items-center justify-center p-4 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <IconComponent icon="user" className="h-5 w-5 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </Sidebar>
  )
  
}

export default Dashboard
