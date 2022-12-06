import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
    const [data, setData] = React.useState([]);
    const [data1, setData1] = React.useState([]);

    const getData = () => {
        const getdataDatSan = collection(db, "users");
        getDocs(getdataDatSan)
          .then((response) => {
            const datsans = response.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));
            setData(datsans);
          })
          .catch((error) => console.log(error.message));
      };
      React.useEffect(() => {
        getData();
      }, []);

      const getData1 = () => {
        const getdataDatSan = collection(db, "business");
        getDocs(getdataDatSan)
          .then((response) => {
            const datsans = response.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));
            setData1(datsans);
          })
          .catch((error) => console.log(error.message));
      };
      React.useEffect(() => {
        getData1();
      }, []);
      
    const  StyleStatus = (status) => {
        if (status === false) {
          return <i className="fa fa-exclamation-circle" />;
        } else if (status === 0) {
          return <i className="fa fa-check-circle" />;
        } 
      }

      return (
    <TableContainer component={Paper} className="bases__margin--top100">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên Tài Khoản</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Số Điện Thoại</StyledTableCell>
            <StyledTableCell >Trạng Thái</StyledTableCell>
            <StyledTableCell >Xử Lý</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
             if(row.data.rule === "business" ) {
                console.log('row.data.status', row.data.status);
            return (
        <StyledTableRow key={row.data.displayName}>
        <StyledTableCell component="th" scope="row">
                    {row.data.displayName}
        </StyledTableCell>
        <StyledTableCell >{row.data.email}</StyledTableCell>
        <StyledTableCell >{row.data.Sdt}</StyledTableCell>
        <StyledTableCell ><Typography 
                    style={{
                        backgroundColor: 
                        ((row.data.status === false && 'green') ||
                        (row.data.status === true && 'blue'))
                    }}
                  >{row.data.status}</Typography></StyledTableCell>
        <StyledTableCell ><button
                    className="btn btn-primary edit-button"
                    onClick={(event) => this.changeModalStatus(event)}
                  >
                    Confirm
                  </button></StyledTableCell>

      </StyledTableRow>
            )
}
          }
         
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}