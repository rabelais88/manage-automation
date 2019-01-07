import React from 'reactn';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  AutoComplete,
} from 'antd';

import IntegerStep from '../Components/IntegerStep';
// import { authUser } from '../Api';
import createTeams from '../Logic/createTeams';

class TeamCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamAmount: 1,
      teamName: '',
      teamPassword: '',
      teamGame: '',
      teamAge: 0,
      teamMemberAmount: 1,
    };
    this.setv = this.setv.bind(this);
    this.submit = this.submit.bind(this);
  }
  setv(type, event) {
    const newState = {};
    if (typeof event === 'object') newState[type] = event.target.value; // for form input
    else newState[type] = event; // for primal input
    this.setState(newState);
  }
  submit() {
    alert(JSON.stringify(this.state));
    // authUser(this.global.socket);
    createTeams(this.global.api, this.global.socket, this.state, this.global);
  }
  render() {
    const { setv } = this;
    const selectGame = this.global.games.map(game =>
      <Select.Option key={game.id} value={game.id}> {JSON.stringify(game.name)} </Select.Option>
    );
    const countriesId = this.global.countries.map(country => country.id);

    return (
      <Card title="팀 생성">
        <Form>
          <Form.Item label="팀 갯수">
            <IntegerStep value={this.state.teamAmount} onChange={d => setv('teamAmount', d)} min={1} max={64} />
          </Form.Item>
          <Form.Item label="팀 공통 닉네임(팀장:XXX0 멤버:XXX2, XXX3... 팀명:XXX - 아이디: XXX0@XXX.com)">
            <Input placeholder="기본 팀 닉네임 입력" onChange={e => setv('teamName', e)}/>
          </Form.Item>
          <Form.Item label="팀 공통 비밀번호">
            <Input placeholder="비밀번호 입력" type="password" onChange={e => setv('teamPassword', e) }/>
          </Form.Item>
          <Form.Item label="팀별 멤버 수">
            <IntegerStep value={this.state.teamMemberAmount} onChange={d => setv('teamMemberAmount', d)} min={1} max={12} />
          </Form.Item>
          <Form.Item label="게임 선택">
            <Select value={this.state.teamGame} onChange={d => setv('teamGame', d)}>
              {selectGame}
            </Select>
          </Form.Item>
          <Form.Item label="국가 선택">
            <AutoComplete
              value={this.state.teamCountry}
              onChange={d => setv('teamCountry', d)}
              dataSource={countriesId}
              placeholder="국가 ID를 입력해주세요"
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
          </Form.Item>
          <Form.Item label="나이 선택">
            <IntegerStep value={this.state.teamAge} onChange={d => setv('teamAge', d)} min={0} max={99}/>
          </Form.Item>
          <Button type="primary" onClick={this.submit}>팀 생성하기</Button>
        </Form>
      </Card>
    );
  }
}

export default TeamCreation;
