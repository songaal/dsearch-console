import React, {useEffect} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography as MuiTypography,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid, TextField,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {setIndexTemplatesAction} from "../../../redux/actions/indexTemplateActions";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);

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

function Collection() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Helmet title="컬랙션"/>

            <br/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                컬랙션
            </Typography>

            <Divider my={6}/>

            <Box align={'right'}>
                <Link href="#" onClick={() => console.log(123)} color={"primary"} >
                    컬랙션 생성
                </Link>
            </Box>

            <br/>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">아이디</TableCell>
                            <TableCell align="center">선택 인덱스</TableCell>
                            <TableCell align="center">샤드</TableCell>
                            <TableCell align="center">문서 수</TableCell>
                            <TableCell align="center">용량</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center"><Link href="#">검색상품</Link></TableCell>
                            <TableCell align="center"><Link href="#">search-prod</Link></TableCell>
                            <TableCell align="center"><Link href="#">search-prod-a</Link></TableCell>
                            <TableCell align="center">P[3] R[6]</TableCell>
                            <TableCell align="center">1,234,561,345</TableCell>
                            <TableCell align="center">20gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center"><Link href="#">기준상품</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm-a</Link></TableCell>
                            <TableCell align="center">P[23] R[36]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">220gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center"><Link href="#">기준상품</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm-a</Link></TableCell>
                            <TableCell align="center">P[55] R[6]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">203gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">4</TableCell>
                            <TableCell align="center"><Link href="#">기준상품</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm</Link></TableCell>
                            <TableCell align="center"><Link href="#">vm-a</Link></TableCell>
                            <TableCell align="center">P[3] R[16]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">208gb</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <Dialog open={false} fullWidth>
                <DialogTitle>
                    컬랙션 추가
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box>
                                컬랙션 이름
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            컬랙션 아이디
                        </Grid>
                        <Grid item xs={8}>
                            <TextField />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            인덱스 템플릿
                        </Grid>
                        <Grid item xs={8}>
                            매칭되는 템플릿 목록
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            인덱스 패턴
                        </Grid>
                        <Grid item xs={8}>
                            test-a, test-b
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button>추가</Button>
                    <Button>취소</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default Collection;
