import React, { useState ,useEffect} from 'react';
import './App.css';
import { FormControl, MenuItem,Select,Card,CardContent } from '@material-ui/core';
import {Info} from './component/Info'
import {Table} from './component/Table'
import {Sortdata} from './component/utils'
import Map from './component/Map'
import LineGraph from './component/Linegraph'
import "leaflet/dist/leaflet.css";
import {prettyPrintStat} from './component/utils'
function App() {
  const [countries, setCountries] = useState('');
  const [country, setCountry] = useState("worldwide")
  const [casestype, setCasestype] = useState("cases")
  const [total, setTotal] = useState('');
  const [all, setAll] = useState('')
  const [allcountries, setAllcountries] = useState('')
  const [position, setPosition] = useState([34.80746,  -40.4796])
  const [zoom, setZoom] = useState(3)
  const fetchdata=async()=>{
    const res=await fetch("https://disease.sh/v3/covid-19/countries");
    const data=await res.json();
    const countries=data.map((data)=>({
      
        country:data.country,
        countryInfo:data.countryInfo.iso2,
      
      
    }))
    setAllcountries(data)
    setCountries(countries);
    setAll(Sortdata(data))
    //console.log("data",data)
  }
  const handlechange=async(e)=>{
   // console.log(e.target.value)
    setCountry(e.target.value)
    const cinfo=e.target.value;
    const url=cinfo==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${cinfo}`
    //console.log("url",url)
    const res=await fetch(url);
    const data=await res.json();
    setTotal(data);
    if(cinfo==="worldwide"){
       setPosition([34.80746,  -40.4796]);
       setZoom(4)
    }else{
      setPosition([data.countryInfo.lat,data.countryInfo.long])
      setZoom(4)
    }
    
  }
  
  const defaultdata=async ()=>{
    const url="https://disease.sh/v3/covid-19/all"
    //console.log("url",url)
    const res=await fetch(url);
    const data=await res.json();
    setTotal(data);
    //console.log("data is",data)
  }
  //console.log("new data is",total)
  useEffect(() => {
   fetchdata()
   defaultdata()
  }, [])
  return (
    <div className="cont">
    <div className="app left">
      <div className="formcont">
      <h1>Covid-19 Tracker</h1>
  <FormControl className="app_dropdown">
  <Select variant="outlined" value={country} onChange={handlechange}>
  <MenuItem value="worldwide">worldwide</MenuItem>
  {countries && countries.map((data,index)=>{
    return (
      <MenuItem value={data.countryInfo} key={index}>{data.country}</MenuItem>
    )
  })}
    
   
  </Select>
  </FormControl>
  
  </div>
  <div className="infocont">

  <Info title={"corona cases"} isred active={casestype==="cases"} onClick={()=>setCasestype('cases')} total={prettyPrintStat(total.cases)} todaycases={prettyPrintStat(total.todayCases)} />
  <Info title={"Death"}  isred active={casestype==="deaths"} total={prettyPrintStat(total.deaths)} todaycases={prettyPrintStat(total.todayDeaths)} onClick={()=>setCasestype('deaths')}/>
  <Info title={"recovered"} active={casestype==="recovered"} total={prettyPrintStat(total.recovered)} todaycases={prettyPrintStat(total.todayRecovered)} onClick={()=>setCasestype('recovered')}/>
  </div>
  <Map countries={allcountries} casesType={casestype} center={position} zoom={zoom}/>
  </div>
  <div className="cardright">
  <Card className="infocard ">
    <h2>List of countres</h2>
    <Table data={all}/>
    <h3 className="cases">worldwide new {casestype}</h3>
    <LineGraph isgreen={casestype==="recovered"} className="app__graph" casesType={casestype}/>
  </Card>
  </div>
  </div>
  );
}

export default App;
