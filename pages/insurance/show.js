import React, { Component } from "react";
import Layout from "../../components/Layout";
import Insurance from "../../ethereum/insurance";
import { Card, Grid, Button, GridColumn } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
// import PayPremiumForm from "../../components/PayPremiumForm";
import { Link } from "../../routes";

class InsuranceShow extends Component {
    static async getInitialProps(props) {
        const insurance = Insurance(props.query.address);

        const summary = await insurance.methods.getSummary().call();

        return {
            address: props.query.address,
            customerAddress: summary[0],
            monthsAsCustomer: summary[1],
            age: summary[2],
            policyCsl: summary[3],
            policyDeductable: summary[4],
            annualPremium: summary[5],
            umbrellaLimit: summary[6],
            sex: summary[7],
            autoMake: summary[8],
            autoYear: summary[9]
        };
    }

    renderSummaryCards() {
        const {
            customerAddress,
            monthsAsCustomer,
            age,
            policyCsl,
            policyDeductable,
            annualPremium,
            umbrellaLimit,
            sex,
            autoMake,
            autoYear
        } = this.props;

        const items = [
            {
                header: customerAddress,
                description: "Address of the Customer",
                style: { overflowWrap: "break-word" }
            },
            {
                header: monthsAsCustomer,
                description: "Months as a Customer"
            },
            {
                header: age,
                description: "Age"
            },
            {
                header: policyCsl,
                description: "Policy CSL"
            },
            {
                header: policyDeductable + "/" + (parseFloat(policyDeductable)/322.28),
                description: "Policy Deductable (USD / Ether)"
            },
            {
                header: (parseFloat(annualPremium)/100) + "/" + ((parseFloat(annualPremium)/100)/322.28),
                description: "Annual Premium (USD / Ether)"
            },
            {
                header: umbrellaLimit,
                description: "Umbrella Limit"
            },
            {
                header: sex,
                description: "Sex"
            },
            {
                header: autoMake,
                description: "Auto Make"
            },
            {
                header: autoYear,
                description: "Year of Purchase"
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return(
            <Layout>
                <h3>Insurance Contract Page</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderSummaryCards()}
                        </Grid.Column>
                        <Grid.Column width={6}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/insurance/${this.props.address}/claims`}>
                                <a>
                                    <Button primary>View Claims</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default InsuranceShow;

