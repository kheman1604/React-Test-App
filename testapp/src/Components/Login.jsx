import React,{useState} from 'react';
import axios from "axios";

function Login() {

    var [userObj, setUserObj] = useState({
        uid: "Enter Uid",
        pwd: "Enter Password",
        mob: "Enter Mobile",
        file: null
      });
    var [responseMsg,setResponse]=useState("*");


      function doUpdate(event)
      {
        var { name, value } = event.target;

        setUserObj({
          ...userObj,
          [name]: value,
        });
      }

      function dofileSave(event)
      {
        setUserObj({...userObj,["file"]:event.target.files[0]});
      }

      async function doSave(event)
      {

          event.preventDefault();
          var url =
          "api/react/save?uid=" +
          userObj.uid +
          "&pwd=" +
          userObj.pwd +
          "&mob=" +
          userObj.mob;

          var response = await axios.get(url, userObj);
          await alert(JSON.stringify(response.data));
          setResponse(response.data.msg);
      }

      async function doSavePost() {
        var url = "api/react/save-post";
        var response = await axios.post(url, userObj);
        await alert(JSON.stringify(response.data));
        setResponse(response.data.msg);
      }

      async function doUpdatePost() {
        var url = "api/react/update-post";
        var response = await axios.post(url, userObj);
        alert(JSON.stringify(response.data));
        setResponse(response.data.msg);
      }
      async function doDelete() {
        var url = "api/react/delete";
        var response = await axios.post(url, userObj);
        await alert(JSON.stringify(response.data));
        setResponse(response.data.msg);
      }

      async function doFetcOne()
        {
          var url="api/react/fetch";
          var response=await axios.post(url,userObj);
          if(response.data.length==0)
              {
                setResponse("empty");
                  return;
              }
          setResponse(JSON.stringify(response.data[0]));
          var {uid,pwd,mob}=response.data[0];
          setUserObj({"uid":uid,"pwd":pwd,"mob":mob});
        }

        async function doFetchAll()
        {
          window.location.href="/Card-Show";
        }

        async function doSavePostImage()
        {
          var url="api/react/save-with-img";
          // Appending the Data into Form-Data Object 

          // Its Necessary to Send Data As Form-Data to Send the Image Data to Server
          var fd=new FormData();
          for ( var key in userObj) {
            fd.append(key, userObj[key]);
          }
          var response = await axios.post(url, fd,{ headers: {
            'Content-Type': 'multipart/form-data'
          }});
          await alert(JSON.stringify(response.data));
          setResponse(response.data.msg);

        }


    return (
        <div>
            <center>
            <form method="POST" onSubmit={doSave} encType="multipart/form-data">
                <label>Uid: </label>
                <input type="text" name="uid" value={userObj.uid} onChange={doUpdate}></input> 
                <input type="button" value="Fetch" onClick={doFetcOne}></input>
                <br></br> 
                <label >Password: </label>
                <input type="text" name="pwd" value={userObj.pwd} onChange={doUpdate}></input> 
                <br></br>
                <label>Mobile: </label>
                <input type="text" name="mob" value={userObj.mob} onChange={doUpdate}></input> 
                <br></br>
                <br></br>
                <input type="file" name="ppic" onChange={dofileSave}></input>
                <br></br>
                <br></br>
                <input type="submit" value="Save (Sumbit) "></input> 
                <input type="button" value="Save Record (POST)" onClick={doSavePost}></input>
                <input type="button" value="Delete Record" onClick={doDelete}></input>
                <input type="button" value="Update Record" onClick={doUpdatePost}></input>
                <input type="button" value="Fetch All Records" onClick={doFetchAll}></input>
                <input type="button" value="Fetch All Records" onClick={doFetchAll}></input>
                <input type="button" value="Save Record with Image(POST)" onClick={doSavePostImage}></input>
            </form>
            <center>
              <p>
                {responseMsg}
              </p>
            </center>
        </center>
        </div>
    )
}

export default Login;
