import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from "react-helmet";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Typography,
  FormControl,
  
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
  ButtonGroup,
  Button,
  TextField,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      //minWidth: 10,
    },
    root: {
      flexGrow: 1,
      width: "100%",
      // backgroundColor: theme.palette.background.paper,
    },
    edit: {
      width: "100%",
    },
    table: {
      width: "100%",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),

  { withTheme: true }
);
const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 10,
  },
}))(TableCell);
const Card = styled(MuiCard)(spacing);

function EditJdbc(jdbcData) {
  const classes = useStyles();
  console.log("editData : ", jdbcData.data);
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            설정
          </Typography>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <StyledTableCell align="center">아이디</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">드라이버</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">URL</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">사용자</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">비밀번호</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField variant="outlined" type="password"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
          <Button align="left">삭제</Button>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            align="right"
          >
            <Button align="right">닫기</Button>
            <Button align="right">저장</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditJdbc;
