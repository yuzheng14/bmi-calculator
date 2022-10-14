import { useState } from "react";
import PropTypes from "prop-types";

export default function BmiForm({ change }) {
    const defaultValues = {
        weight: "",
        height: "",
        date: "",
    }
    const [state, setState] = useState(defaultValues);

    // 监听输入栏改变
    const handleChange = e => {
        let { value, name } = e.target;
        if (value > 999) {
            value = 999;
        }
        const date = new Date().toLocaleString().split(",")[0];
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value,
                date
            };
        });
    };

    const handleSubmit = () => {
        // 调用 props 里的 change 函数
        console.log(`调用内层 handleSubmit ${state}`);
        change(state);
        setState(defaultValues);
    };

    return (
        <>
            <div className="row">
                <div className="col m6 s12">
                    <label htmlFor="weight">Weight (in kg)</label>
                    <input
                        id="weight"
                        name="weight"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="50"
                        value={state.weight}
                        onChange={handleChange}
                    />
                </div>

                <div className="col m6 s12">
                    <label htmlFor="height">Height (in cm)</label>
                    <input
                        id="height"
                        name="height"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="176"
                        value={state.height}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="center">
                <button
                    id="bmi-btn"
                    className="calculate-btn"
                    type="button"
                    disabled={state.weight === "" || state.weight === ""}
                    onClick={handleSubmit}
                >
                    Calculate BMI
                </button>
            </div>
        </>
    )
};

BmiForm.propTypes = {
    change: PropTypes.func.isRequired
};
