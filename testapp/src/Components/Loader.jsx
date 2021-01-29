import React from 'react';
import {Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Loader() {

    var loadercont={
        width:"100%",
        minHeight:"100vh"
    }

    var loader={
        width:"100px",
        height:"100px",
        position:"fixed",
        left:"50%",
        top:"50%",
        transform:`translate("-50%","-50%")`
    }
    return (
        <div style={loadercont}>
            <div id="Spinner" style={loader}>
               <Spinner animation="border"/>
            </div>
        </div>
    )
}

export default Loader
