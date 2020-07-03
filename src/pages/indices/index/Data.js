import React, {forwardRef, useEffect} from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {
    Box,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import MaterialTable from 'material-table';
import {spacing} from "@material-ui/system";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {setIndexDocumentsAction} from "../../../redux/actions/indicesActions";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const useStyles = makeStyles((theme) => ({}));

const Divider = styled(MuiDivider)(spacing);


function EditTable() {
    // const classes = useStyles()
    // const [id, setId] = useState("");
    // const [pageNum, setPageNum] = useState(0);
    // const [rowSize, setRowSize] = useState(15);
    // const [lastPageNum, setLastPageNum] = useState(0);
    // const [fields, setFields] = useState([])
    // const [dataList, setDataList] = useState([])

    // 인덱스 변경시 호출
    // useEffect(() => {
    //     setId("")
    //     setPageNum(0)
    //     setLastPageNum(0)
    //     dispatch(setIndicesDataAction({
    //         index, id: "", pageNum: 0, rowSize
    //     })).then(store => store.payload).then(result => {
    //         setFields(result['fields'])
    //         setDataList(result['hits'])
    //         setLastPageNum(result['lastPageNum'])
    //     }).catch(error => console.error(error))
    // }, [index])

    useEffect(() => {
        // setIndexDocumentsAction({index })
    }, [])

    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });
    return (
        <MaterialTable
            icons={tableIcons}
            title=""
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();

                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();

                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();

                        }, 600);
                    }),
            }}
        />
    )
}
function IndexedData() {
    return (
        <React.Fragment>
            <TableContainer>
                <Table size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>값</TableCell>
                            <TableCell>분석결과</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell> product_id </TableCell>
                            <TableCell> 냉장고 </TableCell>
                            <TableCell> 냉장고 </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

function Index() {
    const classes = useStyles();
    const [chk, setChk] = React.useState('source');

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    return (
        <React.Fragment>

            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="source" checked={chk === "source"} onChange={handleRadioChange} control={<Radio color="primary" />} label="기본" />
                    <FormControlLabel value="indexed" checked={chk === "indexed"} onChange={handleRadioChange} control={<Radio color="primary" />} label="분석된 색인어" />
                </RadioGroup>
            </FormControl>

            <Box mt={2}>
                {
                    chk === "source" ? <EditTable /> : <IndexedData />
                }
            </Box>
        </React.Fragment>
    );
}

export default Index;
