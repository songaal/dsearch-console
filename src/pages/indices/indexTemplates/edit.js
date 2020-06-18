import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs";
import Json2html from "~/components/Json2Html"

import {
    Avatar,
    Box as MuiBox,
    MenuItem,
    Button as MuiButton,
    Card as MuiCard,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText,
    Radio,
    RadioGroup, Select,
    TextareaAutosize,
    TextField,
    Typography as MuiTypography
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {connect} from "react-redux";
import {
    addIndexTemplateAction,
    setIndexTemplateAction,
    setIndexTemplatesAction
} from "../../../redux/actions/indexTemplateActions";
import {Add as AddIcon, Person as PersonIcon} from "@material-ui/icons";

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
function Edit({ dispatch, template, templates}) {
    const classes = useStyles();
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [indexPatternText, setIndexPatternText] = useState("")

    const [tabIndex, setTabIndex] = useState(0)

    const [mappingMode, setMappingMode] = useState("json")
    const [settingMode, setSettingMode] = useState("json")

    const [mappingsJson, setMappingsJson] = useState("")
    const [settingsJson, setSettingsJson] = useState("")

    const [openMessage, setOpenMessage] = useState(false)

    useEffect(() => {
        if (selectedTemplate !== "") {
            dispatch(setIndexTemplateAction({template: selectedTemplate}))
            dispatch(setIndexTemplatesAction())
        } else {
            let pathname = location.pathname.substring(0, location.pathname.lastIndexOf("/"))
            setSelectedTemplate(pathname.substring(pathname.lastIndexOf("/") + 1))
        }
    }, [selectedTemplate])

    useEffect(() => {
        setIndexPatternText((template['index_patterns'] || []).join(","))
    }, [template['index_patterns']])

    useEffect(() => {
        setMappingsJson(JSON.stringify(((template['mappings'] || {})['properties']), null, 4))
    }, [template['mappings']])

    useEffect(() => {
        setSettingsJson(JSON.stringify(((template['settings'] || {})['index']), null, 4))
    }, [template['settings']])

    function handleTemplateChange(template) {
        history.pushState(null, null,`/indices/templates/${template}/edit`)
        setSelectedTemplate(template)
    }
    function handleTabChane(index) {
        setTabIndex(index)
    }


    function handleSubmitClick() {
        dispatch(addIndexTemplateAction( {
            template: selectedTemplate,
            index_patterns: indexPatternText.split(","),
            settings: JSON.parse(settingsJson === "" ? "{}" : settingsJson),
            mappings: JSON.parse(mappingsJson === "" ? "{}" : mappingsJson)
        } )).then((response) => {
            location.replace(`/indices/templates/${selectedTemplate}`)
        }).catch(error => {
            if (typeof error === 'object') {
                message = "[수정 실패]" + JSON.stringify(error)
            } else {
                message = "[수정 실패]" + error
            }
            setOpenMessage(true)
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
                                    templates.map(template => <MenuItem key={template['name']} value={template['name']}>{template['name']}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box align={'right'}>
                        <Button variant="outlined"
                                color="primary"
                                onClick={handleSubmitClick}
                        >저장</Button>
                        <Button variant="outlined"
                                onClick={() => location.href="/indices/templates"}
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
                                {Json2html(mappingsJson)}
                            </CardContent>
                        </Card>
                        :
                        <Card>
                            <CardContent>
                                <Box>
                                    <TextareaAutosize className={classes.edit}
                                                      value={mappingsJson}
                                                      onChange={event => setMappingsJson(event.target.value)}
                                                      autoFocus
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
                                {Json2html(settingsJson)}
                            </CardContent>
                        </Card>
                        :
                        <Card>
                            <CardContent>
                                <Box>
                                    <TextareaAutosize className={classes.edit}
                                                      value={settingsJson}
                                                      onChange={event => setSettingsJson(event.target.value)}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                }
            </Box>

            <Dialog open={openMessage}>
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
        </React.Fragment>
    );
}

export default connect(store => ({...store.indexTemplateReducers}))(Edit);