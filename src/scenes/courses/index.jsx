import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataCourses } from "../../data/mockData";
import Header from "../../components/shared/Header";
import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { id } from "ethers";
import ClassicLoader from "../../components/loader/loader";
const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course/get-all"
        );
        const fetchedData = await Promise.all(
          response.data.courses.map(async (item) => {
            const profile = await axios.get(
              `http://localhost:3000/api/profile/get-by-ethaccount?account=${item.instructorEthAccount}`
            );
            return {
              id: item.courseId,
              title: item.title,
              address: item.instructorEthAccount,
              price: item.coursePrice,
              instructorName:
                profile.data.profile.firstName +
                " " +
                profile.data.profile.lastName,
              currency: item.coursePriceCurrency,
              qtysells: item.nbBuyers,
              total: item.nbBuyers * item.coursePrice,
              //paymentType:
            };
          })
        );
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "Course Id", flex: 0.5 },
    { field: "title", headerName: "Title" },
    {
      field: "instructorName",
      headerName: "Instructor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Instructor Eth Address",
      flex: 1,
    },
    {
      field: "price",
      headerName: " Course Price",
      flex: 1,
    },
    {
      field: "currency",
      headerName: "Price Currency",
      flex: 1,
    },

    {
      field: "qtysells",
      headerName: "Qtysells",
      type: "number",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total Sales",
      flex: 1,
    },
  ];

  return (
    <>
      {isLoading ? (
        <ClassicLoader type="indigo" />
      ) : (
        <Box m="20px">
          <Header
            title="courses"
            subtitle="List of Courses for Future Reference"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
           
              "& .MuiDataGrid-root": {
                fontSize:"20px",
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Courses;
