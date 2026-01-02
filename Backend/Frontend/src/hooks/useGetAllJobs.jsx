import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    // Fetch all the jobs from the API
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );  
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error(error.response?.data?.message || "An error occurred.");
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
  return { loading, error };
};

export default useGetAllJobs;
