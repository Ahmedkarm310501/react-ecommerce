import { useState } from "react";
// create forget password component react
const ForgetPassword = () => {
  return (
    // butifully forget password form
    <div className="all">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-2">Forget Password</h1>
                <p>Please enter your email address</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
