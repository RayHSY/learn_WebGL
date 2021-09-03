import Layer from './components/Layer';
import Polygon from './components/Polygon';
import classnames from 'classnames';

const ARC = Math.PI * 2;

function Radar(props) {
    const { className, data = [], radius, level, fieldNames = [], range = [0, 100]} = props;
    const RadarClass = classnames('y-chart-radar', className);
    const angle = ARC / fieldNames.length;

    function getPoints(radius, angle) {
        let webs = '', webPoints = [];
        let n = 0;

        while (n <= ARC) {
            const x = radius * Math.cos(n);
            const y = radius * Math.sin(n);

            n += angle;
            webs += `${x},${y} `;
            webPoints.push({ x, y });
        }

        return {
            webs,
            webPoints
        }
    }

    function renderPolygon() {
        const polygonPoints = [];
        for (let i = level; i > 0; i--) {
            const r = radius / level * i;
            polygonPoints.push(getPoints(r, angle));
        }

        return (
            <Layer className="y-chat-radar-polygon">
                {
                    polygonPoints.map(points => <Polygon points={points.webs} />)
                }
            </Layer>
        )
    }

    function renderVerticalAxis() {
        const { webPoints: linePoints} = getPoints(radius, angle);
        return <Layer className="y-chart-radar-line">
            {
                linePoints.map(points => <line x1="0" y1="0" x2={points.x} y2={points.y} />)
            }
        </Layer>
    }

    function renderLabel() {
        const {webPoints: textPoints} = getPoints(radius + 20, angle);

        return <Layer className="y-chart-label">
            {
                textPoints.map((point, i)=> <text x={point.x - 15} y={point.y + 5}>{fieldNames[i]}</text>)
            }
        </Layer>
    }

    function renderData() {
        let dataPoints = '';

        // eslint-disable-next-line array-callback-return
        fieldNames.map((name, i) => {
            const selectedD = (data.filter(d => d.name === name) || [])[0];

            if (selectedD) {
                const r = (selectedD.value - range[0]) / (range[1] - range[0]) * radius;
                const x = r * Math.cos(angle * i);
                const y = r * Math.sin(angle * i);

                dataPoints += `${x},${y} `;
            }
        })

        return <Layer className="y-chart-area">
            <Polygon points={dataPoints} />
        </Layer>

    }

    return (
        <Layer className={RadarClass}>
            { renderPolygon() }
            { renderVerticalAxis() }
            { renderLabel() }
            { renderData() }
        </Layer>
    )
}

export default Radar;