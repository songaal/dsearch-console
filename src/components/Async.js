import React from "react";

import Loader from "./Loader";
import {Box} from "@material-ui/core";

const sleep = m => new Promise(r => setTimeout(r, m));

export default function asyncComponent(importComponent, { time = 1500 } = {}) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null,
                time: time
            };
        }

        async componentDidMount() {
            if (this.state.time > 0) {
                await sleep(this.state.time);
            }

            const {default: component} = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const C = this.state.component;
            return C ?
                <C {...this.props} />
                :
                <Box style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", minHeight: "250px"}}>
                    <Loader/>
                </Box>

        }
    }

    return AsyncComponent;
}
