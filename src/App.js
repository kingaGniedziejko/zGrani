import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";


//react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//custom style
import "./styles/style.css"

import Header from "./views/layouts/Header";
import Content from "./views/layouts/Content";
import Footer from "./views/layouts/Footer";

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
