// React components
import React from "react";
import PropTypes from 'prop-types';

// Material components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab as AntTab,
    Divider as MuiDivider,
    Typography,
    Box
} from "@material-ui/core";
import styled from "styled-components";
import {spacing} from "@material-ui/system";


const Divider = styled(MuiDivider)(spacing);

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper
//     },
//     indicator: {
//         backgroundColor: '#1890ff',
//     },
// }));

const Tab = withStyles((theme) => ({
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
}))((props) => <AntTab disableRipple {...props} />);


function TabPanel(props) {
    const { key, children, value, index } = props;
    return (
        <Typography
            key={key}
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {value === index && <Box  p={3}> <children key={key}/> </Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    key: PropTypes.any,
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};


function AntTabs({ tabs }) {
    const [state, setState] = React.useState({ tabIndex: 0 });
    const handleChange = (event, tabIndex) => {
        setState({
            tabIndex: tabIndex
        })
    };

    return (
        <>
            <Tabs value={state.tabIndex}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
            >
                { tabs.map((tab, index) => <Tab key={index} id={index}  icon={tab.icon} label={tab.label || ""} />) }
            </Tabs>
            <Divider />
            { tabs.map((Tab, index) => {
                return (
                    <div key={index}
                         role="tabpanel"
                         hidden={state.tabIndex !== index}
                         id={`scrollable-auto-tabpanel-${index}`}
                         aria-labelledby={`scrollable-auto-tab-${index}`}
                    >
                        {index === state.tabIndex && <Box  p={3}> <Tab.component tabs={Tab} /> </Box>}
                    </div>
                )
            } )}
        </>
    )
};

export default AntTabs;