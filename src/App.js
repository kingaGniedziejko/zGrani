import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

//react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//custom style
import "./resources/styles/style.css"

import Header from "./views/layout/header/Header";
import Content from "./views/Content";
import Footer from "./views/layout/Footer";
import ScrollToTop from "./views/layout/ScrollToTop";

class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <ScrollToTop/>
                <Header/>
                <Content/>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default App;
