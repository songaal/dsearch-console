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
    FormControl,
    InputLabel,
    Switch,
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

const TEMPLATE_LIST = ["ndjson", "csv", "file", "procedure", "database"]
const TEMPLATE = {
    "ndjson" : 
`type: ndjson
path: /data/source/search-prod.ndjson
encoding: utf-8
bulkSize: 10000
reset: true
threadSize: 1`,

    "csv" : 
`type: csv
path: /data/source/search-prod.csv
encoding: utf-8
bulkSize: 10000
reset: true
threadSize: 1`,

"file" : 
`type: file
path: /data/source/prodExt_dump
encoding: utf-8
bulkSize: 10000
reset: true
threadSize: 1
headerText:"name,color,price"
delimiter: "^"`,

    "procedure": 
`type: procedure
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
`,

    "database": 
`bulkSize: 10000
fetchSize: 10000
type: jdbc
pipeLine: "pipeline"
threadSize: 1
dataSQL : "SELECT * FROM myTable"`
};
const NO_SELECTED = 'NO_SELECTED';
const DEFAULT_CRON = '0 0 * * *'

function Source({dispatch, authUser, collection, JdbcList}) {
    const classes = useStyles();
    const [editModal, setEditModal] = useState(null)
    const [mode, setMode] = useState("VIEW")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    const [sourceName, setSourceName] = useState("")
    const [launcherYaml, setLauncherYaml] = useState("")
    const [scheme, setScheme] = useState("http")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [jdbcId, setJdbcId] = useState(NO_SELECTED)
    const [cron, setCron] = useState("")
    const [templateValue, setTemplateValue] = useState(TEMPLATE_LIST[0]);

    const [isExtIndexer, setExtIndexer] = useState(false);
    const [esScheme, setEsScheme] = useState("http");
    const [esHost, setEsHost] = useState("");
    const [esPort, setEsPort] = useState("");
    const [esUser, setEsUser] = useState("");
    const [esPassword, setEsPassword] = useState("");
    const [invalid, setInvalid] = useState({})

    const aceEditor = useRef(null)

    useEffect(() => {
        setInvalid({})
        if (collection['sourceName'] === undefined || collection['sourceName'] === null || collection['sourceName'] === "") {
            /* FORCE_EDIT(생성하고 아무런 데이터가 없을 때) 모드일때만 */
            setMode("FORCE_EDIT");
            // aceEditor.current.editor.setValue(DEFAULT_YAML)
            aceEditor.current.editor.setValue(TEMPLATE[TEMPLATE_LIST[0]]);
        } else {
            setSourceName(collection['sourceName']);
            setScheme((collection['launcher']||{})['scheme']||"");
            setHost((collection['launcher']||{})['host']||"");
            setPort((collection['launcher']||{})['port']||"");

            setExtIndexer(collection['extIndexer'])
            setEsScheme(collection['esScheme'])
            setEsHost(collection['esHost'])
            setEsPort(collection['esPort'])
            setEsUser(collection['esUser'])
            setEsPassword(collection['esPassword'])

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
                setScheme((collection['launcher']||{})['scheme']||"");
                setHost((collection['launcher']||{})['host']||"");
                setPort((collection['launcher']||{})['port']||"");

                setExtIndexer(collection['extIndexer'])
                setEsScheme(collection['esScheme'])
                setEsHost(collection['esHost'])
                setEsPort(collection['esPort'])
                setEsUser(collection['esUser'])
                setEsPassword(collection['esPassword'])

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
        if(cron.length === 0){
            setCron(DEFAULT_CRON)
        }else if (!isValidCron(cron)) {
            invalidCheck['cron'] = true
        }

        if (isExtIndexer) {
            // || !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi.test(host)
            if (host.trim() === "") {
                invalidCheck['host'] = true
            }
            if (port === "") {
                invalidCheck['port'] = true
            }
            // || !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi.test(host)
            if (esHost.trim() === "") {
                invalidCheck['esHost'] = true
            }
            if (esPort === "") {
                invalidCheck['esPort'] = true
            }
        }

        if (Object.keys(invalidCheck).length > 0) {
            setInvalid(invalidCheck)
            return false
        }
        
        dispatch(editCollectionSourceAction(collection['id'], {
            sourceName,
            cron: (cron.length === 0 ? DEFAULT_CRON : cron),
            jdbcId: (jdbcId === NO_SELECTED ? '' : jdbcId),
            extIndexer: isExtIndexer,
            esScheme, esHost: esHost.trim(), esPort, esUser: esUser.trim(), esPassword: esPassword.trim(),
            launcher: {
                yaml: aceEditor.current.editor.getValue() || '',
                scheme: isExtIndexer ? scheme : "http", host: isExtIndexer ? host.trim() : "", port: isExtIndexer ? port : "",
            }
        })).then(response => {
            dispatch(setCollection(collection['id']))
            setMode("VIEW")
        }).catch(error => {
            console.log(error)
            alert(error)
        })
    }

    const handleTemplateValue = (event) => {
        setTemplateValue(event.target.value);
        aceEditor.current.editor.setValue(TEMPLATE[event.target.value]);
    }

    let jdbcHitList = [
        { id: NO_SELECTED, sourceAsMap: {name: '선택안함'} },
        ...((JdbcList['hits']||{})['hits']||[])
    ]

    let useJdbcList = jdbcHitList.filter(jdbcObj => (collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId']) === jdbcObj['id']).map(jdbcObj => jdbcObj['sourceAsMap']['name'])

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
                                            {
                                                collection['extIndexer'] ?
                                                    <React.Fragment>
                                                        <TableRow>
                                                            <TableCell variant={"head"} component={"th"}>전용 인덱서</TableCell>
                                                            <TableCell>
                                                                {(collection['launcher']||{})['scheme']||''}://
                                                                {(collection['launcher']||{})['host']||''}:
                                                                {(collection['launcher']||{})['port'] === 0 ? "" : (collection['launcher']||{})['port']||''}
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <TableRow>
                                                            <TableCell variant={"head"} component={"th"}>전용인덱서 정보</TableCell>
                                                            <TableCell> 사용안함 </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                            }

                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>엘라스틱서치 정보</TableCell>
                                                <TableCell>
                                                    {collection['esScheme']||''}://
                                                    {collection['esHost']||''}:
                                                    {collection['esPort']||''}
                                                    {
                                                        collection['esUser'] !== "" ?
                                                            <Box component={"span"}> (사용자: {collection['esUser']})</Box>
                                                            :
                                                            null
                                                    }
                                                </TableCell>
                                            </TableRow>


                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    {
                                                        useJdbcList.length === 0 ?
                                                            "사용안함"
                                                            :
                                                            useJdbcList[0]
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
                                                    <Box display="flex" alignItems="center"  justifyContent="space-between" width="100%" marginBottom="8px">
                                                        <div></div>
                                                        <FormControl style={{width: "200px"}}>
                                                            <InputLabel id="demo-simple-select-label">수집소스 템플릿</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={templateValue}
                                                                onChange={handleTemplateValue}
                                                            >
                                                                {
                                                                    TEMPLATE_LIST.map((item, i) => (<MenuItem key={i} value={item}>{item}</MenuItem>))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
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

                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>엘라스틱서치 정보</TableCell>
                                                <TableCell>
                                                    <Box my={3}>
                                                        <Select style={{minWidth: "100%"}}
                                                                value={esScheme}
                                                                onChange={e => setEsScheme(e.target.value)}
                                                        >
                                                            <MenuItem key={1}
                                                                      value={"http"}
                                                            >
                                                                HTTP
                                                            </MenuItem>
                                                            <MenuItem key={1}
                                                                      value={"https"}
                                                            >
                                                                HTTPS
                                                            </MenuItem>
                                                        </Select>
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={esHost}
                                                                   onChange={e => setEsHost(e.target.value)}
                                                                   fullWidth
                                                                   placeholder={"elastic.com"}
                                                                   error={invalid['esHost']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={esPort}
                                                                   onChange={e => setEsPort(e.target.value)}
                                                                   fullWidth
                                                                   type={"number"}
                                                                   placeholder={"9200"}
                                                                   error={invalid['esPort']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={esUser}
                                                                   onChange={e => setEsUser(e.target.value)}
                                                                   fullWidth
                                                                   placeholder={"elastic"}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={esPassword}
                                                                   onChange={e => setEsPassword(e.target.value)}
                                                                   fullWidth
                                                                   type={"password"}
                                                                   placeholder={"password"}
                                                        />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>전용인덱서</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <Grid component="label" container alignItems="center" spacing={1}>
                                                            <Grid item>사용안함</Grid>
                                                            <Grid item>
                                                                <Switch checked={isExtIndexer} onChange={() => setExtIndexer((!isExtIndexer))}  />
                                                            </Grid>
                                                            <Grid item>사용</Grid>
                                                        </Grid>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow style={{display: isExtIndexer ? "table-row" : "none" }}>
                                                <TableCell variant={"head"} component={"th"}>전용인덱서 정보</TableCell>
                                                <TableCell>
                                                    <Box my={3}>
                                                        <Select style={{minWidth: "100%"}}
                                                                value={scheme}
                                                                onChange={e => setScheme(e.target.value)}
                                                        >
                                                            <MenuItem value={"http"}>
                                                                HTTP
                                                            </MenuItem>
                                                            <MenuItem value={"https"}>
                                                                HTTPS
                                                            </MenuItem>
                                                        </Select>
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={host}
                                                                   onChange={event => setHost(event.target.value)}
                                                                   fullWidth
                                                                   placeholder={"127.0.0.1"}
                                                                   error={invalid['host']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField value={port}
                                                                   onChange={event => setPort(event.target.value)}
                                                                   fullWidth
                                                                   placeholder={"5005"}
                                                                   type={"number"}
                                                                   error={invalid['port']||false}
                                                        />
                                                    </Box>
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
    ...store.jdbcReducers,
    ...store.clusterReducers,
}))(Source);
