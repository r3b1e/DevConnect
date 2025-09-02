import React, { useState } from "react"
import { Sidebar } from "../Sidebar"

// Mock data - in real app this would come from database
const initialProfile = {
  id: "1",
  name: "Sarah Chen",
  firstName: "Sunny",
  lastName: "Gupta",
  email: "sarah.chen@example.com",
  bio: "Full-stack developer passionate about React, Node.js, and cloud architecture. Love mentoring junior developers and building scalable applications.",
  location: "San Francisco, CA",
  githubUrl: "https://github.com/sarahchen",
  websiteUrl: "https://sarahchen.dev",
  joinedDate: "2024-01-15",
  avatar: "/professional-developer-avatar.png",
  skills: [
    { name: "React", level: "Expert", category: "Frontend" },
    { name: "TypeScript", level: "Expert", category: "Language" },
    { name: "Node.js", level: "Advanced", category: "Backend" },
    { name: "AWS", level: "Advanced", category: "Cloud" },
    { name: "PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "Docker", level: "Intermediate", category: "DevOps" },
    { name: "Python", level: "Beginner", category: "Language" },
  ],
  
  connections: 127,
}

// Icon components
const IconComponent = ({ icon, className = "h-4 w-4" }) => {
  const icons = {
    edit: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    mapPin: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    globe: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    messageCircle: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  }
  
  return icons[icon] || null
}

export default function Connection({ profileId = "1", isOwnProfile = true }) {
  const [profile, setProfile] = useState(initialProfile)
  const [editingSection, setEditingSection] = useState(null)
  const [editForm, setEditForm] = useState({})

  const getSkillLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "text-cyan-500 bg-cyan-50"
      case "Advanced":
        return "text-indigo-500 bg-indigo-50"
      case "Intermediate":
        return "text-violet-500 bg-violet-50"
      default:
        return "bg-green-50 text-blue-500"
    }
  }

  const startEditing = (section, data = {}) => {
    setEditingSection(section)
    setEditForm(data)
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setEditForm({})
  }

  const saveBasicInfo = () => {
    setProfile(prev => ({
      ...prev,
      name: editForm.name || prev.name,
      bio: editForm.bio || prev.bio,
      location: editForm.location || prev.location,
      githubUrl: editForm.githubUrl || prev.githubUrl,
      websiteUrl: editForm.websiteUrl || prev.websiteUrl,
    }))
    cancelEditing()
  }

  const addSkill = () => {
    if (editForm.name && editForm.level && editForm.category) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, { ...editForm, id: Date.now() }]
      }))
      cancelEditing()
    }
  }

  const removeSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  
  return (
    <Sidebar currentPath="/profile/edit">
    <div className=" bg-gray-50">
      {/* Header */}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1"></div>
                  {isOwnProfile && (
                    <button
                      onClick={() => startEditing('basicInfo', {
                        name: profile.name,
                        bio: profile.bio,
                        location: profile.location,
                        githubUrl: profile.githubUrl,
                        websiteUrl: profile.websiteUrl
                      })}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <IconComponent icon="edit" />
                    </button>
                  )}
                </div>

                {editingSection === 'basicInfo' ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Bio"
                      value={editForm.bio || ''}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={editForm.location || ''}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={editForm.githubUrl || ''}
                      onChange={(e) => setEditForm({...editForm, githubUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="url"
                      placeholder="Website URL"
                      value={editForm.websiteUrl || ''}
                      onChange={(e) => setEditForm({...editForm, websiteUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveBasicInfo}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <IconComponent icon="check" />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <IconComponent icon="x" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    {/* Avatar */}
                    <div className="h-24 w-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                      <p className="text-gray-600">{profile.bio}</p>
                    </div>
                  </div>
                )}

                {editingSection !== 'basicInfo' && (
                  <>
                    {/* Separator */}
                    <hr className="my-6 border-gray-200" />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IconComponent icon="mapPin" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IconComponent icon="calendar" />
                        Joined {new Date(profile.joinedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IconComponent icon="users" />
                        {profile.connections} connections
                      </div>
                    </div>

                    {/* Separator */}
                    <hr className="my-6 border-gray-200" />

                    <div className="space-y-2">
                      {profile.githubUrl && (
                        <a
                          href={profile.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <IconComponent icon="github" />
                          GitHub Profile
                        </a>
                      )}
                      {profile.websiteUrl && (
                        <a
                          href={profile.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <IconComponent icon="globe" />
                          Personal Website
                        </a>
                      )}
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <IconComponent icon="mail" />
                        Email
                      </a>
                    </div>

                    {!isOwnProfile && (
                      <div className="mt-6 space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          <IconComponent icon="users" />
                          Connect
                        </button>
                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <IconComponent icon="messageCircle" />
                          Message
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Technical Skills</h2>
                  <p className="text-sm text-gray-600 mt-1">Skills and proficiency levels</p>
                </div>
                {isOwnProfile && (
                  <button
                    onClick={() => startEditing('addSkill')}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <IconComponent icon="plus" />
                  </button>
                )}
              </div>
              <div className="p-6">
                {editingSection === 'addSkill' && (
                  <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={editForm.level || ''}
                        onChange={(e) => setEditForm({...editForm, level: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <select
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Language">Language</option>
                        <option value="Database">Database</option>
                        <option value="Cloud">Cloud</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addSkill}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <IconComponent icon="check" />
                        Add Skill
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors flex items-center gap-2"
                      >
                        <IconComponent icon="x" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {["Frontend", "Backend", "Language", "Database", "Cloud", "DevOps"].map((category) => {
                    const categorySkills = profile.skills.filter((skill) => skill.category === category)
                    if (categorySkills.length === 0) return null

                    return (
                      <div key={category}>
                        <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, index) => (
                            <div key={index} className="relative group">
                              <span
                                className={`px-2 py-1 rounded-md text-sm ${getSkillLevelColor(skill.level)}`}
                              >
                                {skill.name} • {skill.level}
                              </span>
                              {isOwnProfile && (
                                <button
                                  onClick={() => removeSkill(profile.skills.indexOf(skill))}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <IconComponent icon="x" className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
    </Sidebar>
  )
}
