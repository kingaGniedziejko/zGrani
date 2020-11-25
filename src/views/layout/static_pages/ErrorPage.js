import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorPage(){
    return (
        <div className={"d-flex flex-column align-items-center justify-content-center"} style={{height: "80vh"}}>
            <h1 className={"mt-5 mb-2"} style={{fontSize: "5rem"}}>404</h1>
            <h4 className={"mb-5"}>Nie znaleziono strony</h4>
            <Link to={"/"} className="">
                <Button className={"px-3"} variant="outline-accent" size="sm">Powrót do strony głównej</Button>
            </Link>
        </div>
    );
}

export default ErrorPage;