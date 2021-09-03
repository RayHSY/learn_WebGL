
import Radar from './chart/Radar';
import Chart from './chart/Chart ';
import './App.css';

const fieldNames = ['语文','数学','外语','物理','化学','生物','政治','历史'];
const data = [
  { name: '语文', value: 60 }, { name: '数学', value: 40 }, { name: '外语', value: 50 },
  { name: '物理', value: 20 }, { name: '化学', value: 30 }, { name: '生物', value: 50 },
  { name: '政治', value: 80 }, { name: '历史', value: 50 },
];

function App() {
  return (
    <div className="App">
      <Chart width={600} height={600}>
        <Radar
          fieldNames={fieldNames}
          level={4}
          radius={150}
          data={data}
        />
      </Chart>
    </div>
  );
}

export default App;
