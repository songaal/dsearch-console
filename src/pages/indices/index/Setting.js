import React from "react";
import {connect} from "react-redux";
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
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextareaAutosize,
    Typography as MuiTypography,
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import {flatten} from "flat";
import {editDynamicQueryAction} from "../../../redux/actions/indicesActions";

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
    addIcon: {
        verticalAlign: "top"
    },
    table: {
        padding: '10px'
    },
}));

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);

function FormCard({settings}) {
    if (settings['settings'] === undefined) {
        return null
    }

    const flatMap = flatten(settings['defaults'])

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        주요항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>샤드 갯수</TableCell>
                                <TableCell>레플리카 갯수</TableCell>
                                <TableCell>리프레쉬 간격</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{settings['settings']['index']['number_of_shards']}</TableCell>
                                <TableCell>{settings['settings']['index']['number_of_replicas']}</TableCell>
                                <TableCell>{settings['defaults']['index']['refresh_interval']}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <br/>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        기타항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>키</TableCell>
                                <TableCell>값</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Object.keys(flatMap).map(key => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>{flatMap[key]}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
function JsonCard({json}) {
    const classes = useStyles();

    return (<div>
        <Card>
            <CardContent>
                <Box>
                    <TextareaAutosize rowsMin={50}
                                      className={classes.edit}
                                      disabled
                                      value={JSON.stringify(json, null, 4)}
                    />
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function Setting({ dispatch, index, authUser, settings }) {
    const classes = useStyles();
    const [chk, setChk] = React.useState('form');
    const [modal, setModal] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [message, setMessage] = React.useState(null)
    function handleRadioChange(e) {
        setChk(e.target.value)
    }
    function toggleModal() {
        setQuery("")
        setMessage(null)
        setModal(!modal)
    }
    function processQuery() {
        dispatch(editDynamicQueryAction(index, query))
            .then(response => {
                setMessage("업데이트 성공")
            })
            .catch(error => {
                setMessage("업데이트 실패"+ error)
            })
    }

    return (
        <React.Fragment>

            <Grid container>
                <Grid item xs={10}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange} control={<Radio color="primary" />} label="폼" />
                            <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange} control={<Radio color="primary" />} label="json" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Box align={"right"} mt={2}>
                        {authUser.role.index ? <Button size={"small"}
                                                       variant={"contained"}
                                                       color={"primary"}
                                                       onClick={toggleModal}
                        >동적변경</Button> : <></>}
                    </Box>
                </Grid>
            </Grid>

            <Box mt={2}>
                {
                    chk === "form" ? <FormCard settings={settings} /> : <JsonCard json={settings} />
                }
            </Box>


            <Dialog open={modal}
                    fullWidth
                    onClose={toggleModal}
            >
                <DialogTitle>
                    동적변경
                </DialogTitle>
                <DialogContent>
                    <TextareaAutosize value={query}
                                      onChange={(event) => setQuery(event.target.value)}
                                      style={{width: "100%", height: "300px", overflow: "auto"}}
                                      placeholder={`{
   "settings" : {
      "index" : {
        "number_of_replicas" : "5"
      }
    }
}`}
                    />
                    <Box style={{display: message ? "block": "none"}}>
                        {message}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={processQuery}>추가</Button>
                    <Button onClick={toggleModal}>취소</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.fastcatxReducers.authUser,
    ...store.indicesReducers

}))(Setting);
