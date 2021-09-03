import classnames from 'classnames';

function Layer(props) {
    const { children, className, ...other } = props;

    const layerClass = classnames('y-chart-layer', className);

    return (
        <g className={layerClass} {...other}>
            { children }
        </g>
    )
}

export default Layer;