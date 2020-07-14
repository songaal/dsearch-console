import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Grid as MuiGrid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {
    addCollectionList,
    setCollectionIndexSuffix,
    setCollectionList,
    setMatchedIndexTemplates
} from "../../../redux/actions/collectionActions";
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

function Collection({dispatch, indexSuffixA, indexSuffixB, collectionList}) {
    const history = useHistory();
    const classes = useStyles();
    const [openAddModal, setOpenAddModal] = useState(false)
    const [createName, setCreateName] = useState("")
    const [createBaseId, setCreateBaseId] = useState("")
    const [applyIndexTemplates, setApplyIndexTemplates] = useState([])
    const [createNameError, setCreateNameError] = useState(false)
    const [createBaseIdError, setCreateBaseIdError] = useState(false)
    const [modalMessage,setModalMessage] = useState(null)
    const [process, setProcess] = useState(false)

    useEffect(() => {
        dispatch(setCollectionIndexSuffix())
        dispatch(setIndexTemplatesAction())
        dispatch(setCollectionList())
    }, [])

    function toggleOpenAddModal() {
        setProcess(false)
        setModalMessage(null)
        setCreateNameError(false)
        setCreateBaseIdError(false)
        setApplyIndexTemplates([])
        setCreateName("")
        setCreateBaseId("")
        setOpenAddModal(!openAddModal)
    }

    function moveDetail(id) {
        history.push(`./collections/${id}`)
    }
    function moveIndex(indexId) {
        if (indexId === undefined || indexId === null || indexId === "") {
            return false
        }
        history.push(`../indices/${indexId}`)
    }

    function handleChangeBaseId(event) {
        setCreateBaseIdError(false)
        setCreateBaseId(event.target.value)
        if (event.target.value !== "") {
            setApplyIndexTemplates([event.target.value + indexSuffixA, event.target.value + indexSuffixB])
        } else {
            setApplyIndexTemplates([])
        }
        // dispatch(setMatchedIndexTemplates(event.target.value)).then(response => {
        //     console.log(response)
        // })
    }

    function handleAddCollection() {
        if (createName === "") {
            setCreateNameError(true)
            return false
        }
        if (createBaseId === "" || createBaseId.startsWith(".") || !/[a-z0-9]/gi.test(createBaseId)) {
            setCreateBaseIdError(true)
            return false
        }
        setProcess(true)
        dispatch(addCollectionList({
            name: createName,
            baseId: createBaseId
        })).then(response => {
            toggleOpenAddModal()
            setTimeout(() => {
                dispatch(setCollectionList())
            }, 500)
        }).catch(error => {
            setCreateBaseIdError(true)
            setModalMessage("추가 실패.")
            console.log('error', error)
        })
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
                        {
                            collectionList.map((collection, num) => {
                                const id = collection['id']
                                const name = collection['name']
                                const baseId = collection['baseId']
                                const indexA = collection['indexA']||{}
                                const indexB = collection['indexB']||{}

                                const indexAAlias = indexA['aliases'] && Object.keys(indexA['aliases']).find(alias => alias === baseId)
                                const isActiveA = indexAAlias !== undefined && indexAAlias !== null

                                const indexBAlias = indexB['aliases'] && Object.keys(indexB['aliases']).find(alias => alias === baseId)
                                const isActiveB = indexBAlias !== undefined && indexBAlias !== null

                                return (
                                    <TableRow key={collection['id']}>
                                        <TableCell align="center">{num + 1}</TableCell>
                                        <TableCell align="center">
                                            <Link className={classes.link} onClick={() => moveDetail(id)}>{name}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link className={classes.link} onClick={() => moveDetail(id)}>{baseId}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link style={{display: isActiveA ? "block" : "none"}}
                                                  onClick={() => moveIndex(indexA['uuid'])}
                                                  className={classes.link} >{indexA['index']}</Link>
                                            <Link style={{display: isActiveB ? "block": "none"}}
                                                  onClick={() => moveIndex(indexB['uuid'])}
                                                  className={classes.link} >{indexB['index']}</Link>

                                            <Box style={{display: isActiveA === false && isActiveB === false ? "block" : "none"}}> - </Box>

                                        </TableCell>
                                        <TableCell align="center">
                                            <Box style={{display: isActiveA ? "block" : "none"}}>
                                                P[{indexA['pri']||'-'}] R[{indexA['rep']||'-'}]
                                            </Box>
                                            <Box style={{display: isActiveB ? "block" : "none"}}>
                                                P[{indexB['pri']||'-'}] R[{indexB['rep']||'-'}]
                                            </Box>
                                            <Box style={{display: isActiveA === false && isActiveB === false ? "block" : "none"}}> - </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box style={{display: isActiveA ? "block" : "none"}}>
                                                {indexA['docsCount']||'-'}
                                            </Box>
                                            <Box style={{display: isActiveB ? "block" : "none"}}>
                                                {indexB['docsCount']||'-'}
                                            </Box>
                                            <Box style={{display: isActiveA === false && isActiveB === false ? "block" : "none"}}> - </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box style={{display: isActiveA ? "block" : "none"}}>
                                                {indexA['storeSize']||'-'}
                                            </Box>
                                            <Box style={{display: isActiveB ? "block" : "none"}}>
                                                {indexB['storeSize']||'-'}
                                            </Box>
                                            <Box style={{display: isActiveA === false && isActiveB === false ? "block" : "none"}}> - </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
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
                            <TextField fullWidth
                                       autoFocus
                                       value={createName}
                                       onChange={event => {setCreateNameError(false); setCreateName(event.target.value)}}
                                       placeholder={"상품컬렉션"}
                                       error={createNameError}
                            />
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Grid item xs={4} mt={2}>
                            컬렉션 아이디
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth
                                       value={createBaseId}
                                       onChange={handleChangeBaseId}
                                       placeholder={"product-collection"}
                                       error={createBaseIdError}
                            />
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Grid item xs={4}>
                            인덱스 템플릿
                        </Grid>
                        <Grid item xs={8}>
                            {applyIndexTemplates.join(",")}
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Grid item xs={4}>
                            인덱스 패턴
                        </Grid>
                        <Grid item xs={8}>
                            {createBaseId !== "" ? createBaseId + indexSuffixA + ", " : ""}
                            {createBaseId !== "" ? createBaseId + indexSuffixB : ""}
                        </Grid>
                    </Grid>
                    <Grid container my={3} style={{display: modalMessage ? "none" : "block", color: "red", textAlign: "center"}}>
                        <Grid item xs={12}>
                            {modalMessage}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddCollection}
                            disabled={process}
                            variant={"outlined"}
                            color={"primary"}
                    >추가</Button>
                    <Button onClick={toggleOpenAddModal}
                            variant={"outlined"}
                            color={"default"}
                    >취소</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({...store.collectionReducers, ...store.indexTemplateReducers}))(Collection);
