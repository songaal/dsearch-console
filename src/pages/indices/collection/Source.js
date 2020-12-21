import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    Grid as MuiGrid,
    Link,
    MenuItem,
    Paper,
    Popper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {connect} from "react-redux";
import {editCollectionSourceAction, setCollection} from "../../../redux/actions/collectionActions";
import {isValidCron} from 'cron-validator'
import ControlBox from "./ControlBox";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-kuroir";

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
    typography: {
        padding: theme.spacing(2),
    },
}));

const NO_SELECTED = 'NO_SELECTED';
const DEFAULT_CRON = '0 0 * * *'
const DEFAULT_YAML = `
============================= ndjson / csv template
scheme: http
host: localhost
port: 9200
type: ndjson /csv
path: /data/source/search-prod.ndjson   or   /data/source/search-prod.csv
encoding: utf-8
bulkSize: 10000
reset: false
threadSize: 1

============================= rsync template
scheme: http
host: localhost
port: 9200
type: procedure
bulkSize: 1000
driverClassName: "Altibase.jdbc.driver.AltibaseDriver"
filterClass: "com.danawa.fastcatx.indexer.filter.DanawaProductFilter"
url: "jdbc:Altibase://localhost:20200/DANAWA_ALTI"
user: "root"
password: "qwerty123456"
procedureName: "procedureName1"
dumpFormat: "konan"
groupSeq: 1
bwlimit: "10240"
path: "/data/product/VM"
rsyncIp: "remote server IP"
rsyncPath: "search_data_alti"
encoding: CP949
procedureSkip: true
rsyncSkip: true
threadSize: 1

============================= DB template
scheme: http
host: localhost
port: 9200
bulkSize: 10000
fetchSize: 10000
type: jdbc
pipeLine: "pipeline"
threadSize: 1
dataSQL : "SELECT * FROM myTable"
`;

