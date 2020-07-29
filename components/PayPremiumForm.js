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
            await insurance.methods.payPremium().send({
                from: accounts[0],
                value: web3.utils.toWei( ((parseFloat(this.props.annualPremium)/1000)/322.28).toString(), "ether")
            });

            Router.replaceRoute(`/insurance/${this.props.address}`);

        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
        
        this.setState({ loadingFlag: false });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Pay Premium</label>
                    <Input 
                        disabled 
                        value={(parseFloat(this.props.annualPremium)/100).toString()}
                        label="USD"
                        labelPosition="right" />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loadingFlag} primary>
                    Pay
                </Button>
            </Form>
        );
    }
}

export default PayPremiumForm;