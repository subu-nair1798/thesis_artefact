import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Insurance from "../../../ethereum/insurance";
import web3 from "../../../ethereum/web3";
import { Router, Link } from "../../../routes";
import Layout from "../../../components/Layout";

class NewClaim extends Component {
    state = {
        injuryClaim: "",
        propertyClaim: "",
        vehicleClaim: "",

        incidentType: "",
        collisionType: "",
        incidentSeverity: "",
        authoritiesContacted: "",
        incidentHour: "",
        vehiclesInvolved: "",
        propertyDamage: "",
        bodilyInjuries: "",
        witnesses: "",
        policeReportAvailable: "",

        errorMessage = "",
        loadingFlag = false
    }

    onSubmit = async (event) => {

    }

    render() {
        const policeReportOptions = [
            { key: 1, text: "YES", value: true},
            { key: 2, text: "NO", value: false}
        ]

        const propertyDamageOptions = [
            { key: 1, text: "YES", value: true },
            { key: 2, text: "NO", value: false }
        ]

        const 
    }
}

export default NewClaim;