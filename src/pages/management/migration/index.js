import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
    Card,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Grid,
    Snackbar,
    Table,
    TableBody,
    LinearProgress,
    Typography,
    FormControlLabel,
    Checkbox,
    CardContent,
    TableRow,
    TableCell,
    TableHead,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { connect, useDispatch } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import { download, sendFile  } from "../../../redux/actions/migrationActions"

const Divider = styled(MuiDivider)(spacing);

function Migration() {
    const dispatch = useDispatch()

    const [pipeline, setPipeline] = React.useState(true);
    const [templates, setTemplates] = React.useState(true);
    const [collection, setCollection] = React.useState(true);
    const [jdbc, setJdbc] = React.useState(true);
    const [comments, setComments] = React.useState(true);

    const [uploadError, setUploadError] = React.useState("");
    const [uploadResults, setUploadResults] = React.useState(null)
    const [downloadModal, setDownloadModal] = React.useState(false);
    const [uploadModal, setUploadModal] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(false);
    const [alertFlag, setAlertFlag] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertColor, setAlertColor] = React.useState("info");

    function handleDownload() {
        let json = new FormData();
        json.append("pipeline", pipeline)
        json.append("templates", templates)
        json.append("collection", collection)
        json.append("jdbc", jdbc)
        json.append("comments", comments)

        download(json)
        setDownloadModal(false);
    }

    function handleUpload() {
        let fd = new FormData();
        fd.append('filename', file);

        setUploadError("");
        setUploadProgress(true);
        dispatch(sendFile(fd))
            .then(async (res) => {
                console.log(res)
                setAlertFlag(true);
                if (res.data.result) {
                    setUploadResults(res.data);
                    setAlertColor("info");
                    setAlertMessage(res.data.message)
                    setUploadModal(false);
                } else {
                    setAlertColor("error");
                    setUploadResults(null);
                    setAlertMessage("실패")
                    setUploadError(res.data.message);
                    setUploadModal(false);
                }
                setFile(null);
                setUploadProgress(false);
            }).catch(async (err) => {
                setUploadError(err);
                setAlertFlag(true);
                setAlertColor("error");
                setAlertMessage("실패");
                setUploadProgress(false);
                setFile(null);
                // await utils.sleep(1000);
            });
    }
    
    return (
        <React.Fragment>
            <Helmet title="마이그레이션" />
            <Grid container={true}>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom display="inline">
                        마이그레이션
                    </Typography>
                </Grid>
                <Divider my={6} />
            </Grid>

            <Card mb={6}>
                <CardContent>
                    <Box margin="12px" width="100%" >
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="500px" m={2}>
                            이 클러스터의 백업 데이터를 다운로드 하시겠습니까? 
                            <Button variant="outlined" color="primary" onClick={() => { setDownloadModal(true) }}>
                                다운로드
                            </Button>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="space-between" width="500px" m={2}>
                            백업데이터로 클러스터를 셋팅하시겠습니까?
                            <Button variant="outlined" color="primary" onClick={() => { setUploadModal(true) }}>
                                업로드
                            </Button>
                        </Box>
                    </Box>
                    <Box width="100%">
                        {
                            uploadError.length === 0 ? <></> : <Box border="1px solid grey">{uploadError}</Box>
                        }

                        {
                            uploadResults == null ? <></> : 
                            <Table key="detailResult">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h2">업로드 결과</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                <TableRow hover>
                                    <TableCell>
                                        <Typography variant="h4">[파이프라인] 총 갯수: {uploadResults.pipeline.length}</Typography>
                                        <br />
                                        {uploadResults.pipeline.length > 0 ? 
                                            uploadResults.pipeline.map((item) => {
                                                return <div key={item}  dangerouslySetInnerHTML={ {__html:" - " + item} } />
                                            })
                                        : <></>}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>
                                        <Typography variant="h4" >[컬렉션] 총 갯수: {uploadResults.collection.length}</Typography>
                                        <br />
                                        {uploadResults.collection.length > 0 ? 
                                            uploadResults.collection.map((item) => {
                                                return <div key={item} dangerouslySetInnerHTML={ {__html:" - " + item} } />
                                            })
                                        : <></>}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>
                                        <Typography variant="h4">[JDBC] 총 갯수: {uploadResults.jdbc.length}</Typography>
                                        <br />
                                        {uploadResults.jdbc.length > 0 ? 
                                            uploadResults.jdbc.map((item) => {
                                                return <div key={item} dangerouslySetInnerHTML={ {__html: " - " + item} } />
                                            })
                                        : <></>}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>
                                    <Typography variant="h4">[템플릿] 총 갯수: {uploadResults.templates.length}</Typography>
                                    <br />
                                    {uploadResults.templates.length > 0 ? 
                                            uploadResults.templates.map((item) => {
                                                return <div key={item} dangerouslySetInnerHTML={ {__html: " - " + item} } />
                                            })
                                        : <></>}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>
                                        <Typography variant="h4">[템플릿 설명] 총 갯수: {uploadResults.comments.length}</Typography>
                                        <br />
                                        {uploadResults.comments.length > 0 ? 
                                            uploadResults.comments.map((item) => {
                                                return <div key={item + "_comments"} dangerouslySetInnerHTML={ {__html: " - " + item} } />
                                            })
                                        : <></>}
                                    </TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        }
                        
                    </Box>
                </CardContent>
            </Card>
            {/* File Upload Modal */}
            <Snackbar open={alertFlag} autoHideDuration={3000} onClose={() => { setAlertFlag(false); setAlertMessage("") }}>
                <MuiAlert elevation={6} variant="filled" severity={alertColor}> {alertMessage} </MuiAlert>
            </Snackbar>

            <Dialog open={downloadModal}
                fullWidth
                onClose={() => setDownloadModal(false)}
            >
                <DialogTitle>
                    데이터 백업
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={pipeline}
                                    onChange={(e) => {
                                        setPipeline(e.target.checked)
                                    }} />}
                            label="파이프라인"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={templates}
                                    onChange={(e) => {
                                        setTemplates(e.target.checked)
                                    }} />}
                            label="템플릿"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={collection}
                                    onChange={(e) => {
                                        setCollection(e.target.checked)
                                    }} />}
                            label="컬렉션"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={jdbc}
                                    onChange={(e) => {
                                        setJdbc(e.target.checked)
                                    }} />}
                            label="JDBC"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={comments}
                                    onChange={(e) => {
                                        setComments(e.target.checked)
                                    }} />}
                            label="템플릿 설명"
                            labelPlacement="end"
                        />
                    </Box>
                    이 클러스터의 데이터를 백업 하시겠습니까? (json 파일로 저장됩니다.)
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" style={{ whiteSpace: "nowrap" }} onClick={() => handleDownload()}>백업</Button>
                    <Button onClick={() => setDownloadModal(false)}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={uploadModal}
                fullWidth
                onClose={() => setUploadModal(false)}
            >
                <DialogTitle>
                    데이터 업로드
                </DialogTitle>
                <DialogContent>
                    <input
                        type='file'
                        onChange={(e) => {
                            setFile(e.target.files[0])
                        }}
                    />
                    <Box m={2}>
                    {
                        uploadProgress ? <LinearProgress /> : <></>
                    }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" style={{ whiteSpace: "nowrap" }} onClick={() => handleUpload()}>업로드</Button>
                    <Button onClick={() => setUploadModal(false)}>닫기</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(store => ({
    serverCheck: store.clusterReducers.serverCheck
}))(Migration);