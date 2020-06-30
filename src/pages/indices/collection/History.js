import React, {useState} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Fade,
    Grid as MuiGrid,
    Link,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"
import SearchIcon from "@material-ui/icons/Search";
import {ArrowDropDown} from "@material-ui/icons";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    }
}));


function History() {
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }

    return (
        <React.Fragment>
            <br/>

            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>타입</TableCell>
                            <TableCell>결과</TableCell>
                            <TableCell>문서수</TableCell>
                            <TableCell>자동실행</TableCell>
                            <TableCell>시작</TableCell>
                            <TableCell>종료</TableCell>
                            <TableCell>소요시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>5</TableCell>
                            <TableCell>전파</TableCell>
                            <TableCell>성공</TableCell>
                            <TableCell>45,233</TableCell>
                            <TableCell>수동</TableCell>
                            <TableCell>2020-06-22 14:00:40</TableCell>
                            <TableCell>2020-06-22 15:00:40</TableCell>
                            <TableCell>1h</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>4</TableCell>
                            <TableCell>색인</TableCell>
                            <TableCell>성공</TableCell>
                            <TableCell>45,233</TableCell>
                            <TableCell>수동</TableCell>
                            <TableCell>2020-06-22 14:00:40</TableCell>
                            <TableCell>2020-06-22 15:00:40</TableCell>
                            <TableCell>1h</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>색인</TableCell>
                            <TableCell>성공</TableCell>
                            <TableCell>45,233</TableCell>
                            <TableCell>수동</TableCell>
                            <TableCell>2020-06-22 14:00:40</TableCell>
                            <TableCell>2020-06-22 15:00:40</TableCell>
                            <TableCell>1h</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>전파</TableCell>
                            <TableCell>성공</TableCell>
                            <TableCell>45,233</TableCell>
                            <TableCell>수동</TableCell>
                            <TableCell>2020-06-22 14:00:40</TableCell>
                            <TableCell>2020-06-22 15:00:40</TableCell>
                            <TableCell>1h</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>색인</TableCell>
                            <TableCell>성공</TableCell>
                            <TableCell>45,233</TableCell>
                            <TableCell>수동</TableCell>
                            <TableCell>2020-06-22 14:00:40</TableCell>
                            <TableCell>2020-06-22 15:00:40</TableCell>
                            <TableCell>1h</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>

            <br/>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Box align={"center"}>
                        <Box align={"center"}>
                            <Button variant={"outlined"}>
                                이전
                            </Button>
                            <Box component={"span"} m={3}>
                                1 / 3
                            </Box>
                            <Button variant={"outlined"}>
                                다음
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box align={'right'}>
                        <Button variant={"outlined"}
                                onClick={toggleMoreMenu}
                        >
                            더보기
                            <ArrowDropDown/>
                        </Button>
                        <Menu
                            anchorEl={moreMenu}
                            open={Boolean(moreMenu)}
                            onClose={toggleMoreMenu}
                        >
                            <MenuItem>
                                초가화
                            </MenuItem>
                            <MenuItem>
                                7일이전 모두 삭제
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default History;
