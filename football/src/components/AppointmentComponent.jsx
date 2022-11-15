import React from 'react'
import { AppointmentContainer } from '../StyledComponent/index'

function AppointmentComponent(props) {
    return (
        <AppointmentContainer>
            {props.Name} - {props.Time} {(props.Time) > 12 ? 'PM' : 'AM'} - {props.NameField}
        </AppointmentContainer>
    )
}

export default AppointmentComponent