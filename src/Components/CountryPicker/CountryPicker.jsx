import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import Styles from './CountryPicker.module.css'
import { countries } from '../../api'


const CountryPicker =({ handleCountryChange }) => {
    //useState asarray cua countries will be an array
    const [fetchedcountries, setfetchedcountries] = useState([]);
    
    useEffect(() => {
        async function fetchAPI() {
            setfetchedcountries(await countries());
        }
        fetchAPI();
        // the effectFunction will be called when the component initializes, and also every time the setcountries variable changes.
    },[setfetchedcountries])
   // console.log(fetchedcountries)
    return (
        <FormControl className={Styles.container}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value=''>Global</option>
                {fetchedcountries.map((country, index) => <option value={country} key={index}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;