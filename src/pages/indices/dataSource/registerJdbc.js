import React from "react";
import styled from "styled-components";

import {
    Button,
    Card as MuiCard,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

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
      height: "70%"
    },
    paper: {
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      // padding: theme.spacing(2, 4, 3),
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

function RegisterJdbc() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            설정
          </Typography>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableBody>
              <TableRow>
                <StyledTableCell align="center">아이디</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size={"small"} variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">DB 제공자</StyledTableCell>
                <StyledTableCell align="left">
                  <FormControl className={classes.root}>
                    <InputLabel align="center">JDBC</InputLabel>
                    <Select fullWidth>
                      
                      <MenuItem value={"com.mysql.jdbc.Driver"}>
                        com.mysql.jdbc.Driver
                      </MenuItem>
                      <MenuItem value={"Altibase.jdbc.driver"}>
                        Altibase.jdbc.driver.
                      </MenuItem>
                    </Select>
                    
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">드라이버</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">호스트주소</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">포트</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">DB명</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">사용자</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">비밀번호</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">JDBC 파라메터</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">URL</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl>
                    <TextField size='small' variant="outlined"></TextField>
                  </FormControl>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
           <div>
              <TableRow>
                <StyledTableCell>
                  <Button size="small" onClick={()=>handleClose}>닫기</Button>
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <Button size="small">연결테스트</Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button size="small" variant="contained" color="primary" startIcon={<SaveIcon />}>저장</Button>
                </StyledTableCell>
              </TableRow>
            </div>
            {/* <div>
              <Link>닫기</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button align="left">연결 테스트</Button>
              <Button align="left">저장</Button>
            </div> */}
            <div>
              
            </div>
            <div>
              
            </div>
          
          {/* <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            align="right"
          >
            <Button>닫기</Button>
            <Button>연결테스트</Button>
            <Button>저장</Button>
          </ButtonGroup> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterJdbc;
