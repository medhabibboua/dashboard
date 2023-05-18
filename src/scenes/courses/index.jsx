import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataCourses } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { id } from "ethers";
const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/course/get-all');
       const fetchedData = response.data.courses.map((item) => ({
          id: item.courseId,
          title: item.title,
          address: item.instructorEthAccount,
          price: item.coursePrice,
          qtysells: item.nbBuyers,
          total: item.nbBuyers * item.coursePrice,
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    }

    fetchData()
    
   }
    , []);
  
  const columns = [
    { field: "id", headerName: "id", flex: 0.5 },
    { field: "registrarId", headerName: "registrarId" },
    {
      field: "title",
      headerName: "title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "address",
      flex: 1,
    },
    {
      field: "price",
      headerName: " price",
      headerAlign: "left",
      align: "left",
    },
    
    {
      field: "qtysells",
      headerName: "qtysells",
      type: "number",
      flex: 1,
    },
    {
        field: "total",
        headerName: "total",
        flex: 1,
      },
    
  ];
  console.log(data)


/*const calcTotal=useCallback(()=>{
    return mockDataCourses.map((item,index)=>{
        return {
            ...item,
            total:item.qtysells*item.price

        }
    })
    

},[])


calcTotal()*/

  return (
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
  );
};

export default Courses;