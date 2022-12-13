
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
    TextField,
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Loading } from '../../components/layout/Loading';
import moment from 'moment';
import location from '../../img/icon/location.svg'
import phone from '../../img/icon/phone.svg'
import clock from '../../img/icon/clock.svg'
import detail from '../../img/detail.png'
import pen from '../../img/pen.png'
import Clear from '../../img/close.png'
import check from '../../img/check-mark.png'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function Manager() {
    const [presetDate, setPresetDate] = useState();
    const [isSucess, setIsSucess] = useState(false);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const { business_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [dataCalender, setDataCalender] = useState([]);
    const [doanhThu, setDoanhThu] = useState(20000000);
    const [newdoanhThu, setNewDoanhThu] = useState();
    const [editDoanhThu, setEditDoanhThu] = useState(false);
    const [dataDoanhThu, setDataDoanhThu] = useState({});
    const [listenEvent, setListenEvent] = useState(false);
    const [openMoadal, setOpenMoadal] = useState(false);
    const [inputList, setInputList] = useState([{ SoLuongSan: "", Gia: "" }]);
    const [dataEdit, setDataEdit] = useState([]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { SoLuongSan: "", Gia: "" }]);
    };


    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (listenEvent === true) {
            const lastMonht = !presetDate ? parseInt(moment(new Date()).format("M") ?? 1) - 1 : moment(presetDate).format("M");
            const dataDoanhThuThangTruoc = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M").indexOf(lastMonht.toString()) > -1)
            const tongDoanhThuThangTruoc = parseInt(dataDoanhThuThangTruoc.length ?? 0) * 250000;
            const doanhThuThangTruoc = parseInt(tongDoanhThuThangTruoc ?? 0) / parseInt(doanhThu ?? 10000000) * 100;

            setDataDoanhThu({
                thangtruoc: doanhThuThangTruoc,
                tongthangtruoc: tongDoanhThuThangTruoc,
                thang: lastMonht,
            });
            setListenEvent(false)
        }
    }, [listenEvent]);

    const doanhThuThangNay = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M").indexOf(moment(new Date()).format("M")) > -1)
    const tongDoanhThu = parseInt(doanhThuThangNay.length ?? 0) * 250000;
    const doanhThuThang = parseInt(tongDoanhThu ?? 0) / parseInt(doanhThu ?? 10000000) * 100;

    useEffect(() => {
        if (isSucess) {
            data.map((item) => {
                if (item.id === business_id) {
                    setDataDetail(item.data)
                    setDataEdit(item.data)
                    setIsSucess(false)
                    setInputList(item.data.SoLuongSan)
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
                setAlert(false);
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

    const handleOpen = () => setOpenMoadal(true);
    const handleClose = () => {
        setOpenMoadal(false)
        getData();
    };

    const handleChangeDataEdit = (field, value) => {
        setDataEdit((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }

    const editData = () => {

        const FootBallData = doc(db, "business", business_id)
        setLoading(true)
        updateDoc(FootBallData, {
            nameField: dataEdit.nameField,
            phone: dataEdit.phone,
            address: dataEdit.address,
            detail: dataEdit.detail,
            SoLuongSan: inputList,
        }).then(() => {
            setLoading(false)
            setAlert(true);
        })
    }

    const modalEdit = () => {
        return (
            <div>
                <Modal
                    open={openMoadal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        {alert === false ? <>
                            <div> Tên Sân</div>
                            <input
                                value={dataEdit.nameField}
                                onChange={(e) => handleChangeDataEdit('nameField', e.target.value)}
                                className="bases__inputList--item w-100"
                            />
                            <div> Địa chỉ</div>
                            <input
                                value={dataEdit.address}
                                onChange={(e) => handleChangeDataEdit('address', e.target.value)}
                                className="bases__inputList--item w-100"
                            />
                            <div> Điện thoại</div>
                            <input
                                value={dataEdit.phone}
                                onChange={(e) => handleChangeDataEdit('phone', e.target.value)}
                                className="bases__inputList--item w-100"
                            />
                            <div> Mô tả</div>
                            <input
                                value={dataEdit.detail}
                                onChange={(e) => handleChangeDataEdit('detail', e.target.value)}
                                className="bases__inputList--item w-100 bases__margin--bottom20"
                            />
                            <div className="bases__text--bold bases__margin--bottom10">Danh sách sân</div>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="bases__inputList--form">
                                        <div className="">
                                            <div>Sân</div>
                                            <input
                                                name="SoLuongSan"
                                                placeholder="Nhập Số Sân"
                                                value={x.SoLuongSan}
                                                onChange={(e) => handleInputChange(e, i)}
                                                className="bases__inputList--item"
                                            />
                                        </div>

                                        <div className="">
                                            <div>giá</div>
                                            <input
                                                name="Gia"
                                                placeholder="Nhập Giá"
                                                value={x.Gia}
                                                onChange={(e) => handleInputChange(e, i)}
                                                className="bases__inputList--item"
                                                type="number"
                                                min="1"
                                            />
                                            <RemoveIcon
                                                onClick={() => handleRemoveClick(i)}
                                            ></RemoveIcon>
                                            <AddIcon onClick={handleAddClick}></AddIcon>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="d-flex justify-content-center">
                                <button className="button-oke" onClick={editData}>Hoàn thành</button>
                                <button className="button-cancle bases__margin--left50" onClick={handleClose}>Đóng</button>
                            </div>
                        </> : <>
                            <img src={check} alt="" className='bases__height--150 bases__width--300' />
                            <h4 className="text-center bases__margin--bottom30">Update thành công</h4>
                            <button className="button-oke bases__margin--left80" onClick={handleClose}>Close</button>
                        </>}

                    </Box>
                </Modal>
            </div>
        );
    }


    const thang1 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '1').length
    const thang2 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '2').length
    const thang3 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '3').length
    const thang4 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '4').length
    const thang5 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '5').length
    const thang6 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '6').length
    const thang7 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '7').length
    const thang8 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '8').length
    const thang9 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '9').length
    const thang10 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '10').length
    const thang11 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '11').length
    const thang12 = dataCalender.filter((dataSearch) => moment(dataSearch.data.presetDate).format("M") === '12').length

    const datachartT1 = thang1 ? (300 - parseInt(thang1) * 10) : 290;
    const datachartT2 = thang2 ? (300 - parseInt(thang2) * 10) : 290;
    const datachartT3 = thang3 ? (300 - parseInt(thang3) * 10) : 290;
    const datachartT4 = thang4 ? (300 - parseInt(thang4) * 10) : 290;
    const datachartT5 = thang5 ? (300 - parseInt(thang5) * 10) : 290;
    const datachartT6 = thang6 ? (300 - parseInt(thang6) * 10) : 290;
    const datachartT7 = thang7 ? (300 - parseInt(thang7) * 10) : 290;
    const datachartT8 = thang8 ? (300 - parseInt(thang8) * 10) : 290;
    const datachartT9 = thang9 ? (300 - parseInt(thang9) * 10) : 290;
    const datachartT10 = thang10 ? (300 - parseInt(thang10) * 10) : 290;
    const datachartT11 = thang11 ? (300 - parseInt(thang11) * 10) : 290;
    const datachartT12 = thang12 ? (300 - parseInt(thang12) * 10) : 290;

    return (
        <div className="pages__manager bases__margin--top100">
            <Loading loader={loading} />
            <div>
                <div className="d-flex bases__margin--left75 bases__margin--right75 bases__margin--bottom75">
                    <img src={detail} alt="" className='bases__height--450 bases__width--650' />
                    <div className="bases__margin--left50 ">
                        <div className=" bases__margin--top10 bases__font--35 bases__text--bold bases__text--green">{dataDetail.nameField}</div>
                        <div className="bases__padding--top15"> <img src={location} alt="" />&ensp; {dataDetail.address}</div>
                        <div className="bases__padding--top15"> <img src={phone} alt="" />&ensp;  {dataDetail.phone}</div>
                        <div className="bases__padding--top15"> <img src={clock} alt="" />&ensp; {dataDetail.timeOpen}:00 -{dataDetail.timeClose}:00</div>
                        <div className="bases__padding--top20 bases__margin--left15 bases__text--bold"> Mô tả</div>
                        <div>{dataDetail.detail}</div>
                        {modalEdit()}
                        <button onClick={handleOpen} className="pages__detail-button bases__margin--top15">Chỉnh sửa thông tin sân</button>

                        {/* <div className='d-flex'>
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
                    </div> */}
                    </div>
                </div>
                <h4 className="bases__margin--left40 bases__margin--bottom40" >Biểu đồ tăng trưởng của sân</h4>
                <div>
                    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="quiz-graph">
                        <defs>
                            <pattern id="grid" width={50} height={50} patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e5e5" strokeWidth={1} />
                            </pattern>
                        </defs>

                        <g className="x-labels">
                            <text x={150} y={320}>Tháng 1</text>
                            <text x={250} y={320}>Tháng 2</text>
                            <text x={350} y={320}>Tháng 3</text>
                            <text x={450} y={320}>Tháng 4</text>
                            <text x={550} y={320}>Tháng 5</text>
                            <text x={650} y={320}>Tháng 6</text>
                            <text x={750} y={320}>Tháng 7</text>
                            <text x={850} y={320}>Tháng 8</text>
                            <text x={950} y={320}>Tháng 9</text>
                            <text x={1050} y={320}>Tháng 10</text>
                            <text x={1150} y={320}>Tháng 11</text>
                            <text x={1250} y={320}>Tháng 12</text>
                        </g>

                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'rgba(99,224,238,.5)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                        </linearGradient>
                        <polyline fill="url(#grad)" stroke="#34becd" strokeWidth={0} points={`
                                            50,300
                                            51,300
                                            150,${datachartT1}
                                            250,${datachartT2}
                                            350,${datachartT3}
                                            450,${datachartT4}
                                            550,${datachartT5}
                                            650,${datachartT6}
                                            750,${datachartT7}
                                            850,${datachartT8}
                                            950,${datachartT9}
                                            1050,${datachartT10}
                                            1150,${datachartT11}
                                            1250,${datachartT12}
                                            1350,300
                                            `} />
                        <polyline fill="none" stroke="#34becd" strokeWidth={2} points={`
                                            50,300
                                            150,${datachartT1}
                                            250,${datachartT2}
                                            350,${datachartT3}
                                            450,${datachartT4}
                                            550,${datachartT5}
                                            650,${datachartT6}
                                            750,${datachartT7}
                                            850,${datachartT8}
                                            950,${datachartT9}
                                            1050,${datachartT10}
                                            1150,${datachartT11}
                                            1250,${datachartT12}
                                            `} />
                        <g>
                            <circle className="quiz-graph-start-dot" cx={50} cy={300} data-value="7.2" r={6} />
                            <circle className="quiz-graph-dot" cx={150} cy={datachartT1} data-value="8.1" r={6} q-title="t1" answer-count={200} percent-value="66%" />
                            <circle className="quiz-graph-dot" cx={250} cy={datachartT2} data-value="7.7" r={6} q-title="t2" answer-count={220} percent-value="73%" />
                            <circle className="quiz-graph-dot" cx={350} cy={datachartT3} data-value="6.8" r={6} q-title="t3" answer-count={140} percent-value="46%" />
                            <circle className="quiz-graph-dot" cx={450} cy={datachartT4} data-value="6.7" r={6} q-title="t4" answer-count={200} percent-value="66%" />
                            <circle className="quiz-graph-dot" cx={550} cy={datachartT5} data-value="6.7" r={6} q-title="t5" answer-count={200} percent-value="66%" />
                            <circle className="quiz-graph-dot" cx={650} cy={datachartT6} data-value="6.7" r={6} q-title="t6" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={750} cy={datachartT7} data-value="6.7" r={6} q-title="t7" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={850} cy={datachartT8} data-value="6.7" r={6} q-title="t8" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={950} cy={datachartT9} data-value="6.7" r={6} q-title="t9" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={1050} cy={datachartT10} data-value="6.7" r={6} q-title="t10" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={1150} cy={datachartT11} data-value="6.7" r={6} q-title="t11" answer-count={150} percent-value="50%" />
                            <circle className="quiz-graph-dot" cx={1250} cy={datachartT12} data-value="6.7" r={6} q-title="t12" answer-count={100} percent-value="50%" />

                        </g>
                    </svg>
                </div>

                <h4 className=" bases__margin--bottom10 bases__margin--top50" >Doanh Thu</h4>

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
                        <div className="label">20.000.00 VND</div>
                        <div className="label">15.000.00 VND</div>
                        <div className="label">10.000.00 VND</div>
                        <div className="label">5.000.00 VND</div>
                        <div className="label">1.000.000 VND</div>
                        <div>Doanh Thu</div>
                    </li>


                    <li className="bar salmon bases__margin--left50 bases__margin--right100" style={{ height: `${doanhThuThang}%` }} >
                        <div className="percent">{tongDoanhThu} VND </div>
                        <div className="title">Tháng này</div>
                    </li>

                    <li className="bar teal  bases__margin--right100" style={{ height: `${dataDoanhThu.thangtruoc}%` }}>
                        <div className="percent"> {dataDoanhThu.tongthangtruoc} VND</div>
                        <div className="title">Tháng {dataDoanhThu.thang}</div>
                    </li>

                    {/* <li className="bar teal" style={{ height: `${parseInt(dataDetail.rate) * 20}%` }}>
                        <div className="percent"> {dataDetail.rate} / 5 </div>
                        <div className="skill">Tổng đánh giá</div>
                        <div className="title">Đánh Giá</div>
                    </li> */}

                </ul>
            </div>



        </div>
    )
}
