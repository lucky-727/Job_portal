import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { jobs } = useSelector((store) => store.job);
  const { applicants } = useSelector((store) => store.application);
  console.log(jobs);

  return (
    <div>
      <Table>
        <TableCaption>List of your recent applied Users</TableCaption>
        <TableRow>
          <TableHead>Fullname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Applied On</TableHead>
          <TableHead>Resume</TableHead> 
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
        <TableBody>
          {applicants &&
            applicants.applications.map((item) => {
              const job = jobs.find((job) => job._id === item.jobId);
              return (
                <tr key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item?.applicant.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* {item?.applicant?.profile?.resume?.Name} */}
                        Download
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(status, item?._id)}
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="shortlistingStatus"
                                value={status}
                              />{" "}
                              {status}
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;



