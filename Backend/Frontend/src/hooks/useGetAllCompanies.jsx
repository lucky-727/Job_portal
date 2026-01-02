import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("called");
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies || []));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch companies.");
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;