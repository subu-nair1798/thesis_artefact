import React, { Component } from "react";
import { Form, Button, Input, Message, Dropdown, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
    state = {
        customerAddress: "",
        monthsAsCustomer: "",
        age: "",
        policyDeductable: "",
        annualPremium: "",
        umbrellaLimit: "",
        autoYear: "",
        policyCsl: "",
        sex: "",
        autoMake: "",
        errorMessage: "",
        loadingFlag: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loadingFlag: true });
        this.setState({ errorMessage: "" });

        let tempAnnualPremium = this.state.annualPremium.replace(".", "");
        console.log("LOG OUTPUT:",
            this.state.customerAddress, 
            this.state.monthsAsCustomer, 
            this.state.age, 
            this.state.policyCsl, 
            this.state.policyDeductable,
            tempAnnualPremium,
            this.state.umbrellaLimit,
            this.state.sex,
            this.state.autoMake,
            this.state.autoYear);

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createInsurance(
                    this.state.customerAddress, 
                    this.state.monthsAsCustomer, 
                    this.state.age, 
                    this.state.policyCsl, 
                    this.state.policyDeductable,
                    tempAnnualPremium,
                    this.state.umbrellaLimit,
                    this.state.sex,
                    this.state.autoMake,
                    this.state.autoYear
                ).send({
                    from: accounts[0] 
                });

            Router.pushRoute("/");
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loadingFlag: false });
    }

    render() {
        const policyCslOptions = [
            { key: 1, text: "100/300", value: "100/300" },
            { key: 2, text: "250/500", value: "250/500" },
            { key: 3, text: "500/1000", value: "500/1000" }
        ]

        const sexOptions = [
            { key: 1, text: "MALE", value: "MALE" },
            { key: 2, text: "FEMALE", value: "FEMALE" }
        ]

        const autoMakeOptions = [
            { key: 1, text: "Saab", value: "Saab" },
            { key: 2, text: "Mercedes", value: "Mercedes" },
            { key: 3, text: "Dodge", value: "Dodge" },
            { key: 4, text: "Chevrolet", value: "Chevrolet" },
            { key: 5, text: "Accura", value: "Accura" },
            { key: 6, text: "Nissan", value: "Nissan" },
            { key: 7, text: "Audi", value: "Audi" },
            { key: 8, text: "Toyota", value: "Toyota" },
            { key: 9, text: "Ford", value: "Ford" },
            { key: 10, text: "Suburu", value: "Suburu" },
            { key: 11, text: "BMW", value: "BMW" },
            { key: 12, text: "Jeep", value: "Jeep" },
            { key: 13, text: "Honda", value: "Honda" },
            { key: 14, text: "Volkswagen", value: "Volkswagen" }
        ]

        return(
            <Layout>
                <h3>Create a new Contract</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Customer Address</label>
                                    <Input 
                                        value={this.state.customerAddress} 
                                        onChange={event => this.setState({ customerAddress: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Form.Field>
                                    <label>Months as Customer</label>
                                    <Input 
                                        value={this.state.monthsAsCustomer} 
                                        onChange={event => this.setState({ monthsAsCustomer: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Age</label>
                                    <Input 
                                        value={this.state.age} 
                                        onChange={event => this.setState({ age: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Form.Field>
                                    <label>Sex</label>
                                    <Dropdown 
                                        placeholder="Select Sex" 
                                        selection 
                                        fluid 
                                        options={sexOptions} 
                                        value={this.state.sex} 
                                        onChange={(e, { value }) => this.setState({ sex: value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Policy CSL</label>
                                    <Dropdown 
                                        placeholder="Select Policy CSL" 
                                        selection 
                                        fluid 
                                        options={policyCslOptions} 
                                        value={this.state.policyCsl} 
                                        onChange={(e, { value }) => this.setState({ policyCsl: value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Policy Deductable</label>
                                    <Input
                                        label="USD"
                                        labelPosition="right" 
                                        value={this.state.policyDeductable} 
                                        onChange={event => this.setState({ policyDeductable: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Annual Premium</label>
                                    <Input 
                                        label="USD"
                                        labelPosition="right"
                                        value={this.state.annualPremium} 
                                        onChange={event => this.setState({ annualPremium: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Umbrella Limit</label>
                                    <Input 
                                        value={this.state.umbrellaLimit} 
                                        onChange={event => this.setState({ umbrellaLimit: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Auto Make</label>
                                    <Dropdown 
                                        placeholder="Select Auto Make" 
                                        selection 
                                        fluid 
                                        options={autoMakeOptions} 
                                        value={this.state.autoMake} 
                                        onChange={(e, { value }) => this.setState({ autoMake: value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Year of Purchase</label>
                                    <Input 
                                        value={this.state.autoYear} 
                                        onChange={event => this.setState({ autoYear: event.target.value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Message error header="Oops!" content={this.state.errorMessage}></Message>
                                <Button loading={this.state.loadingFlag} primary>Create</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;