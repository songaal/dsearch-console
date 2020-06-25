import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import styled from "styled-components";

import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Helmet from 'react-helmet';

import {
    Box,
    Button,
    Card as MuiCard,
    CardActionArea,
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

import {spacing} from "@material-ui/system";
import {addCluster, setClusterList, setClusterStatus} from "../../redux/actions/clusterActions";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Grid = styled(MuiGrid)(spacing);

const useStyles = makeStyles({
    cardRoot: {
        minHeight: "200px"
    },
    title: {
        fontWeight: "bold"
    },
    addCardButton: {
        border: "1px solid"
    }
});

function ClusterCard({classes, cluster}) {
    const connection = cluster['status']['connection'] || false
    const name = cluster['cluster']['name']
    const seed = `${cluster['cluster']['scheme']}://${cluster['cluster']['host']}:${cluster['cluster']['port']}`
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

    function testDashboard() {
        location.href="/dashboard"
    }
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card variant="outlined">
                <CardActionArea className={classes.cardRoot} onClick={testDashboard}>
                    <CardContent style={{paddingTop: "0px"}}>
                        
                        <Box className={classes.title} align={"center"}>
                            {name}
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

                        <Grid container>
                            <Grid item xs={4}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    노드 수
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    {nodes}
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={4}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    인덱스
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    {indices}
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={4}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    샤드
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    {shards}
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container>
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

                        <Grid container>
                            <Grid item xs={4}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    연결상태
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box style={{whiteSpace: "nowrap"}}>
                                    {connection ?
                                        <Box style={{
                                            width: "16px", height: "16px",
                                            backgroundColor: "green",
                                            borderRadius: "90px"}}> </Box>
                                        :
                                        <Box style={{
                                            width: "16px", height: "16px",
                                            backgroundColor: "red",
                                            borderRadius: "90px" }}> </Box>
                                    }
                                </Box>
                            </Grid>
                        </Grid>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

function AddClusterCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card variant="outlined" className={classes.cardRoot}>
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
    )
}

function AddGuideCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card variant="outlined" className={classes.cardRoot}>
                <CardContent>
                    <Box display="flex"
                         justifyContent="center"
                         m={1}
                         mt={15}
                         className={classes.title}
                    >
                        FastcatX 서버설치방법
                    </Box>
                    <Box display="flex"
                         justifyContent="center"
                         m={3}
                    >
                        <Link href="#" onClick={() => console.log("click")}>
                            바로가기
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

function Cluster({ dispatch, clusterList }) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openAddModal, setOpenAddModal] = useState(false);

    const [scheme, setScheme] = useState("http")
    const [name, setName] = useState("")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [kibana, setKibana] = useState("")
    const [theme, setTheme] = useState(0)
    const [addModalMessage, setAddModalMessage] = useState("")
    const [addTest, setAddTest] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [hostError, setHostError] = useState(false)
    const [portError, setPortError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    useEffect(() => {
        dispatch(setClusterList())
    }, [])

    function toggleOpenAddModal() {
        setNameError(false); setHostError(false); setPortError(false)
        setUsernameError(false); setPasswordError(false)
        setName(""); setScheme("http"); setHost(""); setPort("");
        setUsername(""); setPassword(""); setKibana("");
        setTheme(0); setAddModalMessage("");
        setAddTest(false)
        setOpenAddModal(!openAddModal)
    }
    function handleClusterTestProcess() {
        setAddTest(false)
        setAddModalMessage("")
        dispatch(setClusterStatus({ name, host, port, scheme, username, password })).then(status => {
            if (!status['connection']) {
                setAddTest(false)
                setAddModalMessage("연결 실패")
                return
            }
            setAddTest(true)
            const nodeSize = Object.values(status['nodes']).map(node => {
                const tmp = ((node['http'] || node['http']) || {})
                return tmp['publish_address'] ? `${scheme}://${tmp['publish_address']}` : null
            }).filter(addr => addr !== null).length
            setAddModalMessage("[연결 성공] 노드 수:" + nodeSize)
        }).catch(error => {
            setAddTest(false)
            setAddModalMessage("")
            setAddModalMessage("연결 실패")
            console.error(error)
        })
    }
    function handleAddClusterProcess() {
        setNameError(false); setHostError(false); setPortError(false)
        setUsernameError(false); setPasswordError(false)
        if (name === "") { setNameError(true); return false }
        if (host === "") { setHostError(true); return false }
        if (port === "" || port === "0") { setPortError(true); return false }
        if (scheme === "https") {
            if (username === "") { setUsernameError(true); return false }
            if (password === "") { setPasswordError(true); return false }
        }
        if (!addTest) { return false }
        dispatch(addCluster({
            name, host, port, scheme,
            username, password,
            kibana, theme
        })).then(cluster => {
            dispatch(setClusterList())
            toggleOpenAddModal()
        }).catch(error => {
            console.log(error)
            setAddModalMessage(error.message||"error")
            alert("실패")
        })
    }
    return (
        <React.Fragment>
            <Helmet title="클러스터"/>
            <Typography variant="h3" gutterBottom display="inline">
                클러스터
            </Typography>
            <Divider my={6}/>

            <Grid container spacing={6}>

                {clusterList.map(cluster => <ClusterCard key={cluster['cluster']['id']}  cluster={cluster} classes={classes} />)}

                <AddClusterCard key={"add"}
                                className={classes}
                                handleClick={toggleOpenAddModal}
                />

                <AddGuideCard key={"guide"}
                              className={classes}
                />

            </Grid>

            <Dialog
                fullScreen={fullScreen}
                open={openAddModal}
                onClose={toggleOpenAddModal}
            >
                <DialogTitle>
                    클러스터 추가
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
                            <Box align={"center"} mt={4}>색성</Box>
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
                    <Box display={addModalMessage === "" ? "none" : "block"}>
                        {addModalMessage}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleClusterTestProcess}> 연결테스트 </Button>
                    <Button color="primary"
                            variant="contained"
                            disabled={!addTest}
                            onClick={handleAddClusterProcess}
                    >
                        추가
                    </Button>
                    <Button onClick={toggleOpenAddModal}
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({ ...store.clusterReducers }))(Cluster);

