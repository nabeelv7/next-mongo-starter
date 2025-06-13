"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SectionInvite({ id, session }) {
  const searchParams = useSearchParams();
  const host = searchParams.get("host");

  if (!session || !session?.user) {
    return (
      <>
        <p>You have been invited by {host} to join a match! 🥳🎉</p>
        <h1>Sign in to join the match {id}</h1>
        <button onClick={signIn("github")}>Sign in</button>
      </>
    );
  }

  const [isLoading, setIsLoading] = useState(false);

  const joinMatch = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post(`/api/join`, { id: id });
      if (data.status === 200) toast.success("You joined the match!");
      if (data?.error) toast.error(data.error);
      console.log("DATA", data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p>You have been invited by {host} to join a match! 🥳🎉</p>
      <p>MATCH ID: {id}</p>
      <button onClick={joinMatch} className="btn btn-primary">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Join Match
      </button>
    </>
  );
}
