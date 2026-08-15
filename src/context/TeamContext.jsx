import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { users as initialUsers } from '../data/mockData';

const TeamContext = createContext(null);

export function TeamProvider({ children }) {
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('flowboard-team');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse team from local storage");
      }
    }
    return initialUsers;
  });

  useEffect(() => {
    localStorage.setItem('flowboard-team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const addMember = useCallback((member) => {
    const newMember = {
      ...member,
      id: `user-${Date.now()}`,
      avatar: `https://i.pravatar.cc/150?u=user-${Date.now()}` // Auto-generate avatar
    };
    setTeamMembers(prev => [...prev, newMember]);
  }, []);

  const removeMember = useCallback((id) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  }, []);

  const getMember = useCallback((id) => {
    return teamMembers.find(m => m.id === id) || null;
  }, [teamMembers]);

  // Simulate a logged-in user (default to the first admin, or null if empty)
  const currentUser = teamMembers.length > 0 ? teamMembers[0] : null;

  return (
    <TeamContext.Provider value={{ 
      teamMembers, 
      setTeamMembers, 
      addMember, 
      removeMember, 
      getMember,
      currentUser 
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}
