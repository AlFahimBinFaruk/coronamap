import React from 'react'
import numeral from "numeral";
export const Table = ({data}) => {
    //console.log("all is",data)
    return (
        <div className="table">
            {data && data.map((data,index)=>{
                const {cases,country}=data;
                return (
                    <tr key={index}>
               
                <td>{country}</td>
                <td><strong>{numeral(cases).format("000,000")}</strong></td>
                </tr>
                )
            })}
            
        </div>
    )
}
