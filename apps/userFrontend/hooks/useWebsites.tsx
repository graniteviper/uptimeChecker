import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface tick {
  id: string;
  createdAt?: string;
  status: "good" | "bad";
  latency: number;
}

interface website {
  id: string;
  url: string;
  websiteTicks: tick[];
}

export function useWebsites() {
  const [websites, setwebsites] = useState<website[]>([]);
  const { getToken } = useAuth();
  const getWebsites = async () => {
    const token = await getToken();
    const response = await axios.get("http://localhost:8080/api/v1/getAll", {
      headers: {
        Authorization: token,
      },
    });
    // alert(response);
    setwebsites(response.data.data);
  };

  useEffect(() => {
    getWebsites();
    const interval = setInterval(() => {
      getWebsites();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
  return { websites, getWebsites };
}
