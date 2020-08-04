import React, { Component } from "react";
import { Grid, Button, Card } from "semantic-ui-react";
import { Router, Link } from "../../../routes";
import Insurance from "../../../ethereum/insurance";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import axios from "axios";
// import runPyFile from "../../../helper";

class ClaimAnalysis extends Component {
    state = {
        likelihood: "",
        loadingFlag1: false,
        loadingFlag2: false
    }

    static async getInitialProps(props) {
        const { address, id } = props.query;

        const insurance = Insurance(address);

        const claimsArray = await insurance.methods.claimsArray(id).call();
        const claimDetailsArray = await insurance.methods.claimDetailsArray(id).call();

        
        return {
            injuryClaim: claimsArray[0],
            propertyClaim: claimsArray[1],
            vehicleClaim: claimsArray[2],
            complete: claimsArray[3],
            claimDecision: claimsArray[4],

            incidentType: claimDetailsArray[0],
            collisionType: claimDetailsArray[1],
            incidentSeverity: claimDetailsArray[2],
            authoritiesContacted: claimDetailsArray[3],
            incidentHour: claimDetailsArray[4],
            vehiclesInvolved: claimDetailsArray[5],
            propertyDamage: claimDetailsArray[6],
            bodilyInjuries: claimDetailsArray[7],
            witnesses: claimDetailsArray[8],
            policeReportAvailable: claimDetailsArray[9],

            address: address, 
            id: id };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/", {
            params: {
                getData: this.props.incidentSeverity
            }
        })
        .then(res => {
        console.log(res.data);
      })
    }

    renderClaimDetailCards() {
        let totalClaimAmount = parseFloat(this.props.injuryClaim) + parseFloat(this.props.propertyClaim) + parseFloat(this.props.vehicleClaim);
        let tempPropertyDamage;
        let tempPoliceReport;

        if(this.props.propertyDamage) {
            tempPropertyDamage = "YES"
        } else {
            tempPropertyDamage = "NO"
        }

        if(this.props.policeReportAvailable) {
            tempPoliceReport = "YES"
        } else {
            tempPoliceReport = "NO"
        }
        const items = [
            {
                header: this.props.injuryClaim,
                description: "Injury Claim (USD)"
            },
            {
                header: this.props.propertyClaim,
                description: "Property Claim (USD)"
            },
            {
                header: this.props.vehicleClaim,
                description: "Vehicle Claim (USD)"
            },
            {
                header: totalClaimAmount + " / " + (parseFloat(totalClaimAmount)/322.28),
                description: "Total Claim Amount (USD / Ether)"
            },
            {
                header: this.props.incidentType,
                description: "Incident Type"
            },
            {
                header: this.props.collisionType,
                description: "Collision Type"
            },
            {
                header: this.props.incidentSeverity,
                description: "Incident Severity"
            },
            {
                header: this.props.authoritiesContacted,
                description: "Authority Contacted"
            },
            {
                header: this.props.incidentHour,
                description: "Incident Hour"
            },
            {
                header: this.props.vehiclesInvolved,
                description: "Number of Vehicles Involved"
            },
            {
                header: tempPropertyDamage,
                description: "Property Damage"
            },
            {
                header: this.props.bodilyInjuries,
                description: "Bodily Injuries"
            },
            {
                header: this.props.witnesses,
                description: "Witnesses"
            },
            {
                header: tempPoliceReport,
                description: "Police Report Available"
            }
        ]

        return <Card.Group items={items} />
    }

    onApprove = async () => {
        const insurance = Insurance(this.props.address);
        const accounts = await web3.eth.getAccounts();
        let totalClaimAmount = parseFloat(this.props.injuryClaim) + parseFloat(this.props.propertyClaim) + parseFloat(this.props.vehicleClaim);

        this.setState({ loadingFlag1: true });

        try {
            await insurance.methods.approveClaim(this.props.id)
                .send({ from: accounts[0], value: web3.utils.toWei( (parseFloat(totalClaimAmount)/322.28).toString(), "ether") });

        } catch(err) {
            this.setState({ loadingFlag1: false });
        }

        this.setState({ loadingFlag1: false });
        Router.replaceRoute(`/insurance/${this.props.address}/claims`);
    }

    onDeny = async () => {
        const insurance = Insurance(this.props.address);
        const accounts = await web3.eth.getAccounts();
        
        this.setState({ loadingFlag2: true });

        try {
            await insurance.methods.denyClaim(this.props.id)
                .send({ from: accounts[0] });
        } catch(err) {
            this.setState({ loadingFlag2: false });
        }

        this.setState({ loadingFlag2: false });
        Router.replaceRoute(`/insurance/${this.props.address}/claims`);
    }

    render() {
        let claimState;

        if(this.props.complete && this.props.claimDecision) {
            claimState = "Claim Approved!";
        } else if(this.props.complete && !this.props.claimDecision) {
            claimState = "Claim Denied!";
        }

        return(
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <h3>Claim ID: {this.props.id}</h3>
                        </Grid.Column>
                        <Grid.Column width={3} textAlign="right">
                            <Link route={`/insurance/${this.props.address}/claims`}>
                                <a>
                                    <Button secondary>Back</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {this.renderClaimDetailCards()}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={2}>
                            {this.props.complete ? null : (
                                <Button basic color="green" onClick={this.onApprove} loading={this.state.loadingFlag1}>Approve</Button>
                            )}
                        </Grid.Column>
                        <Grid.Column width={2}>
                            {this.props.complete ? null : (
                                <Button basic color="red" onClick={this.onDeny} loading={this.state.loadingFlag2}>Deny</Button>
                            )}
                        </Grid.Column>
                        <Grid.Column width={10}></Grid.Column>
                        <Grid.Column width={2} textAlign="right">
                            {!this.props.complete ? null : (
                                <h4>{claimState}</h4>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>{this.state.likelihood}</Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default ClaimAnalysis;