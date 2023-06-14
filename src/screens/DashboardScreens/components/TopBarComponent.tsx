import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { GetAccountsByUserState, GetReferralsByUserState, projectListByUserState } from "../../../types";

const TopBarComponent = () => {
  const projectListByUser = useSelector((state: RootState): projectListByUserState => state.projectListByUser as projectListByUserState);  

  const { projects } = projectListByUser


  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as GetAccountsByUserState);  

  const { accounts } = accountByUser

  const referralListByUser = useSelector((state: RootState): GetReferralsByUserState => state.referralListByUser as GetReferralsByUserState);  

  const { referrals } = referralListByUser
    return(
      <div className="row">
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              <div className="col-8">
                <div className="numbers">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">My Active Projects</p>
                  <h5 className="font-weight-bolder">
                  {projects && projects.filter(project => project.status === "active").length}
 / {projects?.length}
                  </h5>
                  {/* <p className="mb-0">
                    <span className="text-success text-sm font-weight-bolder">+55%</span>
                    since yesterday
                  </p> */}
                </div>
              </div>
              <div className="col-4 text-end">
                <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                  <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              <div className="col-8">
                <div className="numbers">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">My Customers</p>
                  <h5 className="font-weight-bolder">
                   {referrals && referrals.length}
                  </h5>
                  {/* <p className="mb-0">
                    <span className="text-success text-sm font-weight-bolder">+3%</span>
                    since last week
                  </p> */}
                </div>
              </div>
              <div className="col-4 text-end">
                <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                  <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              <div className="col-8">
                <div className="numbers">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">Platform Credits</p>
                  <h5 className="font-weight-bolder">
                    0
                  </h5>
                  {/* <p className="mb-0">
                    <span className="text-danger text-sm font-weight-bolder">-2%</span>
                    since last quarter
                  </p> */}
                </div>
              </div>
              <div className="col-4 text-end">
                <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                  <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              <div className="col-8">
                <div className="numbers">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">Accounts Under Me</p>
                  <h5 className="font-weight-bolder">
                   {accounts.length}
                  </h5>
                  {/* <p className="mb-0">
                    <span className="text-success text-sm font-weight-bolder">+5%</span> than last month
                  </p> */}
                </div>
              </div>
              <div className="col-4 text-end">
                <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                  <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}


export default TopBarComponent