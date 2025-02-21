import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members"); // Fetch members
        setTeamMembers(response.data);
      } catch (error) {
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Team Members</h1>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div
              key={member._id} // Using _id from MongoDB
              className="bg-gray-800 p-5 rounded-lg shadow-lg text-center hover:bg-gray-700 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-300">{member.name}</h2>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No team members found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
