import React from 'react'

function Test() {
    var jsonary=["Kheman","Jain","Harsh","Gupta"];
    return (
        <div>
            <div>
            <select>    
            {
                jsonary.map((obj)=>{
                    return(
                        <option value={obj}>{obj}</option>
                    )
                })
            } 
            </select>   
        </div>     
    </div>
    )
}

export default Test
