import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  // CardContent,
  // Grid,
  // Link,
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

import SearchIcon from '@material-ui/icons/Search';

// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

// const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

// const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


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

const AntTabs = withStyles({
  // root: {
  //   borderBottom: '1px solid #e8e8e8',
  // },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(2),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}));

function Blank() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Helmet title="사전" />
      <Typography variant="h3" gutterBottom display="inline">
        사전
      </Typography>
      <AntTabs value={value} 
            onChange={handleChange} 
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
      >
        <AntTab icon={<SearchIcon />} {...a11yProps(0)} />
        <AntTab label="개요" {...a11yProps(1)} />
        <AntTab label="사용자" {...a11yProps(2)} />
        <AntTab label="유사어" {...a11yProps(3)} />
        <AntTab label="불용어" {...a11yProps(4)} />
        <AntTab label="분리어" {...a11yProps(5)} />
        <AntTab label="복합명사" {...a11yProps(6)} />
        <AntTab label="단위명" {...a11yProps(7)} />
        <AntTab label="단위명동의어" {...a11yProps(8)} />
        <AntTab label="제조사" {...a11yProps(9)} />
        <AntTab label="브랜드" {...a11yProps(10)} />
        <AntTab label="카테고리키워드" {...a11yProps(11)} />
        <AntTab label="영단어" {...a11yProps(12)} />
      </AntTabs>
      <Divider />
      <TabPanel value={value} index={0}>검색</TabPanel>
      <TabPanel value={value} index={1}>개요</TabPanel>
      <TabPanel value={value} index={2}>사용자사전</TabPanel>
      <TabPanel value={value} index={3}>유사어사전</TabPanel>
      <TabPanel value={value} index={4}>불용어사전</TabPanel>
      <TabPanel value={value} index={5}>분리어사전</TabPanel>
      <TabPanel value={value} index={6}>복합명사전</TabPanel>
      <TabPanel value={value} index={7}>단위명사전</TabPanel>
      <TabPanel value={value} index={8}>단위명동의어사전</TabPanel>
      <TabPanel value={value} index={9}>제조사명사전</TabPanel>
      <TabPanel value={value} index={10}>브랜드명사전</TabPanel>
      <TabPanel value={value} index={11}>카테고리키워드사전</TabPanel>
      <TabPanel value={value} index={12}>영단어사전</TabPanel>
    </React.Fragment>
  );
}

export default Blank;
