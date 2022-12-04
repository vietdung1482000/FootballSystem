import React, { useEffect, useState } from 'react'
import { AppointmentContainer } from '../StyledComponent/index'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";

function AppointmentComponent(props) {
    // const [data, setData] = useState([])
    // const getData = () => {
    //     const getdataDatSan = collection(db, "datsan");
    //     getDocs(getdataDatSan)
    //         .then((response) => {
    //             const chitiet = response.docs.map((doc) => ({
    //                 data: doc.data(),
    //                 id: doc.id,
    //             }));
    //             console.log(chitiet);
    //         })
    //         .catch((error) => console.log(error.message));
    // };

    // useEffect(() => {
    //     getData();
    // }, []);
    return (
        <AppointmentContainer>
            {props.Name} - {props.Time} {(props.Time) > 12 ? 'PM' : 'AM'} - {props.NameField}
        </AppointmentContainer>
    )
}

export default AppointmentComponent