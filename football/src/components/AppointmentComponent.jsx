import React from 'react'
import { AppointmentContainer } from '../StyledComponent/index'

function AppointmentComponent(props) {
    return (
        <AppointmentContainer>
            {props.Name} - Time: {props.Time}: 00
        </AppointmentContainer>
    )
}

export default AppointmentComponent