import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { Map } from './styled'

export default function ModalMap() {
  const { business_id } = useParams();
  const [data, setData] = useState([])
  const getData = () => {
    const getdataDatSan = collection(db, "Map");
    getDocs(getdataDatSan)
      .then((response) => {
        const chitiet = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setData(chitiet)
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Map>
      {
        data.map((item) => {
          if (business_id === item.data.sanId) {
            console.log("aa", business_id === item.data.sanId)
            return (
              <iframe src={item.data.src} width="70%" height={450} style={{ border: 0, marginLeft:"200px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            )
          }
        })
      }

    </Map>
  )
}
