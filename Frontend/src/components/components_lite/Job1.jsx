import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookMarked } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job1 = () => {
  const navigate = useNavigate();
  const jobId = "jdfj";
  return (
    <div className=" p-5 rounded-md shadow-xl bg-white  border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3 ">
      <div className="flex  items-center justify-between">
        {" "}
        <p className="text-sm text-gray-600">3 days ago</p>
        <Button variant="outline" className=" rounded-full " size="icon">
          <Bookmark />
        </Button>{" "}
      </div>

      <div className="flex items-center gap-2 my-2 ">
        <Button className=" p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://yt3.googleusercontent.com/Kbk6fvLQH3X7q6zGb7I-TLDH_2FFA6WZXoKZty5kjlm7nqHxUcQVgv420shK0Z_qN4sp841RVcY=s900-c-k-c0x00ffffff-no-rj"></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <div>
          <h2 className="font-bold text-lg my-2">Job Title</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, aliquam
            impedit numquam esse.
          </p>
        </div>
        <div className=" flex gap-2 items-center mt-4 ">
          <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
            10 Position
          </Badge>
          <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
            20 LPA
          </Badge>
          <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>
            Remote
          </Badge>
          <Badge className={" text-black font-bold"} variant={"ghost"}>
            Full Time
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => {
            navigate(`/description/${jobId}`);
          }}
          variant="outline"
          className="  font-bold rounded-sm "
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="bg-[#6B3AC2] text-white font-bold rounded-sm "
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;