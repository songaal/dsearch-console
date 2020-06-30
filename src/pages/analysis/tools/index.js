import React, {useState} from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import {makeStyles} from '@material-ui/core/styles';

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
    Link,
    MenuItem,
    TextField as MuiTextField,
    Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250
    }
}));

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TextField = styled(MuiTextField)(spacing);


function BriefResult(){
    return <Table>
            <TableRow hover>
                <TableCell>
                    Sandisk
                </TableCell>
                <TableCell>
                    Extream 
                </TableCell>
                <TableCell>
                    Z
                </TableCell>
                <TableCell>
                    80
                </TableCell>
                <TableCell>
                    USB
                </TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>
                    16gb
                </TableCell>
            </TableRow>
        </Table>;
}

function DetailResult(){
    return <Table>
        <TableRow hover>
            <TableCell>
                <Typography>1. 모델명</Typography>
        Z80 ( z, 80 z80 )
    </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography>2. 단위명 규칙</Typography>
        16gb: 16gb
    </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography>3. 형태소 분리 결과</Typography>
        Sandisk, Extream, z80
    </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography>4. 동의어 확장</Typography>
        Sandisk : 샌디스크, 산디스크, 센디스크, 샌디스크, 코리아, 산디스크, 코리아
        </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography>5. 최종 결과</Typography>
        Sandisk, 샌디스크, 산디스크, 센디스크, 샌디스크, 코리아, 산디스크, 코리아, Extream, Z, 지, 제트, 80, Z80, USB, 유에스비, usb용, usb형, 유에스비용, 유에스비형, 16gb, 16g, 16기가
        </TableCell>
        </TableRow>
    </Table>;
}

function ToolsCard() {
    const [toolsTypeAction, setToolsTypeAction] = useState("brief")
    const classes = useStyles()

    const handleChange = (event) => {
        setToolsTypeAction(event.target.value)
    };

    return (
        <Card mb={6}>
            <CardContent>
                <TextField label="분석할 내용을 입력해 주세요." multiline rows={2} variant="outlined" fullWidth gutterBottom> </TextField>
                <Box display="flex" alignItems="center" justifyContent="left" fullWidth >
                    <Box>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel> 분석 도구 선택 </InputLabel>
                            <Select>
                                <MenuItem value="">
                                    None
                                </MenuItem>
                                <MenuItem value={10}>v1/product-analyzer-index</MenuItem>
                                <MenuItem value={20}>v2/product-analyzer-index</MenuItem>
                                <MenuItem value={30}>v3/product-analyzer-index</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl >
                            <RadioGroup value={toolsTypeAction} row onChange={handleChange}>
                                <FormControlLabel value="brief" control={<Radio />} label="간략" />
                                <FormControlLabel value="detail" control={<Radio />} label="상세" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="secondary">
                        분석
                    </Button>
                </Box>

                <Box m={2}>
                    <Typography variant="h4" gutterBottom display="inline" > 분석 결과 </Typography>
                </Box>
                <Box p={2}>
                    {toolsTypeAction == 'brief' ? <BriefResult /> :  <DetailResult />}
                </Box>
            </CardContent>
        </Card>
    );
}

function Tools({ dispatch }) {

    return (
        <React.Fragment>
            <Helmet title="Blank" />
            <Typography variant="h3" gutterBottom display="inline">
                분석도구
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/dashboard"> gogogo</Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>Blank</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <ToolsCard onClick={() => console.log("click")} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect()(Tools);
