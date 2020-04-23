import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  Paper
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}));

function Blank() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <Tabs value={value} 
              onChange={handleChange} 
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="on"
        >
          <Tab label="개요" {...a11yProps(0)} />
          <Tab label="검색" {...a11yProps(1)} />
          <Tab label="사용자사전" {...a11yProps(2)} />
          <Tab label="유사어사전" {...a11yProps(3)} />
          <Tab label="불용어사전" {...a11yProps(4)} />
          <Tab label="분리어사전" {...a11yProps(5)} />
          <Tab label="복합명사사전" {...a11yProps(6)} />
          <Tab label="단위명사전" {...a11yProps(7)} />
          <Tab label="단위명동의어사전" {...a11yProps(8)} />
          <Tab label="제조사명사전" {...a11yProps(9)} />
          <Tab label="브랜드명사전" {...a11yProps(10)} />
          <Tab label="카테고리키워드사전" {...a11yProps(11)} />
          <Tab label="영단어사전" {...a11yProps(12)} />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>개요</TabPanel>
        <TabPanel value={value} index={1}>검색</TabPanel>
        <TabPanel value={value} index={2}>사용자사전</TabPanel>
        <TabPanel value={value} index={3}>유사어사전</TabPanel>
        <TabPanel value={value} index={4}>불용어사전</TabPanel>
        <TabPanel value={value} index={5}>분리어사전</TabPanel>
        <TabPanel value={value} index={6}>복합명사전</TabPanel>
        <TabPanel value={value} index={7}>단위명사전</TabPanel>
        <TabPanel value={value} index={8}>단명동의어사전</TabPanel>
        <TabPanel value={value} index={9}>제조사명사전</TabPanel>
        <TabPanel value={value} index={10}>브랜드명사전</TabPanel>
        <TabPanel value={value} index={11}>카테고리키워드사전</TabPanel>
        <TabPanel value={value} index={12}>영단어사전</TabPanel>
      </div>
    </>
  );
}

export default Blank;
