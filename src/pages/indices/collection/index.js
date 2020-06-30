import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
    Grid as MuiGrid,
    TextField,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {setIndexTemplatesAction} from "../../../redux/actions/indexTemplateActions";

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
    },
    link: {
        cursor: "pointer"
    }
}));

function Collection() {
    const history = useHistory();
    const classes = useStyles();
    const [openAddModal, setOpenAddModal] = useState(false)

    function toggleOpenAddModal() {
        setOpenAddModal(!openAddModal)
    }

    function moveDetail(id) {
        history.push(`./collections/${id}`)
    }

    return (
        <React.Fragment>
            <Helmet title="컬렉션"/>

            <br/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                컬렉션
            </Typography>

            <Divider my={6}/>

            <Box align={'right'}>
                <Link className={classes.link}
                      onClick={toggleOpenAddModal}
                      color={"primary"}
                >
                    컬렉션 생성
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
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(1)}>검색상품</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(1)}>search-prod</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} >search-prod-a</Link></TableCell>
                            <TableCell align="center">P[3] R[6]</TableCell>
                            <TableCell align="center">1,234,561,345</TableCell>
                            <TableCell align="center">20gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(2)}>기준상품</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(2)}>vm</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} >vm-a</Link></TableCell>
                            <TableCell align="center">P[23] R[36]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">220gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(3)}>기준상품</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(3)}>vm</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} >vm-a</Link></TableCell>
                            <TableCell align="center">P[55] R[6]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">203gb</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">4</TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(4)}>기준상품</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} onClick={() => moveDetail(4)}>vm</Link></TableCell>
                            <TableCell align="center"><Link className={classes.link} >vm-a</Link></TableCell>
                            <TableCell align="center">P[3] R[16]</TableCell>
                            <TableCell align="center">561,345</TableCell>
                            <TableCell align="center">208gb</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <Dialog open={openAddModal}
                    fullWidth
                    onClose={toggleOpenAddModal}
            >
                <DialogTitle>
                    컬렉션 추가
                </DialogTitle>
                <DialogContent>
                    <Grid container my={3}>
                        <Grid item xs={4} mt={2}>
                            컬렉션 이름
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Grid item xs={4} mt={2}>
                            컬렉션 아이디
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Grid item xs={4}>
                            인덱스 템플릿
                        </Grid>
                        <Grid item xs={8}>
                            test
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
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
                    <Button onClick={toggleOpenAddModal}>취소</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default Collection;
