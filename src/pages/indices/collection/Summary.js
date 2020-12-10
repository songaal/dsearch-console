import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import styled from "styled-components";

import {
    Box as MuiBox,
    Button as MuiButton,
    IconButton as MuiIconButton,
    Card as MuiCard,
    CardContent,
    Chip,
    Divider as MuiDivider,
    Grid as MuiGrid,
    Link,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography as MuiTypography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {ArrowDropDown, Check} from "@material-ui/icons";
import {setCollection, deleteCollectionAction, setCollectionList, editCollectionSourceAction, editCollectionAliasAction} from "../../../redux/actions/collectionActions";
import {red, blue, orange} from "@material-ui/core/colors";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import AceEditor from "react-ace";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);
const Box =  styled(MuiBox)(spacing, positions);
const IconButton = styled(MuiIconButton)(spacing, positions);

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


function Summary({dispatch, authUser, collection}) {
    const history = useHistory();
    const classes = useStyles();

    console.log(collection)
    const replicas = useRef(null);
    const refresh_interval = useRef(null);

    const [moreMenu, setMoreMenu] = useState(null)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDsearchModal, setOpenDsearchModal] = useState(false)
    const [editName, setEditName] = useState(collection['name'])
    const [selectedAlias, setSelectedAlias] = useState({})
    const [openUpdateAliasModal, setOpenUpdateAliasModal] = useState(false)

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }

    function handleDeleteCollection(event) {
        toggleMoreMenu(event)
        dispatch(deleteCollectionAction(collection['id'])).then(response => {
            dispatch(setCollectionList())
            setTimeout(() => history.push("../indices-collections"), 500)
        }).catch(error => {
            console.log(error)
        })
    }

    function handleEditNameCollection(event) {
        toggleMoreMenu(event)
        collection['name'] = editName;
        dispatch(editCollectionSourceAction(collection['id'], collection)).then(response => {
            dispatch(setCollectionList())
            setTimeout(() => history.push("../indices-collections"), 500)
        }).catch(error => {
            console.log(error)
        })
    }

    function handleEditDsearchSettings(event) {
        toggleMoreMenu(event)
        
        collection['replicas'] = replicas.current.value;
        collection['refresh_interval'] = refresh_interval.current.value;
        console.log(collection)
        dispatch(editCollectionSourceAction(collection['id'], collection)).then(response => {
            dispatch(setCollectionList())
            setOpenDsearchModal(false)
            // setTimeout(() => history.push("../indices-collections"), 500)
        }).catch(error => {
            console.log(error)
        })
    }

    function handleUpdateAlias() {
        const alias       = selectedAlias['alias']
        const addIndex    = selectedAlias['add']
        const removeIndex = selectedAlias['remove']

        let actions = []
        actions.push({
            add: {
                index: addIndex,
                alias: alias
            }
        })

        if (removeIndex) {
            actions.push({
                remove: {
                    index: removeIndex,
                    alias: alias
                }
            })
        }

        dispatch(editCollectionAliasAction(actions))
            .then(body => {
                dispatch(setCollection(collection['id']))
                setOpenUpdateAliasModal(false)
            })

    }

    const indexA = collection['indexA']
    const indexB = collection['indexB']
    // authUser.role.index =false;
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
                                    {collection['name']}
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>컬렉션 아이디</b>
                                </Grid>
                                <Grid item xs={9}>
                                    {collection['baseId']}
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>인덱스 템플릿</b>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link style={{cursor: "pointer"}}
                                          onClick={() => {history.push(`../indices-templates/${collection['baseId']}`)}}
                                    >
                                        {collection['baseId']}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>인덱스 패턴</b>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link mx={1} style={{cursor: "pointer",
                                        display: collection['indexA']['uuid'] ? "inline" : "none"
                                    }}
                                          onClick={() => {history.push(`../indices/${collection['indexA']['uuid']}`)}}
                                    >
                                        {collection['indexA']['index']}
                                    </Link>
                                    <Box component={"span"}
                                         style={{display: collection['indexA']['uuid'] ? "none" : "inline"}}>
                                        {collection['indexA']['index']}
                                    </Box>
                                    ,
                                    <Link mx={1} style={{cursor: "pointer",
                                        display: collection['indexB']['uuid'] ? "inline" : "none"
                                    }}
                                          onClick={() => {history.push(`../indices/${collection['indexB']['uuid']}`)}}
                                    >
                                        {collection['indexB']['index']}
                                    </Link>
                                    <Box component={"span"}
                                         style={{display: collection['indexB']['uuid'] ? "none" : "inline"}}>
                                        {collection['indexB']['index']}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                    <b>인덱스 설정</b>
                                </Grid>
                                <Grid item xs={9}>
                                    <Box component={"span"}
                                         style={{display: "inline"}}>
                                         레플리카 갯수: {collection['replicas'] ? collection['replicas'] : "1"}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container my={3}>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={9}>
                                    <Box component={"span"}
                                         style={{display: "inline"}}>
                                        리프레시 주기: {collection['refresh_interval'] ? collection['refresh_interval'] + "s" : "1s"}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} align={"right"}>
                            {
                                authUser.role.index ?
                                    <React.Fragment>
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
                                            getContentAnchorEl={null}
                                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                                        >
                                            <MenuItem onClick={() => setOpenEditModal(true)}>
                                                컬렉션 이름 변경
                                            </MenuItem>
                                            <MenuItem onClick={() => setOpenDsearchModal(true)}>
                                                디서치 설정 변경
                                            </MenuItem>
                                            <MenuItem style={{backgroundColor: red["300"]}} onClick={() => setOpenRemoveModal(true)}>
                                                컬렉션 삭제
                                            </MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>

                                    </React.Fragment>
                            }
                            <Box>

                            </Box>
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
                                                {indexA['index']}

                                                {
                                                    Object.keys(indexA['aliases']||{}).find(o => o === collection['baseId']) ?
                                                        <Box component={"span"} style={{marginLeft: "20px"}}>
                                                            <Chip color="primary" icon={<Check />} label={"사용 중"}/>
                                                        </Box>
                                                        :
                                                        indexA['uuid'] ?
                                                            <Box component={"span"} style={{marginLeft: "20px"}}>
                                                                <Chip icon={<Check />}
                                                                      label={"사용하기"}
                                                                      style={{cursor: "pointer"}}
                                                                      onClick={() => {
                                                                          setSelectedAlias({
                                                                              alias: collection['baseId'],
                                                                              add: indexA['index'],
                                                                              remove: indexB['uuid'] ? indexB['index'] : null
                                                                          })
                                                                          setOpenUpdateAliasModal(true);
                                                                      }}
                                                                />
                                                                {/*<Box component={"span"} style={{marginLeft: "20px"}}>*/}
                                                                {/*    <Chip color="secondary" icon={<Check />} label={"사용하기"}/>*/}
                                                                {/*</Box>*/}
                                                            </Box>
                                                            :
                                                            null
                                                }

                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "none" : "table-row"}}>
                                            <TableCell colSpan={4} >
                                                <Box align={"center"}>
                                                    아직 인덱스가 생성되지 않았습니다.
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>상태</TableCell>

                                            <TableCell>
                                                <Box style={{backgroundColor: indexA['health'], width: "20px", height: "20px", borderRadius: "90px", float: "left"}}> </Box>
                                                <Box style={{marginLeft: "30px"}}>
                                                    { indexA['health'] === "green" ? "정상" : indexA['health'] === "yellow" ? "주의" : "에러" }
                                                </Box>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>프라이머리</TableCell>
                                            <TableCell>{indexA['pri'] ? Number(indexA['pri']).toLocaleString() : "-"}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>{indexA['rep'] ? Number(indexA['rep']).toLocaleString() : "-"}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>{indexA['docsCount'] ? Number(indexA['docsCount']).toLocaleString() : "0"}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>{indexA['docsDeleted'] ? Number(indexA['docsDeleted']).toLocaleString() : "0"}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>스토리지 용량</TableCell>
                                            <TableCell>{indexA['storeSize']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>프라이머리 <br/> 스토리지용량</TableCell>
                                            <TableCell>{indexA['priStoreSize']}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>별칭</TableCell>
                                            <TableCell>
                                                {
                                                    Object.keys(indexA['aliases']||{}).join(",")
                                                }
                                            </TableCell>
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
                                            <TableCell  variant={"head"} component={"th"} colSpan={4} style={{fontSize: "1.2em"}} align={"center"}>
                                                {indexB['index']}

                                                {
                                                    Object.keys(indexB['aliases']||{}).find(o => o === collection['baseId']) ?
                                                        <Box component={"span"} style={{marginLeft: "20px"}}>
                                                            <Chip color="primary" icon={<Check />} label={"사용 중"}/>
                                                        </Box>
                                                        :
                                                        indexB['uuid'] ?
                                                            <Box component={"span"} style={{marginLeft: "20px"}}>
                                                                <Chip icon={<Check />}
                                                                      label={"사용하기"}
                                                                      style={{cursor: "pointer"}}
                                                                      onClick={() => {
                                                                          setSelectedAlias({
                                                                              alias: collection['baseId'],
                                                                              add: indexB['index'],
                                                                              remove: indexA['uuid'] ? indexA['index'] : null
                                                                          })
                                                                          setOpenUpdateAliasModal(true);
                                                                      }}
                                                                />
                                                            </Box>
                                                            :
                                                            null
                                                }

                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "none" : "table-row"}}>
                                            <TableCell colSpan={4} >
                                                <Box align={"center"}>
                                                    아직 인덱스가 생성되지 않았습니다.
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>상태</TableCell>

                                            <TableCell>
                                                <Box style={{backgroundColor: indexB['health'], width: "20px", height: "20px", borderRadius: "90px", float: "left"}}> </Box>
                                                <Box style={{marginLeft: "30px"}}>
                                                    { indexB['health'] === "green" ? "정상" : indexB['health'] === "yellow" ? "주의" : "에러" }
                                                </Box>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>프라이머리</TableCell>
                                            <TableCell>{indexB['pri'] ? Number(indexA['pri']).toLocaleString() : "-"}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>{indexB['rep'] ? Number(indexB['rep']).toLocaleString() : "-"}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>{indexB['docsCount'] ? Number(indexB['docsCount']).toLocaleString() : "0"}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>{indexB['docsDeleted'] ? Number(indexB['docsDeleted']).toLocaleString() : "0"}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>스토리지 용량</TableCell>
                                            <TableCell>{indexB['storeSize']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>프라이머리 <br/> 스토리지용량</TableCell>
                                            <TableCell>{indexB['priStoreSize']}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>별칭</TableCell>
                                            <TableCell>
                                                {
                                                    Object.keys(indexB['aliases']||{}).join(",")
                                                }
                                            </TableCell>
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

            <Dialog open={openRemoveModal} fullWidth={true}>
                <DialogTitle>컬랙션 삭제</DialogTitle>
                <DialogContent>
                    <Box style={{color: red['500']}}> 선택하신 컬랙션을 삭제 하시겠습니까? </Box>
                </DialogContent>
                <DialogActions>
                    <Button style={{backgroundColor: red['200']}}
                            variant="contained"
                            onClick={handleDeleteCollection}
                    >
                        삭제
                    </Button>
                    <Button onClick={() => setOpenRemoveModal(false)}
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditModal} fullWidth={true}>
                <DialogTitle>컬랙션 이름 변경</DialogTitle>
                <DialogContent>
                <TextField 
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    fullWidth
                    placeholder={"변경할 이름을 입력해 주세요"} />
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        variant="contained"
                        onClick={handleEditNameCollection}
                    >
                        수정
                    </Button>
                    <Button onClick={() => setOpenEditModal(false)}
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDsearchModal} fullWidth={true}>
                <DialogTitle>디서치 설정</DialogTitle>
                <DialogContent>
                    <Box flex={true}>
                        <b>레플리카 갯수 설정</b>
                        <TextField 
                            fullWidth  
                            defaultValue={collection['replicas'] ? collection['replicas'] : 1}  
                            inputRef={replicas}
                            placeholder={"레플리카 갯수를 설정해 주세요"} 
                        />
                        <br />
                        <br />
                        <b>세그먼트 생성 주기</b>
                        <TextField 
                            fullWidth
                            placeholder={"세그먼트 생성 주기를 입력해주세요"} 
                            defaultValue={collection['refresh_interval'] ? collection['refresh_interval'] : 1} 
                            inputRef={refresh_interval} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: blue['200'] }}
                        onClick={handleEditDsearchSettings}
                        variant="contained">
                        수정
                    </Button>
                    <Button
                        onClick={() => setOpenDsearchModal(false)}
                        variant="contained">

                        취소
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openUpdateAliasModal}
                    fullWidth={true}
                    onClose={() => setOpenUpdateAliasModal(false)}
            >
                <DialogTitle>별칭 교체</DialogTitle>
                <DialogContent>
                    별칭을 교체하시겠습니까?<br />
                    <p style={{color: "red"}}>
                        * 기존 스왑인덱스에 할당된 별칭은 제거 됩니다.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: orange['200'] }}
                        onClick={() => handleUpdateAlias()}
                        variant="contained">
                        교체
                    </Button>
                    <Button
                        onClick={() => setOpenUpdateAliasModal(false)}
                        variant="contained">

                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    ...store.collectionReducers
}))(Summary);
