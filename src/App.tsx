import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FootballClub {
  id: number;
  name: string;
  league: string;
  nickname: string;
  level: string;
}

function useFootballClubs() {
  const [clubs, setClubs] = useState<FootballClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://football-clubs-api.vercel.app/')
      .then(response => {
        setClubs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  return { clubs, loading, error };
}

function FootballClubsTable() {
  const { clubs, loading, error } = useFootballClubs();
  const [filter, setFilter] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(filter.toLowerCase()) ||
    club.league.toLowerCase().includes(filter.toLowerCase()) ||
    club.nickname.toLowerCase().includes(filter.toLowerCase()) ||
    club.level.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter clubs..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>League</th>
            <th>Nickname</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredClubs.map(club => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.league}</td>
              <td>{club.nickname}</td>
              <td>{club.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LocalDataComponent() {
  const [localData, setLocalData] = useState<string | null>(null);

  useEffect(() => {
    // Try to get data from localStorage
    const data = localStorage.getItem('footballClubsData');
    if (data) {
      setLocalData(data);
    } else {
      setLocalData('No local data found');
    }
  }, []);

  return (
    <div>
      <h2>Local Data</h2>
      <p>{localData}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Football Clubs</h1>
      <FootballClubsTable />
      <LocalDataComponent />
    </div>
  );
}

export default App;