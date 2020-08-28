import React, {forwardRef, useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {Box, Card, CardContent, Divider as MuiDivider, TextareaAutosize, Typography} from "@material-ui/core";
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
import {
    addIndexDocumentSourceAction,
    deleteIndexDocumentSourceAction,
    editIndexDocumentSourceAction,
    setIndexDocumentSourceListAction
} from "../../../redux/actions/indicesActions";
import flat, {unflatten} from 'flat'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};
const useStyles = makeStyles((theme) => ({}));
const Divider = styled(MuiDivider)(spacing);
let searchInterval = null
function DataEditTable({dispatch, index, authUser}) {
    const documentSourceResponse = useSelector(store => ({ ...store.indicesReducers}))['documentSourceResponse']
    const [keyword, setKeyword] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(5);
    const [columns, setColumns] = useState([])
    const [dataList, setDataList] = useState([])
    const [selectData, setSelectData] = useState("")

    // 인덱스 변경시 호출
    useEffect(() => {
        setSelectData("")
        setKeyword("")
        setPageNum(0)
        setRowSize(5)
        if (index === "") {
            return
        }
        fetchIndexDocumentSourceList({keyword})
    }, [index])

    useEffect(() => {
        const response = documentSourceResponse;
        if (!response || !response['hits']) {
            return false
        }

        let tmpColumns = {}
        tmpColumns['ID'] = null
        response['hits']['hits'].forEach(hit => {
            const source = flat(hit['_source'])
            Object.keys(source).forEach(key => {
                tmpColumns[key] = null
            })
        })

        const columns = Object.keys(tmpColumns)
        setColumns(columns)

        setDataList(response['hits']['hits'].map(hit => {
            const flatHit = flat(hit)
            let tmpData = {}
            columns.forEach(column => {
                tmpData[column.replace(/\./gi, "___")] = flatHit['_source.' + column] || ""
            })
            tmpData['ID'] = hit['_id']
            tmpData['_hitsId'] = hit['_id']
            return tmpData
        }))

    }, [])





    function fetchIndexDocumentSourceList({searchSize=100, columns=[], keyword=null}) {
        return dispatch(setIndexDocumentSourceListAction({index, from: pageNum, size: searchSize||rowSize, columns, keyword})).then(response => {
            // columns 적용
            let tmpColumns = {}
            tmpColumns['_id'] = null
            response['hits']['hits'].forEach(hit => {
                const source = flat(hit['_source'])
                Object.keys(source).forEach(key => {
                    tmpColumns[key] = null
                })
            })
            // setColumns(Object.keys(tmpColumns))
            return {
                columns: Object.keys(tmpColumns),
                hits: response['hits']
            }
        }).then(payload => {
            setDataList(payload['hits']['hits'].map(hit => {
                const flatHit = flat(hit)
                let tmpData = {}
                payload['columns'].forEach(column => {
                    tmpData[column.replace(/\./gi, "___")] = flatHit['_source.' + column] || ""
                })
                tmpData['ID'] = hit['_id']
                tmpData['_hitsId'] = hit['_id']
                return tmpData
            }))
        })
    }

    function handleChangeRowsPerPage(row) {
        setRowSize(row)
        fetchIndexDocumentSourceList({keyword})
    }

    function handleSearch(keyword) {
        setDataList([])

        if (searchInterval !== null) {
            clearTimeout(searchInterval)
        }

        searchInterval = setTimeout(() => {
            setKeyword(keyword)
            setColumns(columns)
            fetchIndexDocumentSourceList({columns, keyword})
        }, 500)
    }

    function handleRowAdd(newData) {
        return new Promise((resolve, reject) => {
            const tmpBody = unflatten(newData)
            let body = {}
            Object.keys(tmpBody).forEach(key => body[key.replace(/___/gi, ".")] = tmpBody[key])
            delete body['ID']
            dispatch(addIndexDocumentSourceAction({ index, body }))
                .then(() => setTimeout(() => fetchIndexDocumentSourceList({keyword}).then(resolve), 1000))
                .catch(reject)
        })
    }
    function handleRowUpdate(newData, oldData) {
        return new Promise((resolve, reject) => {
            const tmpBody = unflatten(newData)
            let body = {}
            Object.keys(tmpBody).forEach(key => body[key.replace(/___/gi, ".")] = tmpBody[key])
            const id = body['_hitsId']
            delete body['_hitsId']
            delete body['ID']
            delete body['_id']
            dispatch(editIndexDocumentSourceAction({ index, id, body }))
                .then(() => setTimeout(() => fetchIndexDocumentSourceList({keyword}).then(resolve), 1000))
                .catch(reject)
        })
    }
    function handleRowDelete(oldData) {
        return new Promise((resolve, reject) => {
            const id = unflatten(oldData)['_hitsId']
            dispatch(deleteIndexDocumentSourceAction({ index, id }))
                .then(() => setTimeout(() => fetchIndexDocumentSourceList({keyword}).then(resolve), 1000))
                .catch(reject)
        })
    }

    return (
        <React.Fragment>
            {
                authUser.role.index ?
                    <MaterialTable
                        icons={tableIcons}
                        title=""
                        columns={columns.map(column => ({
                            title: column,
                            field: column.replace(/\./gi, "___"),
                            editable: column === "ID" ? 'never' : "always",
                            cellStyle:{whiteSpace: "nowrap", maxWidth: "180px", overflow: "hidden"}
                        }))}
                        data={dataList}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        editable={{ onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete }}
                        onSearchChange={handleSearch}
                        options={{
                            headerStyle: {
                                maxWidth: "180px"
                            }
                        }}
                        onRowClick={(event, rowData) => {
                            setSelectData(event.target.innerText || "")
                        }}
                    />
                    :
                    <MaterialTable
                        icons={tableIcons}
                        title=""
                        columns={columns.map(column => ({
                            title: column,
                            field: column.replace(/\./gi, "___"),
                            editable: column === "ID" ? 'never' : "always",
                            cellStyle:{whiteSpace: "nowrap", maxWidth: "180px"}
                        }))}
                        data={dataList}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onSearchChange={handleSearch}
                        options={{
                            headerStyle: {
                                maxWidth: "180px"
                            }
                        }}
                        onRowClick={(event, rowData) => {
                            setSelectData(event.target.innerText || "")
                        }}
                    />
            }

            <Card style={{display: selectData === "" ? "none" : "block"}}>
                <CardContent>
                    <Box mt={5}>
                        <Typography variant="h5" gutterBottom >
                            {selectData}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>


        </React.Fragment>
    )
}

export default connect(store => ({...store.indicesReducers, ...store.dsearchReducers}))(DataEditTable)