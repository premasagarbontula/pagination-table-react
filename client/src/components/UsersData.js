import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersData.css";

const UsersData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const rowsPerPage = 10;
  const lastPageIndex = currentPage * rowsPerPage;
  const firstPageIndex = lastPageIndex - rowsPerPage;
  const totalPages = Math.ceil(tableData?.total / rowsPerPage);
  const currentData = tableData?.users?.slice(firstPageIndex, lastPageIndex);
  const fetchData = async () => {
    const { data } = await axios.get("https://dummyjson.com/users?limit=0");
    setTableData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onPrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const onNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((value, index) => (
            <tr key={index}>
              <td>{value.firstName}</td>
              <td>{value.email}</td>
              <td>{value.age}</td>
              <td>{value.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={onPrevClick} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={onNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersData;
