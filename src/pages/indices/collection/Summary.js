import React, { useState } from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider, FormControl,
    Grid as MuiGrid, MenuItem, Select,
    Typography as MuiTypography,
    Menu,
    Link, Table, TableBody, TableRow, TableHead, TableCell, CardContent, Hidden,Chip
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"
import SearchIcon from "@material-ui/icons/Search";
import {ArrowDropDown, Check} from "@material-ui/icons";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);
const Box =  styled(MuiBox)(spacing, positions);
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


function Summary() {
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }

    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>컬렉션 이름</b>
                                </Grid>
                                <Grid item xs={9}>
                                    검색상품
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>컬렉션 아이디</b>
                                </Grid>
                                <Grid item xs={9}>
                                    search-prod
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>인덱스 템플릿</b>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link>
                                        search-prod
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>인덱스 패턴</b>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link>search-prod-a</Link>
                                    ,
                                    <Link>search-prod-b</Link>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={2} align={"right"}>
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
                                <MenuItem onClick={toggleMoreMenu}>
                                    컬렉션 삭제
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>

                    <Box mt={5}>
                        <Typography variant={"h5"}>
                            스왑 인덱스
                        </Typography>
                    </Box>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={6}>
                            <Box px={5} py={2}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell  variant={"head"} component={"th"} colSpan={4} style={{fontSize: "1.2em"}} align={"center"}>
                                                search-prod-a
                                                <Box component={"span"} style={{marginLeft: "20px"}}>
                                                    <Chip color="primary" icon={<Check />} label={"사용"}/>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>상태</TableCell>
                                            <TableCell>
                                                <Box style={{backgroundColor: "green", width: "20px", height: "20px", borderRadius: "90px", float: "left"}}> </Box>
                                                <Box style={{marginLeft: "30px"}}>
                                                    정상
                                                </Box>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>프라이머리</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>123123</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>23</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>스토리지 용량</TableCell>
                                            <TableCell>1.5mb</TableCell>
                                            <TableCell variant={"head"} component={"th"}>프라이머리 <br/> 스토리지용량</TableCell>
                                            <TableCell>33mb</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>별칭</TableCell>
                                            <TableCell>search-prod</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <Box px={5} py={2}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} style={{fontSize: "1.2em"}} align={"center"}>
                                                search-prod-b
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>상태</TableCell>
                                            <TableCell>
                                                <Box style={{backgroundColor: "green", width: "20px", height: "20px", borderRadius: "90px", float: "left"}}> </Box>
                                                <Box style={{marginLeft: "30px"}}>
                                                    정상
                                                </Box>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>프라이머리</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>123123</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>23</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>스토리지 용량</TableCell>
                                            <TableCell>1.5mb</TableCell>
                                            <TableCell variant={"head"} component={"th"}>프라이머리 <br/> 스토리지용량</TableCell>
                                            <TableCell>33mb</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant={"head"} component={"th"}>별칭</TableCell>
                                            <TableCell>search-prod</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default Summary;
