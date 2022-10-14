import { useEffect, useState } from "react";
import "materialize-css/dist/css/materialize.min.css"

import BmiForm from "../BmiForm/BmiForm";
import Info from "../Info/Info";
import { getData, removeLastState, storeData } from "../../helpers/localStorage";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import Bar from "../Bar/Bar"

export default function App() {
    // localStorage 中的 data 为全部数据
    const initialState = () => getData("data") || [];
    // 全部数据，为数组，每一个元素为一条记录信息，最大长度为 7
    const [state, setState] = useState(initialState);
    // 全部数据的 date 和 bmi 两个数组
    const [data, setData] = useState({});

    // 挂载后以及每次 state 发生变化后
    // 将变化的 state 存储到 localStorage
    // 重新设置 data
    useEffect(() => {
        storeData("data", state);
        const date = state.map(obj => obj.date);
        const bmi = state.map(obj => obj.bmi);
        let newData = { date, bmi };
        setData(newData);
    }, [state]);

    // 提交表单时触发此函数
    // 计算 bmi 和 id 并附上
    // 将新的 val 放入 state 中
    // val 为 {height,weight,date}
    const handleChange = val => {
        console.log(`调用外层 handleChange ${val}`);
        let heightInM = val.height / 100;
        val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
        val.id = uuidv4();
        let newVal = [...state, val];
        let len = newVal.length;
        if (len > 7) newVal = newVal.slice(1, len);
        setState(newVal);
    };

    // 点击历史数据的 X 时触发
    // 将当前的 state 储存到 localStorage 的 lastState字段
    // 浅拷贝 state 中 id 不为该 id 的记录
    // 更新 state
    const handleDelete = id => {
        storeData("lastState", state);
        let newState = state.filter(elem => {
            return elem.id !== id;
        });
        setState(newState);
    };

    // 取出 localStorage 中的 lastState 用于更新状态
    const handleUndo = () => {
        setState(getData("lastState"));
        // TODO 尝试解决点击 Undo 后仍然显示 undo 的bug
        removeLastState();
    }

    return (
        <div className="container">
            <div className="row center">
                <h1 className="white-text"> BMI Tracker</h1>
            </div>
            <div className="row">
                <div className="col m12 s12">
                    <BmiForm change={handleChange} />
                    <Bar labelData={data.date} bmiData={data.bmi} />
                    <div>
                        <div className="row center">
                            <h4 className="white-text">最近七条历史记录</h4>
                        </div>
                        <div className="data-container row">
                            {state.length > 0 ? (
                                <>
                                    {state.map(info => (
                                        <Info
                                            key={info.id}
                                            id={info.id}
                                            weight={info.weight}
                                            height={info.height}
                                            date={info.date}
                                            bmi={info.bmi}
                                            delecteCard={handleDelete}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className="center white-text">No log found</div>
                            )}
                        </div>
                    </div>
                    {/* TODO 改进 */}
                    {getData("lastState") !== null && (
                        <div className="center">
                            <button className="calculate-btn" onClick={handleUndo}>
                                撤销
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};