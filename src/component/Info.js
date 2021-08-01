import React, { useState ,useEffect} from 'react';
import {Card,CardContent,Typography } from '@material-ui/core';
export const Info = ({title,total,todaycases,isred,active,...props}) => {
    // const [total, setTotal] = useState('')
    // const fetchdata=async()=>{
    //     const res=await fetch("https://disease.sh/v3/covid-19/all");
    //     const data=await res.json();
    //     console.log("data",data)
    // }
    // useEffect(() => {
    //    fetchdata()
    // }, [])
    return (
        
        <Card className={`infoBox ${isred && `infoBox--red`} ${active && `infoBox--selected`}`} onClick={props.onClick}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isred && `infoBox__cases--green`}`}>
          {todaycases}
        </h2>
          <Typography className="infoBox__total" color="textSecondary">
          {total} Total
          </Typography>
        </CardContent>
    </Card>
    )
}
