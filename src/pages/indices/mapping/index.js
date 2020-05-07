import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    Grid,
    Typography,
    Box,
    FormControl,
    Select,
    FormHelperText,
    InputLabel,
    MenuItem, Paper, Table, TableHead, TableRow, TableBody, Checkbox, TableContainer, TableCell,
    Link,
    AppBar,
    Tab,
    Tabs,
    TextareaAutosize,
    Button
} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing} from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    edit: {
        width: '100%'
    }
}));

const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
    },
}))(TableCell);


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


const sampleData = {
    "mappings" : {
        "properties" : {
            "ADDDESCRIPTION" : {
                "type" : "text",
                "analyzer" : "korean"
            },
            "CATEGORYCODE1" : {
                "type" : "integer"
            },
            "CATEGORYCODE2" : {
                "type" : "integer"
            },
            "CATEGORYCODE3" : {
                "type" : "integer"
            },
            "CATEGORYCODE4" : {
                "type" : "integer"
            },
            "DATASTAT" : {
                "type" : "keyword"
            },
            "DELIVERYPRICE" : {
                "type" : "integer"
            },
            "GROUPSEQ" : {
                "type" : "integer"
            },
            "MOBILEPRICE" : {
                "type" : "integer"
            },
            "PCPRICE" : {
                "type" : "integer"
            },
            "POPULARITYSCORE" : {
                "type" : "integer"
            },
            "PRODUCTCODE" : {
                "type" : "keyword"
            },
            "PRODUCTIMAGEURL" : {
                "type" : "keyword"
            },
            "PRODUCTMAKER" : {
                "type" : "keyword"
            },
            "PRODUCTNAME" : {
                "type" : "text",
                "analyzer" : "korean"
            },
            "REGISTERDATE" : {
                "type" : "date"
            },
            "SHOPCODE" : {
                "type" : "keyword"
            },
            "SHOPCOUPON" : {
                "type" : "keyword"
            },
            "SHOPGIFT" : {
                "type" : "keyword"
            },
            "SHOPPRODUCTCODE" : {
                "type" : "keyword"
            },
            "SIMPRODMEMBERCNT" : {
                "type" : "integer"
            },
            "host" : {
                "type" : "text",
                "fields" : {
                    "keyword" : {
                        "type" : "keyword",
                        "ignore_above" : 256
                    }
                }
            },
            "message" : {
                "type" : "text",
                "fields" : {
                    "keyword" : {
                        "type" : "keyword",
                        "ignore_above" : 256
                    }
                }
            },
            "path" : {
                "type" : "text",
                "fields" : {
                    "keyword" : {
                        "type" : "keyword",
                        "ignore_above" : 256
                    }
                }
            },
            "tags" : {
                "type" : "text",
                "fields" : {
                    "keyword" : {
                        "type" : "keyword",
                        "ignore_above" : 256
                    }
                }
            }
        }
    },
    "settings" : {
        "index" : {
            "number_of_shards" : "2",
            "analysis" : {
                "filter" : {
                    "nori_part_of_speech_basic" : {
                        "type" : "nori_part_of_speech",
                        "stoptags" : [
                            "E",
                            "IC",
                            "J",
                            "MAG",
                            "MAJ",
                            "MM",
                            "SP",
                            "SSC",
                            "SSO",
                            "SC",
                            "SE",
                            "XPN",
                            "XSA",
                            "XSN",
                            "XSV",
                            "UNA",
                            "NA",
                            "VSV"
                        ]
                    }
                },
                "analyzer" : {
                    "korean" : {
                        "filter" : [
                            "nori_readingform",
                            "lowercase",
                            "nori_part_of_speech_basic"
                        ],
                        "type" : "custom",
                        "tokenizer" : "nori_user_dict"
                    }
                },
                "tokenizer" : {
                    "nori_user_dict" : {
                        "type" : "nori_tokenizer",
                        "decompound_mode" : "mixed"
                    }
                }
            },
            "number_of_replicas" : "0"
        }
    }
};


