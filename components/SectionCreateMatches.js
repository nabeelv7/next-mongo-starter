"use client";
import { useState } from "react";
import axios from "axios";

export default function SectionCreateMatches() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMatch = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/matches", {
        match_name: name,
        match_date: date,
        match_time: time,
      });
      if (data.error) setError(data.error.message);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <form onSubmit={createMatch}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          required
          placeholder="Match Name"
        />
        <input
          onChange={(e) => setDate(e.target.value)}
          className="input"
          type="date"
          required
          placeholder="Match Date"
        />
        <input
          onChange={(e) => setTime(e.target.value)}
          className="input"
          type="time"
          required
          placeholder="Match Time"
        />
        <button className="btn btn-primary" type="submit">
          {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Create Match
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
