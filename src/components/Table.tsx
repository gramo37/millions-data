import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { ReactNode, useState } from "react";

export default function BasicTable({ data }: { data: Array<any> | null }) {
  const [page, setPage] = useState(0);
  if (!data || data.length <= 0) return null;
  const rowsPerPage = 8;
  const lastPage =
    data.length % rowsPerPage === 0
      ? Math.floor(data.length / rowsPerPage)
      : Math.floor(data.length / rowsPerPage) + 1;
  const columns = Object.keys(data[0]);
  const rows: any[] = [];
  for (
    let i = page * rowsPerPage;
    i < Math.min((page + 1) * rowsPerPage, data.length);
    i++
  ) {
    rows.push(data[i]);
  }

  return (
    <TableContainer component={Paper} sx={{ width: "fit-content" }}>
      <Table
        aria-label="simple table"
        sx={(theme) => ({
          width: "330px",
          [theme.breakpoints.up("sm")]: {
            width: "370px",
          },
          [theme.breakpoints.up("md")]: {
            width: "670px",
          },
          [theme.breakpoints.up("lg")]: {
            width: "870px",
          },
        })}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell key={col} align="left">
                  {col}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row).map((r) => {
                return (
                  <TableCell key={`${row.id} ${r}`} align="left">
                    {r as ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          disabled={page === 0}
          onClick={() => {
            if (page === 0) return;
            setPage((prev) => prev - 1);
          }}
        >
          Prev
        </Button>
        <Typography variant="body1" sx={{ margin: "10px" }}>
          {page}
        </Typography>
        <Button
          disabled={page === lastPage - 1}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </Box>
    </TableContainer>
  );
}
