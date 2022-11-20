import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { db } from '../../firebase'
import { collection, getDocs, } from 'firebase/firestore';
import HoverRating from '../../components/HoverRating';
import location from '../../img/icon/location.svg'
import { Link } from 'react-router-dom';

export default function Football() {
  const [data, setData] = useState([]);

  const getData = () => {
    const getFootBallData = collection(db, 'business')
    getDocs(getFootBallData)
      .then(response => {
        const datsans = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setData(datsans)
      })
      .catch(error => console.log(error.message))
  }
  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <div className="_home">
        <div className="_title">
          <div className="components__item-banner mx-auto" style={{ backgroundImage: 'url(https://seoulecohome.com.vn/wp-content/uploads/kich-thuoc-san-bong-5-nguoi_1641288174.jpg)' }}>
            <h1> FOOTBALL</h1>
          </div>
          <h2 className="components__item-footballtitle">FOOTBALL ỀN TẢNG ĐẶT SÂN - TÌM ĐỐI THỦ</h2>
        </div>
      </div>

      <div className='bases__margin--left50 row'>
        {data.map((foootball, index) => {
          return (

            <div className="components__item-container bases__margin--left80 bases__margin--bottom80 col-3" key={index} >
              <img src={foootball.data.img} alt="" className='img-poster' />
              <div className='information d-grid justify-content-center'>
                <div className='title'>
                  <span className='bases__margin--top10'>{foootball.data.nameField}</span>
                </div>
                <span className='bases__text--bold' >Giá:  <span className='bases__text--red bases__text--bold'>&ensp; {foootball.data.price}</span> </span>
                <span className='bases__text--bold' >Phụ Giá: <span className='bases__text--red bases__text--bold'>&ensp;  {foootball.data.extra_price} </span> </span>
                <HoverRating value={foootball.data.rate} />
                <div className='bases__font--14 bases__text--normal bases__padding--vertical10'> <img src={location} alt="" />&ensp; {foootball.data.address}</div>
                <Link to={`/detail/${foootball.id}`}>
                  <button className="button">Book</button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
