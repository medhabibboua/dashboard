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
const Instructors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  function removeDuplicatesByEthAddress(array) {
    const uniqueEthAddresses = {};
    
    // Filter out duplicate objects
    const filteredArray = array.filter(obj => {
      if (!uniqueEthAddresses[obj.ethAddress]) {
        uniqueEthAddresses[obj.ethAddress] = true;
        return true;
      }
      return false;
    });
  
    return filteredArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course/get-all"
        );
        const fetchedData = await Promise.all(
          response.data.courses.map(async (item,index) => {
            const profile = await axios.get(
              `http://localhost:3000/api/profile/get-by-ethaccount?account=${item.instructorEthAccount}`
            );
            const paycheck = await axios.get(
              `http://localhost:3000/api/paycheck-type/get?account=${item.instructorEthAccount}`
            );
            if (!!paycheck.data.paycheck) {
              if (paycheck.data.paycheck.paymentType === "eth") {
                return {
                    id:index,
                  instructorName:
                    profile.data.profile.firstName +
                    " " +
                    profile.data.profile.lastName,
                  paymentType: paycheck.data.paycheck.paymentType,
                  ethAddress: item.instructorEthAccount,
                  cardNumber: "unknown",
                  expDate: "unknown",
                  cvcCvv: "unknown",
                };
              } else {
                return {
                    id:index,

                  instructorName:
                    profile.data.profile.firstName +
                    " " +
                    profile.data.profile.lastName,
                  paymentType: paycheck.data.paycheck.paymentType,
                  ethAddress: item.instructorEthAccount,
                  cardNumber: paycheck.data.paycheck.cardNumber,
                  expDate: paycheck.data.paycheck.cardExpDate,
                  cvcCvv: paycheck.data.paycheck.cardCvcCvv,
                };
              }
            } else {
              return {
                id:index,

                instructorName:
                  profile.data.profile.firstName +
                  " " +
                  profile.data.profile.lastName,
                paymentType: "pending",
                ethAddress: item.instructorEthAccount,
                cardNumber: "unknown",
                expDate: "unknown",
                cvcCvv: "unknown",
              };
            }
          })
        );
        setData(removeDuplicatesByEthAddress(fetchedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    {
      field: "instructorName",
      headerName: "Instructor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
    },
    {
      field: "ethAddress",
      headerName: " Eth Address",
      flex: 1,
    },
    {
      field: "cardNumber",
      headerName: "Card Number",
      flex: 1,
    },

    {
      field: "expDate",
      headerName: "Expiry Date",
      flex: 1,
    },
    {
      field: "cvcCvv",
      headerName: "CVC/CVV",
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
            title="Istructors"
            subtitle="List of Instructors for Future Reference"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                fontSize: "20px",
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

export default Instructors;
