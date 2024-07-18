import React, { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa'; // Make sure to install react-icons: npm install react-icons

interface TeamScore {
  id: number;
  scores: number[];
}

interface TeamsProps {
  teamCount: number;
}

const Teams: React.FC<TeamsProps> = ({ teamCount }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [teams, setTeams] = useState<TeamScore[]>(
    Array.from({ length: teamCount }, (_, i) => ({ id: i, scores: [] }))
  );

  const addScore = (teamId: number, score: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? { ...team, scores: [...team.scores, score] }
          : team
      )
    );
  };

  const removeScore = (teamId: number, index: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? { ...team, scores: team.scores.filter((_, i) => i !== index) }
          : team
      )
    );
  };

  const getTeamSum = (teamId: number) => {
    return teams[teamId].scores.reduce((sum, score) => sum + score, 0);
  };

  const getHighestScoringTeam = () => {
    return teams.reduce((maxTeam, currentTeam) => 
      getTeamSum(currentTeam.id) > getTeamSum(maxTeam.id) ? currentTeam : maxTeam
    ).id;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
      <div className="flex justify-around">
        {teams.map((team, index) => (
          <button
            key={team.id}
            className={`flex-1 py-2 text-center ${activeTab === index ? 'bg-blue-600' : 'bg-gray-700'} relative`}
            onClick={() => setActiveTab(index)}
          >
            Team {team.id + 1}
            {index === getHighestScoringTeam() && (
              <FaTrophy className="absolute top-1 right-1 text-yellow-400" />
            )}
          </button>
        ))}
      </div>
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl mb-2">Team {activeTab + 1} Scores</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {teams[activeTab]?.scores.map((score, index) => (
              <span
                key={index}
                className="bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-600"
                onClick={() => removeScore(activeTab, index)}
              >
                {score}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(score => (
              <button
                key={score}
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                onClick={() => addScore(activeTab, score)}
              >
                {score}
              </button>
            ))}
          </div>
        </div>
        <div className="text-2xl font-bold">
          Sum: {getTeamSum(activeTab)}
        </div>
      </div>
    </div>
  );
};

export default Teams;