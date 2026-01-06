import { useEffect, useState } from "react";
import api from "@/api";

export interface Award {
  id: number;
  year: number;
  category: string;
  placement?: string;
  issuer?: string;
  project?: string;
  image: string;
  title: string;
  description?: string;
}

export const useAwards = (lang: string = "en") => {
  const [data, setData] = useState<Award[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await api.get(`/awards?lang=${lang}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, [lang]);

  return { data, isLoading, error };
};
