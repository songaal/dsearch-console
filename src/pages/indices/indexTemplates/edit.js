import React, {useEffect, useRef, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs";
import Json2html from "~/components/Json2Html"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";

import {
    Box as MuiBox,
    Button as MuiButton,
    ButtonGroup,
    Card as MuiCard,
    CardContent,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Grid,
    Grow,
    InputLabel,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography as MuiTypography
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {connect} from "react-redux";
import {
    addIndexTemplateAction,
    deleteIndexTemplateAction,
    setIndexTemplateAction,
    setIndexTemplatesAction
} from "../../../redux/actions/indexTemplateActions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    edit: {
        width: '100%',
        minHeight: '500px'
    },
}));

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);

const tabs = [{label: "매핑"}, {label: "셋팅"}]

let message = ""

function Edit({dispatch, template, templates}) {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [indexPatternText, setIndexPatternText] = useState("")

    const [tabIndex, setTabIndex] = useState(0)

    const [mappingMode, setMappingMode] = useState("json")
    const [settingMode, setSettingMode] = useState("json")

    const [mappingsJson, setMappingsJson] = useState("")
    const [settingsJson, setSettingsJson] = useState("")

    const [openMessage, setOpenMessage] = useState(false)

    const [inValid, setInvalid] = useState({})

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false)

    const mappingsAceEditor = useRef(null);
    const settingsAceEditor = useRef(null);

    useEffect(() => {
        setIndexPatternText("")
        setMappingsJson("")
        setSettingsJson("")
        try {
            mappingsAceEditor.current.editor.setValue("")
            settingsAceEditor.current.editor.setValue("")
        } catch (e) {
            console.log('change ace editor')
        }
        if (selectedTemplate !== "") {
            dispatch(setIndexTemplateAction({template: selectedTemplate}))
            dispatch(setIndexTemplatesAction())
        } else {
            let pathname = location.pathname.substring(0, location.pathname.lastIndexOf("/"))
            setSelectedTemplate(pathname.substring(pathname.lastIndexOf("/") + 1))
        }
    }, [selectedTemplate]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setIndexPatternText((template['index_patterns'] || []).join(","))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template['index_patterns']])

    useEffect(() => {
        try {
            // let json = JSON.stringify(((template['mappings'] || {})['properties']), null, 4)
            let json = JSON.stringify(((template['mappings'] || {})), null, 4)
            setMappingsJson(json)
            mappingsAceEditor.current.editor.setValue(json || '', 0)
            mappingsAceEditor.current.editor.clearSelection()
        } catch (e) {
            console.log('change ace editor')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template['mappings']])

    useEffect(() => {
        try {
            let json = JSON.stringify(((template['settings'] || {})['index']), null, 4);
            setSettingsJson(json)
            settingsAceEditor.current.editor.setValue(json || '', 0)
            settingsAceEditor.current.editor.clearSelection()
        } catch (e) {
            console.log('change ace editor')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template['settings']])

    useEffect(() => {
        if (mappingMode === 'json') {
            mappingsAceEditor.current.editor.setValue(mappingsJson || '', 0)
            mappingsAceEditor.current.editor.clearSelection()
        }
        if (settingMode === 'json') {
            settingsAceEditor.current.editor.setValue(settingsJson || '', 0)
            settingsAceEditor.current.editor.clearSelection()
        }
    }, [mappingMode, settingMode]) // eslint-disable-line react-hooks/exhaustive-deps


    function handleTemplateChange(template) {
        history.push(`../${template}/edit`)
        setSelectedTemplate(template)
    }

    function handleTabChane(index) {
        if(index === 0 && settingMode === 'json'){ // setting -> mapping
            console.log(index, settingsAceEditor.current.editor.getValue());
            setSettingsJson(settingsAceEditor.current.editor.getValue())
        }else if(index === 1 && mappingMode === 'json') { // mapping-> setting
            console.log(index, mappingsAceEditor.current.editor.getValue());
            setMappingsJson(mappingsAceEditor.current.editor.getValue()) 
        }
        
        setTabIndex(index)
    }

    function handleSubmitClick() {
        let tmpInValid = {}
        if (indexPatternText.trim() === "") {
            tmpInValid['indexPatternText'] = true
        } else {
            let indexPatternTextSplit = indexPatternText.split(",")
            if (indexPatternTextSplit[0] === "" && indexPatternTextSplit.length === 1) {
                tmpInValid['indexPatternText'] = true
            }
        }


        try {
            JSON.parse(mappingsJson === undefined || mappingsJson === "" ? "{}" : mappingsJson)
        } catch (error) {
            tmpInValid['mappingsJson'] = true
        }

        try {
            JSON.parse(settingsJson === undefined || settingsJson === "" ? "{}" : settingsJson)
        } catch (error) {
            tmpInValid['settingsJson'] = true
        }

        if (Object.keys(tmpInValid).length > 0) {
            setInvalid(tmpInValid)
            console.log('tmpInValid', tmpInValid)
            return false;
        }

        let tmpSettings = JSON.parse(settingsJson === undefined || settingsJson === "" ? "{}" : settingsJson)
        let tmpMappings = JSON.parse(mappingsJson === undefined || mappingsJson === "" ? "{}" : mappingsJson)
        if (!tmpMappings['properties']) {
            tmpMappings = {properties: tmpMappings}
        }
        dispatch(addIndexTemplateAction({
            template: selectedTemplate,
            index_patterns: indexPatternText.split(","),
            settings: tmpSettings,
            mappings: tmpMappings
        })).then((response) => {
            history.push(`../../indices-templates/${selectedTemplate}`)
        }).catch(error => {
            if (typeof error === 'object') {
                message = "[수정 실패]" + JSON.stringify(error)
            } else {
                message = "[수정 실패]" + error
            }
            setOpenMessage(true)
        })
    }


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleDeleteTemplate() {
        dispatch(deleteIndexTemplateAction({template: selectedTemplate})).then(response => {
            history.push(`../../indices-templates`)
        }).catch(error => {
            alert("실패" + error)
            console.log("error", error)
        })
    }

    return (
        <React.Fragment>
            <Helmet title="템플릿 수정"/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                템플릿 수정
            </Typography>

            <Divider my={6}/>

            <Grid container>
                <Grid item xs={6}>
                    <Box align={'left'}>
                        <FormControl>
                            <InputLabel>템플릿</InputLabel>
                            <Select value={selectedTemplate}
                                    onChange={event => handleTemplateChange(event.target.value)}
                                    style={{minWidth: 250}}
                            >
                                {
                                    templates.map(template => <MenuItem key={template['name']}
                                                                        value={template['name']}>{template['name']}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box align={'right'}>

                        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                            <Button onClick={handleSubmitClick}>저장</Button>
                            <Button
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon/>
                            </Button>
                        </ButtonGroup>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="split-button-menu">
                                                <MenuItem onClick={() => setDeleteConfirmDialog(true)}> 삭제 </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>


                        {/*<Button variant="outlined"*/}
                        {/*        color="primary"*/}
                        {/*        onClick={handleSubmitClick}*/}
                        {/*>저장</Button>*/}
                        <Button variant="outlined"
                                onClick={() => history.push("../../indices-templates")}
                                ml={1}
                        >취소</Button>
                    </Box>
                </Grid>
            </Grid>

            <FormControl className={classes.formControl}>
                <TextField label="인덱스 패턴"
                           placeholder={"access-log-*,error-log-*"}
                           value={indexPatternText}
                           onChange={event => setIndexPatternText(event.target.value)}
                           error={inValid['indexPatternText'] || false}


                />
            </FormControl>

            <br/><br/>


            <AntTabs tabs={tabs}
                     tabIndex={tabIndex}
                     onChange={handleTabChane}
            />

            <br/>


            <Box display={tabIndex === 0 ? "block" : "none"}>
                {/* 맵핑 */}
                <FormControl component="fieldset">
                    <RadioGroup row onChange={event => setMappingMode(event.target.value)}>
                        <FormControlLabel value="form"
                                          checked={mappingMode === "form"}
                                          control={<Radio color="primary"/>}
                                          label="폼"
                        />
                        <FormControlLabel value="json"
                                          checked={mappingMode === "json"}
                                          control={<Radio color="primary"/>}
                                          label="json"
                        />
                    </RadioGroup>
                </FormControl>
                {
                    mappingMode === "form" ?
                        <Card>
                            <CardContent m={0}>
                                <Box style={{overflow: "auto", minWidth: "700px"}}>
                                    {Json2html({json: mappingsJson, type: "mappings"})}
                                </Box>
                            </CardContent>
                        </Card>
                        :
                        <Card>
                            <CardContent>
                                <Box>
                                    {/*<TextareaAutosize className={classes.edit}*/}
                                    {/*                  value={mappingsJson}*/}
                                    {/*                  onChange={event => setMappingsJson(event.target.value)}*/}
                                    {/*                  autoFocus*/}
                                    {/*/>*/}
                                    <AceEditor
                                        ref={mappingsAceEditor}
                                        mode="json"
                                        theme="kuroir"
                                        fontSize="15px"
                                        tabSize={2}
                                        height={"600px"}
                                        width="100%"
                                        placeholder={
                                            JSON.stringify({
                                                "title": {
                                                    "type": "text"
                                                }
                                            })
                                        }
                                        setOptions={{ useWorker: false }}
                                        onChange={() => {
                                            let json = mappingsAceEditor.current.editor.getValue()
                                            if (json.length !== 0 && mappingsJson !== json) {
                                                setMappingsJson(json)
                                            }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                }
            </Box>

            <Box display={tabIndex === 1 ? "block" : "none"}>
                {/* 설정 */}
                <FormControl component="fieldset">
                    <RadioGroup row onChange={event => setSettingMode(event.target.value)}>
                        <FormControlLabel value="form"
                                          checked={settingMode === "form"}
                                          control={<Radio color="primary"/>}
                                          label="폼"
                        />
                        <FormControlLabel value="json"
                                          checked={settingMode === "json"}
                                          control={<Radio color="primary"/>}
                                          label="json"
                        />
                    </RadioGroup>
                </FormControl>
                {
                    settingMode === "form" ?
                        <Card>
                            <CardContent m={0}>
                                {Json2html({json: settingsJson, type: "settings"})}
                            </CardContent>
                        </Card>
                        :
                        <Card>
                            <CardContent>
                                <Box>
                                    {/*<TextareaAutosize className={classes.edit}*/}
                                    {/*                  value={settingsJson}*/}
                                    {/*                  onChange={event => setSettingsJson(event.target.value)}*/}
                                    {/*/>*/}
                                    <AceEditor
                                        ref={settingsAceEditor}
                                        mode="json"
                                        theme="kuroir"
                                        fontSize="15px"
                                        tabSize={2}
                                        height={"600px"}
                                        width="100%"
                                        placeholder={
                                            JSON.stringify({
                                                "number_of_shards": "3",
                                                "number_of_replicas": "3"
                                            })
                                        }
                                        setOptions={{ useWorker: false }}
                                        onChange={() => {
                                            let json = settingsAceEditor.current.editor.getValue()
                                            
                                            if (json.length !== 0 && mappingsJson !== json) {
                                                setSettingsJson(json)
                                            }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                }
            </Box>

            <Dialog open={openMessage} fullWidth={true}>
                <DialogTitle>오류</DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpenMessage(false)}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteConfirmDialog} fullWidth={true}>
                <DialogTitle>주의</DialogTitle>
                <DialogContent>
                    인덱스 템플릿을 삭제하시겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button color={"secondary"} onClick={handleDeleteTemplate}>
                        삭제
                    </Button>
                    <Button autoFocus onClick={() => setOpenMessage(false)}>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(store => ({...store.indexTemplateReducers}))(Edit);