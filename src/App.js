import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";


//react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//custom style
import "./resources/styles/style.css"

import Header from "./views/header/Header";
import Content from "./viewmodels/Content";
import Footer from "./views/Footer";
import ScrollToTop from "./views/ScrollToTop";

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
