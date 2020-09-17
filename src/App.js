import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/style.css"

import Header from "./components/layouts/Header";
import Content from "./components/layouts/Content";
import Footer from "./components/layouts/Footer";

class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Content/>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default App;
