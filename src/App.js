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
          { this.global.ready && this.global.loggedIn ? <TeamCreation global={this.global}/> : <p>로그인이 필요합니다. 로그인 해주세요</p>}
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
