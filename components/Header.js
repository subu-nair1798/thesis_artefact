import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
    return(
        <Menu style={{ marginTop: "15px" }}>
            <Link route="/">
                <a className="item">Auto Care</a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Insurance Contracts</a>
                </Link>
                <Link route="/insurance/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}