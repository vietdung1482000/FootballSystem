import React, {useState} from 'react'
import Dropdown from 'react-dropdown'
import {
  CalenderHeaderContainer,
  DropdownContainer,
  AppointmentButton,
  MatchButton,
  GroupBtn
} from '../StyledComponent/index'

import { yearOptions, monthOptions } from '../constant/index'
import MatchModal from './MatchModal'
import FormModal from './FormModal'


function CalenderHeader(props) {
  // const [modalIsOpen, setIsOpen] = useState(false);

  // function openModalMatch() {
  //   setIsOpen(true);
  // }

  // function closeModalMatch() {
  //   setIsOpen(false);
  // }

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
        <AppointmentButton> <FormModal/></AppointmentButton>
        <MatchButton ><MatchModal/></MatchButton>
      </GroupBtn>
    </CalenderHeaderContainer>
  )
}

export default CalenderHeader