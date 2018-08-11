import React, { Component } from 'react';
import Search from '../components/search/SearchComponent';
import Home from '../components/home/HomeComponent';
import Header from '../components/header/HeaderComponent';
import Footer from '../components/footer/FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/search" component={Search} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);
