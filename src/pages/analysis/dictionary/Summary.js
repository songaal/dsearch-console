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

let checkedList = {};
let checkedIDList = {};
function SummaryTable({summary}){
    if(summary.dictionaryInfo === undefined || summary.dictionarySettings === undefined) return <></>;

    let infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    let settings = summary.dictionarySettings;
    let tableInfo = [];

    for(let i in infoDict){
        if(infoDict[i].type == "SYSTEM"){
            var info = infoDict[i];
            info.name = "시스템 사전";
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
        checkedIDList[event.target.value] = event.target.id;
        checkedList[event.target.value] = event.target.checked;
    }
    
    return tableInfo.map((info) => { 
        if(info.id !== undefined) checkedList[info.id] = false;

        return  <TableRow key={info.id}>
        <TableCell><Checkbox id={info.documentId} name={"checkbox"} value={info.id} onChange={handleCheckBox}/></TableCell>
        <TableCell>{info.name}</TableCell>
        <TableCell>{info.type}</TableCell>
        <TableCell>{info.indexCount ? info.indexCount : "0"}</TableCell>
        <TableCell> {info.updatedTime ? info.updatedTime : "-"} </TableCell>
        <TableCell>{info.count}</TableCell>
        <TableCell> {info.appliedTime ? info.appliedTime : "-"} </TableCell>
        <TableCell> {info.tokenType ? info.tokenType : "-"} </TableCell>
        <TableCell> {info.ignoreCase ? info.ignoreCase ? "Y": "N" : "-"} </TableCell>
        </TableRow> });
}


 function Summary({dispatch, authUser, summary, update}) {
     const [applyDict, setApplyDict ] = useState(false);
    checkedList = {};
    
    useEffect(() => {
        dispatch(setSummary())
    }, [])

    const clickApplyDictionary = (event) => {
        let data = {};
        let str = "";
        let ids = "";
        setApplyDict(true);
        let keyList = Object.keys(checkedList);
        for(let key of keyList){
            if(checkedList[key]){
                if(str.length === 0){
                    str = key;
                    ids = checkedIDList[key]
                }else{
                    str += "," + key;
                    ids += "," + checkedIDList[key]
                }
            }
        }
        data.ids = ids;
        data.type = str;
        dispatch(applyDictionary(data))
        utils.sleep(1000).then(() => {  dispatch(setSummary()) });
    }


    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Box>
                        {authUser.role.analysis ? 
                             applyDict ? <CircularProgress /> : <Button variant={"contained"} color={"primary"} onClick={clickApplyDictionary}>사전적용</Button> 
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
                                <SummaryTable authUser={authUser} summary={summary}/>
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


export default connect(store => ({ 
    authUser: store.fastcatxReducers.authUser,
    summary: store.dictionaryReducers.summary,
    update: store.dictionaryReducers.update
}))(Summary)