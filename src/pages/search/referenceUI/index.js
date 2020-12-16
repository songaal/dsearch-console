import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Box as MuiBox,
    Button as MuiButton,
    Divider as MuiDivider,
    Grid as MuiGrid,
    IconButton as MuiIconButton,
    TextField as MuiTextField,
    Typography as MuiTypography,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Hidden,
    List as MuiList,
    ListItem as MuiListItem
} from "@material-ui/core";
import {} from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import {
    ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon,
    PlusSquare as PlusSquareIcon,
    MinusSquare as MinusSquareIcon,
} from "react-feather";

import {makeStyles} from "@material-ui/styles";
import {borders, display, palette, sizing, spacing} from "@material-ui/system";
import * as Color from '@material-ui/core/colors';
import {setAutoCompleteURLAction, getAutoCompleteURLAction} from "../../../redux/actions/dsearchPluginActions"
import {
    addReferenceTemplate,
    updateReferenceTemplate,
    setReferenceTemplateList,
    deleteReferenceTemplate, actionReferenceTemplate
} from "../../../redux/actions/referenceSearchActions";
import utils from '~/utils'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";

const Box = styled(MuiBox)(spacing, palette, sizing, display, borders);
const Divider = styled(MuiDivider)(spacing, palette, sizing, display, borders);
const Grid = styled(MuiGrid)(spacing, palette, sizing, display, borders);
const Typography = styled(MuiTypography)(spacing, palette, sizing, display, borders);
const TextField = styled(MuiTextField)(spacing, palette, sizing, display, borders);
const IconButton = styled(MuiIconButton)(spacing, palette, sizing, display, borders);
const Button = styled(MuiButton)(spacing, palette, sizing, display, borders);
const Card = styled(MuiCard)(spacing, palette, sizing, display, borders);
const CardContent = styled(MuiCardContent)(spacing, palette, sizing, display, borders);
const List = styled(MuiList)(spacing, palette, sizing, display, borders);
const ListItem = styled(MuiListItem)(spacing, palette, sizing, display, borders);


const useStyles = makeStyles(theme => ({
    warm: {backgroundColor: Color.orange['500']},
    textarea: {width: "100%", minHeight: "200px"},
}));

const placeholder = {
    query: JSON.stringify({
        "query": {
            "match" : {
                "message" : {
                    "query" : "$keyword"
                }
            }
        },
        "aggr": {}
    }, null, 4)
}

