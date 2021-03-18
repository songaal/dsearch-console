import React, { useEffect } from "react";
// import ReactDragList from 'react-drag-list'
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { connect } from "react-redux";

import ReactDragListView from 'react-drag-listview/lib/index.js';

import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Divider as MuiDivider,
    Grid,
    List, ListItem,
    Typography,
    Button,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableCell,
    TableBody, TextField, Select, MenuItem, FormControl, IconButton, Link,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { setSettings, setAddDictionarySetting, removeDictionarySetting, updatedSettingList } from "../../../redux/actions/dictionaryActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import utils from "../../../utils";

const Divider = styled(MuiDivider)(spacing);

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
    link: {
        cursor: "pointer"
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));



let firstSetting = 
    {
        "header": true,
        "id": "아이디",
        "name": "이름",
        "type": "타입",
        "ignoreCase": "대/소문자무시",
        "tokenType":  "토큰 타입", 
        "columns1": "필드(아이디)", 
        "columns2": "필드(키워드)", 
        "columns3": "필드(값)", 
        "columns4": "삭제"
    };


function Settings({ dispatch, authUser, settings }) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const [settingsList, setSettingsList] = React.useState(settings)

    const [openEditDictModal, setOpenEditDictModal] = React.useState(false)

    const [selectedSetting, setSelectedSetting] = React.useState({})
    const [openRemoveDictModal, setOpenRemoveDictModal] = React.useState(false)
    const [newDictSetting, setNewDictSetting] = React.useState({
        id: "",
        name: "",
        type: "",
        tokenType: "",
        ignoreCase: "",
        column_id: "",
        column_keyword: "",
        column_value: "",
    })
    const [errorNewDictSetting, setErrorNewDictSetting] = React.useState({})

    useEffect(() => {
        dispatch(setSettings())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleOpenEditModal() {
        setNewDictSetting({
            id: "",
            name: "",
            type: "",
            tokenType: "",
            ignoreCase: "",
            column_id: "",
            column_keyword: "",
            column_value: "",
        })
        setOpenEditDictModal(true)
    }

    function handleOpenRemoveSettingModal(setting) {
        setSelectedSetting(setting);
        setOpenRemoveDictModal(true)
    }

    function handleAddSetting() {
        let tmpError = {}

        if (newDictSetting['id'].trim() === '' || /[^a-z0-9_]+/gi.test(newDictSetting['id'].trim())) {
            tmpError['id'] = "아이디를 확인하세요. (a-zA-Z0-9_ 글자만 가능합니다.)"
        }
        if (newDictSetting['name'].trim() === '') {
            tmpError['name'] = "이름를 확인하세요."
        }
        if (newDictSetting['type'] === '') {
            tmpError['type'] = "타입을 선택하세요."
        }
        if (newDictSetting['tokenType'] === '') {
            tmpError['tokenType'] = "토큰타입을 선택하세요."
        }
        if (newDictSetting['ignoreCase'] === '') {
            tmpError['ignoreCase'] = "대/소문자 무시를 선택하세요."
        }
        if (newDictSetting['type']) {
            let type = newDictSetting['type']
            if (["CUSTOM"].includes(type) && String(newDictSetting['column_id'] || '').trim() === '') {
                // id
                tmpError['column_id'] = "필드 아이디를 확인하세요."
            }
            if (["SET", "SYNONYM", "SPACE", "COMPOUND", "CUSTOM"].includes(type) && String(newDictSetting['column_keyword'] || '').trim() === '') {
                // keyword
                tmpError['column_keyword'] = "필드의 키워드를 확인하세요."
            }
            if (["SYNONYM", "COMPOUND", "SYNONYM_2WAY", "CUSTOM"].includes(type) && String(newDictSetting['column_value'] || '').trim() === '') {
                // value
                tmpError['column_value'] = "필드의 값를 확인하세요."
            }
        }

        if (Object.keys(tmpError).length > 0) {
            console.log(tmpError)
            setErrorNewDictSetting(tmpError)
            return;
        }

        dispatch(setAddDictionarySetting({
            id: newDictSetting['id'], name: newDictSetting['name'], ignoreCase: newDictSetting['ignoreCase'],
            type: newDictSetting['type'], tokenType: newDictSetting['tokenType'],
            columns_id: newDictSetting['column_id'],
            columns_keyword: newDictSetting['column_keyword'],
            columns_value: newDictSetting['column_value']
        })).then(body => {

            let columns  = [];

            if(newDictSetting['column_id'] != ""){
                columns.push({"type": "id", "label": newDictSetting['column_id']})
            }
            if(newDictSetting['column_keyword'] != ""){
                columns.push({"type": "keyword", "label": newDictSetting['column_keyword']})
            }
            if(newDictSetting['column_value'] != ""){
                columns.push({"type": "value", "label": newDictSetting['column_value']})
            }
            setSettingsList(settingsList.concat({
                id: newDictSetting['id'], 
                name: newDictSetting['name'], 
                ignoreCase: newDictSetting['ignoreCase'],
                type: newDictSetting['type'], 
                tokenType: newDictSetting['tokenType'],
                index: settings.length,
                columns: columns
            }))

            setTimeout(() => {
                dispatch(setSettings())
                setOpenEditDictModal(false)
            }, 1000)
        })
    }

    function handleRemoveDictionarySetting() {
        dispatch(removeDictionarySetting(selectedSetting['documentId']))
            .then(body => {
                
                let tmpList = settingsList
                let idx = tmpList.findIndex((item) => { return item['documentId'] === selectedSetting['documentId']})
                tmpList.splice(idx, 1);

                setSettingsList(tmpList);

                // settings = settingsList;
                // idx = settings.findIndex((item) => { return item['documentId'] === selectedSetting['documentId']})
                // settings.splice(idx, 1);

                setTimeout(() => {
                    dispatch(setSettings())
                    setOpenRemoveDictModal(false)
                }, 1000)
            })
    }

    function updateSettingList(e){
        if( e.oldIndex === e.newIndex ) return;

        let list = [];
        
        if(e.oldIndex < e.newIndex){
            // 위에 있는 내용을 밑으로 
            list = list.concat(settings.slice(0, e.oldIndex))
            list = list.concat(settings.slice(e.oldIndex+1, e.newIndex+1))
            list = list.concat(settings[e.oldIndex])
            list = list.concat(settings.slice(e.newIndex+1, settings.length));
        }else if(e.oldIndex > e.newIndex){
            // 밑에 있는 내용을 위로 
            list = list.concat(settings.slice(0, e.newIndex))
            list = list.concat(settings[e.oldIndex])
            list = list.concat(settings.slice(e.newIndex, e.oldIndex));
            list = list.concat(settings.slice(e.oldIndex+1, settings.length));
        }

        for(let i = 0; i < list.length; i++){
            list[i]['index'] = i+1;
        }

        settings = list;
        dispatch(updatedSettingList(list));
    }

    function updateSettingList(settings, fromIndex, toIndex){
        if( fromIndex === toIndex ) return;
        
        for(let i = 0; i < settings.length; i++){
            settings[i]['index'] = i+1;
        }

        setSettingsList(settings);
        dispatch(updatedSettingList(settings));
    }


    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = [...settingsList];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setSettingsList(data)

            updateSettingList(data, fromIndex, toIndex)
        },
        nodeSelector: 'div',
        handleSelector: 'svg'
      };


    return (
        <>
            <Helmet title="사전 설정" />

            <Box align={'right'}>
                {authUser.role.index ? <Link className={classes.link}
                    onClick={handleOpenEditModal}
                    color={"primary"}
                >
                    사전 생성
                </Link> : <></>}
            </Box>

            <br />
            <TableContainer component={Paper}>
                <Box style={{ width: "100%", marginTop: "12px", marginBottom: "12px"}}>
                                <Box style={{ width: "100%", display: "flex",  paddingTop: "8px", paddingBottom: "8px" }} >
                                    <Box align={"center"} style={{ width: "5%" }}><b>#</b></Box>
                                    <Box align={"center"} style={{ width: "10%" }}><b>{firstSetting['id']}</b></Box>
                                    <Box align={"center"} style={{ width: "15%" }}><b>{firstSetting['name']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['type']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['ignoreCase']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['tokenType']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['columns1']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['columns2']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['columns3']}</b></Box>
                                    <Box align={"center"} style={{ width: "10%", margin: "4px" }}><b>{firstSetting['columns4']}</b></Box>
                                </Box>
                                <Divider />
                </Box>

                <ReactDragListView {...dragProps}>
                    
                    {settingsList.map((item, idx) => (
                        <Box key={idx} style={{ width: "100%", display: "flex",  marginTop: "8px", marginBottom: "8px", paddingTop: "12px", paddingBottom: "12px" } } >
                            <DragHandleIcon style={{cursor: "move", width: "5%"}} />
                            <Box align={"center"} style={{ width: "10%" }}>{item['id']}</Box>
                            <Box align={"center"} style={{ width: "15%" }}>{item['name']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['type']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['ignoreCase'] ? "true" : "false"}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['tokenType']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'id').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'keyword').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'value').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>
                                <Button size={"small"}
                                    variant={"outlined"}
                                    style={{ color: red[400] }}
                                    onClick={() => handleOpenRemoveSettingModal(item)}
                                >삭제</Button>
                            </Box>
                        </Box>
                        ))}
                </ReactDragListView>

                {/* <ReactDragList
                    style={{ width: "100%" }}
                    dataSource={settings}
                    animation={0}
                    handles={false}
                    onUpdate={(event) => updateSettingList(event)}
                    row={(item, idx) => (
                        <Box key={idx} style={{ width: "100%", display: "flex",  paddingTop: "8px", paddingBottom: "8px" }} >
                            <Box align={"center"} style={{ width: "15%" }}>{item['id']}</Box>
                            <Box align={"center"} style={{ width: "15%" }}>{item['name']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['type']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['ignoreCase'] ? "true" : "false"}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['tokenType']}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'id').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'keyword').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>{item['columns'].filter(c => c['type'] === 'value').map(c => c['label']).join("")}</Box>
                            <Box align={"center"} style={{ width: "10%", margin: "4px" }}>
                                <Button size={"small"}
                                    variant={"outlined"}
                                    style={{ color: red[400] }}
                                    onClick={() => handleOpenRemoveSettingModal(item)}
                                >삭제</Button>
                            </Box>
                        </Box>
                    )
                    }
                /> */}


                {/* <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>아이디</TableCell>
                            <TableCell align={"center"}>이름</TableCell>
                            <TableCell align={"center"}>타입</TableCell>
                            <TableCell align={"center"}>대/소문자무시</TableCell>
                            <TableCell align={"center"}>토큰타입</TableCell>
                            <TableCell align={"center"}>필드(아이디)</TableCell>
                            <TableCell align={"center"}>필드(키워드)</TableCell>
                            <TableCell align={"center"}>필드(값)</TableCell>
                            <TableCell align={"center"}>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            settings.length === 0 ?
                                <TableRow>
                                    <TableCell colSpan={11} align={"center"}>
                                        등록된 사전이 없습니다.
                                    </TableCell>
                                </TableRow>
                                :
                                settings.map((setting, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align={"center"}>
                                                <Box>{setting['id']}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['name']}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['type']}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['ignoreCase'] ? "true" : "false"}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['tokenType']}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['columns'].filter(c => c['type'] === 'id').map(c => c['label']).join("")}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['columns'].filter(c => c['type'] === 'keyword').map(c => c['label']).join("")}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Box>{setting['columns'].filter(c => c['type'] === 'value').map(c => c['label']).join("")}</Box>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Button size={"small"}
                                                    variant={"outlined"}
                                                    style={{ color: red[400] }}
                                                    onClick={() => handleOpenRemoveSettingModal(setting)}
                                                >삭제</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table> */}
            </TableContainer>
            <Dialog open={openEditDictModal}
                fullWidth
                fullScreen={fullScreen}
                onClose={() => setOpenEditDictModal(false)}
            >
                <DialogTitle>
                    사전 추가
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Box>
                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        아이디
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField fullWidth={true}
                                            autoFocus={true}
                                            placeholder={"Synonym"}
                                            value={newDictSetting["id"]}
                                            onChange={e => setNewDictSetting({ ...newDictSetting, id: e.target.value })}
                                            error={errorNewDictSetting['id']}
                                            helperText={errorNewDictSetting['id'] || ""}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        이름
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField fullWidth={true}
                                            placeholder={"동의어 사전"}
                                            value={newDictSetting["name"]}
                                            onChange={e => setNewDictSetting({ ...newDictSetting, name: e.target.value })}
                                            error={errorNewDictSetting['name']}
                                            helperText={errorNewDictSetting['name'] || ""}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        타입
                                    </Grid>
                                    <Grid item xs={9}>
                                        <FormControl className={classes.select} fullWidth={true}>
                                            <Select placeholder={"SYNONYM"}
                                                value={newDictSetting["type"]}
                                                onChange={e => {
                                                    setNewDictSetting({
                                                        ...newDictSetting,
                                                        column_id: "",
                                                        column_keyword: "",
                                                        column_value: "",
                                                        type: e.target.value,
                                                    })
                                                }}
                                                error={errorNewDictSetting['type']}
                                            >
                                                <MenuItem value={""} disabled={true} >선택하세요.</MenuItem>
                                                <MenuItem value={"SET"}>SET</MenuItem>
                                                <MenuItem value={"SYNONYM"}>SYNONYM</MenuItem>
                                                <MenuItem value={"SPACE"}>SPACE</MenuItem>
                                                <MenuItem value={"COMPOUND"}>COMPOUND</MenuItem>
                                                <MenuItem value={"SYNONYM_2WAY"}>SYNONYM_2WAY</MenuItem>
                                                <MenuItem value={"CUSTOM"}>CUSTOM</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        토큰 타입
                                    </Grid>
                                    <Grid item xs={9}>
                                        <FormControl className={classes.select} fullWidth={true}>
                                            <Select placeholder={"MAX"}
                                                value={newDictSetting["tokenType"]}
                                                onChange={e => setNewDictSetting({ ...newDictSetting, tokenType: e.target.value })}
                                                error={errorNewDictSetting['tokenType']}
                                            >
                                                <MenuItem value={""} disabled={true} >선택하세요.</MenuItem>
                                                <MenuItem value={"MAX"}>MAX</MenuItem>
                                                <MenuItem value={"MIN"}>MIN</MenuItem>
                                                <MenuItem value={"MID"}>MID</MenuItem>
                                                <MenuItem value={"HIGH"}>HIGH</MenuItem>
                                                <MenuItem value={"NONE"}>NONE</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        대/소문자 무시
                                    </Grid>
                                    <Grid item xs={9}>
                                        <FormControl className={classes.select} fullWidth={true}>
                                            <Select value={newDictSetting["ignoreCase"]}
                                                onChange={e => setNewDictSetting({ ...newDictSetting, ignoreCase: e.target.value })}
                                                error={errorNewDictSetting['ignoreCase']}
                                            >
                                                <MenuItem value={""} disabled={true} >선택하세요.</MenuItem>
                                                <MenuItem value={"true"}>true</MenuItem>
                                                <MenuItem value={"false"}>false</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box my={3}>
                                <Grid container>
                                    <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        필드
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Box my={3}>
                                            <Grid container>
                                                <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                                    아이디
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <TextField fullWidth={true}
                                                        value={newDictSetting["column_id"]}
                                                        onChange={e => setNewDictSetting({ ...newDictSetting, column_id: e.target.value })}
                                                        placeholder={""}
                                                        style={{ backgroundColor: !["CUSTOM"].includes(newDictSetting['type']) ? "#bdbdbd" : null }}
                                                        disabled={!["CUSTOM"].includes(newDictSetting['type'])}
                                                        error={errorNewDictSetting["columns_id"]}
                                                        helperText={errorNewDictSetting["column_id"] || ""}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Box my={3}>
                                            <Grid container>
                                                <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                                    키워드
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <TextField fullWidth={true}
                                                        placeholder={""}
                                                        value={newDictSetting["column_keyword"]}
                                                        onChange={e => setNewDictSetting({ ...newDictSetting, column_keyword: e.target.value })}
                                                        style={{ backgroundColor: !["SET", "SYNONYM", "SPACE", "COMPOUND", "CUSTOM"].includes(newDictSetting['type']) ? "#bdbdbd" : null }}
                                                        disabled={!["SET", "SYNONYM", "SPACE", "COMPOUND", "CUSTOM"].includes(newDictSetting['type'])}
                                                        error={errorNewDictSetting["column_keyword"]}
                                                        helperText={errorNewDictSetting["column_keyword"] || ""}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Box my={3}>
                                            <Grid container>
                                                <Grid item xs={3} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                                                    값
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <TextField fullWidth={true}
                                                        placeholder={""}
                                                        value={newDictSetting["column_value"]}
                                                        onChange={e => setNewDictSetting({ ...newDictSetting, column_value: e.target.value })}
                                                        style={{ backgroundColor: !["SYNONYM", "COMPOUND", "SYNONYM_2WAY", "CUSTOM"].includes(newDictSetting['type']) ? "#bdbdbd" : null }}
                                                        disabled={!["SYNONYM", "COMPOUND", "SYNONYM_2WAY", "CUSTOM"].includes(newDictSetting['type'])}
                                                        error={errorNewDictSetting["column_value"]}
                                                        helperText={errorNewDictSetting["column_value"] || ""}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Box mx={3}>
                        <Button variant="contained"
                            color={"primary"}
                            style={{ marginRight: "5px" }}
                            onClick={handleAddSetting}
                        >추가</Button>
                        <Button variant={"outlined"}
                            onClick={() => setOpenEditDictModal(false)}
                            style={{ marginLeft: "5px" }}
                        >닫기</Button>
                    </Box>
                </DialogActions>
            </Dialog>




            <Dialog open={openRemoveDictModal}
                fullWidth
                fullScreen={fullScreen}
                onClose={() => setOpenRemoveDictModal(false)}
            >
                <DialogTitle>
                    사전 삭제
                </DialogTitle>
                <DialogContent>
                    {selectedSetting['name'] || ''} 사전을 삭제하시겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                        color={"primary"}
                        onClick={handleRemoveDictionarySetting}
                    >삭제</Button>
                    <Button variant={"outlined"}
                        onClick={() => setOpenRemoveDictModal(false)}
                    >취소</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    settings: store.dictionaryReducers.settings,
    active: store.dictionaryReducers.active
}))(Settings);