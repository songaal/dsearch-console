import React, {useEffect, useRef, useState} from "react";
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
    FormControl,
    Grid as MuiGrid,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Popper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
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

const TEMPLATE_LIST = ["multipleDumpFile", "ndjson", "csv", "file", "procedure", "database"]
const TEMPLATE = {
    "multipleDumpFile":
`type: "multipleDumpFile"
pipeLine: "s-prod-pipeline-v3"
bulkSize: 1000
dumpFormat: "konan"
groupSeq: "0,2-3"
bwlimit: "10240"
path: "/data/indexFile/M/"
rsyncIp: "192.168.4.198"
rsyncPath: "search_data_alti"
encoding: "CP949"
procedureSkip: true
rsyncSkip: false
threadSize: 4`,

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
    const [cronCount, setCronCount]= React.useState(0);
    const [cronMessage, setCronMessage]= React.useState(false);

    const [templateValue, setTemplateValue] = useState(TEMPLATE_LIST[0]);

    const [launcherYaml, setLauncherYaml] = useState("")
    const [scheme, setScheme] = useState("http")
    const [jdbcId, setJdbcId] = useState(NO_SELECTED)

    const [isExtIndexer, setExtIndexer] = useState(false);
    const [esScheme, setEsScheme] = useState("http");
    const [invalid, setInvalid] = useState({})

    const aceEditor = useRef(null)
    
    // 수정 
    const newSourceName =  useRef({value : ""})
    const newHost = useRef({value : ""})
    const newPort = useRef({value : ""})
    const newCron = useRef({value : ""})
    const newCron2 = useRef({value : ""})
    const newCron3 = useRef({value : ""})
    const newCron4 = useRef({value : ""})
    const newCron5 = useRef({value : ""})

    const newEsHost = useRef({value : ""})
    const newEsPort = useRef({value : ""})
    const newEsUser = useRef({value : ""})
    const newEsPassword = useRef({value : ""})

    useEffect(() => {
        setInvalid({})
        if (collection['sourceName'] === undefined || collection['sourceName'] === null || collection['sourceName'] === "") {
            /* FORCE_EDIT(생성하고 아무런 데이터가 없을 때) 모드일때만 */
            setMode("FORCE_EDIT");
            aceEditor.current.editor.setValue(TEMPLATE[TEMPLATE_LIST[0]]);
        } else {
            setOpen(false)
            newSourceName.current.value = collection['sourceName']
            setScheme((collection['launcher']||{})['scheme']||"");
            newHost.current.value = (collection['launcher']||{})['host']||""
            newPort.current.value = (collection['launcher']||{})['port']||""

            setExtIndexer(collection['extIndexer'])
            setEsScheme(collection['esScheme'])
            newEsHost.current.value = collection['esHost']
            newEsPort.current.value = collection['esPort']
            newEsUser.current.value = collection['esUser']
            newEsPassword.current.value = collection['esPassword']

            setJdbcId(collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId'])

            newCron.current.value = ""
            newCron2.current.value = ""
            newCron3.current.value = ""
            newCron4.current.value = ""
            newCron5.current.value = ""

            let cron_list = collection['cron'].split("||")
            cron_list.forEach((element, index) => {
                if(index == 0) newCron.current.value = element
                else if(index == 1) newCron2.current.value = element
                else if(index == 2) newCron3.current.value = element
                else if(index == 3) newCron4.current.value = element
                else if(index == 4) newCron5.current.value = element
            });

            setCronCount(cron_list.length);
            setLauncherYaml((collection['launcher']||{})['yaml']||"");
            aceEditor.current.editor.setValue((collection['launcher']||{})['yaml']||"")
            aceEditor.current.editor.clearSelection()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        try {
            if (mode === "EDIT") {
                setInvalid({})
                newSourceName.current.value = collection['sourceName']
                newHost.current.value = (collection['launcher']||{})['host']||""
                newPort.current.value = (collection['launcher']||{})['port']||""
                newEsHost.current.value = collection['esHost']
                newEsPort.current.value = collection['esPort']
                newEsUser.current.value = collection['esUser']
                newEsPassword.current.value = collection['esPassword']

                newCron.current.value = ""
                newCron2.current.value = ""
                newCron3.current.value = ""
                newCron4.current.value = ""
                newCron5.current.value = ""

                let cron_list = collection['cron'].split("||")
                setCronCount(cron_list.length);
                cron_list.forEach((element, index) => {
                    if(index == 0) newCron.current.value = element
                    else if(index == 1) newCron2.current.value = element
                    else if(index == 2) newCron3.current.value = element
                    else if(index == 3) newCron4.current.value = element
                    else if(index == 4) newCron5.current.value = element
                });

                setScheme((collection['launcher']||{})['scheme']||"");
                setExtIndexer(collection['extIndexer'])
                setEsScheme(collection['esScheme'])
                setJdbcId(collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId'])
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
        // setPlacement(newPlacement);
    }

    function handleSaveProcess() {
        let sourceName = newSourceName.current.value
        let host = newHost.current.value
        let port = newPort.current.value
        let esHost = newEsHost.current.value
        let esPort = newEsPort.current.value
        let esUser = newEsUser.current.value
        let esPassword = newEsPassword.current.value

        setInvalid({})

        let invalidCheck = {}
        if (sourceName.trim() === "") {
            invalidCheck['sourceName'] = true
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

        // 크론 설정 가져오기
        if(!isValidCron(newCron.current.value)){
            invalidCheck['cron'] = true
        }

        let cron_merge = newCron.current.value 

        if(isValidCron(newCron2.current.value) && cronCount >= 2) {
            if(cron_merge.length == 0){
                cron_merge +=  newCron2.current.value 
            }else{
                cron_merge +=  "||" + newCron2.current.value 
            }
        }else if(newCron2.current.value.length == 0 || cronCount < 2){
            /* ignore */
        }else{
            invalidCheck['cron'] = true
        }
            
        if(isValidCron(newCron3.current.value) && cronCount >= 3) {
            if(cron_merge.length == 0){
                cron_merge += newCron3.current.value 
            }else{
                cron_merge +=  "||" + newCron3.current.value 
            }
        }else if(newCron3.current.value.length == 0|| cronCount < 3){
            /* ignore */
        }else{
            invalidCheck['cron'] = true
        }
            
        if(isValidCron(newCron4.current.value) && cronCount >= 4) {
            if(cron_merge.length == 0){
                cron_merge +=  newCron4.current.value 
            }else{
                cron_merge +=  "||" + newCron4.current.value 
            }
        }else if(newCron4.current.value.length == 0 || cronCount < 4){
            /* ignore */
        }else{
            invalidCheck['cron'] = true
        }
            
        if(isValidCron(newCron5.current.value) && cronCount >= 5) {
            if(cron_merge.length == 0){
                cron_merge +=  newCron5.current.value
            }else{
                cron_merge +=  "||" + newCron5.current.value
            }
        }else if(newCron5.current.value.length == 0 || cronCount < 5){
            /* ignore */
        }else{
            invalidCheck['cron'] = true
        }
        
        if(cron_merge.length === 0){
            cron_merge = DEFAULT_CRON
            delete invalidCheck['cron'];
        }

        if (Object.keys(invalidCheck).length > 0) {
            setInvalid(invalidCheck)
            return false
        }

        setOpen(false)
        dispatch(editCollectionSourceAction(collection['id'], {
            sourceName,
            // cron: (cron.length === 0 ? DEFAULT_CRON : cron),
            cron: (cron_merge.length === 0 ? DEFAULT_CRON : cron_merge),
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

    const handleCronAdd = (event) => {
        if(cronCount == 5){
            setCronMessage(true)
            return;
        }
        setCronCount(cronCount < 5 ? cronCount+1 : 5)
    }
    const handleCronRemove = (event) => {
        setCronCount(cronCount >= 0 ? cronCount-1 : 0)
    }

    let jdbcHitList = [
        { id: NO_SELECTED, sourceAsMap: {name: '선택안함'} },
        ...((JdbcList['hits']||{})['hits']||[])
    ]

    let useJdbcList = jdbcHitList.filter(jdbcObj => (collection['jdbcId'] === '' ? NO_SELECTED : collection['jdbcId']) === jdbcObj['id']).map(jdbcObj => jdbcObj['sourceAsMap']['name'])

    let view_cron = "" 
    let view_cron_list = collection['cron'].split("||");
    view_cron_list.forEach((element, index) => {
        if(view_cron.length > 0) view_cron += ",  " + element
        else view_cron = element;
    });
    
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
                                                <TableCell> {view_cron} </TableCell>
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
                                        onClick={() => {setOpen(false); setMode("VIEW"); }}
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
                                                    <TextField 
                                                        inputRef={newSourceName}
                                                        // 이전
                                                        // value={sourceName}
                                                        // onChange={event => setSourceName(event.target.value)}
                                                        fullWidth
                                                        error={invalid['sourceName']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>파라미터 YAML</TableCell>
                                                <TableCell>
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
                                                        <Grid item xs={10}>
                                                            <Box maxWidth={"100%"}>
                                                            <TextField
                                                                inputRef={newCron}
                                                                fullWidth
                                                                placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                error={invalid['cron'] || false}
                                                            />
                                                            </Box>
                                                            <Box maxWidth={"100%"}>
                                                            <TextField
                                                                inputRef={newCron2}
                                                                style={{ display: cronCount > 1 ? "" : "none" }}
                                                                fullWidth
                                                                placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                error={invalid['cron'] || false} />
                                                            </Box>
                                                            <Box maxWidth={"100%"}>
                                                            <TextField
                                                                inputRef={newCron3}
                                                                style={{ display: cronCount > 2 ? "" : "none" }}
                                                                fullWidth
                                                                placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                error={invalid['cron'] || false} />
                                                            </Box>
                                                            <Box maxWidth={"100%"}>
                                                            <TextField
                                                                inputRef={newCron4}
                                                                style={{ display: cronCount > 3? "" : "none" }}
                                                                fullWidth
                                                                placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                error={invalid['cron'] || false} />
                                                            </Box>
                                                            <Box maxWidth={"100%"}>
                                                            <TextField
                                                                inputRef={newCron5}
                                                                style={{ display: cronCount > 4 ? "" : "none" }}
                                                                fullWidth
                                                                placeholder={"분 시 일 월 요일 (default: 0 0 * * *)"}
                                                                error={invalid['cron'] || false} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Button onClick={handleCronAdd}><AddBoxIcon /></Button>
                                                            <Button onClick={handleCronRemove}><IndeterminateCheckBoxIcon /></Button>
                                                        </Grid>
                                                        <Grid item xs={1} 
                                                            // justify={"center"} alignItems="center"
                                                            >
                                                            <Link onMouseOver={handleClick('top')} onMouseLeave={handleClick('top')}>예제</Link>
                                                            <Popper open={Boolean(open)} 
                                                                    anchorEl={anchorEl}
                                                                    placement={'top'}
                                                                    // placement={placement}
                                                                    transition 
                                                                    style={{ zIndex: 999999999 }}>
                                                                {({TransitionProps}) => (
                                                                    <Fade {...TransitionProps} timeout={300}>
                                                                        <Paper>
                                                                            <Typography className={classes.typography}>
                                                                                예제<br/>
                                                                                */1 * * * * : 1분마다 한 번씩<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                0 5 1 * * : 매달 1일 새벽 5시에 실행.<br/>
                                                                                0 5,11 * * 0,3 : 매주 일요일과 수요일 새벽 5시와 밤 11시.<br/>
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
                                                        <TextField 
                                                            inputRef={newEsHost}
                                                            // value={esHost}
                                                            // onChange={e => setEsHost(e.target.value)}
                                                                   fullWidth
                                                                   placeholder={"elastic.com"}
                                                                   error={invalid['esHost']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField 
                                                            inputRef={newEsPort}
                                                                // value={esPort}
                                                                // onChange={e => setEsPort(e.target.value)}
                                                                fullWidth
                                                                // type={"number"}
                                                                placeholder={"9200"}
                                                                error={invalid['esPort']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField 
                                                            inputRef={newEsUser}
                                                        //  value={esUser}
                                                        //            onChange={e => setEsUser(e.target.value)}
                                                                   fullWidth
                                                                   placeholder={"elastic"}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField 
                                                            inputRef={newEsPassword}
                                                            // value={esPassword}
                                                            //        onChange={e => setEsPassword(e.target.value)}
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
                                                        <Grid component="label" 
                                                            container 
                                                            // alignItems="center" 
                                                            spacing={1}>
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
                                                        <TextField 
                                                            inputRef={newHost}
                                                            // value={host}
                                                            //        onChange={event => setHost(event.target.value)}
                                                                   fullWidth
                                                                   placeholder={"127.0.0.1"}
                                                                   error={invalid['host']||false}
                                                        />
                                                    </Box>
                                                    <Box my={3}>
                                                        <TextField 
                                                            inputRef={newPort}
                                                            // value={port}
                                                            //        onChange={event => setPort(event.target.value)}
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

            <Snackbar open={cronMessage} autoHideDuration={5000} onClose={() => {setCronMessage(false)}}>
                <MuiAlert elevation={4} variant="filled" severity="info"> 크론 설정은 최대 5개까지만 설정 가능합니다. </MuiAlert>
            </Snackbar>

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
