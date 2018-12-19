import React, { setGlobal } from 'reactn';
import 'antd/dist/antd.css';
import './App.css';
import {
  version,
  Card,
} from 'antd';
import TeamCreation from './Views/TeamCreation';
import { getGames, getCountries } from './Api';

class App extends React.Component {
  render() {
    return (
        <div>
          <Card title="antd version">
            {version}
          </Card>
          { this.global.ready ? <TeamCreation global={this.global}/> : null}
        </div>
    );
  }
  componentWillMount() {
    Promise.all([
      getGames(this.global.api),
      getCountries(this.global.api)
    ]).then(data => {
      const [games, countries] = data;
      setGlobal({
        ready: true,
        games,
        countries,
      })
    })
  }
}

export default App;
