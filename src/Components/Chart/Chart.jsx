import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import Styles from './Chart.module.css';

const Chart = ({ data: {confirmed, deaths, recovered }, country }) => {
    //useState as array
    const [dailyData, setDailyData] = useState([]);
    //same as
    // state={
    //     dailyData:{}
    // }
    useEffect(() => {
        const fetchAPI = async () => {
            //pass a data into setDailyData, dailyData also will be updated
            setDailyData(await fetchDailyData());
        }
       
        fetchAPI()
    },[]);
    
    const lineChart = (
        //or dailyData.length
        dailyData[0] ?
        (<Line data = {{ 
            labels:dailyData.map(( { date }) => date),
            datasets: [{
                data: dailyData.map(( { confirmed }) => confirmed),
                labels: ' Infected',
                borderColor:'#3333ff',
                fill: true
         },{
            data: dailyData.map(( { deaths }) => deaths),
            labels: ' Deaths',
            borderColor:'red',
            backgroundColor:'rgba(255,0,0,0.5)',
            fill: true
         }] 
        }} />)
        : null
    )

    const barChart =(
        confirmed ?
        (<Bar
            data = {{
                labels:['Infected', 'Recovered', 'Deaths'],
                datasets:[{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'green',
                        'red'
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options = {{
                legend: {display: false},
                title: {display: true, text: `Current state is ${country}`}
            }}    
        />)
        : null
    )
    return (
        <div className={Styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;