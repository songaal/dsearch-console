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
    backgroundColor: theme.palette.background.paper,
  },
}));

function Blank() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Helmet title="Blank" />
      <Typography variant="h3" gutterBottom display="inline">
        Blank
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>Blank</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div className={classes.root}>

          
        <AppBar position="static" color="default">
          <Tabs value={value} 
                    onChange={handleChange} 
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
              >
                <Tab label="Item 0" {...a11yProps(0)} />
                <Tab label="Item 1" {...a11yProps(1)} />
                <Tab label="Item 2" {...a11yProps(2)} />
                <Tab label="Item 3" {...a11yProps(3)} />
                <Tab label="Item 4" {...a11yProps(4)} />
                <Tab label="Item 5" {...a11yProps(5)} />
                <Tab label="Item 6" {...a11yProps(6)} />
                <Tab label="Item 7" {...a11yProps(7)} />
                <Tab label="Item 8" {...a11yProps(8)} />
                <Tab label="Item 9" {...a11yProps(9)} />
                <Tab label="Item 10" {...a11yProps(10)} />
                <Tab label="Item 11" {...a11yProps(11)} />
                <Tab label="Item 12" {...a11yProps(12)} />
              </Tabs></AppBar>
            {/* <AppBar position="static">
              
            </AppBar> */}
            <Divider />
            <TabPanel value={value} index={0}>Item 1</TabPanel>
            <TabPanel value={value} index={1}>Item 2</TabPanel>
            <TabPanel value={value} index={2}>Item 3</TabPanel>
            <TabPanel value={value} index={3}>Item 4</TabPanel>
            <TabPanel value={value} index={4}>Item 5</TabPanel>
            <TabPanel value={value} index={5}>Item 6</TabPanel>
            <TabPanel value={value} index={6}>Item 7</TabPanel>
            <TabPanel value={value} index={7}>Item 8</TabPanel>
            <TabPanel value={value} index={8}>Item 9</TabPanel>
            <TabPanel value={value} index={9}>Item 10</TabPanel>
            <TabPanel value={value} index={10}>Item 11</TabPanel>
            <TabPanel value={value} index={11}>Item 12</TabPanel>
            <TabPanel value={value} index={12}>Item 13</TabPanel>
            <TabPanel value={value} index={13}>Item 14</TabPanel>
            </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Blank;
