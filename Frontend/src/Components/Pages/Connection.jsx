import { MapPin } from "lucide-react";

export default function Connection() {
  const user = {
    firstName: "Sunny",
    lastName: "Gupta",
    email: "sarah.chen@example.com",
    bio: "Full-stack developer passionate about React, Node.js, and cloud architecture. Love mentoring junior developers and building scalable applications.",
    location: "San Francisco, CA",
    skills: [
      { name: "React", level: "Expert", category: "Frontend" },
      { name: "TypeScript", level: "Expert", category: "Language" },
      { name: "Node.js", level: "Advanced", category: "Backend" },
      { name: "AWS", level: "Advanced", category: "Cloud" },
      { name: "PostgreSQL", level: "Intermediate", category: "Database" },
      { name: "Docker", level: "Intermediate", category: "DevOps" },
      { name: "Python", level: "Beginner", category: "Language" },
    ],
    avatar: "/professional-developer-avatar.png",
  };

  // Group skills by category
  const groupedSkills = user.skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-lg p-6 bg-white hover:shadow-xl transition">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />

        {/* Name & Email */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500">{user.email}</p>

        {/* Bio */}
        <p className="mt-3 text-center text-gray-600 leading-relaxed">
          {user.bio}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <MapPin size={16} />
          <span>{user.location}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
        <div className="space-y-3">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-blue-600 mb-1">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
