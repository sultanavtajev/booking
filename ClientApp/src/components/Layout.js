import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { FooterMenu } from './FooterMenu';
import './css/Layout.css';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="hoved">
                <NavMenu />
                <div className="flex-grow-container">
                    {this.props.children}
                </div>
                <FooterMenu />
            </div>
        );
    }
}
