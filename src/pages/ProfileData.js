import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import ResetPassword from "./ResetPassword";
import DeleteAccountModal from "./DeleteAccountModal";
import { AuthContext } from "../store/auth-context";
import Snackbar from "../components/layout/UI/Snackbar";
import axios from "axios";

const ProfileData = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const imageRef = useRef();
  const snackbarRef = useRef(null);
  const AuthCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nl-a_HdCoqrQ1SrBeBEyD93i_Cfmrxq9Sg&usqp=CAU"
  );

  const handleImage = (file) => {
    setUserImage(file);
    console.log(file);
  };

  const showModal = (event) => {
    event.preventDefault();
    setPasswordModal(true);
  };
  const hideModal = () => {
    setPasswordModal(false);
  };

  const showDelete = (event) => {
    event.preventDefault();
    setDeleteModal(true);
  };
  const hideDelete = () => {
    setDeleteModal(false);
  };

  const nameChangedHandler = (event) => {
    setName(event.target.value);
  };
  const birthDayChangedHandler = (event) => {
    setBirthDay(event.target.value);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/user/profile", {
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);
            if (data.user.photo != null) {
              setImageUrl(`http://localhost:8000/${data.user.photo}`);
            } else {
              console.log("no photo");
            }
            setName(data.user.name);
            const date = new Date(data.user.dateOfBirth)
              .toISOString()
              .slice(0, 10);
            setBirthDay(date);
            setEmail(data.user.email);
          } else {
            console.log("wrong");
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  const updateUserData = (event) => {
    event.preventDefault();
    console.log(userImage);
    const formDate = new FormData();
    formDate.append("name", name);
    formDate.append("dateOfBirth", birthDay);
    formDate.append("photo", userImage);
    axios
      .put("http://127.0.0.1:8000/user/update-profile", formDate, {
        headers: {
          Authorization: AuthCtx.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("true");
          if (res.data.user.photo != null) {
            setImageUrl(`http://localhost:8000/${res.data.user.photo}`);
          }
          snackbarRef.current.show();
        } else {
          console.log("eror");
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div className="page-haeder  col-12 text-white mt-5">
        <h1>Profile</h1>
        <p>
          Manage your details, view your tier status and change your password
        </p>
      </div>
      <div className="info col-12 bg-white mb-5">
        <form className="d-flex flex-column p-3">
          <h1>General Info</h1>
          <hr className="mb-4" />
          <div className="inputs d-flex flex-wrap mb-4 justify-content-between align-items-center">
            <div className="col-12 col-md-3">
              <label htmlFor="first">First name</label>
              <input
                type="text"
                id="first"
                value={name}
                onChange={nameChangedHandler}
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <label htmlFor="last">Birth date</label>
              <input
                type="date"
                id="last"
                value={birthDay}
                onChange={birthDayChangedHandler}
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <img
                onClick={() => {
                  imageRef.current.click();
                }}
                className="img-fluid rounded-circle pointer"
                title="Click to Change"
                alt="Click to Change"
                src={imageUrl}
              />
              <input
                type="file"
                hidden
                ref={imageRef}
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </div>
          </div>
          <button className="secubtn mb-4 " onClick={updateUserData}>
            Update Info
          </button>
          {
            <Snackbar
              ref={snackbarRef}
              message="Data Updated  Successfully!"
              type={"success"}
            />
          }
        </form>
      </div>
      <div className="security col-12  bg-white mb-5">
        <form className="d-flex flex-column p-3">
          <h1>Security</h1>
          <hr className="mb-4" />
          <div className="inputs d-flex flex-wrap mb-4 ">
            <div className="col-12 col-md me-3 ">
              <label htmlFor="first">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={() => {}}
                disabled
              />
            </div>
            <div className="col-12 col-md mx-md-3 ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={`111111111111111`}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
          <div className="actions mb-4">
            <button className="secubtn me-3" onClick={showModal}>
              Change Password
            </button>
            <button className="secubtn btn-danger" onClick={showDelete}>
              Delete account
            </button>
            {passwordModal && <ResetPassword onClose={hideModal} />}
            {deleteModal && <DeleteAccountModal onClose={hideDelete} />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProfileData;
