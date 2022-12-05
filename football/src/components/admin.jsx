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
  return (
    <TableContainer component={Paper} className="bases__margin--top100">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên Tài Khoản</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Số Điện Thoại</StyledTableCell>
            <StyledTableCell >Tên Sân</StyledTableCell>
            <StyledTableCell >Địa Chỉ</StyledTableCell>
            <StyledTableCell >Trạng Thái</StyledTableCell>
            <StyledTableCell >Xử Lý</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.data.displayName}>
              <StyledTableCell component="th" scope="row">
                {row.data.displayName}
              </StyledTableCell>
              <StyledTableCell >{row.data.email}</StyledTableCell>
              <StyledTableCell >{row.data.Sdt}</StyledTableCell>
              {/* <StyledTableCell >{row.data}</StyledTableCell>
              <StyledTableCell >{row.protein}</StyledTableCell>
              <StyledTableCell >{row.fat}</StyledTableCell>
              <StyledTableCell >{row.carbs}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}