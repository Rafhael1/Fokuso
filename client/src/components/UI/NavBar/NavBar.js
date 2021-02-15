import React, { Component } from 'react';

import Quotes from '../../Quotes/Quotes'

export default class NavBar extends Component {
    render() {
        return (
            <header>
                <nav>
                    <h1>WorkSpace</h1>
                    <Quotes />
                </nav>
            </header>
        )
    }
}
