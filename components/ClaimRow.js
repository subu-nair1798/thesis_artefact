import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "../routes";

class ClaimRow extends Component {
    render() {
        const { Row, Cell } = Table;
        const { id, claim, address } = this.props;
        const totalClaim = parseFloat(claim.injury_claim) + parseFloat(claim.property_claim) + parseFloat(claim.vehicle_claim);
        return(
            <Row negative={claim.complete && !claim.claim_decision} positive={claim.complete && claim.claim_decision}>
                <Cell>{id}</Cell>
                <Cell>{claim.injury_claim}</Cell>
                <Cell>{claim.property_claim}</Cell>
                <Cell>{claim.vehicle_claim}</Cell>
                <Cell>{totalClaim}</Cell>
                <Cell>
                    <Link route={`/insurance/${address}/claims/${id}/claimAnalysis`}>
                        <a>
                            <Button>View</Button>
                        </a>
                    </Link>
                </Cell>
            </Row>
        );
    }
}

export default ClaimRow;