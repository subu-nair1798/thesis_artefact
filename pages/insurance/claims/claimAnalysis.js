import React, { Component } from "react";
import { Grid, Button, Message } from "semantic-ui-react";
import { Route } from "../../../routes";

class ClaimAnalysis extends Component {
    state = {
        errorMessage: "",
        loadingFlag1: false,
        loadingFlag2: false
    }

    static async getInitialProps(props) {
        const { address, id } = props.query;
        return { }
    }
}