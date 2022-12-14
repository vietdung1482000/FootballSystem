import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import $ from 'jquery';
import location from '../../img/icon/location.svg'
import phone from '../../img/icon/phone.svg'
import clock from '../../img/icon/clock.svg'
import detail from '../../img/detail.png'


import FormModal from '../../components/FormModal'
import { Link, useParams } from "react-router-dom"
import MatchModal from '../../components/MatchModal';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
    TextField,
} from "@mui/material";
import HoverRating from '../../components/HoverRating';
import { Loading } from '../../components/layout/Loading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import ModalMap from '../../components/map/ModalMap';

function Calender() {
    const [presetDate, setPresetDate] = useState(new Date());
    const [isSucess, setIsSucess] = useState(false);
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const { business_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [dataCalender, setDataCalender] = useState([]);
    const { currentUser } = useContext(AuthContext);


    const getData = () => {
        setLoading(true);
        const getFootBallData = collection(db, "business");
        getDocs(getFootBallData)
            .then(response => {
                const datsans = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setData(datsans)
                setIsSucess(true)
                setLoading(false);
            })
            .catch(error => console.log(error.message))
    }



    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (isSucess) {
            data.map((item) => {
                if (item.id === business_id) {
                    setDataDetail(item.data)
                    setIsSucess(false)
                }
            })
        }
    }, [isSucess]);

    useEffect(() => {
        if (dataDetail.nameField) {
            getDataCalender()
        }
    }, [dataDetail.nameField]);

    const getDataCalender = () => {
        setLoading(true);
        const getFootBallData = collection(db, "datsan");
        const queryCalender = query(getFootBallData, where("nameField", "==", dataDetail.nameField))
        getDocs(queryCalender)
            .then(response => {
                const datsans = response.docs.map(doc => ({
                    data: doc.data(),
                }))
                setDataCalender(datsans)
                setLoading(false);
            })
            .catch(error => console.log(error.message))
    }

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
            this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
            this.element.addClass('js-full');
            this.placeEvents();
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
    const dataEvent = dataCalender.filter((dataSearch) => dataSearch.data.presetDate.indexOf(moment(presetDate).format("YYYY/MM/DD")) > -1)

    return (

        <div className='pages__calender bases__margin--top100'>
            <Loading loader={loading} />
            <div className="d-flex bases__margin--left75 bases__margin--right75 bases__margin--bottom75">
                <img src={detail} alt="" className='bases__height--450 bases__width--650' />
                <div className="bases__margin--left50 ">
                    <div className=" bases__margin--top10 bases__font--35 bases__text--bold bases__text--green">{dataDetail.nameField}</div>
                    <div className="d-flex bases__padding--top10">
                        <HoverRating value={parseInt(dataDetail.rate)} />
                    </div>

                    <div className="bases__padding--top15"> <img src={location} alt="" />&ensp; {dataDetail.address}</div>
                    <div className="bases__padding--top15"> <img src={phone} alt="" />&ensp;  {dataDetail.phone}</div>
                    <div className="bases__padding--top15"> <img src={clock} alt="" />&ensp; {dataDetail.timeOpen} -{dataDetail.timeClose}</div>
                    <div className="bases__padding--top20 bases__margin--left15 bases__text--bold"> M?? t???</div>
                    <div>{dataDetail.detail}</div>

                    {currentUser && dataDetail && currentUser.uid === dataDetail.manager ? <Link to={`/manager/${business_id}`}>
                        <button className="pages__detail-button bases__margin--top15">Qu???n L??</button>
                    </Link> : <div className='d-flex'>
                        <FormModal dataSan={dataDetail} recallAPI={getDataCalender} />
                        <MatchModal dataSan={dataDetail} recallAPI={getDataCalender} />
                    </div>}

                </div>
            </div>
            <div class="bases__header-table">
                <LocalizationProvider dateAdapter={AdapterDateFns}  >
                    <DesktopDatePicker
                        value={presetDate}
                        onChange={(newValue) => {
                            setPresetDate(newValue);
                            getDataCalender();
                        }}
                        renderInput={(params) => <TextField className='bases__text--white' {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className='pages__calender-scheduler'>
                <div className="cd-schedule loading bases__border--gray-radius">
                    <div className="timeline bases__padding--left10">
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
                    </div>

                    <div className="events">
                        <ul className="d-flex">
                            {
                                dataDetail.SoLuongSan?.map((item, key) => {
                                    return (
                                        <li className="events-group" key={key}>
                                            <div className="top-info"><span>{item.SoLuongSan}</span></div>
                                            <ul>
                                                {dataEvent.map((event, index) => {
                                                    if (event.data.san === item.SoLuongSan) {
                                                        const time = moment(event.data.presetDate).format("HH:mm");
                                                        const timeArray = time.split(':');
                                                        const timeEnd = `${parseInt(timeArray[0]) + 1}:${timeArray[1]}`
                                                        return (
                                                            <li key={index} className="single-event" data-start={time} data-end={timeEnd} data-event="event-1">
                                                                <a href="#0">
                                                                    <em className="event-name">{time}- {timeEnd}</em>
                                                                    <em className="event-name">{event.data.name}</em>
                                                                </a>
                                                            </li>
                                                        )
                                                    }
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <div className="cover-layer" />
                </div>
            </div>
            
            <div>
                <ModalMap />
            </div>
        </div >
    )
}

export default Calender