import React, {useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import styled from "styled-components";

import {
    Box as MuiBox,
    Button as MuiButton,
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
import {deleteCollectionAction, setCollectionList, editCollectionSourceAction} from "../../../redux/actions/collectionActions";
import {red} from "@material-ui/core/colors";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

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


function Summary({dispatch, authUser, collection}) {
    const history = useHistory();
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editName, setEditName] = useState(collection['name'])

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
                                    </Link>,
                                    {/*<Link style={{cursor: "pointer"}}*/}
                                    {/*      onClick={() => {history.push(`../indices-templates/${collection['indexB']['index']}`)}}*/}
                                    {/*>*/}
                                    {/*    {collection['indexB']['index']}*/}
                                    {/*</Link>*/}
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
                                                            <Chip color="primary" icon={<Check />} label={"사용"}/>
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
                                            <TableCell>{indexA['pri']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>{indexA['rep']}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexA['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>{indexA['docsCount']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>{indexA['docsDeleted']}</TableCell>
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
                                                            <Chip color="primary" icon={<Check />} label={"사용"}/>
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
                                            <TableCell>{indexB['pri']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>레플리카</TableCell>
                                            <TableCell>{indexB['rep']}</TableCell>
                                        </TableRow>
                                        <TableRow style={{display: indexB['uuid'] ? "table-row" : "none"}}>
                                            <TableCell variant={"head"} component={"th"}>문서 수</TableCell>
                                            <TableCell>{indexB['docsCount']}</TableCell>
                                            <TableCell variant={"head"} component={"th"}>삭제문서 수</TableCell>
                                            <TableCell>{indexB['docsDeleted']}</TableCell>
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
        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    ...store.collectionReducers
}))(Summary);
