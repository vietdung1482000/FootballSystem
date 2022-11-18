import React, { useState } from 'react'
import HoverRating from '../HoverRating';
import location from '../../img/icon/location.svg'
import { db } from "../../firebase"

export default function SuggestionFootball(props) {


    const handleBook = () => {

    }

    return (
        <div className="components__suggestionFootball d-flex align-items-end ">
            <div className='information '>
                <div className='title'>
                    <p className='bases__padding--top10'>{props.detail.tensan}</p>
                    <HoverRating value={props.detail.rate} />
                    <div className='bases__font--14 bases__text--normal bases__padding--vertical10'> <img src={location} alt="" className='bases__filter--white' />&ensp; {props.detail.location}</div>
                </div>
                <button onClick={handleBook} className="button">Book</button>
            </div>
        </div>
    );
}
