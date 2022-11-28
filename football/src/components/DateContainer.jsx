import { connect } from "react-redux"
import _ from 'lodash'

import Appointment from './AppointmentComponent';
import { DateDataContainer, DateContainer, DateApointmentContainer } from '../StyledComponent/index';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function DateComponent(props) {
    const [data, setData] = useState([])
    const getData = () => {
        const getdataDatSan = collection(db, "datsan");
        getDocs(getdataDatSan)
            .then((response) => {
                const chitiet = response.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }));
                setData(chitiet);
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        getData();
    }, []);

    // console.log(data)

    const appointment = data.map((data) =>{
        <Appointment Name={data.data.name} Time={data.data.Time} />
    });

    // const appointment = _.orderBy(props.userData, ['time'], ['asc']).map((data) => <Appointment Name={data.data.Name} Time={data.data.Time} />);
    return (
        <DateDataContainer>
            <DateContainer>
                {props.date}
            </DateContainer>
            <DateApointmentContainer>
                {appointment}
            </DateApointmentContainer>
        </DateDataContainer>
    )
}
const mapStateToProps = (state, ownProps) => {
    var date = ownProps.date + '-' + ownProps.month + '-' + ownProps.year
    var userData = state.appointment.filter((data) => data.date === date)
    return {
        userData: userData
    }
}

export default connect(mapStateToProps)(DateComponent)