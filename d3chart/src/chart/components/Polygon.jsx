import classnames from "classnames";

function Polygon(props) {
    const { className, points } = props;

    const polygonClass = classnames('y-chart-polygon', className);

    return (
        <polygon className={polygonClass} points={points} />
    )
}

export default Polygon;