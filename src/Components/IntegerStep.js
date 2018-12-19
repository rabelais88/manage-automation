import React from 'reactn';
import {
  Slider, InputNumber, Row, Col,
} from 'antd';

export default class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (value) => {
    this.props.onChange(value);
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            onChange={this.onChange}
            value={typeof this.props.value === 'number' ? this.props.value : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={this.props.min}
            max={this.props.max}
            style={{ marginLeft: 16 }}
            value={this.props.value}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}