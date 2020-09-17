import React, { Component } from 'react';

class Home extends Component{
    render() {
        return (
            <div className={"home"}>
                <div className={"section photo-section d-flex justify-content-center align-items-center"}>
                    <div className={"section-content "}>
                        Sekcja 1
                    </div>
                </div>
                <div className={"section section-light"}>
                    Sekcja 2
                </div>
            </div>
        );
    }
}

export default Home;