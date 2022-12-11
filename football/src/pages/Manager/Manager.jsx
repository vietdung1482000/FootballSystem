
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
    const [presetDate, setPresetDate] = useState(new Date());
    const [isSucess, setIsSucess] = useState(false);
    const [alert, setAlert] = useState(false);
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


    return (
        <div className="pages__manager bases__margin--top100">
            <Loading loader={loading} />
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
