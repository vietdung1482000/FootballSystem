
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
    TextField,
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loading } from '../../components/layout/Loading';
import moment from 'moment';
import location from '../../img/icon/location.svg'
import phone from '../../img/icon/phone.svg'
import clock from '../../img/icon/clock.svg'
import detail from '../../img/detail.png'
import pen from '../../img/pen.png'
import Clear from '../../img/close.png'
import check from '../../img/check-mark.png'

export default function Manager() {
    const [presetDate, setPresetDate] = useState(new Date());
    const [isSucess, setIsSucess] = useState(false);
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const { business_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [dataCalender, setDataCalender] = useState([]);
    const [doanhThu, setDoanhThu] = useState(10000000);
    const [newdoanhThu, setNewDoanhThu] = useState();
    const [editDoanhThu, setEditDoanhThu] = useState(false);
    const [dataDoanhThu, setDataDoanhThu] = useState({});
    const [listenEvent, setListenEvent] = useState(false);

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (listenEvent === true) {
            const doanhThuThangNay = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M").indexOf(moment(presetDate).format("M")) > -1)
            const tongDoanhThu = parseInt(doanhThuThangNay.length ?? 0) * 250000;
            const doanhThuThang = parseInt(tongDoanhThu ?? 0) / parseInt(doanhThu ?? 10000000) * 100;

            const lastMonht = parseInt(moment(presetDate).format("M") ?? 1) - 1;

            const dataDoanhThuThangTruoc = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M").indexOf(lastMonht.toString()) > -1)
            const tongDoanhThuThangTruoc = parseInt(dataDoanhThuThangTruoc.length ?? 0) * 250000;
            const doanhThuThangTruoc = parseInt(tongDoanhThuThangTruoc ?? 0) / parseInt(doanhThu ?? 10000000) * 100;

            setDataDoanhThu({
                thangnay: doanhThuThang,
                thangtruoc: doanhThuThangTruoc,
                tongthangnay: tongDoanhThu,
                tongthangtruoc: tongDoanhThuThangTruoc
            });
            setListenEvent(false)
        }
    }, [listenEvent]);

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
                setListenEvent(true)
            })
            .catch(error => console.log(error.message))
    }


    return (
        <div className="pages__manager bases__margin--top100">
            <Loading loader={loading} />
            <div className="d-flex bases__margin--left75 bases__margin--right75 bases__margin--bottom75">
                <img src={detail} alt="" className='bases__height--450 bases__width--650' />
                <div className="bases__margin--left50 ">
                    <div className=" bases__margin--top10 bases__font--35 bases__text--bold bases__text--green">{dataDetail.nameField}</div>
                    <div className="bases__padding--top15"> <img src={location} alt="" />&ensp; {dataDetail.address}</div>
                    <div className="bases__padding--top15"> <img src={phone} alt="" />&ensp;  {dataDetail.phone}</div>
                    <div className="bases__padding--top15"> <img src={clock} alt="" />&ensp; {dataDetail.timeOpen} -{dataDetail.timeClose}</div>
                    <div className="bases__padding--top20 bases__margin--left15 bases__text--bold"> Mô tả</div>
                    <div>{dataDetail.detail}</div>

                    <div className='d-flex'>
                        <TextField
                            placeholder="Doanh Thu mong muốn hàng tháng"
                            label="Doanh Thu mong muốn"
                            variant="outlined"
                            type="number"
                            className="bases__margin--top15 w-100"
                            value={newdoanhThu ?? 10000000}
                            onChange={(e) => {
                                setNewDoanhThu(e.target.value);
                            }}
                            disabled={editDoanhThu ? false : true}
                        />
                        {editDoanhThu === false ?
                            <img onClick={() => { setEditDoanhThu(true) }} className='bases__width--30 bases__height--30 bases__margin--left25 bases__margin--top25 bases__p--cursor' src={pen} alt="" />
                            :
                            <>
                                <img onClick={() => { setEditDoanhThu(false); setDoanhThu(newdoanhThu) }} className='bases__width--30 bases__height--30 bases__margin--left25 bases__margin--top25 bases__p--cursor' src={check} alt="" />
                                <img onClick={() => { setEditDoanhThu(false); setDoanhThu(10000000); setNewDoanhThu(10000000) }} className='bases__width--30 bases__height--30 bases__margin--left25 bases__margin--top25 bases__p--cursor' src={Clear} alt="" />
                            </>
                        }
                    </div>
                </div>
            </div>
            <div class="pages__manager--header">
                <LocalizationProvider dateAdapter={AdapterDateFns}  >
                    <DatePicker
                        value={presetDate}
                        onChange={(newValue) => {
                            setPresetDate(newValue);
                            setListenEvent(true)
                        }}
                        renderInput={(params) => <TextField className='bases__text--white' {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <ul className="chart">
                <li className="axis">
                    <div className="label">Cao</div>
                    <div className="label">Tốt</div>
                    <div className="label">Trung Bình</div>
                    <div className="label">Tệ</div>
                    <div className="label">Rất tệ</div>
                </li>

                <li className="bar teal" style={{ height: `${dataDoanhThu.thangtruoc}%` }}>
                    <div className="percent"> {dataDoanhThu.tongthangtruoc} VND</div>
                    <div className="skill">Tháng trước</div>
                    <div className="title">Doanh Thu</div>
                </li>
                <li className="bar salmon bases__margin--right100" style={{ height: `${dataDoanhThu.thangnay}%` }} >
                    <div className="percent">{dataDoanhThu.tongthangnay} VND </div>
                    <div className="skill">Tháng này</div>
                </li>

                <li className="bar teal" style={{ height: `${parseInt(dataDetail.rate) * 20}%` }}>
                    <div className="percent"> {dataDetail.rate} / 5 </div>
                    <div className="skill">Tổng đánh giá</div>
                    <div className="title">Đánh Giá</div>
                </li>

            </ul>
        </div>
    )
}
