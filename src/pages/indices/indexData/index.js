import React from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs"
import {
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Typography,
    Table, TableRow, TableCell, TableHead, TableBody, TableFooter, Checkbox, TableContainer, TablePagination,
    TextareaAutosize,
    TextField,
    FormControl,
    IconButton,
    InputBase,
    Paper, Box, InputLabel, Select, MenuItem,
    Tab, Tabs, AppBar,
} from "@material-ui/core";
import {
    Search
} from '@material-ui/icons';

import {spacing} from "@material-ui/system";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderBottom: "1px solid"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}), {withTheme: true});

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);


function createData(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14, val15, val16, val17, val18, val19, val20) {
    return { val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14, val15, val16, val17, val18, val19, val20 };
}
const rows = [
    createData('4020382', 'e5c8cdd4489094495134add5bf958496', '4020382', 'dna', '', '클리어 할로겐 램프 12V', '바이오라이트'),
    createData('1297991', '88f0d70f329d0ab8db8787dabd4367cf', '1297991', 'dna', '', '크리스탈 비전', '필립스', '필립스'),
    createData('2195255', 'e4eab9181eadf04456d8ec63859e3995', '2195255', 'dna', '', '화이트 비전 LED 안개등 6000K',	'젠카코리아'),
    createData('1104260', '40164f3c639023cc06811525394abe57', '1104260', 'dna', '', '스탠다드 벌브 1개', '보쉬', '보쉬'),
    createData('4020366', 'e5c8cdd4489094495134add5bf958496', '4020366', 'dna', '', '클리어 할로겐 램프 12V', '바이오라이트'),
    createData('4020476', 'e5c8cdd4489094495134add5bf958496', '4020476', 'dna', '', '클리어 할로겐 램프 12V', '바이오라이트'),
    createData('4429766', 'fddaba9e7fe5530137a32eb0c348c672', '4429766', 'dna', '', '나이트호크 제논 전조등', 'GE'),
    createData('4020382', 'e5c8cdd4489094495134add5bf958496', '4020382', 'dna', '', '클리어 할로겐 램프 12V', '바이오라이트'),
    createData('1297991', '88f0d70f329d0ab8db8787dabd4367cf', '1297991', 'dna', '', '크리스탈 비전', '필립스', '필립스'),
    createData('2195255', 'e4eab9181eadf04456d8ec63859e3995', '2195255', 'dna', '', '화이트 비전 LED 안개등 6000K',	'젠카코리아'),
    createData('1104260', '40164f3c639023cc06811525394abe57', '1104260', 'dna', '', '스탠다드 벌브 1개', '보쉬', '보쉬'),
];

