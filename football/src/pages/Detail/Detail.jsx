import HoverRating from "../../components/HoverRating";
import SuggestionFootball from "../../components/layout/SuggestionFootball";
import detail from '../../img/detail.png'
import detail_img from '../../img/detail-img.png'
import location from '../../img/icon/location.svg'
import phone from '../../img/icon/phone.svg'
import clock from '../../img/icon/clock.svg'
import Rating from "../../components/form/Rating";
import avatar from '../../img/avatar.jpg'
import next from '../../img/next.png'
import left from '../../img/left.png'
import up from '../../img/up.png'
import down from '../../img/down.png'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function DetailPage() {
    const [state, setState] = React.useState({
        isShowDetailRate: false,
    });
    const { isShowDetailRate } = state;
    const { business_id } = useParams();
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [isSucess, setIsSucess] = useState();
    const [recall, setRecallData] = useState(false);
    
    console.log("business", business_id)
    const getData = () => {
        const getFootBallData = collection(db, "business");
        getDocs(getFootBallData)
            .then(response => {
                const datsans = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setData(datsans)
                setIsSucess(true)
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
                    setDataDetail({...item.data,id:item.id})
                    setIsSucess(false)
                    
                }
            })
        }
    }, [isSucess]);
    useEffect(() => {
        if (recall) {
            recallData()
        }
    }, [recall]);

    const recallData = () => {
        getData()
        setRecallData(false)
    }

    const handleChageRate = (value) => {
        setRecallData(value)
    }

    const tempDataSuggest = [
        {
            tensan: 'sân bóng nguyễn hữu thọ',
            location: ' 250 Nguyễn hữu thọ',
            rate: 5
        },
        {
            tensan: 'sân bóng nguyễn hữu thọ',
            location: ' 250 Nguyễn hữu thọ',
            rate: 4
        },
        {
            tensan: 'sân bóng nguyễn hữu thọ',
            location: ' 250 Nguyễn hữu thọ',
            rate: 3
        },
        {
            tensan: 'sân bóng nguyễn hữu thọ',
            location: ' 250 Nguyễn hữu thọ',
            rate: 5
        },
        {
            tensan: 'sân bóng nguyễn hữu thọ',
            location: ' 250 Nguyễn hữu thọ',
            rate: 4
        },
    ]

    const tempDataImage = [
        {
            src: detail_img,
        },
        {
            src: detail_img,
        },
        {
            src: detail_img,
        },
        {
            src: detail_img,
        },
        {
            src: detail_img,
        },
    ]

    const handleShowDetailRate = () => {
        setState((prevState) => ({
            ...prevState,
            isShowDetailRate: !prevState.isShowDetailRate
        }));
    }

    const sliderLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 300
    }

    const sliderRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 300
    }
    const footballLeft = () => {
        const slider = document.getElementById('football');
        slider.scrollLeft = slider.scrollLeft - 300
    }

    const footballRight = () => {
        const slider = document.getElementById('football');
        slider.scrollLeft = slider.scrollLeft + 300
    }


    return (
        <div className="pages__detail bases__margin--horizontal110">
            <div className=" bases__margin--top130 bases__margin--bottom30 bases__font--35 bases__text--bold"> Thông tin sân bóng</div>
            <div className="d-flex">
                <img src={dataDetail.img} alt="" className='bases__height--450 bases__width--650' />
                <div className="bases__margin--left50 ">
                    <div className=" bases__margin--top10 bases__font--35 bases__text--bold bases__text--green">{dataDetail.nameField}</div>
                    <div className="d-flex bases__padding--top10">
                        <HoverRating value={parseInt(dataDetail.rate)} />
                        <img src={isShowDetailRate ? up : down} onClick={handleShowDetailRate} alt="" className="bases__height--30 pages__detail-icon" />

                    </div>
                    {isShowDetailRate && <div className="container bases__margin--top10">
                        <div className="row">
                            <div className="col-3">
                                Sân bóng
                            </div>
                            <div className="col">
                                <HoverRating value={4} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                Dịch vụ
                            </div>
                            <div className="col">
                                <HoverRating value={4}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                Nước uống
                            </div>
                            <div className="col">
                                <HoverRating value={4}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                An ninh
                            </div>
                            <div className="col">
                                <HoverRating value={4}/>
                            </div>
                        </div>

                    </div>}

                    <div className="bases__padding--top15"> <img src={location} alt="" />&ensp; {dataDetail.address}</div>
                    <div className="bases__padding--top15"> <img src={phone} alt="" />&ensp; 090 423 94 85</div>
                    <div className="bases__padding--top15"> <img src={clock} alt="" />&ensp; {dataDetail.timeOpen} -{dataDetail.timeClose}</div>
                    <div className="bases__padding--top20 bases__margin--left15 bases__text--bold"> Mô tả</div>
                    <div>{dataDetail.detail}</div>
                    <div className="bases__padding--top15"> <span className="bases__text--bold bases__font--20" >Giá</span> &ensp;<span className="bases__text--bold bases__text--green bases__font--20">{dataDetail.price}&ensp; ({dataDetail.extra_price}) </span> </div>
                    <button className="pages__detail-button bases__margin--top15">
                        <Link className="pages__detail-button-link" to={`/calender/${business_id}`}>Đặt sân</Link>
                    </button>
                </div>
            </div>

            <div className=" bases__margin--top80 bases__margin--bottom30 bases__font--35 bases__text--bold"> Thông tin chi tiết</div>
            <div>
                <div className="d-flex align-items-center bases__height--260">
                    <img src={left} onClick={sliderLeft} alt="" className="pages__detail-btn" />
                    <div id="slider" className="bases__margin--bottom20 pages__detail-img ">
                        {tempDataImage.map((data, index) => {
                            return (
                                <div className="bases__margin--left15 pages__detail-img-item ">
                                    <img src={data.src} alt="" key={index} className='bases__width--400' />
                                </div>
                            )
                        })}

                    </div>
                    <img src={next} onClick={sliderRight} alt="" className="pages__detail-btn" />
                </div>

                <div className="bases__line-height--24" >
                    Sân Trưng Vương Đà Nẵng là sân bóng cỏ nhân tạo, đang là một sân chơi lớn dành cho các bạn sinh viên và những người đi làm. Đây là loại sân đảm bảo hoạt động vui chơi của mọi đối tượng và thân thiện với môi trường.
                    <br />
                    <br />
                    Nếu ngày xưa, muốn chơi thể thao bạn cần đến những sân cỏ tự nhiên thì giờ cỏ nhân tạo còn giúp người chơi dễ dàng và thuận tiện hơn bất kể thời tiết cũng như giảm được thời gian chăm sóc.
                    <br />
                    <br />
                    Cỏ nhân tạo (hay cỏ nhựa, cỏ plastic) tên tiếng Anh là Artificial Grass hoặc Artificial Turf là một loại cỏ được sản xuất từ sợi tổng hợp (Synthetic fiber) thường được sử dụng trong thi đấu thể thao, đặc biệt là sân cỏ nhân tạo. Do đặc tính nổi bật bền, tốn ít công chăm sóc, thân thiện với môi trường nên cỏ nhân tạo là sản phẩm lý tưởng được sử dụng phổ biến ở nhiều nơi khác nhau
                    Với nhiều lợi ích và tính năng thể thao cao, thiết kế bề mặt cỏ nhân nhân tạo lọai bỏ những phiền phức tưới nước, bón phân và bảo trì theo mùa so với cỏ tự nhiên mà màu cỏ vẫn đảm bảo màu xanh tươi. Sản phẩm cỏ nhân tạo còn chống được tia UV, được bảo vệ để duy trì hình dạng và độ bền.
                    <br />
                    <br />
                    Sử dụng trong mọi thời tiết
                    Thời tiết không hề ảnh hưởng đến sân cỏ nhân tạo, vì vậy, hiệu suất sử dụng được tăng lên đáng kể. Hơn nữa, cỏ nhân tạo có thể sử dụng trong điều kiện thời tiết cực kỳ nóng hoặc lạnh. Hiện nay, việc sản xuất cỏ nhân tạo ngày càng tiên tiến, các nhà sản xuất đã có những bước cải tiến trong cấu trúc cũng như chất liệu sợi cỏ, giúp cho cỏ nhân tạo phù hợp với thể trạng con người và thời tiết khắc nghiệt ở Việt Nam, mang lại độ bền cao cho sản phẩm.
                    <br />
                    <br />
                    Tần suất khai thác vượt trội
                    Đối với các sân bóng sử dụng cỏ tự nhiên 1 tuần chỉ có thể khai thác tối đa 2 trận với thời gian 90 phút vì phải để thời gian cho cỏ phục hồi. Nhưng với sân cỏ nhân tạo, nhà đầu tư hoàn toàn có thể khai thác từ 7 – 8 tiếng 1 ngày và 7 ngày /1 tuần trong mọi điều kiện thời tiết
                    <br />
                    <br />
                    Độ bền màu
                    Cỏ tự nhiên dần dần sẽ bị úa tàn theo thời gian, không sử dụng được, ảnh hưởng đến mỹ quan của sân cỏ. Trong khi cỏ nhân tạo luôn mang một màu xanh như lúc ban đầu, tạo cảm giác sảng khoái cho người chơi và mỹ quan cho sân cỏ nhân tạo.
                    <br />
                    <br />
                    Chi phí bảo dưỡng thấp
                    Cỏ nhân tạo hầu như không cần đến bất kỳ chi phí bảo dưỡng nào trong những năm đầu tiên khai thác. Và tuổi thọ cũng khá cao, trung bình từ 5 đến 7 năm. Nếu so sánh với cỏ tự nhiên chi phí bảo dưỡng cỏ nhân tạo chỉ bằng 1/20. Hầu hết mọi người không cần tốn quá nhiều công cho việc chăm sóc, cắt tỉa cỏ đặc biệt là tưới nước. Cỏ nhân tạo sẽ xanh tốt quanh năm mà không cần phải tưới nước.
                    <br />
                    <br />
                    Dễ dàng lắp đặt
                    Trong khi đó, sân bóng đá cỏ tự nhiên thì phụ thuộc nhiều vào thời tiết, chăm sóc cỏ tốn nhiều thời gian và công sức, không có nhiều loại cỏ, thường xuyên phải trồng cấy lại cỏ….
                    Bóng đá là môn thể thao vua được nhiều người trên toàn thế giới yêu thích. Cùng với sự phát triển của bóng đá, các sân cỏ bóng đá nhân tạo mọc lên ngày càng nhiều, phổ biến và quen thuộc.
                </div>
            </div>

            <div className=" bases__margin--top80 bases__margin--bottom30 bases__font--35 bases__text--bold"> Đánh giá sân bóng</div>
            <div>
                <Rating business_id={business_id} handleRecall={(value) => handleChageRate(value)} />

                {dataDetail.rating && dataDetail.rating.map((item) => {
                    return (
                        <div className="bases__border--gray-radius bases__margin--top30">
                            <div className='d-flex bases__margin--top15 bases__margin--left15'>
                                <img src={item.avatarUser ?? avatar} alt="" className='bases__avatar' />
                                <div className='bases__font--20 bases__margin--left10'>
                                    <div> {item.rateByUser}</div>
                                    <HoverRating value={parseInt(item.sumRate)} />
                                </div>
                            </div>
                            <div className="bases__margin--vertical20 bases__margin--left30">
                                {item.comment}
                            </div>
                        </div>
                    )
                })}

            </div>

            <div className=" bases__margin--top80 bases__margin--bottom30 bases__font--35 bases__text--bold"> Gợi ý sân bóng</div>



            <div className="d-flex align-items-center">
                <img src={left} onClick={footballLeft} alt="" className="pages__detail-btn" />
                <div id="football" className="bases__margin--bottom20 pages__detail-img ">
                    {tempDataSuggest.map((data, index) => {
                        return (
                            <div className="bases__margin--left20" key={index}>
                                <SuggestionFootball detail={data} />
                            </div>
                        )
                    })}
                </div>
                <img src={next} onClick={footballRight} alt="" className="pages__detail-btn" />
            </div>

        </div>
    )

}