import React, { useEffect, useState } from 'react'
import { AppointmentContainer } from '../StyledComponent/index'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";

function AppointmentComponent(props) {
    const [item, setItem] = useState([])

    useEffect(()=> {
        const getItemFromFirebase = [];
        // const subItem = db.collection("datsan").onSnap
    })
    return (
        <AppointmentContainer>
            {props.Name} - {props.Time} {(props.Time) > 12 ? 'PM' : 'AM'} - {props.NameField}
        </AppointmentContainer>
    )
}

export default AppointmentComponent