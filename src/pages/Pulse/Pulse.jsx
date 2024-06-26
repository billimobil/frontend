import "./Pulse.module.css";
import React, { useState, useEffect } from 'react';
import pulse from "../../assets/images/pulse.png"
import sanya from "../../assets/images/pulse_sanya.png"
import varya from "../../assets/images/pulse_varya.png"
import cs from "./Pulse.module.css"
export const Pulse = ({ user }) => {
    return (
        <div className={cs.div}>
            <img className={cs.pulse} src={pulse}/>
            <img className={cs.pulse} src={sanya}/>
            <img className={cs.pulse} src={varya}/>
        </div>

        // <div className={"div"}>
        //   <div className="div2">Пульс</div>
        //   <div className="div3">Арман Торениязов</div>
      //   <div className="div4">До теста</div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-73">
      //       [69, 68, 67, 71, 70, 72, 69, 70, 74, 66, 68, 65, 74, 73, 68, 67, 70, 74]
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-1">
      //     -{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-12">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-13">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-14">
      //     [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-15">
      //       [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-16">
      //     [1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-17">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-18">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-19">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-110">
      //     [1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-111">
      //     [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-112">
      //     [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0]{" "}
      //   </div>
      //   <div className="_1-0-0-1-1-1-1-1-1-1-1-1-1-1-1-1-113">
      //     [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-732">
      //       [77, 79, 81, 76, 77, 78, 77, 78, 74, 72, 76, 84, 85, 87, 83, 77, 75, 73]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-733">
      //       [76, 73, 76, 76, 77, 78, 77, 74, 71, 72, 73, 75, 78, 83, 78, 83, 78, 89, 81, 82, 75, 77, 72, 70, 73]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-734">
      //       [80, 77, 78, 77, 77, 79, 80, 80, 74, 70, 68, 70, 71, 75, 77, 79, 81, 81, 77, 74, 76, 77, 75, 69, 72]
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-735">
      //       [81, 78, 79, 78, 79, 81, 80, 79, 79, 80, 78, 81, 81, 82, 83, 84, 81, 81, 74]
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-736">
      //       [76, 73, 76, 76, 77, 78, 77, 74, 71, 72, 73, 75, 78, 83, 78, 83, 78, 89, 81, 82, 75]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-737">
      //       [-3, -2, -6, -5, -4, 5, -1, -5, -7, 2, -7, -6, -13, -2, -4, -6, -2, -2, 3, -12, -2, -10, 4, -9, -3]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-738">
      //       [-1, -3, 3, -2, -8, 10, -4, -3, -20, 12, 7, 6, -4, -5, 2, 0, 6, 8, 11, -12, 7, 3, 6, -5, -7]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-739">
      //       [10, 10, 20, 0, 35, 10, 5, 30, 25, 15, 5, 20, 25, 10, 35, 0]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-7310">
      //       [4, 0.4, 0.32, 2.02, 0.57, 0.33, 0.44, 7.08, 1.92, 7.19, 0.79, 2.37, 0.37, 0.15, 0.85, 1.54, 1.46]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-7311">
      //       [73, 70, 74, 74, 74, 75, 75, 73, 71, 75, 79, 70, 73, 78, 75, 73, 76, 74, 72, 74, 75, 70, 70]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-7312">
      //       [74, 74, 77, 81, 92, 91, 82, 87, 85, 91, 87, 84, 81, 83, 80, 85, 83, 80, 60, 77, 90, 74, 80, 81]{" "}
      //   </div>
      //   <div className="_95-100-85-73-95-100-85-73-95-100-85-73-95-100-85-7313">
      //       [73, 78, 82, 75, 73, 74, 74, 75, 77, 73, 77, 75, 74, 72, 77, 76, 71]{" "}
      //   </div>
      //   <div className="div5">Свет </div>
      //   <div className="div6">Звук </div>
      //   <div className="div7">Цвет </div>
      //   <div className="div8">Сложн свет </div>
      //   <div className="div9">Визуальный </div>
      //   <div className="div10">Круг </div>
      //   <div className="div11">Три круга </div>
      //   <div className="div12">Преследование </div>
      //   <div className="div13">Трекинг </div>
      //   <div className="div14">Внимание </div>
      //   <div className="div15">Память </div>
      //   <div className="div16">Мышление </div>
      //   <div className="rectangle-55"></div>
      //   <div className="rectangle-448"></div>
      //   <div className="rectangle-56"></div>
      //   <div className="rectangle-57"></div>
      //   <div className="rectangle-58"></div>
      //   <div className="rectangle-59"></div>
      //   <div className="rectangle-451"></div>
      //   <div className="rectangle-60"></div>
      //   <div className="rectangle-449"></div>
      //   <div className="rectangle-450"></div>
      //   <div className="rectangle-452"></div>
      //   <div className="rectangle-453"></div>
      //   <div className="rectangle-454"></div>
      //   <div className="rectangle-455"></div>
      //   <div className="rectangle-456"></div>
      //   <div className="rectangle-92"></div>
      //   <div className="rectangle-447"></div>
      // </div>
  );
};

export default Pulse;