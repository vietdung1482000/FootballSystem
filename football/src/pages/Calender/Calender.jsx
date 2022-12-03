import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import $ from 'jquery';

import CalenderHeader from '../../components/CalenderHeader'
import DateComponent from '../../components/DateContainer'
import * as actionCreators from '../../store/action/index'
import FormModal from '../../components/FormModal'
import { CalenderDateDayContainerActive, CalenderDateDayContainerDisable, CalenderDateContainer, CalenderWeekDayContainer, CalenderWeekContainer, CalendarContainerBody, CalendarContainer } from '../../StyledComponent/index'

import { weekArray, gridArray } from '../../constant/index'
import { useParams } from "react-router-dom"
import MatchModal from '../../components/MatchModal';
import { Box } from '@mui/material';

function Calender() {

    const dispatch = useDispatch()

    const { year, month } = useParams();

    const [selectedYear, setSelectedYear] = useState(2022);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [modalState, setModalState] = useState(false);
    const [matchModal, setMatchModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [datetest, setDatetest] = useState(new Date());

    const { addAppointment } = bindActionCreators(actionCreators, dispatch)

    const startOfDay = moment().year(selectedYear).month(selectedMonth).startOf("month").format('ddd');
    const monthSize = parseInt(moment().year(selectedYear).month(selectedMonth).endOf("month").format('DD'));

    const startIndex = weekArray.indexOf(startOfDay)
    const endIndex = startIndex + monthSize;

    useEffect(() => {
        const defaultYear = year || moment().format('YYYY')
        const defaultMonth = month || moment().format('MM')

        setSelectedYear(parseInt(defaultYear))
        setSelectedMonth(parseInt(defaultMonth) - 1)
    }, [year, month])

    useEffect(() => {
        if (closeModal) {
            setModalState(false)
        }
    }, [closeModal])

    const onChangeModal = (value) => {
        setCloseModal(value)
    }

    const onYearSelect = (year) => {
        const { value } = year
        setSelectedYear(parseInt(value))
    }

    const onMonthSelect = (month) => {
        const { value } = month
        setSelectedMonth(parseInt(value - 1))
    }

    const openModal = () => {
        setModalState(!modalState)
    }

    const openModalMatch = () => {
        setMatchModal(!matchModal)
    }

    const onModalSubmit = data => {
        const date = data.Date + '-' + (selectedMonth + 1) + '-' + selectedYear
        const dataByDate = {
            date,
            time: data.Time,
            data: data
        }
        addAppointment(dataByDate)
    };


    $(function ($) {
        function SchedulePlan(element) {
            this.element = element;
            this.timeline = this.element.find('.timeline');
            this.timelineItems = this.timeline.find('li');
            this.timelineItemsNumber = this.timelineItems.length;
            this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
            //need to store delta (in our case half hour) timestamp
            this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

            this.eventsWrapper = this.element.find('.events');
            this.eventsGroup = this.eventsWrapper.find('.events-group');
            this.singleEvents = this.eventsGroup.find('.single-event');
            this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

            this.animating = false;

            this.initSchedule();
        }

        SchedulePlan.prototype.initSchedule = function () {
            this.scheduleReset();
            this.initEvents();
        };

        SchedulePlan.prototype.scheduleReset = function () {
            const mq = this.mq();
            if (mq == 'desktop' && !this.element.hasClass('js-full')) {
                //in this case you are on a desktop version (first load or resize from mobile)
                this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
                this.element.addClass('js-full');
                this.placeEvents();
                this.element.hasClass('modal-is-open') && this.checkEventModal();
            } else if (mq == 'mobile' && this.element.hasClass('js-full')) {
                //in this case you are on a mobile version (first load or resize from desktop)
                this.element.removeClass('js-full loading');
                this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
                this.eventsWrapper.children('.grid-line').remove();
                this.element.hasClass('modal-is-open') && this.checkEventModal();
            } else if (mq == 'desktop' && this.element.hasClass('modal-is-open')) {
                //on a mobile version with modal open - need to resize/move modal window
                this.checkEventModal('desktop');
                this.element.removeClass('loading');
            } else {
                this.element.removeClass('loading');
            }
        };

        SchedulePlan.prototype.placeEvents = function () {
            const self = this;
            this.singleEvents.each(function () {
                const start = getScheduleTimestamp($(this).attr('data-start')),
                    duration = getScheduleTimestamp($(this).attr('data-end')) - start;

                const eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
                    eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;

                $(this).css({
                    top: (eventTop - 1) + 'px',
                    height: (eventHeight + 1) + 'px'
                });
            });

            this.element.removeClass('loading');
        };

        SchedulePlan.prototype.mq = function () {
            const self = this;
            return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
        };

        const schedules = $('.cd-schedule');
        const objSchedulesPlan = [],
            windowResize = false;

        if (schedules.length > 0) {
            schedules.each(function () {
                //create SchedulePlan objects
                objSchedulesPlan.push(new SchedulePlan($(this)));
            });
        }

        function getScheduleTimestamp(time) {
            //accepts hh:mm format - convert hh:mm to timestamp
            time = time.replace(/ /g, '');
            const timeArray = time.split(':');
            const timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
            return timeStamp;
        }
    });

    return (
        // <Box  sx={{
        //   marginTop:"100px"
        //   }}>
        //     <CalendarContainer>
        //         <CalenderHeader
        //             onYearSelect={onYearSelect}
        //             onMonthSelect={onMonthSelect}
        //             defaultYear={selectedYear.toString()}
        //             defaultMonth={(selectedMonth + 1).toString()}
        //             openModal={openModal}
        //             openMatchModal={openModalMatch}
        //         />
        //         <CalendarContainerBody>
        //             <CalenderWeekContainer>
        //                 {
        //                     weekArray.map((data, i) => <CalenderWeekDayContainer key={i}>{data}</CalenderWeekDayContainer>)
        //                 }
        //             </CalenderWeekContainer>
        //             <CalenderDateContainer>
        //                 {
        //                     gridArray.map((data, i) =>
        //                         i >= startIndex && i < endIndex ?
        //                             <CalenderDateDayContainerActive key={i}>
        //                                 <DateComponent
        //                                     date={i - startIndex + 1}
        //                                     month={selectedMonth + 1}
        //                                     year={selectedYear}
        //                                 />
        //                             </CalenderDateDayContainerActive> :
        //                             <CalenderDateDayContainerDisable key={i}></CalenderDateDayContainerDisable>
        //                     )
        //                 }
        //             </CalenderDateContainer>
        //         </CalendarContainerBody>
        //     </CalendarContainer>
        // </Box>

        <div className='pages__calender bases__margin--top100'>
            <div className="cd-schedule loading">
                <div className="timeline">
                    <ul>
                        <li><span>05:00</span></li>
                        <li><span>05:30</span></li>
                        <li><span>06:00</span></li>
                        <li><span>06:30</span></li>
                        <li><span>07:00</span></li>
                        <li><span>07:30</span></li>
                        <li><span>08:00</span></li>
                        <li><span>08:30</span></li>
                        <li><span>09:00</span></li>
                        <li><span>09:30</span></li>
                        <li><span>10:00</span></li>
                        <li><span>10:30</span></li>
                        <li><span>11:00</span></li>
                        <li><span>11:30</span></li>
                        <li><span>12:00</span></li>
                        <li><span>12:30</span></li>
                        <li><span>13:00</span></li>
                        <li><span>13:30</span></li>
                        <li><span>14:00</span></li>
                        <li><span>14:30</span></li>
                        <li><span>15:00</span></li>
                        <li><span>15:30</span></li>
                        <li><span>16:00</span></li>
                        <li><span>16:30</span></li>
                        <li><span>17:00</span></li>
                        <li><span>17:30</span></li>
                        <li><span>18:00</span></li>
                        <li><span>18:30</span></li>
                        <li><span>19:00</span></li>
                        <li><span>19:30</span></li>
                        <li><span>20:00</span></li>
                        <li><span>20:30</span></li>
                        <li><span>21:00</span></li>
                        <li><span>21:30</span></li>
                    </ul>
                </div> {/* .timeline */}
                <div className="events">
                    <ul className="d-flex">

                        <li className="events-group">
                            <div className="top-info"><span>Saan 1</span></div>
                            <ul>
                                <li className="single-event" data-start="19:30" data-end="20:30" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">19:30 - 20:30</em>
                                        <em className="event-name">Quang Teo</em>
                                    </a>
                                </li>
                                <li className="single-event" data-start="11:00" data-end="12:30" data-event="event-1">
                                    <a href="#0">
                                        <span className="event-name">Rowing Workout</span>
                                    </a>
                                </li>
                                <li className="single-event" data-start="14:00" data-end="15:15" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">Yoga Level 1</em>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="events-group">
                            <div className="top-info"><span>san 2</span></div>
                            <ul>
                                <li className="single-event" data-start="05:00" data-end="06:00" data-content="event-rowing-workout" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">Rowing Workout</em>
                                    </a>
                                </li>
                                <li className="single-event" data-start="08:30" data-end="09:30" data-content="event-restorative-yoga" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">Restorative Yoga</em>
                                    </a>
                                </li>
                                <li className="single-event" data-start="13:30" data-end="15:00" data-content="event-abs-circuit" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">Abs Circuit</em>
                                    </a>
                                </li>
                                <li className="single-event" data-start="15:45" data-end="16:45" data-content="event-yoga-1" data-event="event-1">
                                    <a href="#0">
                                        <em className="event-name">Yoga Level 1</em>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <div className="cover-layer" />
            </div> {/* .cd-schedule */}
        </div>
    )
}

export default Calender