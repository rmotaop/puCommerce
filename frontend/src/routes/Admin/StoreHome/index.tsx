import './styles.css';
import {useEffect, useState} from "react";
import {User} from "../../../types/user";
import * as userService from '../../../services/user-service'
import {Simulate} from "react-dom/test-utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import error = Simulate.error;



export default function StoreHome() {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        userService.findMe()
            .then(response => {
                console.log(response.data);
                setUser(response.data)
            })
    },[]);

    return (
        <main>
            <section id="admin-home-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Bem-vindo à área dos lojistas {user?.name}</h2>
            </section>

            {/* DASHBOARD */}
            <div id="wrapper">
      <div className="content-area">
        <div className="container-fluid">
          <div className="text-right mt-3 mb-3 d-fixed">
            <a
              href="https://github.com/apexcharts/apexcharts.js/tree/master/samples/vanilla-js/dashboards/dark"
              target="_blank"
              className="btn btn-outline-warning mr-2"
            >
              <span className="btn-text">View Code</span>
            </a>
          </div>
          <div className="main">
            <div className="row sparkboxes mt-4">
              <div className="col-md-3">
                <div className="box box1">
                  <div className="details">
                    <h3>1213</h3>
                    <h4>CLICKS</h4>
                  </div>
                  <div id="spark1"></div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box box2">
                  <div className="details">
                    <h3>422</h3>
                    <h4>VIEWS</h4>
                  </div>
                  <div id="spark2"></div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box box3">
                  <div className="details">
                    <h3>311</h3>
                    <h4>LEADS</h4>
                  </div>
                  <div id="spark3"></div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box box4">
                  <div className="details">
                    <h3>22</h3>
                    <h4>SALES</h4>
                  </div>
                  <div id="spark4"></div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-5">
                <div className="box shadow mt-4">
                  <div id="radialBarBottom"></div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="box shadow mt-4">
                  <div id="line-adwords" className=""></div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-5">
                <div className="box shadow mt-4">
                  <div id="barchart"></div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="box shadow mt-4">
                  <div id="areachart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </main>
    )
}