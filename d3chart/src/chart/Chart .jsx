import './index.css';

const Chart = ({ children, style = {}, width, height }) => {
    style.width = width;
    style.height = height;
    return <div style={style} className="y-chart">
        <svg width="100%" height="100%">
            <g transform={`translate(${width * 0.5}, ${height * 0.5})`}>
                {children}
            </g>
        </svg>
    </div>
}

export default Chart;