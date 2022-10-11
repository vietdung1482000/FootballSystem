import avatar from '../../img/avatar.jpg'
import HoverRating from '../HoverRating'

export default function Rating() {
    return (
        <div className="components__rating">
            <div className='d-flex bases__margin--top15 bases__margin--left15'>
                <img src={avatar} alt="" className='bases__avatar' />
                <div className='bases__font--20 bases__margin--left10'> Quang tèo</div>
            </div>

            <div className="container bases__margin--top10 bases__margin--left16">
                <div className="row">
                    <div className="col-1">
                        Sân bóng
                    </div>
                    <div className="col">
                        <HoverRating />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        Dịch vụ
                    </div>
                    <div className="col">
                        <HoverRating />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        Nước uống
                    </div>
                    <div className="col">
                        <HoverRating />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        An ninh
                    </div>
                    <div className="col">
                        <HoverRating />
                    </div>
                </div>

            </div>

            <div className='components__rating-comment'>
                <textarea className="container bases__margin--top10 bases__margin--left16 components__rating-comment_input" id="story" name="story" rows={5} placeholder={"Viết bình luận ..."} />
            </div>

            <div className="d-flex justify-content-end">
                <button className='components__rating-button'>Đăng</button>
            </div>
        </div>
    )
}