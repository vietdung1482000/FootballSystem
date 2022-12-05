import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BG from "../../img/bg.png";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Stack } from "@mui/system";
import { Fab, Input, TextField } from "@mui/material";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { Add } from "@mui/icons-material";

const ResBusiness = styled.div`
  width: 100%;
  .resBusiness {
    width: 100%;
    .form {
      width: 45%;
      height: auto;
      margin-left: 100px;
      margin-top: 150px;
      z-index: 99;
      background: #ffffff;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
      border-radius: 30px;
      .bgc {
        padding: 5px;
        background: #119468;
        border-radius: 25px 25px 0px 0px;
        p {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 30px;
          display: flex;
          align-items: center;
          color: #ffffff;
          margin-left: 30px;
          margin-top: 15px;
        }
      }

      .content {
        p {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          margin-left: 40px;
          color: rgba(0, 0, 0, 0.6);
        }

        ._detail {
          padding: 15px;
          background: #ffffff;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          width: 600px;
        }
        form {
          width: 100%;
          margin-left: 10px;
          padding: 10px;
          .left {
            float: left;
            .input_left {
              width: 100%;
            }
          }
          .right {
            float: right;
            margin-right: 15px;
            .input_right {
              width: 65%;
            }
          }
          input {
            padding: 15px;
            background: #ffffff;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            margin: 20px;
            margin-left: 50px;
            width: 600px;
          }

          textarea {
            margin-top: 20px;
            margin-left: 50px;
            background: #ffffff;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            padding: 20px;
            width: 600px;
          }

          select {
            width: 100px;
          }
          .lg {
            img {
              width: 80px;
              margin-top: 20px;
              margin-left: 20px;
            }
          }
        }
      }
    }

    .bg {
      position: absolute;
      height: 680px;
      left: 1024px;
      top: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const Button = styled.button`
  width: 350px;
  background: #119468;
  color: white;
  padding: 15px;
  font-weight: bold;
  border: none;
  margin-top: 20px;
  margin-left: 20%;
  border-radius: 25px;
  cursor: pointer;

  :hover {
    background-color: #82ccdd;
  }
`;

export default function RegisterBusiness() {
  const [inputList, setInputList] = useState([{ SoLuongSan: "", Gia: "" }]);

  // handle input change
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
  console.log("inputList", inputList);
  // const db = getFirestore()
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const [nameField, setNameField] = useState("");
  const [phone, setPhone] = useState("");
  const [infoField, setInfoField] = useState("");
  const [nameSingleField, setNameSingleField] = useState("");
  const [timeOpen, setTimeOpen] = useState(new Date());
  const [timeClose, setTimeClose] = useState(new Date());
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");
  const [abc, stetAbc] = useState(false);
  const [files, setFiles] = useState("");
  const [progress, setProgress] = useState(0);
  const [giaphuthu, setgiaphuthu] = useState("");


  const fileRef = useRef();
  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };
  useEffect(() => {
    if (abc) {
      submitData();
      stetAbc(false);
    }
  }, [abc]);

  const { currentUser } = useContext(AuthContext);
  const ngaymo = moment(timeOpen).format("HH");
  const ngaydong = moment(timeClose).format("HH");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const rule = "business";
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName, rule);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              rule,
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              rule,
            });
            navigate("/login");
          });
        }
      );
      stetAbc(true);
    } catch (err) {
      setErr(true);
    }
  };
  const uploadFileWithProgress = (files, subFolder, imageName, setProgress) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, subFolder + '/' + imageName);
      const upload = uploadBytesResumable(storageRef, files);
      upload.on(
        'state_changed',
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setProgress(progress);
        },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

  const submitData = async () => {
    try {
      const url = await uploadFileWithProgress(
        files,
        setProgress
      );
      const colRef = collection(db, "business");
      await addDoc(colRef, {
        manager: currentUser.uid,
        nameField: nameField,
        phone: phone,
        infoField: infoField,
        timeOpen: ngaymo,
        timeClose: ngaydong,
        address: address,
        detail: detail,
        raing: [],
        rate: 5,
        SoLuongSan: inputList,
        imageURL:url,
        extra_price:giaphuthu,
      })
      .then(() => {
        alert("Register success <3");
        navigate("/login");
      })
    }catch (error) {
      alert(error.message);
      console.log(error);
    }
    setNameField("");
    setPhone("");
    setInfoField("");
    setNameSingleField("");
    setTimeOpen("");
    setTimeClose("");
    setAddress("");
    setDetail("");
  };

  return (
    <ResBusiness>
      <div className="resBusiness">
        <div className="form">
          <div className="bgc">
            <p>Đăng Kí Tài Khoản Sân</p>
          </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Tên của bạn" />
                <input type="email" placeholder="Nhập địa chỉ email" />
                <input type="password" placeholder="Nhập mật khẩu" />
                <input type="file" id="file" />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <input
                  type="text"
                  placeholder="Tên sân bóng"
                  onChange={(e) => setNameField(e.target.value)}
                  value={nameField}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      className="dongho bases__margin--bottom30"
                      label="Giờ Mở Cửa"
                      value={timeOpen}
                      onChange={(newValue) => {
                        setTimeOpen(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      className="dongho1"
                      label="Giờ Đóng Cửa"
                      value={timeClose}
                      onChange={(newValue) => {
                        setTimeClose(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <input
                  type="file"
                  multiple
                  inputRef={fileRef}
                  onChange={handleChange}
                />
                <textarea
                  placeholder="Giới thiệu"
                  width="48"
                  height="48"
                  type="text"
                  onChange={(e) => setInfoField(e.target.value)}
                  value={infoField}
                />
                {/* <input style={{ display: "none" }} type="file" id="file" /> */}
                <textarea
                  type="text"
                  onChange={(e) => setDetail(e.target.value)}
                  value={detail}
                  className="_detail"
                  placeholder="Chi tiết"
                  id=""
                  cols="60"
                  rows="10"
                ></textarea>{" "}
              </div>
              <input
                  type="number"
                  placeholder="Nhập Giá Phụ Thu"
                  onChange={(e) => setgiaphuthu(e.target.value)}
                  value={giaphuthu}
                />
              {inputList.map((x, i) => {
                return (
                  <div className="SLS">
                    <div className="left">
                      <input
                        name="SoLuongSan"
                        placeholder="Nhập Số Sân"
                        value={x.SoLuongSan}
                        onChange={(e) => handleInputChange(e, i)}
                        className="input_left"
                      />
                    </div>
                    <div className="right">
                      <input
                        name="Gia"
                        placeholder="Nhập Giá"
                        value={x.Gia}
                        onChange={(e) => handleInputChange(e, i)}
                        className="input_right"
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

              <br />
              <Button>Hoàn Tất</Button>
              {err && <span>Đã xảy ra lỗi!</span>}
            </form>
          </div>
        </div>
        <div className="bg">
          <img src={BG} alt="" />
        </div>
      </div>
    </ResBusiness>
  );
}
