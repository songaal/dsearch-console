import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Box, CircularProgress,
    Card,
    CardContent,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox, Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {setSummary, applyDictionary} from "../../../redux/actions/dictionaryActions";
import utils from "../../../utils";


const systemInfo = {
    type: "SYSTEM",
    name: "시스템 사전"
}

function SummaryTable({summary, makeCheckedIdList, makeCheckedList}){
    if(summary.dictionaryInfo === undefined || summary.dictionarySettings === undefined) return <></>;

    let infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    let settings = summary.dictionarySettings;
    let tableInfo = [];

    for(let i in infoDict){
        if(infoDict[i].type == systemInfo.type){
            var info = infoDict[i];
            info.name = systemInfo.name;
            tableInfo.push(info);
            break;
        }
    }

    for(let i in settings){
        let info = settings[i];
        for(var j in infoDict){
            if(settings[i].id == infoDict[j].type){
                info.count = infoDict[j].count;
                info.words = infoDict[j].words;
                info.indexCount = infoDict[j].indexCount;
                break;
            }
        }

        tableInfo.push(info);
    }
    
    const handleCheckBox = (event) =>{
        makeCheckedIdList(event.target.value, event.target.id);
        makeCheckedList(event.target.value, event.target.checked);
    }
    
    return tableInfo.map((info) => { 
        return  <TableRow key={info.id}>
            <TableCell> {info.type === systemInfo.type ? <></> : <Checkbox id={info.documentId} name={"checkbox"} value={info.id} onChange={handleCheckBox}/>} </TableCell>
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.type}</TableCell>
            <TableCell>{info.indexCount ? Number(info.indexCount).toLocaleString() : "0"}</TableCell>
            <TableCell> {info.updatedTime ? new Date(info.updatedTime).toLocaleString() : "-"} </TableCell>
            <TableCell>{Number(info.count).toLocaleString()}</TableCell>
            <TableCell> {info.appliedTime ? new Date(info.appliedTime).toLocaleString() : "-"} </TableCell>
            <TableCell> {info.tokenType ? info.tokenType : "-"} </TableCell>
            <TableCell> {info.ignoreCase ? info.ignoreCase ? "Y": "N" : "-"} </TableCell>
        </TableRow> });
}


 function Summary({dispatch, authUser, summary, update}) {
    const [applyDict, setApplyDict] = useState(false);
    const [progress, setProgress] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [checkedList, setCheckedList] = useState({});
    const [checkedIdList, setCheckedIdList] = useState({});

    useEffect(() => {
        dispatch(setSummary())
    }, [])

    function makeCheckedIdList(key, value){
        let cList = {};
        let list = Object.keys(checkedIdList);
        for(let key of list){
            cList[key] = checkedIdList[key];
        }

        cList[key] = value;
        setCheckedIdList(cList);
    }

    function makeCheckedList(key, value){
        let cList = {};
        let list = Object.keys(checkedList);
        for(let key of list){
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
        for(let key of keyList){
            if(checkedList[key]){
                if(str.length === 0){
                    str = key;
                    ids = checkedIdList[key]
                }else{
                    str += "," + key;
                    ids += "," + checkedIdList[key]
                }
            }
        }
        data.ids = ids;
        data.type = str;
        dispatch(applyDictionary(data)).then(() => {setApplyDict(true); setProgress(false); utils.sleep(1000).then(() => { dispatch(setSummary()) }); });
    }

    function disabledApplyButton(list){
        let keyList = Object.keys(list);
        let flag = true;
        for(let key of keyList){
            if(list[key]){
                flag = false; 
                break;
            }
        }
        setDisabled(flag);
    }

    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Box>
                        {authUser.role.analysis ? 
                             progress ? <CircularProgress /> : <Button disabled={disabled} variant={"contained"} color={"primary"} onClick={clickApplyDictionary}>사전적용</Button> 
                            : <></> }
                    </Box>
                    <Box>
                        <Snackbar open={applyDict} autoHideDuration={5000} onClose={() => { setApplyDict(false) }}>
                            <MuiAlert elevation={6} variant="filled" severity="info"> 사전 적용 성공 </MuiAlert>
                        </Snackbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
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
                                <SummaryTable authUser={authUser} summary={summary} makeCheckedIdList={makeCheckedIdList} makeCheckedList={makeCheckedList} />
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