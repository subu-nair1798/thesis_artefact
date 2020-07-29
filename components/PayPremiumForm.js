import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Insurance from "../ethereum/insurance";
import web3 from '../ethereum/web3';
import { Router } from "../routes";

class PayPremiumForm extends Component {
    state = {
        errorMessage: "",
        loadingFlag: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const insurance = Insurance(this.props.address);
        this.setState({ loadingFlag: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
        } catch(err) {
            
        }
        
        this.setState({ loadingFlag: false })
    }
}