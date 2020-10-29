import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import styled from "styled-components";

import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LaunchIcon from '@material-ui/icons/Launch';
import Helmet from 'react-helmet';
import {title} from "../../title.json";
import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Fab,
    Grid as MuiGrid,
    Link,
    MenuList,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {spacing} from "@material-ui/system";
import {
    addCluster,
    editCluster,
    removeClusterAction,
    setClusterList,
    setClusterStatus
} from "../../redux/actions/clusterActions";
import {red} from "@material-ui/core/colors";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Grid = styled(MuiGrid)(spacing);

const useStyles = makeStyles({
    title: {
        fontWeight: "bold"
    },
    addCardButton: {
        border: "1px solid"
    }
});

const ITEM_HEIGHT = 48;

function ClusterCard({classes, cluster, onEditClick, onRemoveClick, to, newTo, showMenu}) {
    const connection = cluster['status']['connection'] || false
    const name = cluster['cluster']['name']
    const seed = `${cluster['cluster']['scheme']}://${cluster['cluster']['host']}:${cluster['cluster']['port']}`
    const theme = cluster['cluster']['theme']
    let nodes = "N/A"
    let indices = "N/A"
    let shards = "N/A"
    let store = "N/A"
    if (connection) {
        nodes = Object.keys((cluster['status']||{})['nodes']||{}).length
        indices = cluster['status']['state']['indices']
        shards = cluster['status']['state']['shards']
        store = cluster['status']['state']['store']
    }

    const [openMenu, setOpenMenu] = React.useState(null);
    const open = Boolean(openMenu);

    const handleClick = (event) => {
        event.stopPropagation()
        setOpenMenu(event.currentTarget);
    };
    const handleClose = (event) => {
        event.stopPropagation()
        setOpenMenu(null);
    };

    const handleEdit = (event) => {
        event.stopPropagation()
        onEditClick(cluster)
        handleClose(event)
    }
    const handleRemove = (event) => {
        event.stopPropagation()
        onRemoveClick(cluster)
        handleClose(event)
    }

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card variant="outlined" style={{cursor: "pointer"}}>
                    <CardContent>
                        <Box style={{minHeight: "200px"}} onClick={to}>

                            <Box className={classes.title} align={"center"}>
                                {name}
                                <Box style={{position: "relative", height: "0px", right: "-45%", top: "15px"}}>
                                    <IconButton
                                        onClick={newTo}
                                        size={"small"}
                                    >
                                        <LaunchIcon />
                                    </IconButton>
                                </Box>

                                <Box style={{position: "relative", height: "0px", right: "-45%", top: "-25px", display: showMenu ? "block" : "none"}}>

                                    <IconButton
                                        onClick={handleClick}
                                        size={"small"}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={openMenu}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleEdit}> 수정 </MenuItem>
                                        <MenuItem onClick={handleRemove}> 삭제 </MenuItem>
                                    </Menu>

                                </Box>
                            </Box>


                            <Divider my={2} />

                            <Grid container mt={3}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        노드
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {seed}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        노드 수
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {nodes ? Number(nodes).toLocaleString() : "-"}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        인덱스
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {indices ? Number(indices).toLocaleString() : "-"}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        샤드
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {shards ? Number(shards).toLocaleString() : "-"}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        사용 용량
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {store}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        색상
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{ display: theme === "0" ? "block" : "none", backgroundColor: "rgb(27, 36, 48)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                    <Box style={{ display: theme === "1" ? "block" : "none", backgroundColor: "rgb(255, 255, 255)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                    <Box style={{ display: theme === "2" ? "block" : "none", backgroundColor: "rgb(25, 118, 210)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                    <Box style={{ display: theme === "3" ? "block" : "none", backgroundColor: "rgb(56, 142, 60)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                    <Box style={{ display: theme === "4" ? "block" : "none", backgroundColor: "rgb(57, 73, 171)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                    <Box style={{ display: theme === "5" ? "block" : "none", backgroundColor: "rgb(0, 121, 107)", width: "16px", height: "16px", borderRadius: "90px"}}> </Box>
                                </Grid>
                            </Grid>

                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        연결상태
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box style={{whiteSpace: "nowrap"}}>
                                        {connection ?
                                            <Box component={"span"} style={{color: "green"}}>정상</Box>
                                            :
                                            <Box component={"span"} style={{color: "red"}}>실패</Box>
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </CardContent>
            </Card>
        </Grid>
    )
}

function AddClusterCard(props) {
    const classes = props.className
    const display = props.showButton ? "block" : "none"
    return (
        <React.Fragment>
            <Grid item xs={12} md={6} lg={4} xl={3} style={{display: display}}>
                <Card variant="outlined" style={{minHeight: "245px"}}>
                    <CardContent>
                        <Box display="flex"
                             justifyContent="center"
                             m={1}
                             mt={10}
                             className={classes.title}
                        >
                            신규 클러스터 추가
                        </Box>
                        <Box display="flex"
                             justifyContent="center"
                             m={2}
                             mt={5}
                        >
                            <Fab color="primary"
                                 aria-label="add"
                                 onClick={() => props.handleClick()}
                            >
                                <AddIcon />
                            </Fab>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

function AddGuideCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card variant="outlined" style={{minHeight: "245px"}}>
                <CardContent>
                    <Box display="flex"
                         justifyContent="center"
                         m={1}
                         mt={15}
                         className={classes.title}
                    >
                        {title} 서버설치방법
                    </Box>
                    <Box display="flex"
                         justifyContent="center"
                         m={3}
                    >
                        <Link target="_blank" href="https://github.com/danawalab/dsearch-server/blob/master/README.md">
                            바로가기
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

function Cluster({ dispatch, clusterList, authUser }) {
    const history = useHistory()
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openEditModal, setOpenEditModal] = useState(false);

    const [scheme, setScheme] = useState("http")
    const [name, setName] = useState("")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [kibana, setKibana] = useState("")
    const [theme, setTheme] = useState(0)
    const [modalMessage, setModalMessage] = useState("")
    const [connTest, setConnTest] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [hostError, setHostError] = useState(false)
    const [portError, setPortError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [selectedClusterId, setSelectedClusterId] = useState("")
    const [openRemoveModal, setOpenRemoveModal] = useState(false)

    const [mode, setMode] = useState("ADD")

    const [isProcess, setProcess] = useState(false)

    useEffect(() => {
        dispatch(setClusterList())
    }, [])

    function toggleOpenAddModal() {
        setProcess(false)
        setMode("ADD")
        setNameError(false); setHostError(false); setPortError(false)
        setUsernameError(false); setPasswordError(false)
        setName(""); setScheme("http"); setHost(""); setPort("");
        setUsername(""); setPassword(""); setKibana("");
        setTheme(0); setModalMessage("");
        setConnTest(false)
        setOpenEditModal(!openEditModal)
    }
    function handleClusterTestProcess() {
        setConnTest(false)
        setModalMessage("")
        dispatch(setClusterStatus({ name, host, port, scheme, username, password })).then(status => {
            if (!status['connection']) {
                setConnTest(false)
                setModalMessage("연결 실패")
                return
            }
            setConnTest(true)
            const nodeSize = Object.values(status['nodes']).map(node => {
                const tmp = ((node['http'] || node['http']) || {})
                return tmp['publish_address'] ? `${scheme}://${tmp['publish_address']}` : null
            }).filter(addr => addr !== null).length
            setModalMessage("[연결 성공] 노드 수:" + nodeSize)
        }).catch(error => {
            setConnTest(false)
            setModalMessage("")
            setModalMessage("연결 실패")
            console.error(error)
        })
    }

    function resetError() {
        setNameError(false); setHostError(false); setPortError(false)
        setUsernameError(false); setPasswordError(false)
    }
    function requireValidation() {
        if (name === "") { setNameError(true); return false }
        if (host === "") { setHostError(true); return false }
        if (port === "" || port === "0") { setPortError(true); return false }
        if (scheme === "https") {
            if (username === "") { setUsernameError(true); return false }
            if (password === "") { setPasswordError(true); return false }
        }
        if (!connTest) { return false }
        return true
    }
    function handleAddClusterProcess() {
        setProcess(true)
        resetError()
        if(!requireValidation()) {
            return false
        }

        dispatch(addCluster({
            name, host, port, scheme,
            username, password,
            kibana, theme
        })).then(cluster => {
            setProcess(false)
            dispatch(setClusterList())
            toggleOpenAddModal()
        }).catch(error => {
            setProcess(false)
            console.log(error)
            setModalMessage(error.message||"error")
            alert("실패")
        })
    }

    function handleEditClusterProcess() {
        resetError()
        if(!requireValidation()) {
            return false
        }

        dispatch(editCluster(selectedClusterId, {
            name, host, port, scheme,
            username, password,
            kibana, theme
        })).then(cluster => {
            dispatch(setClusterList())
            toggleOpenEditModal()
        }).catch(error => {
            console.log(error)
            setModalMessage(error.message||"error")
            alert("실패")
        })
    }

    function toggleOpenEditModal(cluster) {
        setMode("EDIT")
        console.log('edit', cluster)
        setNameError(false); setHostError(false); setPortError(false)
        setUsernameError(false); setPasswordError(false)
        if (!openEditModal) {
            // opening..
            setSelectedClusterId(cluster['cluster']['id'])
            setName(cluster['cluster']['name']);
            setScheme(cluster['cluster']['scheme']);
            setHost(cluster['cluster']['host']);
            setPort(cluster['cluster']['port']);
            setUsername(cluster['cluster']['username'] || "");
            setPassword(cluster['cluster']['password'] || "");
            setKibana(cluster['cluster']['kibana'] || "");
            setTheme(cluster['cluster']['theme']);
        } else {
            setName(""); setScheme("http"); setHost(""); setPort("");
            setUsername(""); setPassword(""); setKibana("");
            setTheme(0);
        }
        setOpenEditModal(!openEditModal)
    }

    function toggleOpenRemoveModal(id) {
        setSelectedClusterId(id)
        setOpenRemoveModal(true)
    }

    function removeClusterProcess() {
        dispatch(removeClusterAction(selectedClusterId)).then(cluster => {
            dispatch(setClusterList())
            setSelectedClusterId("")
            setOpenRemoveModal(false)
        }).catch(error => {
            console.log(error)
            alert("실패")
        })
    }
    function goDashboard(id) {
        const link = document.createElement('a');
        link.setAttribute("href", `${id}/dashboard`)
        link.setAttribute("target", "_blank")
        document.body.appendChild(link);
        link.click()
    }

    function goNewDashboard(event, id) {
        event.stopPropagation()
        let width = window.outerWidth
        let height = window.outerHeight

        width = Math.ceil(width / 2) <= 1500 ? 1500 : Math.ceil(width / 2)
        height = (Math.ceil(height / 2) <= 900 ? 900 : Math.ceil(height / 2))

        window.open(`${id}/dashboard`,id,`location=no,directories=no,resizable=no,status=no,toolbar=no,menubar=no,left=${window.outerWidth / 5},top=50,scrollbars=yes,width=${width},height=${height}`)
    }

    const isManager = authUser['role']['manage']

    return (
        <React.Fragment>
            <Helmet title="클러스터"/>
            <Typography variant="h3" gutterBottom display="inline">
                클러스터
            </Typography>
            <Divider my={6}/>

            <Grid container spacing={6}>

                {clusterList.map(cluster => <ClusterCard key={cluster['cluster']['id']}
                                                         cluster={cluster}
                                                         classes={classes}
                                                         onEditClick={() => toggleOpenEditModal(cluster)}
                                                         onRemoveClick={() => toggleOpenRemoveModal(cluster['cluster']['id'])}
                                                         to={() => goDashboard(cluster['cluster']['id'])}
                                                         newTo={event => goNewDashboard(event, cluster['cluster']['id'])}
                                                         showMenu={isManager}
                />)}

                <AddClusterCard key={"add"}
                                className={classes}
                                handleClick={toggleOpenAddModal}
                                showButton={isManager}
                />

                <AddGuideCard key={"guide"}
                              className={classes}
                />

            </Grid>


            {/*        추가         */}
            <Dialog
                fullScreen={fullScreen}
                open={openEditModal}
                onClose={toggleOpenAddModal}
                fullWidth={true}
            >
                <DialogTitle>
                    클러스터 {mode === "ADD" ? "추가" : "수정"}
                </DialogTitle>
                <DialogContent aria-setsize={500}>

                    <Grid container>
                        <Grid item xs={4}>
                            <Box align={"center"} mt={2}>이름</Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField placeholder={"운영 클러스터"}
                                       value={name}
                                       error={nameError}
                                       onChange={event => setName(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Divider my={3} />

                    <Grid container>
                        <Grid item xs={4}>
                            <Box align={"center"} mt={2}>접속정보</Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box>
                                <Select value={scheme}
                                        onChange={event => setScheme(event.target.value)}
                                        fullWidth
                                >
                                    <MenuList variant={"menu"} value={"http"}>HTTP</MenuList>
                                    <MenuList variant={"menu"} value={"https"}>HTTPS</MenuList>
                                </Select>
                            </Box>
                            <Box mt={2}>
                                <TextField placeholder="127.0.0.1"
                                           fullWidth
                                           value={host}
                                           error={hostError}
                                           onChange={event => setHost(event.target.value)}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField placeholder="9200"
                                           fullWidth
                                           type="number"
                                           value={port}
                                           error={portError}
                                           onChange={event => setPort(event.target.value)}
                                />
                            </Box>
                            <Box display={scheme === "http" ? "none" : "block"}>
                                <Box mt={2}>
                                    <TextField placeholder="elastic"
                                               fullWidth
                                               error={usernameError}
                                               value={username}
                                               onChange={event => setUsername(event.target.value)}
                                    />
                                </Box>
                                <Box mt={2}>
                                    <TextField type="password"
                                               placeholder="********"
                                               fullWidth
                                               error={passwordError}
                                               value={password}
                                               onChange={event => setPassword(event.target.value)}

                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider my={3} />

                    <Grid container>
                        <Grid item xs={4}>
                            <Box align={"center"} mt={2}>키바나</Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box>
                                <TextField placeholder="http://kibana:5601"
                                           fullWidth
                                           value={kibana}
                                           onChange={event => setKibana(event.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Box align={"center"} mt={4}>색상</Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box mt={2}>
                                <Select value={theme}
                                        onChange={event => setTheme(event.target.value)}
                                        style={{width: "100%"}}
                                >
                                    <MenuList value={0} style={{width: "100%", backgroundColor: "rgb(27, 36, 48)"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(27, 36, 48)", color: "white"}}> Dark </Box>
                                    </MenuList>
                                    <MenuList value={1} style={{width: "100%", backgroundColor: "rgb(255, 255, 255)", color: "black"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(255, 255, 255)", color: "black"}}> Light </Box>
                                    </MenuList>
                                    <MenuList value={2} style={{width: "100%", backgroundColor: "rgb(25, 118, 210)", color: "white"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(25, 118, 210)", color: "white"}}> Blue </Box>
                                    </MenuList>
                                    <MenuList value={3} style={{width: "100%", backgroundColor: "rgb(56, 142, 60)", color: "white"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(56, 142, 60)", color: "white"}}> Green </Box>
                                    </MenuList>
                                    <MenuList value={4} style={{width: "100%", backgroundColor: "rgb(57, 73, 171)", color: "white"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(57, 73, 171)", color: "white"}}> Indigo </Box>
                                    </MenuList>
                                    <MenuList value={5} style={{width: "100%", backgroundColor: "rgb(0, 121, 107)", color: "white"}}>
                                        <Box style={{width: "100%", backgroundColor: "rgb(0, 121, 107)", color: "white"}}> Teal </Box>
                                    </MenuList>
                                </Select>
                            </Box>
                        </Grid>
                    </Grid>
                    <br/>
                    <Box display={modalMessage === "" ? "none" : "block"}>
                        {modalMessage}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleClusterTestProcess}> 연결테스트 </Button>
                    <Box display={mode === "ADD" ? "block" : "none"}>
                        <Button color="primary"
                                variant="contained"
                                disabled={!connTest || isProcess}
                                onClick={handleAddClusterProcess}
                        >
                            추가
                        </Button>
                    </Box>
                    <Box display={mode === "EDIT" ? "block" : "none"}>
                        <Button color="primary"
                                variant="contained"
                                disabled={!connTest}
                                onClick={handleEditClusterProcess}
                        >
                            저장
                        </Button>
                    </Box>
                    <Button onClick={toggleOpenAddModal}
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>


            {/*    삭제     */}

            <Dialog open={openRemoveModal} fullWidth={true}>
                <DialogTitle>클러스터 삭제</DialogTitle>
             <DialogContent>
                 <Box style={{color: red['500']}}> 선택하신 클러스터 삭제 하시겠습니까? </Box>
             </DialogContent>
                <DialogActions>
                    <Button style={{backgroundColor: red['200']}}
                            variant="contained"
                            onClick={removeClusterProcess}
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



        </React.Fragment>
    );
}

export default connect(store => ({ ...store.clusterReducers, ...store.dsearchReducers }))(Cluster);