const indexRows = [
    createData('* ID', '2492423', ''),
    createData('TOTALINDEX', '할로겐 전구 클리어 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 오스람 오스람 용품,자동차,램프,차 할로겐램프, 램프, 오스람, 차량용 램프, 할로겐 램프 H11, 55W', '할로겐, 전구, 클리어, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 오스람, 오스람, 용품, 자동차, 램프, 차, 할로겐, 램프, 램프, 오스람, 차량용, 램프, 할로겐, 램프, H, 11 (H11) , 55, 55W'),
    createData('UIPRODUCTINDEX', '할로겐 전구 클리어 오스람 H11, 55W', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W'),
    createData('IMSTARSINDEX', '할로겐 전구 클리어 오스람 H11, 55W 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개'),
    createData('PRODUCTCODE', '2492423', '2492423'),
    createData('SHOPCODE', 'DNA', 'DNA'),
    createData('* ID', '2492423', ''),
    createData('TOTALINDEX', '할로겐 전구 클리어 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 오스람 오스람 용품,자동차,램프,차 할로겐램프, 램프, 오스람, 차량용 램프, 할로겐 램프 H11, 55W', '할로겐, 전구, 클리어, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 오스람, 오스람, 용품, 자동차, 램프, 차, 할로겐, 램프, 램프, 오스람, 차량용, 램프, 할로겐, 램프, H, 11 (H11) , 55, 55W'),
    createData('UIPRODUCTINDEX', '할로겐 전구 클리어 오스람 H11, 55W', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W'),
    createData('IMSTARSINDEX', '할로겐 전구 클리어 오스람 H11, 55W 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개'),
    createData('PRODUCTCODE', '2492423', '2492423'),
    createData('SHOPCODE', 'DNA', 'DNA'),
    createData('* ID', '2492423', ''),
    createData('TOTALINDEX', '할로겐 전구 클리어 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 오스람 오스람 용품,자동차,램프,차 할로겐램프, 램프, 오스람, 차량용 램프, 할로겐 램프 H11, 55W', '할로겐, 전구, 클리어, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 오스람, 오스람, 용품, 자동차, 램프, 차, 할로겐, 램프, 램프, 오스람, 차량용, 램프, 할로겐, 램프, H, 11 (H11) , 55, 55W'),
    createData('UIPRODUCTINDEX', '할로겐 전구 클리어 오스람 H11, 55W', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W'),
    createData('IMSTARSINDEX', '할로겐 전구 클리어 오스람 H11, 55W 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개'),
    createData('PRODUCTCODE', '2492423', '2492423'),
    createData('SHOPCODE', 'DNA', 'DNA'),
    createData('* ID', '2492423', ''),
    createData('TOTALINDEX', '할로겐 전구 클리어 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 오스람 오스람 용품,자동차,램프,차 할로겐램프, 램프, 오스람, 차량용 램프, 할로겐 램프 H11, 55W', '할로겐, 전구, 클리어, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 오스람, 오스람, 용품, 자동차, 램프, 차, 할로겐, 램프, 램프, 오스람, 차량용, 램프, 할로겐, 램프, H, 11 (H11) , 55, 55W'),
    createData('UIPRODUCTINDEX', '할로겐 전구 클리어 오스람 H11, 55W', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W'),
    createData('IMSTARSINDEX', '할로겐 전구 클리어 오스람 H11, 55W 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개'),
    createData('PRODUCTCODE', '2492423', '2492423'),
    createData('SHOPCODE', 'DNA', 'DNA'),
    createData('* ID', '2492423', ''),
    createData('TOTALINDEX', '할로겐 전구 클리어 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개 오스람 오스람 용품,자동차,램프,차 할로겐램프, 램프, 오스람, 차량용 램프, 할로겐 램프 H11, 55W', '할로겐, 전구, 클리어, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개, 오스람, 오스람, 용품, 자동차, 램프, 차, 할로겐, 램프, 램프, 오스람, 차량용, 램프, 할로겐, 램프, H, 11 (H11) , 55, 55W'),
    createData('UIPRODUCTINDEX', '할로겐 전구 클리어 오스람 H11, 55W', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W'),
    createData('IMSTARSINDEX', '할로겐 전구 클리어 오스람 H11, 55W 전조등,안개등|전구종류$할로겐 램프|규격$H11|사용전압$12V|색온도$3,200K|소비전력$55W|수량$1개', '할로겐, 전구, 클리어, 오스람, H, 11 (H11) , 55, 55W, 전조등, 안개등, 전구, 종류, 할로겐, 램프, 규격, H, 11 (H11) , 사용, 전압, 12, 12V, 색온도, 3,200 (3200) , K (3,200K) , 소비, 전력, 55, 55W, 수량, 1, 1개'),
    createData('PRODUCTCODE', '2492423', '2492423'),
    createData('SHOPCODE', 'DNA', 'DNA'),
]


function OriginalData() {
    const classes = useStyles()
    return (<div>
        <br/>
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <form noValidate autoComplete="off" className={classes.form}>
                            <InputBase
                                className={classes.input}
                                placeholder="ID"
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <Search />
                            </IconButton>
                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={100}
                            rowsPerPage={10}
                            page={0}
                            backIconButtonProps={{
                                "aria-label": "Previous Page"
                            }}
                            nextIconButtonProps={{
                                "aria-label": "Next Page"
                            }}
                            // onChangePage={this.handleChangePage}
                            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">BUNDLEKEY</TableCell>
                                <TableCell align="center">PRODUCTCODE</TableCell>
                                <TableCell align="center">SHOPCODE</TableCell>
                                <TableCell align="center">SHOPPRODUCTCODE</TableCell>
                                <TableCell align="center">PRODUCTNAME</TableCell>
                                <TableCell align="center">PRODUCTMAKER</TableCell>
                                <TableCell align="center">MAKERKEYWORD</TableCell>
                                <TableCell align="center">PRODUCTBRAND</TableCell>
                                <TableCell align="center">BRANDKEYWORD</TableCell>
                                <TableCell align="center">PRODUCTMODEL</TableCell>
                                <TableCell align="center">MODELWEIGHT</TableCell>
                                <TableCell align="center">PRODUCTIMAGEURL</TableCell>
                                <TableCell align="center">LOWESTPRICE</TableCell>
                                <TableCell align="center">PCPRICE</TableCell>
                                <TableCell align="center">MOBILEPRICE</TableCell>
                                <TableCell align="center">AVERAGEPRICE</TableCell>
                                <TableCell align="center">TOTALPRICE</TableCell>
                                <TableCell align="center">SHOPQUANTITY</TableCell>
                                <TableCell align="center">DISCONTINUED</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell  scope="row"> {row.val1} </TableCell>
                                    <TableCell > {row.val2} </TableCell>
                                    <TableCell > {row.val3} </TableCell>
                                    <TableCell > {row.val4} </TableCell>
                                    <TableCell > {row.val5} </TableCell>
                                    <TableCell > {row.val6} </TableCell>
                                    <TableCell > {row.val7} </TableCell>
                                    <TableCell > {row.val8} </TableCell>
                                    <TableCell > {row.val9} </TableCell>
                                    <TableCell > {row.val10} </TableCell>
                                    <TableCell > {row.val11} </TableCell>
                                    <TableCell > {row.val12} </TableCell>
                                    <TableCell > {row.val13} </TableCell>
                                    <TableCell > {row.val14} </TableCell>
                                    <TableCell > {row.val15} </TableCell>
                                    <TableCell > {row.val16} </TableCell>
                                    <TableCell > {row.val17} </TableCell>
                                    <TableCell > {row.val18} </TableCell>
                                    <TableCell > {row.val19} </TableCell>
                                    <TableCell > {row.val20} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    </div>)
}
function IndexedData() {
    const classes = useStyles()
    return (<div>
        <br/>
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <form noValidate autoComplete="off" className={classes.form}>
                            <InputBase
                                className={classes.input}
                                placeholder="ID"
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <Search />
                            </IconButton>
                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={100}
                            rowsPerPage={10}
                            page={0}
                            backIconButtonProps={{
                                "aria-label": "Previous Page"
                            }}
                            nextIconButtonProps={{
                                "aria-label": "Next Page"
                            }}
                            // onChangePage={this.handleChangePage}
                            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>아이디</TableCell>
                                <TableCell>값</TableCell>
                                <TableCell>분석결과</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {indexRows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell  scope="row"> {row.val1} </TableCell>
                                    <TableCell > {row.val2} </TableCell>
                                    <TableCell > {row.val3} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    </div>)
}
const tabs = [
    {label: "기본", component: OriginalData},
    {label: "분석된 색인어", component: IndexedData},
];


function IndexData() {
    const classes = useStyles();
    const [indices, setIndices] = React.useState('VM');
    const handleChange = (event) => {
        setIndices(event.target.value);
    };
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Helmet title="데이터"/>

            <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">인덱스</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={indices}
                        onChange={handleChange}
                    >
                        <MenuItem value={"VM"}>VM</MenuItem>
                        <MenuItem value={"V01"}>V01</MenuItem>
                        <MenuItem value={"V02"}>V02</MenuItem>
                        <MenuItem value={"V03"}>V03</MenuItem>
                        <MenuItem value={"V04"}>V04</MenuItem>
                        <MenuItem value={"V05"}>V05</MenuItem>
                        <MenuItem value={"V06"}>V06</MenuItem>
                        <MenuItem value={"V07"}>V07</MenuItem>
                        <MenuItem value={"V08"}>V08</MenuItem>
                        <MenuItem value={"V09"}>V09</MenuItem>
                        <MenuItem value={"V10"}>V10</MenuItem>
                        <MenuItem value={"V11"}>V11</MenuItem>
                        <MenuItem value={"V12"}>V12</MenuItem>
                        <MenuItem value={"V13"}>V13</MenuItem>
                        <MenuItem value={"V14"}>V14</MenuItem>
                        <MenuItem value={"V15"}>V15</MenuItem>
                        <MenuItem value={"V16"}>V16</MenuItem>
                        <MenuItem value={"V17"}>V17</MenuItem>
                        <MenuItem value={"V18"}>V18</MenuItem>
                        <MenuItem value={"V19"}>V19</MenuItem>
                        <MenuItem value={"V20"}>V20</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <br/>

            <Typography variant="h3" gutterBottom display="inline">
                데이터
            </Typography>

            <Divider my={6}/>


            <AntTabs tabs={tabs}/>

        </React.Fragment>
    );
}

export default IndexData;
