import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class InsuranceIndex extends Component {
    static async getInitialProps() {
        const insuranceContracts = await factory.methods.getDeployedInsurance().call();

        return { insuranceContracts };
    }

    renderInsurance() {
        const items = this.props.insuranceContracts.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/insurance/${address}`}>
                        <a>View Insurance Contract</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return(
            <Layout>
                <div>
                    <h3>Active Insurance Contracts</h3>

                    <Link route="/insurance/new">
                        <a>
                            <Button
                                floated="right"
                                content="New Contract"
                                icon="add circle"
                                primary
                            />
                        </a>
                    </Link>

                    {this.renderInsurance()}
                </div>
            </Layout>
        );
    }
}

export default InsuranceIndex;