function SearchFormPanel({template, authUser, templateIndex, lastTemplateIndex, onDelete, onSave, onUp, onDown, disabledSaveButton, disabledDeleteButton, disabledOrderButton}) {
    const classes = useStyles()
    const [name, setName] = useState(template['name'] || '')
    const [indices, setIndices] = useState(template['indices'] || '')
    const [query, setQuery] = useState(template['query'] || '')
    const [title, setTitle] = useState(template['title'] || '')
    const [clickUrl, setClickUrl] = useState(template['clickUrl'] || '')
    const [thumbnails, setThumbnails] = useState(template['thumbnails'] || '')
    const [fields, setFields] = useState(template['fields'] && template['fields'].length !== 0 ? template['fields'] : [{}])
    const [aggs, setAggs] = useState(template['aggs'] && template['aggs'].length !== 0 ? template['aggs'] : [{}])
    const [editable, setEditable] = useState(false)

    const aceEditor = useRef(null);

    useEffect(() => {
        aceEditor.current.editor.setValue(template['query'] || '', 0)
        aceEditor.current.editor.clearSelection()
    }, [])

    function handleChangeField(event, index, field) {
        let clone = fields.slice()
        clone[index][field] = event.target.value
        setFields(clone)
    }

    function handleAddField(type, index) {
        if (type === 'fields') {
            setFields([].concat(fields.slice(0, index + 1), {label: '', value: ''}, fields.slice(index + 1)))
        } else if (type === 'aggs') {
            setAggs([].concat(aggs.slice(0, index + 1), {label: '', value: ''}, aggs.slice(index + 1)))
        }
    }

    function handleRemoveField(type, index) {
        if (type === 'fields') {
            let tmp = [].concat(fields.slice(0, index), fields.slice(index + 1))
            if (tmp.length === 0) {
                tmp.push({label: '', value: ''})
            }
            setFields(tmp)
        } else if (type === 'aggs') {
            let tmp = [].concat(aggs.slice(0, index), aggs.slice(index + 1))
            if (tmp.length === 0) {
                tmp.push({label: '', value: ''})
            }
            setAggs(tmp)
        }
    }

    function handleChangeAggs(event, index, field) {
        let clone = aggs.slice()
        clone[index][field] = event.target.value
        setAggs(clone)
    }

    function handleSave() {
        onSave({
            name,
            indices,
            query,
            title,
            clickUrl,
            thumbnails,
            id: template.id,
            order: template['order'],
            fields: fields.filter(o => o['label'] && o['value']),
            aggs: aggs.filter(o => o['label'] && o['value']),
        })
        setEditable(false)
    }

    return (
        <Box style={{width: '100%'}}>
            <Card>
                <CardContent>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"} mt={2}>
                                <Typography variant={"h6"} display={"inline"}> 영역이름</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={8} lg={8}>
                            <Box align={"left"}>
                                <TextField style={{width: "70%"}} value={name}
                                           onChange={(event) => {setEditable(true);setName(event.target.value)}}/>
                                <Box display={"inline"}>
                                    <Hidden lgUp>
                                        <IconButton size={"small"}
                                                    onClick={onUp}
                                                    disabled={disabledOrderButton || templateIndex === 0}
                                        >
                                            <ArrowUpIcon/>
                                        </IconButton>
                                        <IconButton size={"small"}
                                                    onClick={onDown}
                                                    disabled={disabledOrderButton || templateIndex === lastTemplateIndex}
                                        >
                                            <ArrowDownIcon/>
                                        </IconButton>
                                    </Hidden>
                                    <Hidden mdDown>
                                        <IconButton onClick={onUp}
                                                    disabled={disabledOrderButton || templateIndex === 0}>
                                            <ArrowUpIcon/>
                                        </IconButton>
                                        <IconButton onClick={onDown}
                                                    disabled={disabledOrderButton || templateIndex === lastTemplateIndex}
                                        >
                                            <ArrowDownIcon/>
                                        </IconButton>
                                    </Hidden>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={3} md={2} lg={2}>
                            <Box align={"right"}>
                                {authUser.role.search ? <>
                                <Hidden lgUp>
                                    <Button size={"small"}
                                            color={"primary"}
                                            variant={editable ? "contained" : "outlined"}
                                            onClick={handleSave}
                                            disabled={disabledSaveButton || disabledDeleteButton}
                                            ml={2}
                                    >저장</Button>
                                    <Button size={"small"}
                                            className={classes.warm}
                                            variant={"contained"}
                                            onClick={onDelete}
                                            disabled={disabledDeleteButton}
                                            ml={2}
                                    >삭제</Button>
                                </Hidden>
                                <Hidden mdDown>
                                    <Button color={"primary"}
                                            variant={editable ? "contained" : "outlined"}
                                            onClick={handleSave}
                                            disabled={disabledSaveButton || disabledDeleteButton}
                                            mx={2}
                                    >저장</Button>
                                    <Button className={classes.warm}
                                            variant={"contained"}
                                            onClick={onDelete}
                                            disabled={disabledDeleteButton}
                                    >삭제</Button>
                                </Hidden>
                                </> : <></>}
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 인덱스 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth
                                           value={indices}
                                           onChange={event => {setIndices(event.target.value); setEditable(true)}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 검색쿼리 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                {/*<TextareaAutosize*/}
                                {/*    className={classes.textarea}*/}
                                {/*    placeholder={placeholder.query}*/}
                                {/*    value={query}*/}
                                {/*    onChange={event => {setQuery(event.target.value); setEditable(true)}}*/}
                                {/*/>*/}
                                <AceEditor
                                    ref={aceEditor}
                                    mode="json"
                                    theme="kuroir"
                                    fontSize="15px"
                                    height={"600px"}
                                    width="100%"
                                    tabSize={2}
                                    placeholder={placeholder.query}
                                    setOptions={{ useWorker: false }}
                                    onChange={event => {setQuery(aceEditor.current.editor.getValue()); setEditable(true)}}
                                />

                            </Box>
                        </Grid>
                    </Grid>


                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 제목 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth
                                           value={title}
                                           onChange={event => {setTitle(event.target.value); setEditable(true)}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 클릭URL </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth
                                           value={clickUrl}
                                           onChange={event => {setClickUrl(event.target.value); setEditable(true)}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 썸네일 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth
                                           value={thumbnails}
                                           onChange={event => {setThumbnails(event.target.value); setEditable(true)}}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={10}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 정보 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 라벨명 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 값 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box align={"center"}> </Box>
                                </Grid>
                            </Grid>

                            {/* Item List */}
                            <List>
                                {
                                    fields.map((field, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <Grid container>
                                                    <Grid item xs={5}>
                                                        <Box px={1}>
                                                            <TextField fullWidth
                                                                       value={field['label'] || ''}
                                                                       onChange={event => {handleChangeField(event, index, 'label'); setEditable(true)}}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <Box px={1}>
                                                            <TextField fullWidth
                                                                       value={field['value'] || ''}
                                                                       onChange={event => {handleChangeField(event, index, 'value'); setEditable(true)}}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Hidden lgUp>
                                                            <IconButton size={"small"}
                                                                        onClick={() => handleAddField('fields', index)}>
                                                                <PlusSquareIcon/>
                                                            </IconButton>
                                                            <IconButton size={"small"}
                                                                        onClick={() => handleRemoveField('fields', index)}>
                                                                <MinusSquareIcon/>
                                                            </IconButton>
                                                        </Hidden>
                                                        <Hidden mdDown>
                                                            <IconButton onClick={() => handleAddField('fields', index)}>
                                                                <PlusSquareIcon/>
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => handleRemoveField('fields', index)}>
                                                                <MinusSquareIcon/>
                                                            </IconButton>
                                                        </Hidden>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>

                        </Grid>
                    </Grid>


                    <Grid container my={10}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 어그리게이션 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 라벨명 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 값 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box align={"center"}> </Box>
                                </Grid>
                            </Grid>
                            {/* item list */}
                            <List>
                                {
                                    aggs.map((agg, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <Grid container>
                                                    <Grid item xs={5}>
                                                        <Box px={1}>
                                                            <TextField fullWidth
                                                                       value={agg['label'] || ''}
                                                                       onChange={event => {handleChangeAggs(event, index, 'label'); setEditable(true)}}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <Box px={1}>
                                                            <TextField fullWidth
                                                                       value={agg['value'] || ''}
                                                                       onChange={event => {handleChangeAggs(event, index, 'value'); setEditable(true)}}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Box display={"inline"}>
                                                            <Hidden lgUp>
                                                                <IconButton size={"small"}
                                                                            onClick={() => handleAddField('aggs', index)}>
                                                                    <PlusSquareIcon/>
                                                                </IconButton>
                                                                <IconButton size={"small"}
                                                                            onClick={() => handleRemoveField('aggs', index)}>
                                                                    <MinusSquareIcon/>
                                                                </IconButton>
                                                            </Hidden>
                                                            <Hidden mdDown>
                                                                <IconButton
                                                                    onClick={() => handleAddField('aggs', index)}>
                                                                    <PlusSquareIcon/>
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => handleRemoveField('aggs', index)}>
                                                                    <MinusSquareIcon/>
                                                                </IconButton>
                                                            </Hidden>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>


                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Box>
    )
}

const sleep = 1000
let flag = true;
function AutocompleteRegister({dispatch, acUrl}){

    const [autoCompleteUrl, setAutoCompleteUrl] = useState(acUrl)
    const [registeredUrl, setRegisteredUrl] = useState(false)

    function handleAutoCompleteURL(event){
        setAutoCompleteUrl(event.target.value)
    }

    function handleSubmitURL(){
        dispatch(setAutoCompleteURLAction({url: autoCompleteUrl})).then(() => {
            setRegisteredUrl(true)
            setTimeout(()=>{setRegisteredUrl(false)}, 3000);
        })
    }

    if(flag){
        if(acUrl.length > 0){
            setAutoCompleteUrl(acUrl)
            flag= false;
        }
    }
    return (
        <>
            <Box display="flex" mt={3}>
                <TextField value={autoCompleteUrl} style={{ width: "90%", marginRight: "10px" }} placeholder="http://auto-complete.danawa.com/q=" onChange={handleAutoCompleteURL} />
                <Button style={{ width: "10%", marginLeft: "10px" }} variant="outlined" color="primary" onClick={handleSubmitURL} >
                    등록
                </Button>
            </Box>
            <Divider my={6} />
            {registeredUrl ? <MuiAlert severity="success"> 등록되었습니다 </MuiAlert> : <></>}
        </>
    );
}


function ReferenceUI({dispatch, authUser, acUrl}) {
    // const classes = useStyles()
    
    const [disabledAddPanelButton, setDisabledAddPanelButton] = useState(false)
    const [disabledDeleteButton, setDisabledDeleteButton] = useState(false)
    const [disabledSaveButton, setDisabledSaveButton] = useState(false)
    const [disabledOrderButton, setDisabledOrderButton] = useState(false)
    const [templateList, setTemplateList] = useState([])
    
    
    // authUser.role.search = false;
    useEffect(() => {
        dispatch(getAutoCompleteURLAction())

        dispatch(setReferenceTemplateList())
            .then(response => setTemplateList(response.payload))
            .catch(error => console.error(error))
    }, [])


    function addTemplatePanel() {
        setDisabledAddPanelButton(true)
        let lastNum = 0
        templateList.forEach(t => lastNum = Math.max(t['order'], lastNum))
        dispatch(addReferenceTemplate({order: lastNum + 1}))
            .then(() => utils.sleep(sleep))
            .then(() => dispatch(setReferenceTemplateList()).then(response => setTemplateList(response.payload)))
            .catch(error => console.error(error))
            .finally(() => setDisabledAddPanelButton(false))
    }

    function handleDelete(id) {
        setDisabledDeleteButton(true)
        dispatch(deleteReferenceTemplate(id))
            .then(() => utils.sleep(sleep))
            .then(() => dispatch(setReferenceTemplateList()))
            .then(response => setTemplateList(response.payload))
            .catch(error => console.error(error))
            .finally(() => setDisabledDeleteButton(false))
    }

    function handleSave(id, template, index) {
        setDisabledSaveButton(true)
        dispatch(updateReferenceTemplate(id, template))
            .then(() => utils.sleep(sleep))
            .finally(() => setDisabledSaveButton(false))
    }

    function handleUp(index) {
        if (index === 0) {
            return;
        }
        let tempList = templateList.slice()
        let prev = tempList[index - 1]
        let now = tempList[index]
        setDisabledOrderButton(true)
        dispatch(actionReferenceTemplate('orders', {
            orders: [
                {id: prev['id'], order: now['order']},
                {id: now['id'], order: prev['order']},
            ]
        }))
            .then(() => utils.sleep(sleep))
            .then(() => dispatch(setReferenceTemplateList()))
            .then(response => setTemplateList(response.payload))
            .catch(error => console.error(error))
            .finally(() => setDisabledOrderButton(false))
    }

    function handleDown(index) {
        if (index >= templateList.length - 1) {
            return;
        }
        let tempList = templateList.slice()
        let prev = tempList[index]
        let now = tempList[index + 1]
        setDisabledOrderButton(true)
        dispatch(actionReferenceTemplate('orders', {
            orders: [
                {id: prev['id'], order: now['order']},
                {id: now['id'], order: prev['order']},
            ]
        }))
            .then(() => utils.sleep(sleep))
            .then(() => dispatch(setReferenceTemplateList()))
            .then(response => setTemplateList(response.payload))
            .catch(error => console.error(error))
            .finally(() => setDisabledOrderButton(false))
    }

    return (
        <React.Fragment>
            <Helmet title="레퍼런스UI"/>
            <Typography variant="h3" gutterBottom display="inline">
                레퍼런스UI
            </Typography>

            <Divider my={6}/>

            <Typography variant="h5" gutterBottom display="inline">
                자동완성 URL
            </Typography>

            <AutocompleteRegister dispatch={dispatch} acUrl={acUrl}></AutocompleteRegister>
            
            <List>
                {
                    templateList
                        .sort((t1, t2) => Number(t1['order']) - Number(t2['order']))
                        .map((template, index) => {
                        return (
                            <ListItem my={5} p={0} key={template['order']}>
                                <SearchFormPanel authUser={authUser}
                                                 template={template}
                                                 templateIndex={index}
                                                 disabledSaveButton={disabledSaveButton}
                                                 disabledDeleteButton={disabledDeleteButton}
                                                 disabledOrderButton={disabledOrderButton}
                                                 lastTemplateIndex={templateList.length - 1}
                                                 onUp={() => handleUp(index)}
                                                 onDown={() => handleDown(index)}
                                                 onDelete={() => handleDelete(template.id)}
                                                 onSave={(template) => handleSave(template.id, template, index)}
                                />
                            </ListItem>
                        )
                    })
                }
            </List>


            <Grid container>
                <Grid item xs={12}>
                    <Box align={"center"} mt={5}>
                        {authUser.role.search ? <Button variant={"contained"}
                                color={"primary"}
                                onClick={addTemplatePanel}
                                disabled={disabledAddPanelButton}
                        >영역 추가</Button> : <></>}
                    </Box>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    ...store.referenceSearchReducers,
    acUrl: store.dsearchPluginReducers.autoCompleteUrl
}))(ReferenceUI);
