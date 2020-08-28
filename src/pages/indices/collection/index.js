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
    addCollectionList, setCatIndexTemplateList,
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

function Collection({dispatch, authUser, indexSuffixA, indexSuffixB, collectionList, catIndexTemplateList}) {
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
    const [addBtnDisabled, setAddBtnDisabled] = useState(true)

    useEffect(() => {
        dispatch(setCollectionIndexSuffix())
        dispatch(setIndexTemplatesAction())
        dispatch(setCollectionList())
        dispatch(setCatIndexTemplateList())
    }, [])

    function toggleOpenAddModal() {
        setAddBtnDisabled(true)
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
        history.push(`./indices-collections/${id}`)
    }
    function moveIndex(indexId) {
        if (indexId === undefined || indexId === null || indexId === "") {
            return false
        }
        history.push(`./indices/${indexId}`)
    }

    function handleChangeBaseId(event) {
        setCreateBaseIdError(false)
        setCreateBaseId(event.target.value)
        let inValid = false
        if (event.target.value.length > 1 && (!/^[a-z]+[a-z0-9-_]/g.test(event.target.value))) {
            setCreateBaseIdError(true)
            inValid = true
        } else if (event.target.value.length === 1 && /[0-9]/g.test(event.target.value)) {
            setCreateBaseIdError(true)
            inValid = true
        } else if (event.target.value.startsWith(".")) {
            setCreateBaseIdError(true)
            inValid = true
        } else if (/[A-Z]/g.test(event.target.value)) {
            setCreateBaseIdError(true)
            inValid = true
        } else if (/[ㄱ-ㅎ가-힣]/g.test(event.target.value)) {
            setCreateBaseIdError(true)
            inValid = true
        }

        if (event.target.value !== "") {

            let tmpMatched = []
            catIndexTemplateList.forEach(catIndexTemplate => {
                let patternList = catIndexTemplate['index_patterns']
                patternList = patternList.substring(1, patternList.length - 1).split(", ")
                patternList.forEach(pattern => {
                    const re = new RegExp(pattern.replace(/\*/gi, "\\S*"), 'gi')
                    if (event.target.value.match(re) !== null || (event.target.value + indexSuffixA) === pattern || (event.target.value + indexSuffixB) === pattern) {
                        tmpMatched.push({
                            ...catIndexTemplate,
                            index_patterns: patternList
                        })
                        return false
                    }
                })
            })
            if(!tmpMatched.find(matched => matched['name'] === (event.target.value + indexSuffixA))) {
                tmpMatched.push({name: event.target.value + indexSuffixA, index_patterns: [event.target.value + indexSuffixA]})
            }
            if (!tmpMatched.find(matched => matched['name'] === event.target.value + indexSuffixB)) {
                tmpMatched.push({name: event.target.value + indexSuffixA, index_patterns: [event.target.value + indexSuffixB]})
            }

            // console.log(tmpMatched)
            setApplyIndexTemplates(tmpMatched.map(matched => `${matched['name']} (${matched['index_patterns'].join(',')})`))
            // tmpMatched.map(matched => matched['name'])
            // setApplyIndexTemplates([event.target.value + indexSuffixA, event.target.value + indexSuffixB])

            if (createName.trim().length !== 0 && inValid === false) {
                setAddBtnDisabled(false)
            } else {
                setAddBtnDisabled(true)
            }

        } else {
            setAddBtnDisabled(true)
            setApplyIndexTemplates([])
        }
    }

    function handleAddCollection() {
        if (createName === "") {
            setCreateNameError(true)
            return false
        }
        // if (createBaseId === "" || createBaseId.startsWith(".") || !/[a-z0-9]/g.test(createBaseId)) {
        //     setCreateBaseIdError(true)
        //     return false
        // }
        if (createBaseId.length > 1 && (!/^[a-z]+[a-z0-9-_]/g.test(createBaseId))) {
            setCreateBaseIdError(true)
            return false
        } else if (createBaseId.length === 1 && /[0-9]/g.test(createBaseId)) {
            setCreateBaseIdError(true)
            return false
        } else if (createBaseId.startsWith(".")) {
            setCreateBaseIdError(true)
            return false
        } else if (/[A-Z]/g.test(createBaseId)) {
            setCreateBaseIdError(true)
            return false
        } else if (/[ㄱ-ㅎ가-힣]/g.test(createBaseId)) {
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
                setTimeout(() => {
                    dispatch(setCollectionList())
                }, 500)
            }, 500)
            setProcess(false)
        }).catch(error => {
            setCreateBaseIdError(true)
            setModalMessage("추가 실패.")
            console.log('error', error)
            setProcess(false)
        })
    }

    function checkCollectionName(event) {
        setCreateNameError(false);
        setCreateName(event.target.value);
        if (event.target.value.length !== 0 && createBaseId.length !== 0 && createBaseIdError === false) {
            setAddBtnDisabled(false)
        } else {
            setAddBtnDisabled(true)
        }
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
                {authUser.role.index ? <Link className={classes.link}
                      onClick={toggleOpenAddModal}
                      color={"primary"}
                >
                    컬렉션 생성
                </Link> : <></>}
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
                            <TableCell align="center">자동시작</TableCell>
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
                                        <TableCell align="center">
                                            <Box>
                                                {collection['scheduled']||'false'}
                                            </Box>
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
                                       onChange={checkCollectionName}
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
                            <ul>
                                {
                                    applyIndexTemplates.map((applyIndexTemplate, index) => {
                                        return (
                                            <li key={index}>
                                                {applyIndexTemplate}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
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
                            disabled={process || addBtnDisabled}
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

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    ...store.collectionReducers, 
    ...store.indexTemplateReducers
}))(Collection);
