// React components
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

// Material components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab as AntTab,
    Typography,
    Box
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    container: {
        maxHeight: 440,
    },
}));

const Tab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(0),
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


function Panel(props) {
    const { children, value, index } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

Panel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function AntTabs({tabs}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        tabIndex: 0
    });

    const handleChange = (event, tabIndex) => {
        setState({
            tabIndex: tabIndex
        })
    };

    return (
        <div className={classes.root}>
            <Tabs value={state.tabIndex}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
            >
                { tabs.map(tab => <Tab id={tab.id} label={tab.label} />) }
            </Tabs>

            { tabs.map((Tab, index) => <Panel value={state.tabIndex} index={index} ><Tab.component /></Panel>) }

        </div>
    )
};

export default AntTabs;