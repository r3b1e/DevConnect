import axios from "axios"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addUser } from "../Utils/userSlice"

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "home",
  },
  {
    title: "Discover",
    url: "/discover",
    icon: "search",
  },
  {
    title: "Connections",
    url: "/connections",
    icon: "users",
  },
  {
    title: "Requests",
    url: "/requests",
    icon: "award",
  },
  {
    title: "Profile",
    url: "/profile/edit",
    icon: "user",
  },
]

// Mock user data - in a real app this would come from auth context
const mockUser = {
  name: "Sarah Chen",
  email: "sarah.chen@example.com",
  avatar: "/professional-developer-avatar.png",
  role: "Full Stack Developer",
  notifications: 3,
}

// Icon components
const IconComponent = ({ icon, className = "h-4 w-4" }) => {
  const icons = {
    home: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
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
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.93 3.93-3.93 3.93-3.93-3.93 3.93-3.93zM13.07 8.82l3.93 3.93-3.93 3.93-3.93-3.93 3.93-3.93z" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    logout: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    code: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    chevronUp: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ),
  }
  
  return icons[icon] || null
}

export function Sidebar({children, currentPath = "/" }) {
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();


  const fetchUser = async ()=> {
    try{
      const res = await axios.get("http://localhost:8080/api/auth/profile/view", {
        withCredentials: true
      })
      dispatch(addUser(res.data));
    }
    catch(error){
      if(error.status === 401){
        navigate('/login');
      }
      console.error(error);
    }
  }

  useEffect(() => {
    setMounted(true)
    if(!userData){
      fetchUser();
    }
  }, [])

  // Don't render sidebar on landing page
  if (!mounted || currentPath === "/") {
    return null
  }

  const isActive = (url) => {
    return currentPath === url || (url === "/profile/edit" && currentPath.startsWith("/profile"))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <IconComponent icon="code" className="h-8 w-8 text-blue-600" />
            {sidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900">Dev Connect</h1>
                <p className="text-xs text-gray-500">Connect. Learn. Grow.</p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Navigation */}
          <div>
            {sidebarOpen && (
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
            )}
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.url)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent icon={item.icon} />
                  {sidebarOpen && (
                    <>
                      <span>{item.title}</span>
                      {item.title === "Connections" && mockUser.notifications > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {mockUser.notifications}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div>
            {sidebarOpen && (
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account
              </h3>
            )}
            <nav className="space-y-1">
              <a
                href="/notifications"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <IconComponent icon="bell" />
                {sidebarOpen && (
                  <>
                    <span>Notifications</span>
                    {mockUser.notifications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {mockUser.notifications}
                      </span>
                    )}
                  </>
                )}
              </a>
              <a
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <IconComponent icon="settings" />
                {sidebarOpen && <span>Settings</span>}
              </a>
            </nav>
          </div>
        </div>

        {/* Footer - User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                userDropdownOpen ? 'bg-gray-100' : ''
              }`}
            >
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm text-gray-900 truncate">
                      {mockUser.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {mockUser.role}
                    </div>
                  </div>
                  <IconComponent icon="chevronUp" className="h-4 w-4 text-gray-500" />
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <a
                  href="/profile/edit"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IconComponent icon="user" />
                  Edit Profile
                </a>
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IconComponent icon="settings" />
                  Settings
                </a>
                <hr className="my-2 border-gray-200" />
                <a
                  href="/login"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <IconComponent icon="logout" />
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IconComponent icon="code" />
            <span>Dev Connect</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          {/* Page content will be rendered here */}
          {children}
        </div>
      </div>
    </div>
  )
}