function Mapping() {
    const classes = useStyles();
    const [indices, setIndices] = React.useState('VM');
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (event) => {
        setIndices(event.target.value);
    };

    return (
        <React.Fragment>
            <Helmet title="맵핑"/>

            <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">인덱스</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={indices}
                        onChange={handleChange}
                    >
                        <MenuItem value={"VM"}>VM</MenuItem>
                        <MenuItem value={"V01"}>V01</MenuItem>
                        <MenuItem value={"V02"}>V02</MenuItem>
                        <MenuItem value={"V03"}>V03</MenuItem>
                        <MenuItem value={"V04"}>V04</MenuItem>
                        <MenuItem value={"V05"}>V05</MenuItem>
                        <MenuItem value={"V06"}>V06</MenuItem>
                        <MenuItem value={"V07"}>V07</MenuItem>
                        <MenuItem value={"V08"}>V08</MenuItem>
                        <MenuItem value={"V09"}>V09</MenuItem>
                        <MenuItem value={"V10"}>V10</MenuItem>
                        <MenuItem value={"V11"}>V11</MenuItem>
                        <MenuItem value={"V12"}>V12</MenuItem>
                        <MenuItem value={"V13"}>V13</MenuItem>
                        <MenuItem value={"V14"}>V14</MenuItem>
                        <MenuItem value={"V15"}>V15</MenuItem>
                        <MenuItem value={"V16"}>V16</MenuItem>
                        <MenuItem value={"V17"}>V17</MenuItem>
                        <MenuItem value={"V18"}>V18</MenuItem>
                        <MenuItem value={"V19"}>V19</MenuItem>
                        <MenuItem value={"V20"}>V20</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <br/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                맵핑
            </Typography>

            <Divider my={6}/>

            <AppBar position="static" color={"default"} variant={"outlined"}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="폼" {...a11yProps(0)} />
                    <Tab label="JSON" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <br/><br/>

                <Typography variant="h4" className={classes.root}>
                    필드
                </Typography>
                <Card>
                    <CardContent>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">#</StyledTableCell>
                                    <StyledTableCell>이름</StyledTableCell>
                                    <StyledTableCell align="center">타입</StyledTableCell>
                                    <StyledTableCell align="center">분석기</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row" align="center">{index}</StyledTableCell>
                                        <StyledTableCell>
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">

                                            <FormControl className={classes.formControl}>
                                                <Select>
                                                    <MenuItem value={"Keyword"}>Keyword</MenuItem>
                                                    <MenuItem value={"Text"}>Text</MenuItem>
                                                    <MenuItem value={"Alias"}>Alias</MenuItem>
                                                    <MenuItem value={"Arrays"}>Arrays</MenuItem>
                                                    <MenuItem value={"Binary"}>Binary</MenuItem>
                                                    <MenuItem value={"Boolean"}>Boolean</MenuItem>
                                                    <MenuItem value={"Date"}>Date</MenuItem>
                                                    <MenuItem value={"Date nanoseconds"}>Date nanoseconds</MenuItem>
                                                    <MenuItem value={"Dense vector"}>Dense vector</MenuItem>
                                                    <MenuItem value={"Histogram"}>Histogram</MenuItem>
                                                    <MenuItem value={"Flattened"}>Flattened</MenuItem>
                                                    <MenuItem value={"Geo-point"}>Geo-point</MenuItem>
                                                    <MenuItem value={"Geo-shape"}>Geo-shape</MenuItem>
                                                    <MenuItem value={"IP"}>IP</MenuItem>
                                                    <MenuItem value={"Join"}>Join</MenuItem>
                                                    <MenuItem value={"Nested"}>Nested</MenuItem>
                                                    <MenuItem value={"Numeric"}>Numeric</MenuItem>
                                                    <MenuItem value={"Object"}>Object</MenuItem>
                                                    <MenuItem value={"Percolator"}>Percolator</MenuItem>
                                                    <MenuItem value={"Range"}>Range</MenuItem>
                                                    <MenuItem value={"Rank feature"}>Rank feature</MenuItem>
                                                    <MenuItem value={"Search-as-you-type"}>Search-as-you-type</MenuItem>
                                                    <MenuItem value={"Sparse vector"}>Sparse vector</MenuItem>
                                                    <MenuItem value={"Token count"}>Token count</MenuItem>
                                                    <MenuItem value={"Shape"}>Shape</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <FormControl className={classes.formControl}>
                                                <Select>
                                                    <MenuItem value={"Standard Analyzer"}>Standard Analyzer</MenuItem>
                                                    <MenuItem value={"Simple Analyzer"}>Simple Analyzer</MenuItem>
                                                    <MenuItem value={"Whitespace Analyzer"}>Whitespace Analyzer</MenuItem>
                                                    <MenuItem value={"Stop Analyzer"}>Stop Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Pattern Analyzer"}>Pattern Analyzer</MenuItem>
                                                    <MenuItem value={"Language Analyzers"}>Language Analyzers</MenuItem>
                                                    <MenuItem value={"Fingerprint Analyzer"}>Fingerprint Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Nori Analyzer</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>


                <br/><br/>

                <Typography variant="h4" className={classes.root}>
                    분석기
                </Typography>
                <Card>
                    <CardContent>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">#</StyledTableCell>
                                    <StyledTableCell>이름</StyledTableCell>
                                    <StyledTableCell align="center">분석기</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row" align="center">{index}</StyledTableCell>
                                        <StyledTableCell>
                                            Custom Analyzer
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <FormControl className={classes.formControl}>
                                                <Select>
                                                    <MenuItem value={"Standard Analyzer"}>Standard Analyzer</MenuItem>
                                                    <MenuItem value={"Simple Analyzer"}>Simple Analyzer</MenuItem>
                                                    <MenuItem value={"Whitespace Analyzer"}>Whitespace Analyzer</MenuItem>
                                                    <MenuItem value={"Stop Analyzer"}>Stop Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Pattern Analyzer"}>Pattern Analyzer</MenuItem>
                                                    <MenuItem value={"Language Analyzers"}>Language Analyzers</MenuItem>
                                                    <MenuItem value={"Fingerprint Analyzer"}>Fingerprint Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Keyword Analyzer</MenuItem>
                                                    <MenuItem value={"Keyword Analyzer"}>Nori Analyzer</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Card>
                    <CardContent alignItems="center" justify="center">
                        <Box align={"right"}>
                            <Button variant={"outlined"} color={"primary"}>저장</Button>
                        </Box>
                        <Box>
                            <TextareaAutosize rowsMin={50} className={classes.edit} placeholder="" value={JSON.stringify(sampleData, null, 4)}/>
                        </Box>
                    </CardContent>
                </Card>
            </TabPanel>

        </React.Fragment>
    );
}

export default Mapping;
