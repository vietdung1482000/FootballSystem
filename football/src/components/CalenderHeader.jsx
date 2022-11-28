import React from 'react'
import Dropdown from 'react-dropdown'
import {
  CalenderHeaderContainer,
  DropdownContainer,
  AppointmentButton,
  MatchButton,
  GroupBtn
} from '../StyledComponent/index'
import { yearOptions, monthOptions } from '../constant/index'


function CalenderHeader(props) {

  const onYearSelect = (date) => {
    props.onYearSelect(date)
  }

  const onMonthSelect = (date) => {
    props.onMonthSelect(date)
  }

  const openModal = () => {
    props.openModal()
  }

  const openModalMatch = () => {
    props.openMatchModal()
  }

  return (
    <CalenderHeaderContainer>
      <DropdownContainer>
        <div className='dropdownYear'>
          <Dropdown
            options={yearOptions}
            onChange={onYearSelect}
            value={props.defaultYear}
          />
        </div>

        <div className='dropdownMonth'>
          <Dropdown
            options={monthOptions}
            onChange={onMonthSelect}
            value={props.defaultMonth}
          />
        </div>
      </DropdownContainer>
      <GroupBtn>
        <AppointmentButton onClick={openModal}>Create Appointment</AppointmentButton>
        <MatchButton onClick={openModalMatch}>Match</MatchButton>
      </GroupBtn>
    </CalenderHeaderContainer>
  )
}

export default CalenderHeader