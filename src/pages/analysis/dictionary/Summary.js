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

function makeTableInfo(summary){
    let tableInfo = [];

    if (summary.dictionaryInfo === undefined || summary.dictionarySettings === undefined) return tableInfo;

    let infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    let settings = summary.dictionarySettings;

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
                info.updatedTime = infoDict[j].updatedTime; // 플러그인 info-dict 호출 후 받아온다.
                info.appliedTime = infoDict[j].appliedTime; // 플러그인 info-dict 호출 후 받아온다.
                break;
            }
        }

        tableInfo.push(info);
    }

    return tableInfo;
}

function isEmpty(param) {
    return Object.keys(param).length === 0;
  }

function Summary({ dispatch, authUser, summary, update }) {
    const [prevSummary, setPrevSummary] = useState({});
    const [applyDict, setApplyDict] = useState(false);
    const [progress, setProgress] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [tableInfo, setTableInfo] = useState([]);

    // checkedAllList[type] = [documentId, checked]
    const [checkedAllList, setCheckedAllList] = useState({});
    const [checkedAll, setCheckedAll] = useState(false);

    useEffect(() => {
        dispatch(setSummary())

        return () => {}
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(isEmpty(tableInfo) && !isEmpty(summary)){ // 이 조건이 없으면 tableInfo가 unlimited 업데이트됨.
        setPrevSummary(JSON.stringify(summary));
        setTableInfo(makeTableInfo(summary))
    }else if(JSON.stringify(summary) !== prevSummary){
        // summary에 등록된 값이 이전 값과 다르면 tableInfo 다시 만들기.
        // redux에 summary에 새로운 값이 등록되는 시점과 tableInfo가 업데이트 되는 시점이 달라서 추가.
        setPrevSummary(JSON.stringify(summary));
        setTableInfo(makeTableInfo(summary))
    }

    const clickApplyDictionary = () => {
        let data = {};
        let str = "";
        let ids = "";

        setProgress(true);

        let keyList = Object.keys(checkedAllList);
        // checkedAllList[type] = [documentId, checked]
        for (let key of keyList) {
            let list = checkedAllList[key];
            if(list[1]){
                if (str.length === 0) {
                    str = key;
                    ids = list[0];
                } else {
                    str += "," + key;
                    ids += "," + list[0];
                }    
            }
        }
        data.ids = ids;
        data.type = str;

        dispatch(applyDictionary(data)).then(() => { 
            setApplyDict(true); 
            setProgress(false); 
            setTableInfo([]);

            utils.sleep(1000).then(() => { 
                dispatch(setSummary())
            })
        });
    }

    function disabledApplyButton(list) {
        let flag = true;
        let keyList = Object.keys(list);
        for (let key of keyList) {
            let cList = list[key];
            if (cList[1]) {
                flag = false;
                break;
            }
        }

        setDisabled(flag);
    }

    function handleCheckBoxClickAll(event) {
        let tmpCheckedAllList = {};
        
        tableInfo.map((info) => {
            let documentId = info['documentId']
            let id = info['id']
            if( documentId != undefined ){
                tmpCheckedAllList[id] = [documentId, event.target.checked]
            }
        })

        disabledApplyButton(tmpCheckedAllList)
        setCheckedAllList(tmpCheckedAllList)
        setCheckedAll(event.target.checked)
    }

    const handleCheckBox = (event, documentId) => {
        let checked = event.target.checked
        let value = event.target.value
        let tmpCheckedAllList = {}

        let keyList = Object.keys(checkedAllList);
        for (let key of keyList) {
            tmpCheckedAllList[key] = checkedAllList[key];
        }

        tmpCheckedAllList[value] = [documentId, checked];
        disabledApplyButton(tmpCheckedAllList)
        setCheckedAllList(tmpCheckedAllList)
    }

    return (
        <React.Fragment>
            <br />
            <Card>
                <CardContent>
                    <Box>
                        {authUser.role.analysis ?
                            progress ? <CircularProgress /> : <Button disabled={disabled} variant={"contained"} color={"primary"} onClick={() => { clickApplyDictionary() } }>사전적용</Button>
                            : <></>}
                        {/* <label style={{marginLeft: "4px", marginTop: "2px"}}>(사전 적용은 시간이 오래 걸립니다.)</label> */}
                    </Box>
                    <Box>
                        <Snackbar open={applyDict} autoHideDuration={5000} onClose={() => { setApplyDict(false) }}>
                            <MuiAlert elevation={6} variant="filled" severity="info"> 사전 적용 성공 </MuiAlert>
                        </Snackbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>#</TableCell> */}
                                    <TableCell>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            onChange={handleCheckBoxClickAll}
                                        />
                                    </TableCell>
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
                                {
                                    tableInfo.map((info, index) => {
                                        let key = info.id;
                                        let checkedList = checkedAllList[key];
                                        return <TableRow key={index}>
                                             <TableCell>
                                            {
                                                checkedAll ? 
                                                    info.type === systemInfo.type ? <></> : 
                                                        <FormControlLabel
                                                                control={<Checkbox />}
                                                                checked={checkedList == undefined ? false : checkedList[1]}
                                                                onChange={(event) => handleCheckBox(event, info.documentId)}
                                                                id={info.documentId} 
                                                                name={"checkbox"} 
                                                                value={info.id} 
                                                                defaultChecked={true}
                                                        />
                                                    : info.type === systemInfo.type ? <></> : 
                                                        <FormControlLabel
                                                                control={<Checkbox />}
                                                                checked={checkedList == undefined ? false : checkedList[1]}
                                                                onChange={(event) => handleCheckBox(event, info.documentId)}
                                                                id={info.documentId} name={"checkbox"} value={info.id}
                                                        />
                                            }
                                            </TableCell>
                                            <TableCell>{info.name}</TableCell>
                                            <TableCell>{info.type}</TableCell>
                                            <TableCell>{info.indexCount == undefined || info.indexCount == null ?  "0" : Number(info.indexCount).toLocaleString()}</TableCell>
                                            <TableCell> {info.updatedTime ? new Date(info.updatedTime).toLocaleString() : "-"} </TableCell>
                                            <TableCell>{info.count == undefined || info.count == null ? "0" : Number(info.count).toLocaleString()}</TableCell>
                                            <TableCell> {info.appliedTime ? new Date(info.appliedTime).toLocaleString() : "-"} </TableCell>
                                            <TableCell> {info.tokenType ? info.tokenType : "-"} </TableCell>
                                            <TableCell> {info.ignoreCase ? info.ignoreCase ? "Y" : "N" : "-"} </TableCell>
                                        </TableRow>
                                    })
                                }
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