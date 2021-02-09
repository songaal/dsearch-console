// React components
import React from "react";
import PropTypes from 'prop-types';
// Material components
import {withStyles} from '@material-ui/core/styles';
import {Box as MuiBox, Divider as MuiDivider, Tab as AntTab, Tabs, Typography} from "@material-ui/core";
import styled from "styled-components";
import {spacing} from "@material-ui/system";


const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing);

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
}), {index: 1})((props) => <AntTab disableRipple {...props} />);


function TabPanel(props) {
    const {key, children, value, index} = props;
    return (
        <Typography
            key={key}
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {value === index && <Box >
                <children key={key} />
            </Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    key: PropTypes.any,
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};


function AntTabs({tabs, tabIndex = 0, onChange}) {
    const [state, setState] = React.useState({tabIndex: tabIndex});
    const handleChange = (event, tabIndex) => {
        setState({
            tabIndex: tabIndex
        })
        if (typeof onChange === 'function') {
            onChange(tabIndex)
        }
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
                {tabs.map((tab, index) => <Tab key={index} id={index} icon={tab.icon} label={tab.label || ""} />)}
            </Tabs>
            <Divider />
            {tabs.map((Tab, index) => {
                return (
                    <Box key={index}
                          role="tabpanel"
                          hidden={state.tabIndex !== index}
                          id={`scrollable-auto-tabpanel-${index}`}
                          aria-labelledby={`scrollable-auto-tab-${index}`}>
                        {index === state.tabIndex && Tab.component && <Box> <Tab.component tabs={Tab}/> </Box>}
                    </Box>
                )
            })}
        </>
    )
}

export default AntTabs;