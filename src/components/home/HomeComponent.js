import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Service from '../../service/spotifyAPI';
import Constants from '../../utils/constants';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var redirrect_url = Constants.REDIRRECT_URL;
        const result = Service.authenticate(redirrect_url);
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Spotify Search </h1>
                                <p> Spotify is a digital music, podcast, and video streaming service that gives you access to millions of songs and other content from artists all over the world.</p>
                                <Button color="primary" onClick={this.handleClick}>Authenticate with Spotify</Button>{' '}
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;