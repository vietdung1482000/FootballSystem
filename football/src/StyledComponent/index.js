import styled from "styled-components";

export const DateDataContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const DateContainer = styled.div`
    text-align: center;
    width: 100%;
    color: #000;
    background: #89cff0;
    font-size: 12px;
`

export const DateApointmentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    margin: 15px;
`

export const CalendarContainerBody = styled.div`
    color: blue;
    margin-top: 5px;
`

export const CalenderWeekContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 50px;
`

export const CalenderWeekDayContainer = styled.div`
  margin: 1px;
  border: 1px solid gray;
  text-align: center;
  height: 25px;
  color: #000;
`

export const CalenderDateContainer = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`
export const CalenderDateDayContainerDisable = styled.div`
  margin: 1px;
  text-align: center;
  height: 80px;
`
export const CalenderDateDayContainerActive = styled.div`
  margin: 1px;
  border: 1px solid gray;
  text-align: center;
  height: 80px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

export const ModalHeader = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`

export const ModalBody = styled.div`
  width: 100%;
`

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 25px 0px;
  height: 30px;
  align-items: center;
`

export const InputSpan = styled.div`
  width: 30%;
`

export const InputField = styled.input`
  width: 70%;
  height: 25px;
  border-radius: 5px;
  &:focus {
    border: 3px solid #89cff0;
    outline: none;
  }
`

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

export const ModalSubmit = styled.button`
  width: 40%;
  height: 40px;
  background: #228c22;
  color: #fff;

  &:hover {
    background: #119468;
  }
`

export const ModalCancel = styled.button`
  width: 40%;
  height: 40px;
  background: red;
  color: #fff;

  &:hover {
    background: #d63031;
  }
`

export const AppointmentContainer = styled.div`
  width: 100%;
  color: #fff;
  background: #000080;
  height: 25px;
  margin-bottom: 3px;
`

export const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        padding: '10px',
        border: "1px solid #000"
    },
};


export const CalenderHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

export const DropdownContainer = styled.div`
    display: flex;
    color: #000;
    cursor: pointer;
    .dropdownYear {
      background-color: #fff;
      position: fixed;
      padding: 10px;
      border: 1px solid black;
    }
    .dropdownMonth {
      position: fixed;
      left: 50px;
      padding: 10px;
      border: 1px solid black;
      margin-left: 20px;
    }
`

export const AppointmentButton = styled.button`
    border: 1px solid black;
    background: #228c22;
    color: #fff;
    height: 30px;

`

export const MatchButton = styled.button`
    border: 1px solid black;
    background: #228c22;
    color: #fff;
    margin-left: 15px;
    height: 30px;
`

export const GroupBtn = styled.div`

`