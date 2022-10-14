import PropTypes from "prop-types";

export default function Info({ weight, height, id, date, bmi, deleteCard }) {
    return (
        <div className="col m6 s12">
            <div className="card">
                <div className="card-content">
                    <span className="card-title" date-test="bmi">
                        BMI: {bmi}
                    </span>
                    <div className="card-data">
                        <span data-test="weight">Weight: {weight} kg</span>
                        <span data-test="height">Height: {height} cm</span>
                        <span data-test="date">Date: {date}</span>
                    </div>

                    <button className="delete-btn" onClick={() => deleteCard(id)}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    weight: PropTypes.string,
    height: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
    bmi: PropTypes.string,
    delecteCard: PropTypes.func,
};
