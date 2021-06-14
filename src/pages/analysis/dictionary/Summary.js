import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CircularProgress,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,FormControl,
    FormControlLabel,
    TableRow
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { applyDictionary, setSummary } from "../../../redux/actions/dictionaryActions";
import utils from "../../../utils";


const systemInfo = {
    type: "SYSTEM",
    name: "시스템 사전"
}

function SummaryTable({ checkedAll, summary, makeCheckedIdList, makeCheckedList,  getChecked}) {
    if (summary.dictionaryInfo === undefined || summary.dictionarySettings === undefined) return <></>;

    console.log("checkedAll", checkedAll)

    let infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    let settings = summary.dictionarySettings;
    let tableInfo = [];

    for (let i in infoDict) {
        if (infoDict[i].type === systemInfo.type) {
            var info = infoDict[i];
            info.name = systemInfo.name;
            tableInfo.push(info);
            break;
        }
    }

    for (let i in settings) {
        let info = settings[i];
        for (var j in infoDict) {
            if (settings[i].id === infoDict[j].type) {
                info.count = infoDict[j].count;
                info.words = infoDict[j].words;
                info.indexCount = infoDict[j].indexCount;
                break;
            }
        }

        tableInfo.push(info);
    }

    const handleCheckBox = (event) => {
        makeCheckedIdList(event.target.value, event.target.id);
        makeCheckedList(event.target.value, event.target.checked);
    }

    
    return tableInfo.map((info, index) => {
        // let key = info.id;
        return <TableRow key={index}>
            {/* <TableCell>
            {info.type === systemInfo.type ? <></> : 
            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    checked={ checkedAll ? true : event.target.checked }
                    onChange={handleCheckBox}
                    value={info.id}
                    id={info.documentId} 
                    name={"checkbox"}
                />
                </FormControl>
            }
            </TableCell> */}
            {/* {
                checkedAll ? 
                <TableCell> {info.type === systemInfo.type ? <></> : <Checkbox defaultChecked={true} id={info.documentId} name={"checkbox"} value={info.id} onChange={handleCheckBox}  />} </TableCell>
                : <TableCell> {info.type === systemInfo.type ? <></> : <Checkbox id={info.documentId} name={"checkbox"} value={info.id} onChange={handleCheckBox} />} </TableCell>
            } */}
            <TableCell> {info.type === systemInfo.type ? <></> : <Checkbox id={info.documentId} name={"checkbox"} value={info.id} onChange={handleCheckBox}  />} </TableCell>
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.type}</TableCell>
            <TableCell>{info.indexCount ? Number(info.indexCount).toLocaleString() : "0"}</TableCell>
            <TableCell> {info.updatedTime ? new Date(info.updatedTime).toLocaleString() : "-"} </TableCell>
            <TableCell>{Number(info.count).toLocaleString()}</TableCell>
            <TableCell> {info.appliedTime ? new Date(info.appliedTime).toLocaleString() : "-"} </TableCell>
            <TableCell> {info.tokenType ? info.tokenType : "-"} </TableCell>
            <TableCell> {info.ignoreCase ? info.ignoreCase ? "Y" : "N" : "-"} </TableCell>
        </TableRow>
    });
}


function Summary({ dispatch, authUser, summary, update }) {
    const [applyDict, setApplyDict] = useState(false);
    const [progress, setProgress] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedList, setCheckedList] = useState({});
    const [checkedIdList, setCheckedIdList] = useState({});

    useEffect(() => {
        dispatch(setSummary())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function makeCheckedIdList(key, value) {
        let cList = {};
        let list = Object.keys(checkedIdList);
        for (let key of list) {
            cList[key] = checkedIdList[key];
        }

        cList[key] = value;
        setCheckedIdList(cList);
    }
    function getChecked(key){
        return checkedIdList[key]
    }
    function makeCheckedList(key, value) {
        let cList = {};
        let list = Object.keys(checkedList);
        for (let key of list) {
            cList[key] = checkedList[key];
        }

        cList[key] = value;
        setCheckedList(cList);
        disabledApplyButton(cList)
    }

    const clickApplyDictionary = (event) => {
        let data = {};
        let str = "";
        let ids = "";

        setProgress(true);
        let keyList = Object.keys(checkedList);
        for (let key of keyList) {
            if (checkedList[key]) {
                if (str.length === 0) {
                    str = key;
                    ids = checkedIdList[key]
                } else {
                    str += "," + key;
                    ids += "," + checkedIdList[key]
                }
            }
        }
        data.ids = ids;
        data.type = str;
        dispatch(applyDictionary(data)).then(() => { setApplyDict(true); setProgress(false); utils.sleep(1000).then(() => { dispatch(setSummary()) }); });
    }

    function disabledApplyButton(list) {
        let keyList = Object.keys(list);
        let flag = true;
        for (let key of keyList) {
            if (list[key]) {
                flag = false;
                break;
            }
        }
        setDisabled(flag);
    }

    function handleCheckBoxClickAll(event) {
        let infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
        let settings = summary.dictionarySettings;

        let tableInfo = [];

        for (let i in infoDict) {
            if (infoDict[i].type === systemInfo.type) {
                var info = infoDict[i];
                info.name = systemInfo.name;
                tableInfo.push(info);
                break;
            }
        }

        for (let i in settings) {
            let info = settings[i];
            for (var j in infoDict) {
                if (settings[i].id === infoDict[j].type) {
                    info.count = infoDict[j].count;
                    info.words = infoDict[j].words;
                    info.indexCount = infoDict[j].indexCount;
                    break;
                }
            }

            tableInfo.push(info);
        }
        let tmpCheckedList = {}
        let tmpCheckedIdList ={}

        tableInfo.forEach((info) => {
            if (info.type !== systemInfo.type) {
                let key = info.id;
                tmpCheckedList[key] = info.documentId;
                tmpCheckedIdList[key] = event.target.checked;
            }
        })

        setCheckedIdList(tmpCheckedIdList);
        setCheckedList(tmpCheckedList);
        disabledApplyButton(tmpCheckedList)
        setCheckedAll(event.target.checked)
    }

    return (
        <React.Fragment>
            <br />
            <Card>
                <CardContent>
                    <Box>
                        {authUser.role.analysis ?
                            progress ? <CircularProgress /> : <Button disabled={disabled} variant={"contained"} color={"primary"} onClick={clickApplyDictionary}>사전적용</Button>
                            : <></>}
                    </Box>
                    <Box>
                        <Snackbar open={applyDict} autoHideDuration={5000} onClose={() => { setApplyDict(false) }}>
                            <MuiAlert elevation={6} variant="filled" severity="info"> 사전 적용 성공 </MuiAlert>
                        </Snackbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    {/* <TableCell><Checkbox onChange={handleCheckBoxClickAll} /></TableCell> */}
                                    <TableCell>이름</TableCell>
                                    <TableCell>타업</TableCell>
                                    <TableCell>작업단어갯수</TableCell>
                                    <TableCell>수정시간</TableCell>
                                    <TableCell>적용단어갯수</TableCell>
                                    <TableCell>적용시간</TableCell>
                                    <TableCell>토큰타입</TableCell>
                                    <TableCell>대소문자무시</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <SummaryTable checkedAll={checkedAll}  authUser={authUser} summary={summary} makeCheckedIdList={makeCheckedIdList} makeCheckedList={makeCheckedList} getChecked={getChecked} />
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    summary: store.dictionaryReducers.summary,
    update: store.dictionaryReducers.update
}))(Summary)