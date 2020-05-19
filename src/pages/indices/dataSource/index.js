import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Async from "~/components/Async";
import Helmet from "react-helmet";
import AntTabs from "~/components/AntTabs";

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Divider as MuiDivider,
  Grid,
  Typography,
  Box as MuiBox,
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Checkbox,
  TableContainer,
  TableCell,
  Link,
  AppBar,
  Tab,
  Tabs,
  TextareaAutosize,
  Button,
  TextField,
  Modal,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";

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

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing);
const Card = styled(MuiCard)(spacing);

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

let data = [
  {
    name: "기준상품 전체색인 수집",
    luncher: "dbIndexer.jar",
    port: 30100,
    jdbc: "market-dev",
  },
];

let jdbcArr = [
  {
    id: "market-dev",
    name: "로그분석기",
    driver: "com.mysql.jdbc.Driver",
    url: "jdbc:mysql://192.168.1.141:3306/analytics",
    user: "analytics",
    passwd: "12345",
  },
  {
    id: "eldanawa-dev",
    name: "eldanawa",
    driver: "com.mysql.jdbc.Driver",
    url: "jdbc:mysql://dev.danawa.com:3306",
    user: "DBtest1_7",
    passwd: "12345",
  },
  {
    id: "market-dev",
    name: "마켓개발",
    driver: "com.mysql.jdbc.Driver",
    url: "jdbc:mysql://dev.danawa.com:3307",
    user: "DBtest1_7",
    passwd: "12345",
  },
];

const convertPasswd = (passwd) => {
  let result = "";

  for (var i = 0; i < passwd.length; i++) {
    if (i == 0 || i == 1 || i == passwd.length - 1) {
      result += "*";
    } else {
      result += passwd.charAt(i);
    }
  }

  return result;
};

console.log("passwordType : " + convertPasswd("test123"));

let query =
  "limit: 1000 \n bulk: 1000 \n sql: | SELECT /*+ USE_NL(TPC,TPD) USE_NL(TPC, TP) USE_NL(TP,TPM) USE_NL(TPM,TPCDAT) USE_NL(TPCDAT,TPR) USE_NL(TPR,TPB) USE_NL(TPM,TPD)  USE_NL(TSP, TUP) USE_NL(TKFS, TSP) USE_NL(TKFS,TPB) USE_NL(TPDD, TPIP) USE_NL(TPDD,TUP) USE_NL(TPIP,TPBC) USE_NL(TPBC,TPEV) USE_NL(TPEV, TPMP) USE_NL(TPMP, TFDS) USE_NL(TFDS, TSS) */ \n\t tP.prod_c as ID, \n\t tP.prod_c as productCode, \n\t 'dna' as shopCode, \n\t tP.prod_n as productName, NVL(tPM.maker_n ,'') as productMaker";

function sourcePage() {
  const classes = useStyles();

  const [btn, setBtn] = React.useState("수정");

  let PrintPage = () => FormCard();

  const handleClick = (event) => {
    if (btn == "수정") {
      setBtn("저장");
    } else {
      setBtn("수정");
    }
  };
  console.log("UI : " + FormCard());
  if (btn == "수정") {
    PrintPage = () => FormCard();
  } else {
    PrintPage = () => UpdateForm();
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Box align={"right"}>
            <Button
              value={btn}
              onClick={handleClick}
              color={"primary"}
              variant={"outlined"}
            >
              {btn}
            </Button>
          </Box>
          <PrintPage />
          <br />
        </CardContent>
      </Card>
    </div>
  );
}

function UpdateForm() {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardContent>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow align="center">
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">런처</StyledTableCell>
                <StyledTableCell align="center">실행포트</StyledTableCell>
                <StyledTableCell align="center">JDBC</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow align="center">
                  <StyledTableCell align="center">
                    <FormControl>
                      <TextField align="center" value={row.name} />
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <FormControl>
                      <TextField align="center" value={row.luncher} />
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <FormControl>
                      <TextField align="center" value={row.port} />
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <FormControl>
                      <Select value={row.jdbc} disableUnderline>
                        <MenuItem value={row.jdbc}>{row.jdbc}</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Box>
            <Typography variant="h5" gutterBottom display="inline">
              설정
            </Typography>
            <TextareaAutosize
              rowsMin={50}
              className={classes.edit}
              placeholder=""
              value={query}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

function FormCard() {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardContent>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow align="center">
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">런처</StyledTableCell>
                <StyledTableCell align="center">실행포트</StyledTableCell>
                <StyledTableCell align="center">JDBC</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow align="center">
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.luncher}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.port}</StyledTableCell>
                  <StyledTableCell align="center">{row.jdbc}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Box>
            <Typography variant="h5" gutterBottom display="inline">
              설정
            </Typography>
            <TextareaAutosize
              rowsMin={50}
              className={classes.edit}
              placeholder=""
              value={query}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

////////////////////////////////////

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function jdbcCard() {}

function jdbcTable() {
  const classes = useStyles();

  const RegisterModal = Async(() => import("./registerJdbc"));
  const UpdateModal = Async(() => import("./editJdbc"));

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [jdbcData, setJdbcData] = React.useState();
  const [btnValue, setBtnValue] = React.useState("register");

  const handleOpen = (value, row) => {
  
    setBtnValue(value);
    setOpen(true);
    setJdbcData(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">JDBC 소스</h2>
      <br />
      {btnValue === "register" ? (
        <RegisterModal />
      ) : (
        <UpdateModal data={jdbcData} />
      )}
    </div>
  );

  return (
    <div>
      <Card>
        <CardContent>
          <Box align={"left"}>
            <Button
              onClick={() => handleOpen("register")}
              variant={"outlined"}
              color={"primary"}
            >
              jdbc 추가
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Box>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow align="center">
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">아이디</StyledTableCell>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">드라이버</StyledTableCell>
                <StyledTableCell align="center">URL</StyledTableCell>
                <StyledTableCell align="center">사용자</StyledTableCell>
                <StyledTableCell align="center">비밀번호</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jdbcArr.map((row, index) => (
                <TableRow align="center">
                  <StyledTableCell align="center">{index}</StyledTableCell>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.driver}</StyledTableCell>
                  <StyledTableCell align="center">{row.url}</StyledTableCell>
                  <StyledTableCell align="center">{row.user}</StyledTableCell>
                  <StyledTableCell align="center">
                    {convertPasswd(row.passwd)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => handleOpen("update", row)}
                      color={"primary"}
                    >
                      수정
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
        </CardContent>
      </Card>
    </div>
  );
}

function DataSource() {
  const classes = useStyles();
  const [indices, setIndices] = React.useState("VM");

  const tabs = [
    { label: "소스", component: () => sourcePage() },
    { label: "JDBC", component: () => jdbcTable() },
  ];

  const handleChange = (event) => {
    setIndices(event.target.value);
  };
  return (
    <React.Fragment>
      <Helmet title="수집 소스" />

      <Typography variant="h3" gutterBottom display="inline">
        수집 소스
      </Typography>
      <br />
      <Box>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">소스</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={indices}
            onChange={handleChange}
          >
            <MenuItem value={"VM"}>VM</MenuItem>
            <MenuItem value={"V01"}>V01</MenuItem>
            <MenuItem value={"V02"}>V02</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <br />

      <Divider my={6} />

      <AntTabs tabs={tabs} />
    </React.Fragment>
  );
}

export default DataSource;
