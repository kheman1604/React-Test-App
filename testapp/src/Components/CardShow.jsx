import React, { useState,useEffect} from "react";
import {Container,Row,Col,Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Loader from "./Loader";

function CardShow() {

    var [jsonAry, fillJsonArray] = useState([]);
    var [loader,setLoader]=useState(false);
    
    useEffect(()=>{

      async function DoFecthData()
      {
        var url="api/react/fetchAll";
        var response=await axios.post(url);
        fillJsonArray(response.data);
        setLoader(true);
      }
     
      
      DoFecthData();
    },[])

    function EditUser(curruid)
    {
      window.location.href="/Edit-User/"+curruid
    }
 return (
    <>
    <center>
      {loader ? <Container>
        <Row>
        {jsonAry.map((obj,index) => {
              return (
                <Col md={3} key={obj.uid}>
                  <Card>
                    <Card.Body>
                      <Card.Img src={`uploads/${obj.picname}`}></Card.Img>
                      <Card.Title>{obj.uid}</Card.Title>
                      <Card.Text>
                      Contact : {obj.mob}
                      </Card.Text>
                      <input type="button" onClick={()=>{EditUser(obj.uid)}} value="Edit User Details"></input>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container> : <Loader></Loader> }
      
    </center>
    </>
  );
}

export default CardShow;
