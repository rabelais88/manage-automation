import React from 'reactn';
import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import IntegerStep from '../Components/IntegerStep';

class TeamCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamAmount: 1,
      teamName: '',
      teamPassword: '',
    };
    this.setV = this.setV.bind(this);
  }
  setV(type, value) {
    const newState = {};
    newState[type] = value;
    this.setState(newState);
  }
  render() {
    const { setV } = this;
    return (
    <Card title="팀 생성">
      <Form>
        <Form.Item label="팀 갯수">
          <IntegerStep value={this.state.teamAmount} onChange={d => setV('teamAmount', d)}></IntegerStep>
        </Form.Item>
        <Form.Item label="팀 공통 이름(뒤에 숫자가 붙습니다)">
          <Input placeholder="기본 팀 이름 입력" onChange={d => setV('teamName', d)}/>
        </Form.Item>
        <Form.Item label="팀 공통 비밀번호">
          <Input placeholder="비밀번호 입력" type="password" onChange={ d => setV('teamPassword', d) }/>
        </Form.Item>
        <Form.Item label="게임 선택">
          
        </Form.Item>
        <Button type="primary">팀 생성하기</Button>
      </Form>
    </Card>
    );
  }
}

export default TeamCreation;
