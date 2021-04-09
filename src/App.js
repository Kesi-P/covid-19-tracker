import React, { Component } from 'react'
import {Cards,Chart,CountryPicker} from './Components'
import Style from './App.module.css'
import {fetchData} from './api'

export default class App extends Component {
    state ={
        data: {},
        country: ''
    }

    async componentDidMount(){
        const fatcheDdata= await fetchData()
        this.setState({data:fatcheDdata});
    }

    handleCountryChange = async (country) => {
        //fetch the data
        //set the state
        const fetchedData = await fetchData(country)
        this.setState({data:fetchedData, country: country});
        
    }
    render() {
        const { data, country } = this.state
        return (
            <div className={Style.container}>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                
            </div>
        )
    }
}
