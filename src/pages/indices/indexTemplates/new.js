import React, {useState} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs";
import Json2html from "~/components/Json2Html"

import {
    Avatar,
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Grid, List, ListItem, ListItemAvatar, ListItemText,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField,
    Typography as MuiTypography
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {connect} from "react-redux";
import {addIndexTemplateAction} from "../../../redux/actions/indexTemplateActions";
import {Add as AddIcon, Person as PersonIcon} from "@material-ui/icons";
import utils from "../../../utils";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    edit: {
        width: '100%'
    },
}));

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);

const tabs = [{label: "매핑"}, {label: "셋팅"}]

let message = ""
function New({ dispatch }) {
    const classes = useStyles();
    const [templateText, setTemplateText] = useState('')
    const [indexPatternText, setIndexPatternText] = useState('')

    const [tabIndex, setTabIndex] = useState(0)

    const [mappingMode, setMappingMode] = useState("json")
    const [settingMode, setSettingMode] = useState("json")

    const [mappingsJson, setMappingsJson] = useState("")
    const [settingsJson, setSettingsJson] = useState("")

    const [openMessage, setOpenMessage] = useState(false)

    function handleTabChane(index) {
        setTabIndex(index)
    }

    function handleSubmitClick() {

        dispatch(addIndexTemplateAction( {
            template: templateText,
            index_patterns: indexPatternText.split(","),
            settings: JSON.parse(settingsJson === "" ? "{}" : settingsJson),
            mappings: JSON.parse(mappingsJson === "" ? "{}" : mappingsJson)
        } )).then(async (response) => {
            await utils.sleep(500)
            location.replace("../indices/templates/" + templateText)
        }).catch(error => {
            if (typeof error === 'object') {
                message = "[생성 실패]" + JSON.stringify(error)
            } else {
                message = "[생성 실패]" + error
            }
            setOpenMessage(true)
        })
    }

    return (
        <React.Fragment>
            <Helmet title="템플릿 생성"/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                템플릿 생성
            </Typography>

            <Divider my={6}/>

            <Grid container>
                <Grid item xs={6}>
                    <Box align={'left'}>
                        <FormControl className={classes.formControl}>
                            <TextField label="템플릿명"
                                       value={templateText}
                                       onChange={event => setTemplateText(event.target.value)}
                            />
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
                                onClick={() => history.go(-1)}
                                ml={1}
                        >취소</Button>
                    </Box>
                </Grid>
            </Grid>

            <FormControl className={classes.formControl}>
                <TextField label="인덱스 패턴"
                           value={indexPatternText}
                           placeholder={"access-log-*,error-log-*"}
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
                                    <TextareaAutosize style={{minHeight: "200px"}}
                                                      className={classes.edit}
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
                                    <TextareaAutosize style={{minHeight: "200px"}}
                                                      className={classes.edit}
                                                      value={settingsJson}
                                                      onChange={event => setSettingsJson(event.target.value)}
                                                      autoFocus
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

export default connect(store => ({templates: store.indexTemplateReducers.templates}))(New);