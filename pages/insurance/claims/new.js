import React, { Component } from "react";
import { Form, Button, Message, Input, Dropdown, Grid, GridColumn } from "semantic-ui-react";
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

        errorMessage: "",
        loadingFlag: false
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address }; 
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loadingFlag: true, errorMessage: "" });

        const insurance = Insurance(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();

            await insurance.methods.createClaim(
                this.state.injuryClaim,
                this.state.propertyClaim,
                this.state.vehicleClaim,
                this.state.incidentType,
                this.state.collisionType,
                this.state.incidentSeverity,
                this.state.authoritiesContacted,
                this.state.incidentHour,
                this.state.vehiclesInvolved,
                this.state.propertyDamage,
                this.state.bodilyInjuries,
                this.state.witnesses,
                this.state.policeReportAvailable
            ).send({ from: accounts[0] });

            Router.pushRoute(`/insurance/${this.props.address}/claims`);
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loadingFlag: false });
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

        const incidentTypeOptions = [
            { key: 1, text: "Single Vehicle Collision", value: "Single Vehicle Collision" },
            { key: 2, text: "Vehicle Theft", value: "Vehicle Theft" },
            { key: 3, text: "Multi-vehicle Collision", value: "Multi-vehicle Collision" },
            { key: 4, text: "Parked Car", value: "Parked Car" }
        ]

        const collisionTypeOptions = [
            { key: 1, text: "Side Collision", value: "Side Collision" },
            { key: 2, text: "Rear Collision", value: "Rear Collision" },
            { key: 3, text: "Front Collision", value: "Front Collision" },
            { key: 4, text: "No Collision", value: "No Collision" }
        ]

        const incidentSeverityOptions = [
            { key: 1, text: "Major Damage", value: "Major Damage" },
            { key: 2, text: "Minor Damage", value: "Minor Damage" },
            { key: 3, text: "Trivial Damage", value: "Trivial Damage" },
            { key: 4, text: "Total Loss", value: "Total Loss" }
        ]

        const authoritiesOptions = [
            { key: 1, text: "Police", value: "Police" },
            { key: 2, text: "Fire", value: "Fire"},
            { key: 3, text: "Ambulance", value: "Ambulance" },
            { key: 4, text: "Other", value: "Other" },
            { key: 5, text: "None", value: "None" }
        ]

        return(
            <Layout>
                <h3>Create a new Claim</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Injury Claim</label>
                                    <Input 
                                        label="USD"
                                        labelPosition="right"
                                        value={this.state.injuryClaim}
                                        onChange={event => this.setState({ injuryClaim: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Property Claim</label>
                                    <Input 
                                        label="USD"
                                        labelPosition="right"
                                        value={this.state.propertyClaim}
                                        onChange={event => this.setState({ propertyClaim: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Vehicle Claim</label>
                                    <Input 
                                        label="USD"
                                        labelPosition="right"
                                        value={this.state.vehicleClaim}
                                        onChange={event => this.setState({ vehicleClaim: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Incident Type</label>
                                    <Dropdown 
                                        placeholder="Select Incident Type" 
                                        selection 
                                        fluid 
                                        options={incidentTypeOptions} 
                                        value={this.state.incidentType} 
                                        onChange={(e, { value }) => this.setState({ incidentType: value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Collision Type</label>
                                    <Dropdown 
                                        placeholder="Select Collision Type" 
                                        selection 
                                        fluid 
                                        options={collisionTypeOptions} 
                                        value={this.state.collisionType} 
                                        onChange={(e, { value }) => this.setState({ collisionType: value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Incident Severity</label>
                                    <Dropdown 
                                        placeholder="Select Incident Severity" 
                                        selection 
                                        fluid 
                                        options={incidentSeverityOptions} 
                                        value={this.state.incidentSeverity} 
                                        onChange={(e, { value }) => this.setState({ incidentSeverity: value })} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Authorities Contacted</label>
                                    <Dropdown 
                                        placeholder="Select Authority" 
                                        selection 
                                        fluid 
                                        options={authoritiesOptions} 
                                        value={this.state.authoritiesContacted} 
                                        onChange={(e, { value }) => this.setState({ authoritiesContacted: value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>Incident Hour</label>
                                    <Input 
                                        value={this.state.incidentHour}
                                        onChange={event => this.setState({ incidentHour: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>Number of Vehicles Involved</label>
                                    <Input 
                                        value={this.state.vehiclesInvolved}
                                        onChange={event => this.setState({ vehiclesInvolved: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Form.Field>
                                    <label>Property Damage</label>
                                    <Dropdown 
                                        placeholder="Select..." 
                                        selection 
                                        fluid 
                                        options={propertyDamageOptions} 
                                        value={this.state.propertyDamage} 
                                        onChange={(e, { value }) => this.setState({ propertyDamage: value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>Bodily Injuries</label>
                                    <Input 
                                        value={this.state.bodilyInjuries}
                                        onChange={event => this.setState({ bodilyInjuries: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>Number of Witnesses</label>
                                    <Input 
                                        value={this.state.witnesses}
                                        onChange={event => this.setState({ witnesses: event.target.value })}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Form.Field>
                                    <label>Police Report </label>
                                    <Dropdown 
                                        placeholder="Select..." 
                                        selection 
                                        fluid 
                                        options={policeReportOptions} 
                                        value={this.state.policeReportAvailable} 
                                        onChange={(e, { value }) => this.setState({ policeReportAvailable: value })} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Message error header="Oops!" content={this.state.errorMessage} />
                                <Button loading={this.state.loadingFlag} primary>Create</Button>
                                <Link route={`/insurance/${this.props.address}/claims`}>
                                    <a>
                                        <Button secondary>Back</Button>
                                    </a>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Layout>
        )
    }
}

export default NewClaim;