import React from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";

const skills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Node.js",
  "MongoDB",
  "MySQL",
  "Redux",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
];
const Profile = () => {
  const isResume = true;
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto  bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/99532574?v=4"
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h1 className=" font-medium text-xl">Full Name</h1>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="">AnkitPathak@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="">+919874563210</span>
          </div>
        </div>

        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {skills.length !== 0 ? (
                skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold"> Resume</label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  href={
                    "https://www.youtube.com/channel/UCilndivcZpxq-xfaxmfpwng"
                  }
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Download
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJob />
      </div>
    </div>
  );
};


export default Profile;