import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Insurance from "../../../ethereum/insurance";
import ClaimRow from "../../../components/ClaimRow";

class ClaimIndex extends Component {
    static async getIntialProps(props) {
        const { address } = props.query;
        const insurance = Insurance(address);
        const claimsCount = await insurance.methods.getClaimsCount().call();

        const claimsArray =  await Promise.all(
            Array(parseInt(claimsCount)).fill().map((element, index) => {
                return insurance.methods.claimsArray(index).call();
            })
        );


        return { address, claimsCount, claimsArray };
    }

    renderRows() {
        return this.props.claimsArray.map((claim, index) => {
            return(
                <ClaimRow
                    key={index}
                    id={index}
                    claim={claim}
                    address={this.props.address}
                    claimsCount={this.props.address}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3>Claims</h3>
                <Link route={`/insurance/${this.props.address}/claims/new`}>
                    <a>
                        <Button primary>New Claim</Button>
                    </a>
                </Link>
                <Link route={`/insurance/${this.props.address}/`}>
                    <a>
                        <Button secondary>Back</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Claim ID</HeaderCell>
                            <HeaderCell>Injury Claim</HeaderCell>
                            <HeaderCell>Property Claim</HeaderCell>
                            <HeaderCell>Vehicle Claim</HeaderCell>
                            <HeaderCell>Total Claim</HeaderCell>
                            <HeaderCell>Claim Details</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {/* {this.renderRows()} */}
                    </Body>
                </Table>
                <h5>Found {this.props.claimsCount} claims!</h5>
            </Layout>
        );
    }
}

export default ClaimIndex;