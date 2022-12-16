import React, { useContext } from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import _ from 'lodash';

const FootballFooter = styled.div`
    background: #184F3C;
    width: 100%;
    height: 300px;
    margin-top: 200px;
    display: flex;

    ._logo {
        display: flex;
        margin-top: 50px;
        .symbol {
            color: #119468;
            background-color: #fff;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            text-decoration: none;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 700;
            font-size: 36px;
            align-items: center;
            text-align: center;
            margin-left: 200px;
            cursor: pointer;
        }

        .logo {
            color: #fff;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            margin-top: 15px;
            margin-left: 15px;
            cursor: pointer;
        }
    }

    ._content {
        width: 100%;
        margin-top: 60px;

        ul {
            display: flex;
            text-align: center;
            justify-content: center;
            li {
                font-family: 'Droid Sans';
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 29px;
                display: flex;
                align-items: center;
                text-align: center;

                color: #FFFFFF;
                padding-left: 25px;
                list-style: none;
            }
        }

        ._icon {
            display: flex;
            justify-content: center;
            padding: 15px;
            margin-left: 300px;
            .icon {
                color: #fff;
                margin-left: 15px;
            }
        }

    }
`

export default function Footer() {
    const [data, setData] = React.useState([]);

    const getData = () => {
      const getdataDatSan = collection(db, "users");
      getDocs(getdataDatSan)
        .then((response) => {
          const datsans = response.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }));
          setData(datsans);
        })
        .catch((error) => console.log(error.message));
    };
    React.useEffect(() => {
      getData();
    }, []);
    const { currentUser } = useContext(AuthContext)
    const loadData = () => {
    var dataclone = _.cloneDeep(data);
      if(currentUser) {
        const data123 = dataclone.find((item) => item.data.uid === currentUser.uid)
        if(data123?.data.rule === "business" && data123?.data.status === false) {
          return (
            
      <div>{getData()}</div>
          )
        } 
        else return (
            <FootballFooter>
            <div className="_logo">
                <p className='symbol'>F</p>
                <span className='logo'>Football</span>
            </div>
            <div className="_content">
                <ul>
                    <li>Chúng tôi</li>
                    <li>Tài nguyên</li>
                    <li>Thanh toán</li>
                    <li>Cộng đồng</li>
                </ul>
                <div className="_icon">
                    <div className="icon">
                        <FacebookIcon />
                    </div>
                    <div className="icon">
                        <YouTubeIcon />
                    </div>
                    <div className="icon">
                        <InstagramIcon />
                    </div>
                </div>
            </div>
        </FootballFooter>
        )
      }
      else {
        return (
            <FootballFooter>
            <div className="_logo">
                <p className='symbol'>F</p>
                <span className='logo'>Football</span>
            </div>
            <div className="_content">
                <ul>
                    <li>Chúng tôi</li>
                    <li>Tài nguyên</li>
                    <li>Thanh toán</li>
                    <li>Cộng đồng</li>
                </ul>
                <div className="_icon">
                    <div className="icon">
                        <FacebookIcon />
                    </div>
                    <div className="icon">
                        <YouTubeIcon />
                    </div>
                    <div className="icon">
                        <InstagramIcon />
                    </div>
                </div>
            </div>
        </FootballFooter>
        )
      }
    
    }
  return (
    <div>
        {loadData()}
    </div>
  )
}
