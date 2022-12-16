import React, { useState } from 'react'
import HoverRating from '../HoverRating';
import location from '../../img/icon/location.svg'
import { Link } from 'react-router-dom';


export default function SuggestionFootball(props) {
    const { detail } = props

    return (
        <div className="components__suggestionFootball d-flex align-items-end " style={{ backgroundImage: `url(${detail.data.imageURL})` }}>
            <div className='information '>
                <div className='title'>
                    <p className='bases__padding--top10'>{detail.data.nameField}</p>
                    <HoverRating value={parseInt(detail.data.rate)} />
                    <div className='bases__font--14 bases__height--100 bases__text--normal bases__padding--vertical10'> <img src={location} alt="" className='bases__filter--white' />&ensp;  {detail.data.address}</div>
                </div>

                <Link to={`/detail/${detail.id}`}>
                    <button className="button">Đặt sân</button>
                </Link>
            </div>
        </div>
    );
}
