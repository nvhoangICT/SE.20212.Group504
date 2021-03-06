import React, {useState} from "react";
import {ReactDOM} from "react";
import "./ChangePassword.css";
import {Alert, Button} from "@mui/material";
import axios from "axios";
import InputWithValidate from "../../../../shared/Layout/InputWithValidate";
import {
  validateEmail,
  validatePassword,
} from "../../../../shared/utils/Validate";
import {CircleLoader, PacmanLoader, PropagateLoader} from "react-spinners";
import {FaTimesCircle} from "react-icons/fa";

export default function ChangePassword({callBack}) {
  async function postData(password, newpass, confirmpassword) {
    let tooken = localStorage.getItem("token");

    const url = "https://nmcnpm.herokuapp.com/api/v1/admin/changepass";
    const data = {
      password: password,
      newpass: newpass,
    };
    setIsLoading(true);
    const res = await axios
      .post(url, data, {headers: {Authorization: `Bearer ${tooken}`}})
      .then(function (response) {
        const getData = response.data;
        console.log(response.data.status);
        if (getData.status === false) {
          const message = getData.msg;
          setServerMessage([message, serverMessage[1]]);
          console.log("123");
        } else {
          console.log("456");
          // localStorage.setItem("token", getData.token)
          localStorage.setItem("info", JSON.stringify(getData.data));
          callBack(role);
          alert(getData.msg);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    setIsLoading(false);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setOldPassword] = useState("");
  const [newpass, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [needValidateState, setValidate] = useState(1);
  const [serverMessage, setServerMessage] = useState(["", "", ""]);
  const [role, setRole] = useState("admin");
  const [isChange, setIsChange] = useState(false);

  return (
    <div className="TanPN-changePasswordModel">
      <div className="TanPN-changePasswordModelOverlay"></div>
      <div className="TanPN-chanfePasswordModelBody">
        <div className="TanPN-changePassword">
          <div className="TanPN-changePassword__header">
            <p className="TanPN-changePassword__headertxt">Change password</p>
            <button className="iconnnn" onClick={callBack}>
              <FaTimesCircle></FaTimesCircle>
            </button>
          </div>
          <div className="TanPN-changePassword__body">
            {/* old password */}
            <div className="TanPN-changePassword__bodyOld">
              <InputWithValidate
                className="TanPN-changePassword__bodyOldInput"
                placeholder="Enter your old password"
                message={serverMessage[0]}
                password={true}
                callBack={(value) => setOldPassword(value)}
                valueState={password}
                needValidateState={needValidateState}
                validate={validatePassword}
              />

              <div className="TanPN-changePassword__bodyOldMatch">
                {/* Password is not matched. */}
              </div>
            </div>

            {/* new password */}
            <div className="TanPN-changePassword__bodyNew">
              <InputWithValidate
                className="TanPN-changePassword__bodyOldInput"
                placeholder="Enter your new password"
                message={serverMessage[1]}
                password={true}
                callBack={(value) => setNewPassword(value)}
                valueState={newpass}
                needValidateState={needValidateState}
                validate={validatePassword}
              />
              <div className="TanPN-changePassword__bodyNewMatch">
                {/* Password is not invalid. */}
              </div>
            </div>
            <div className="TanPN-changePassword__bodyConfirm">
              <InputWithValidate
                className="TanPN-changePassword__bodyOldInput"
                placeholder="Enter your confirm password"
                message={serverMessage[2]}
                password={true}
                callBack={(value) => setConfirmPassword(value)}
                valueState={confirmpassword}
                needValidateState={needValidateState}
                validate={validatePassword}
              />
              <div className="TanPN-changePassword__bodyConfirmMatch">
                {/* Password must be the same. */}
              </div>
            </div>
          </div>
          <div className="TanPN-changePassword__control">
            <div className="TanPN-changePassword__controlBut">
              <button
                disabled={isLoading}
                className="but1 TanPN-changePassword__controlButSave"
                onClick={() => {
                  if (confirmpassword === newpass) {
                    setValidate(needValidateState + 1);
                    setServerMessage(["", ""]);
                    if (
                      validatePassword(password) == "" &&
                      validatePassword(newpass) == ""
                    ) {
                      postData(password, newpass, confirmpassword);
                    }
                  } else {
                    setValidate(needValidateState + 1);
                    setServerMessage(["", "", "Password not match"]);
                  }
                }}
              >
                {" "}
                {isLoading ? (
                  <CircleLoader color="white" size={10} />
                ) : (
                  "Save"
                )}{" "}
              </button>

              <button
                className="but1 TanPN-changePassword__controlButCan"
                onClick={callBack}
              >
                Cancel
              </button>
            </div>
            <button
              className="TanPN-changePassword__controltxt"
              onClick={() => {
                alert("Say no baby !!!");
              }}
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
