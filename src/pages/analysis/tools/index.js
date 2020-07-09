import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import {makeStyles} from '@material-ui/core/styles';
import { setAnalyzerList, setPluginList, actionAnalyzer, actionPlugin } from '@actions/toolsActions'

import {
    Box, Button,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl, FormControlLabel,RadioGroup, Radio,
    Table, TableRow, TableCell,
    InputLabel,
    Select,
    Grid,
    MenuItem,
    TextField as MuiTextField,
    Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250
    },
    select: { minWidth: 120, marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "1px solid black" } },
}));

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TextField = styled(MuiTextField)(spacing);


function BriefResult({resultBrief}){
    var total = [];
    if(resultBrief.tokens){
        for(var i = 0; i < resultBrief.tokens.length; i++){
            if(i % 5 == 0){
                total.push([]);
            }
            total[total.length-1].push(resultBrief.tokens[i].token)
        }
    }
    
    return <Table>
                {total.length > 0 ? 
                    total.map((listItem)=> {
                        return (<TableRow hover> 
                            {listItem.map( (item)=> { return <TableCell> {item}</TableCell>}) }
                        </TableRow>)
                    })
                : <TableRow hover> <TableCell> 검색된 결과가 없습니다 </TableCell></TableRow>}
        </Table>;
}

function DetailResult({resultDetail}){
    if(!resultDetail.resutl){
        return <Table>
            <TableRow>
                <TableCell> 검색된 결과가 없습니다. </TableCell>
            </TableRow>
        </Table>
    }

    return (<Table>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">1. {resultDetail.resutl[2].key}</Typography>
                    <br />
                    {resultDetail.resutl[2].value.replace(/(<([^>]+)>)/ig,"")}
                </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4" >2. {resultDetail.resutl[3].key}</Typography>
                <br />
                {resultDetail.resutl[3].value.replace(/(<([^>]+)>)/ig,"")}
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">3. {resultDetail.resutl[4].key}</Typography>
                <br />
                {resultDetail.resutl[4].value.replace(/(<([^>]+)>)/ig,"")}
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
            <Typography variant="h4">4. {resultDetail.resutl[5].key}</Typography>
            <br />
                {resultDetail.resutl[5].value.replace(/(<([^>]+)>)/ig,"")}
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">5. {resultDetail.resutl[6].key}</Typography>
                <br />
                {resultDetail.resutl[6].value.replace(/(<([^>]+)>)/ig,"")}
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">6. {resultDetail.resutl[7].key}</Typography>
                <br />
                {resultDetail.resutl[7].value.replace(/(<([^>]+)>)/ig,"")}
            </TableCell>
        </TableRow>
    </Table>
    );
}
function ToolsCard({dispatch, analyzerList, pluginList, resultBrief, resultDetail}) {
    const [selectedItem, setSelectedItem] = useState('');
    const [toolsTypeAction, setToolsTypeAction] = useState("brief")
    const classes = useStyles()

    console.log("resultDetail>>>", resultDetail);
    var list = [];

    if(toolsTypeAction == 'brief'){
        console.log(analyzerList)
        var originalList = Object.keys(analyzerList);
        var indexList = []
        for(var key of originalList){
            if(key.charAt(0) != '.'){
                indexList.push(key);
            }
        }
        var index2analyzerList = []
        for(var key of indexList){
            if(analyzerList[key].settings.index.analysis){
                let keyList = Object.keys(analyzerList[key].settings.index.analysis.analyzer);
                for(var analyzer of keyList){
                    index2analyzerList.push(key + "/" + analyzer);
                }
            }
        }
        list = index2analyzerList;
    }else{
        var split = pluginList.split("\n");
        for(var items of split){
            var item = items.replace(/ +/g, " ").split(" ")
            if(item[1] != undefined) list.push(item[1]);
        }
        list = Array.from(new Set(list))
    }
   

    const handleChange = (event) => {
        if(toolsTypeAction == 'brief'){
            dispatch(setAnalyzerList());
        }else{
            dispatch(setPluginList());
        }
        
        setToolsTypeAction(event.target.value)
    };

    const handleSelectedItemChange = (event) =>{
        setSelectedItem(event.target.value)
    }

    const handleToolsClick = () =>{
        var analyzer_contents = document.getElementById("analyzer_contents");
        var analyzer_select = document.getElementById("analyzer_select");
        var data = {};
        if(toolsTypeAction == 'brief') {
            var split = analyzer_select.innerHTML.split('/');
            var index = split[0].replace(' ', '');
            var analyzer = split[1].replace(' ', '');
            data.text = analyzer_contents.value;
            data.analyzer = analyzer
            console.log(data);
            dispatch(actionAnalyzer(index, data));
        }else {
            var plugin = analyzer_select.innerHTML
            plugin = plugin.replace(/ /gi, "");
            data.index = ".fastcatx_dict";
            data.detail = true;
            data.useForQuery = true;
            data.text = analyzer_contents.value;
            console.log(data);
            dispatch(actionPlugin(plugin, data));
        }
    }

    return (
        <Card mb={6}>
            <CardContent>
                <TextField id="analyzer_contents" label="분석할 내용을 입력해 주세요." multiline rows={2} variant="outlined" fullWidth gutterBottom> </TextField>
                <Box display="flex" alignItems="center" justifyContent="left" fullWidth >
                    <Box p={3}>
                        <FormControl>
                            <RadioGroup value={toolsTypeAction} row onChange={handleChange} >
                                <FormControlLabel value="brief" control={<Radio size="small" />} label="간략" />
                                <FormControlLabel value="detail" control={<Radio size="small" />} label="상세" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box p={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel >분석 도구 선택 </InputLabel>
                            <Select id="analyzer_select" value={selectedItem} onChange={handleSelectedItemChange}>
                                { list.map((item) => {
                                    return <MenuItem value={item}> {item} </MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="secondary" onClick={handleToolsClick}>
                        분석
                    </Button>
                </Box>

                <Box m={2}>
                    <Typography variant="h4" gutterBottom display="inline" > 분석 결과 </Typography>
                </Box>
                <Box p={2}>
                    {toolsTypeAction == 'brief' ? <BriefResult resultBrief={resultBrief} /> :  <DetailResult resultDetail={resultDetail}/>}
                </Box>
            </CardContent>
        </Card>
    );
}

function Tools({ dispatch, analyzerList, pluginList, resultBrief, resultDetail }) {

    useEffect(() => {
        dispatch(setAnalyzerList())
        dispatch(setPluginList())
    }, [])
    
    return (
        <React.Fragment>
            <Helmet title="Blank" />
            <Typography variant="h3" gutterBottom display="inline">
                분석도구
            </Typography>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <ToolsCard dispatch={dispatch} analyzerList={analyzerList} pluginList={pluginList}  resultBrief={resultBrief} resultDetail={resultDetail} onClick={() => console.log("click")} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    pluginList: store.toolsReducers.pluginList,
    analyzerList: store.toolsReducers.analyzerList,
    resultBrief : store.toolsReducers.resultBrief,
    resultDetail : store.toolsReducers.resultDetail
}))(Tools);
