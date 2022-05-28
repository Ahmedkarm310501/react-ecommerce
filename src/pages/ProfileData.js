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
    fetch("http://127.0.0.1:8000/api/show-profile", {
      method: "POST",
        body: JSON.stringify({
          token: AuthCtx.token,
        }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            if (data.photo != null) {
              setImageUrl(
                `http://localhost:8000/${data.user.profile_photo_path}`
              );
            } else {
              console.log("no photo");
            }
            setName(data.user.name);
            setBirthDay(data.user.date_of_birth);
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
    // fetch("http://127.0.0.1:8000/api/update_user_user", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: name,
    //     token: AuthCtx.token,
    //     date_of_birth: birthDay,
    //     photo: userImage,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    const formDate = new FormData();
    formDate.append("name", name);
    formDate.append("token", AuthCtx.token);
    formDate.append("date_of_birth", birthDay);
    formDate.append("photo", userImage);
    axios
      .post("http://127.0.0.1:8000/api/update_user_user", formDate)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("true");
          setImageUrl(
            `http://localhost:8000/${res.data.user.profile_photo_path}`
          );
          snackbarRef.current.show();
        } else {
          console.log("eror");
          console.log(res);
        }
        // if (res.status == 200) {
        //   console.log("success");
        //   res.json().then((data) => {
        //     if (data.status == 200) {
        //       console.log(data);
        //       setImageUrl(
        //         `http://localhost:8000/${data.user.profile_photo_path}`
        //       );
        //       snackbarRef.current.show();
        //     } else {
        //       console.log("wrong");
        //     }
        //   });
        // } else {
        //   console.log(res);
        //   res.json().then((data) => {
        //     console.log(data);
        //   });
        // }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div className="page-haeder  col-12 ">
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
