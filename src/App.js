import React from 'reactn';
import 'antd/dist/antd.css';
import './App.css';
import {
  version,
  Card,
} from 'antd';
import TeamCreation from './Views/TeamCreation';

class App extends React.Component {
  render() {
    return (
        <div>
          <Card title="antd version">
            {version}
          </Card>
          <TeamCreation />
        </div>
    );
  }
}

export default App;
