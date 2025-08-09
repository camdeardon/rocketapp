
// 📁 src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get("/matches/").then((res) => setMatches(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Matches</h1>
      <div className="grid gap-4">
        {matches.map((match: any) => (
          <div key={match.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{match.first_name} {match.last_name}</h2>
            <p>{match.bio}</p>
            <p className="text-sm text-muted-foreground">{match.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
