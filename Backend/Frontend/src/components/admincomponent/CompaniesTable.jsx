import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company.companyName
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>Your recent registered Companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Companies Added
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo || "/default-logo.png"}
                      alt={company.companyName}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company.companyName}</TableCell>
                <TableCell>
                  {company.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default CompaniesTable;