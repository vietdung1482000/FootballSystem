import avatar from '../../img/avatar.jpg'
import HoverRating from '../HoverRating'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import rate from '../../img/rate.jpg'
import { AuthContext } from '../../context/AuthContext';
import { Loading } from '../layout/Loading';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Rating(props) {
    const [dataRate, setDataRate] = useState({});
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCalldone, setIsCalldone] = useState();
    const [openMoadal, setOpenMoadal] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (isSuccess) {
            setDataRate({
                sanbong: '',
                dichvu: '',
                nuocuong: '',
                anning: '',
                comment: '',
            })
            setLoading(false);
            handleOpen();
        }
    }, [isSuccess]);

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (isCalldone) {
            data.map((item) => {
                if (item.id === props.business_id) {
                    setDataDetail(item.data)
                    setIsCalldone(false)
                }
            })
        }
    }, [isCalldone]);

    const getData = () => {
        const getFootBallData = collection(db, "business");
        getDocs(getFootBallData)
            .then(response => {
                const datsans = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setData(datsans)
                setIsCalldone(true)
            })
            .catch(error => console.log(error.message))
    }

    const handleOpen = () => setOpenMoadal(true);
    const handleClose = () => {
        setOpenMoadal(false)
        setIsSuccess(false)
        getData();
        if (props.handleRecall) {
            props.handleRecall(true)
        }
    };

    const modalAlert = () => {
        return (
            <div>
                <Modal
                    open={openMoadal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <img src={rate} alt="" className='bases__height--150 bases__width--300' />
                        <h4 className="text-center bases__margin--bottom30">Đá giá thành công</h4>
                        <button className="button-oke bases__margin--left80" onClick={handleClose}>Close</button>
                    </Box>
                </Modal>
            </div>
        );
    }

    const handleChangeDataRate = (field, value) => {
        setDataRate((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }

    const postData = () => {
        const data = dataDetail.rating;
        const sumpRate = ((Number(dataRate.anninh) + Number(dataRate.dichvu) + Number(dataRate.nuocuong) + Number(dataRate.sanbong)) / 4);
        const newRate = {
            ...dataRate,
            sumRate: ((Number(dataRate.anninh) + Number(dataRate.dichvu) + Number(dataRate.nuocuong) + Number(dataRate.sanbong)) / 4),
            rateByUser: currentUser.displayName,
            avatarUser: currentUser.photoURL
        }
        const dataUpdate = [...data, newRate]
        const FootBallData = doc(db, "business", props.business_id)
        setLoading(true)
        updateDoc(FootBallData, {
            rating: dataUpdate,
            rate: (Number(sumpRate) + Number(dataDetail.rate)) / 2
        }).then(() => {
            setIsSuccess(true)
        })
    }

    return (
        <div className="components__rating">
            <Loading loader={loading} />
            {modalAlert()}
            <div className='d-flex bases__margin--top15 bases__margin--left15'>
                <img src={currentUser.photoURL ?? avatar} alt="" className='bases__avatar' />
                <div className='bases__font--20 bases__margin--left10'> {currentUser.displayName}</div>
            </div>
            <div className="container bases__margin--top10 bases__margin--left16">
                <div className="row">
                    <div className="col-1">
                        Sân bóng
                    </div>
                    <div className="col">
                        <HoverRating value={dataRate.sanbong} handleChangeDataRate={(value) => handleChangeDataRate('sanbong', value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        Dịch vụ
                    </div>
                    <div className="col">
                        <HoverRating value={dataRate.dichvu} handleChangeDataRate={(value) => handleChangeDataRate('dichvu', value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        Nước uống
                    </div>
                    <div className="col">
                        <HoverRating value={dataRate.nuocuong} handleChangeDataRate={(value) => handleChangeDataRate('nuocuong', value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        An ninh
                    </div>
                    <div className="col">
                        <HoverRating value={dataRate.anninh} handleChangeDataRate={(value) => handleChangeDataRate('anninh', value)} />
                    </div>
                </div>

            </div>

            <div className='components__rating-comment'>
                <textarea value={dataRate.comment} onChange={(event) => handleChangeDataRate('comment', event.target.value)} className="container bases__margin--top10 bases__margin--left16 components__rating-comment_input" id="story" name="story" rows={5} placeholder={"Viết bình luận ..."} />
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={postData} className='components__rating-button'>Đăng</button>
            </div>
        </div>
    )
}