function Source({dispatch, authUser, collection, JdbcList}) {
    const classes = useStyles();
    const [editModal, setEditModal] = useState(null)
    const [mode, setMode] = useState("VIEW")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    const [sourceName, setSourceName] = useState("")
    const [launcherYaml, setLauncherYaml] = useState("")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [jdbcId, setJdbcId] = useState(NO_SELECTED)
    const [cron, setCron] = useState("")

    const [invalid, setInvalid] = useState({})

    const aceEditor = useRef(null)

    useEffect(() => {
        setInvalid({})
        if (collection['sourceName'] === undefined || collection['sourceName'] === null || collection['sourceName'] === "") {
            /* FORCE_EDIT(생성하고 아무런 데이터가 없을 때) 모드일때만 */
            setMode("FORCE_EDIT");
            aceEditor.current.editor.setValue(DEFAULT_YAML)
        } else {
            setSourceName(collection['sourceName']);
            setHost((collection['launcher']||{})['host']||"");
            setPort((collection['launcher']||{})['port']||"");
            // setJdbcId(collection['jdbcId']);
            setJdbcId(collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId'])
            setCron(collection['cron']);
            setLauncherYaml((collection['launcher']||{})['yaml']||"");
            aceEditor.current.editor.setValue((collection['launcher']||{})['yaml']||"")
            aceEditor.current.editor.clearSelection()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        try {
            if (mode === "EDIT") {
                setSourceName(collection['sourceName']);
                setHost((collection['launcher']||{})['host']||"");
                setPort((collection['launcher']||{})['port']||"");
                // setJdbcId(collection['jdbcId']);
                setJdbcId(collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId'])
                setCron(collection['cron']);
                setLauncherYaml((collection['launcher']||{})['yaml']||"");
                aceEditor.current.editor.setValue((collection['launcher']||{})['yaml']||"")
                aceEditor.current.editor.clearSelection()
            }
        } catch (error) {
            console.log('change ace editor')
        }
    }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps


    function toggleEditModal(event) {
        setEditModal(editModal === null ? event.currentTarget : null)
    }

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    }

    function handleSaveProcess() {
        setInvalid({})
        let invalidCheck = {}
        if (sourceName.trim() === "") {
            invalidCheck['sourceName'] = true
        }
        if (host.trim() === "" || !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi.test(host)) {
            invalidCheck['host'] = true
        }
        if (port === "") {
            invalidCheck['port'] = true
        }
        if(cron.length === 0){
            setCron(DEFAULT_CRON)
        }else if (!isValidCron(cron)) {
            invalidCheck['cron'] = true
        }

        if (Object.keys(invalidCheck).length > 0) {
            setInvalid(invalidCheck)
            return false
        }
        
        dispatch(editCollectionSourceAction(collection['id'], {
            sourceName,
            cron: (cron.length === 0 ? DEFAULT_CRON : cron),
            jdbcId: (jdbcId === NO_SELECTED ? '' : jdbcId),
            launcher: {
                yaml: aceEditor.current.editor.getValue() || '',
                host,
                port,
            }
        })).then(response => {
            dispatch(setCollection(collection['id']))
            setMode("VIEW")
        }).catch(error => {
            console.log(error)
            alert(error)
        })
    }

    let jdbcHitList = [
        { id: NO_SELECTED, sourceAsMap: {name: '선택안함'} },
        ...((JdbcList['hits']||{})['hits']||[])
    ]
    return (
        <React.Fragment>

            <br/>

            <Card>
                <CardContent>
                    <Box style={{display: mode === "VIEW" ? "block" : "none"}}>
                        <Grid container>
                            <Grid item xs={10}>

                                <ControlBox />

                            </Grid>
                            <Grid item xs={2} align={"right"}>
                                {authUser.role.index ? <Button mx={1} variant={"outlined"} onClick={() => setMode("EDIT")}>
                                    수정
                                </Button> : <></>}
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Box>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>파라미터</TableCell>
                                                <TableCell>
                                                    <Link style={{cursor: "pointer"}}
                                                          onClick={toggleEditModal}
                                                    >YAML</Link>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행호스트</TableCell>
                                                <TableCell>{(collection['launcher'] || {})['host']}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>{(collection['launcher'] || {})['port'] === 0 ? "" : (collection['launcher'] || {})['port']}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    {
                                                        jdbcHitList.filter(jdbcObj => (collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId']) === jdbcObj['id'])
                                                            .map(jdbcObj => {
                                                                const source = jdbcObj['sourceAsMap']
                                                                return (
                                                                    <React.Fragment key={source['name']}>
                                                                        {source['name']}
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell> {collection['cron']} </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>


                    {/*======================================= EDIT MODE  ===========================================*/}

                    <Box style={{display: mode === "EDIT" || mode === "FORCE_EDIT" ? "block" : "none"}}>
                        <Grid container>
                            <Grid item xs={8}>

                            </Grid>
                            <Grid item xs={4} align={"right"}>
                                <Button mx={1}
                                        variant={"outlined"}
                                        onClick={handleSaveProcess}
                                        style={{display: authUser.role.index ? 'inline' : 'none'}}
                                >
                                    저장
                                </Button>
                                <Button style={{display: authUser.role.index ? mode === 'EDIT' ? "inline" : "none" : "none"}} mx={1}
                                        variant={"outlined"}
                                        onClick={() => setMode("VIEW")}
                                >
                                    취소
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box p={5}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>이름</TableCell>
                                                <TableCell>
                                                    <TextField value={sourceName}
                                                               onChange={event => setSourceName(event.target.value)}
                                                               fullWidth
                                                               error={invalid['sourceName']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>파라미터 YAML</TableCell>
                                                <TableCell>
                                                    {/*<TextareaAutosize value={launcherYaml}*/}
                                                    {/*                  onChange={event => setLauncherYaml(event.target.value)}*/}
                                                    {/*                  style={{width: "100%", minHeight: "200px"}}*/}
                                                    {/*/>*/}
                                                    <AceEditor
                                                        ref={aceEditor}
                                                        mode="yaml"
                                                        theme="kuroir"
                                                        fontSize="15px"
                                                        height={"400px"}
                                                        width="100%"
                                                        tabSize={2}
                                                        placeholder="type: 'jdbc'"
                                                        setOptions={{ useWorker: false }}
                                                        onChange={() => {
                                                            let yaml = aceEditor.current.editor.getValue()
                                                            if (launcherYaml !== yaml) {
                                                                setLauncherYaml(yaml)
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    <Select value={jdbcId}
                                                            onChange={event => setJdbcId(event.target.value)}
                                                            style={{minWidth: "100%"}}
                                                            error={invalid['jdbcId']||false}
                                                    >
                                                        {
                                                            jdbcHitList.map((jdbcObj, index) => {
                                                                return (
                                                                    <MenuItem key={index}
                                                                              value={jdbcObj['id']}
                                                                    >
                                                                        {(jdbcObj['sourceAsMap']||{})['name']||""}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행호스트</TableCell>
                                                <TableCell>
                                                    <TextField value={host}
                                                               onChange={event => setHost(event.target.value)}
                                                               fullWidth
                                                               placeholder={"127.0.0.1"}
                                                               error={invalid['host']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>
                                                    <TextField value={port}
                                                               onChange={event => setPort(event.target.value)}
                                                               fullWidth
                                                               placeholder={"5005"}
                                                               type={"number"}
                                                               error={invalid['port']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell>
                                                    <Grid container>
                                                        <Grid item xs={11}>
                                                            <TextField value={cron}
                                                                       onChange={event => setCron(event.target.value)}
                                                                       fullWidth
                                                                       placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                       error={invalid['cron']||false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Link onMouseOver={handleClick('top')}>예제</Link>
                                                            <Popper open={Boolean(open)} anchorEl={anchorEl}
                                                                    placement={placement} transition>
                                                                {({TransitionProps}) => (
                                                                    <Fade {...TransitionProps} timeout={350}>
                                                                        <Paper>
                                                                            <Typography className={classes.typography}>
                                                                                예제<br/>
                                                                                */1 * * * * : 1분마다 한 번씩<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                0 5 1 * * : 매달 1일 새벽 5시에 실행.<br/>
                                                                                0 5,11 * * 0,3 : 매주 일요일과 수요일 새벽 5시와 밤
                                                                                11시.<br/>
                                                                                0 5,11 * * * : 새벽 5시와 밤 11시
                                                                            </Typography>
                                                                        </Paper>
                                                                    </Fade>
                                                                )}
                                                            </Popper>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={Boolean(editModal)}
                    fullWidth
                    onClose={toggleEditModal}
            >
                <DialogTitle>
                    설정
                </DialogTitle>
                <DialogContent>
                    <pre>
                        {(collection['launcher'] || {})['yaml']}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleEditModal}>닫기</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    ...store.collectionReducers,
    ...store.jdbcReducers
}))(Source);
