// import React from "react";
// import Async from '~/components/Async';
// import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
// import Helmet from 'react-helmet';
// import AntTabs from "~/components/AntTabs"
// import IndicesSelect from "~/components/IndicesSelect";
// import {Divider as MuiDivider, Typography} from "@material-ui/core";
//
// import {spacing} from "@material-ui/system";
//
//
// const useStyles = makeStyles((theme) => ({}));
//
//
// const Divider = styled(MuiDivider)(spacing);
//
//
// const tabs = [
//     {label: "기본", component: Async(() => import("./SourceDataPanel"))},
//     {label: "분석된 색인어", component: Async(() => import("./IndexedDataPanel"))},
// ];
//
//
// function IndexData() {
//     const classes = useStyles();
//
//     return (
//         <div>
//             <Helmet title="데이터"/>
//
//             <IndicesSelect/>
//
//             <Typography variant="h3" gutterBottom display="inline">
//                 데이터
//             </Typography>
//
//             <Divider my={6}/>
//
//             <AntTabs tabs={tabs}/>
//
//         </div>
//     );
// }
//
// export default IndexData;
