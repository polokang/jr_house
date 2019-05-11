import React from "react"
import { addHouse } from "../Api/house"
import {
  Form,
  AutoComplete,
  Input,
  InputNumber,
  Tooltip,
  Icon,
  Button,
  Upload,
  Select,
  Cascader
} from "antd"
const company = [
  {
    value: "Queensland",
    label: "Queensland",
    children: [
      {
        value: "Brisbane",
        label: "Brisbane",
        children: [
          {
            value: "Ray White",
            label: "Ray White"
          }
        ]
      }
    ]
  },
  {
    value: "New South Wales",
    label: "New South Wales",
    children: [
      {
        value: "Sydney",
        label: "Sydney",
        children: [
          {
            value: "Real State",
            label: "Real State"
          }
        ]
      }
    ]
  }
]

const ownerList = []
const Option = Select.Option

class HouseEditView extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    myFile: null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let code = Math.random()
          .toFixed(6)
          .slice(-6)
        let addr = {}
        addr.postcode = 4000
        addr.city = "Brisbane"
        addr.address = values.address
        values.address = addr
        values.code = code
        values.ownerAvatar = values.owner[0]
        addHouse(values, values.upload[0].originFileObj).then(response => {
          this.props.history.push("/houses")
        })
      }
    })
  }

  normFile = e => {
    this.setState({ myFile: e.file.originFileObj })
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  selectedCompany = e => {
    let owners = [
      {
        id: "5cd60ca959118b00244c7e8a",
        name: "Hunter Zhou",
        avatar:
          "https://elasticbeanstalk-ap-southeast-2-619233410441.s3.ap-southeast-2.amazonaws.com/owner/5cd60ca959118b00244c7e8a.jpeg"
      },
      {
        id: "5cd6177559118b00244c7e8d",
        name: "Ela Milne",
        avatar:
          "https://elasticbeanstalk-ap-southeast-2-619233410441.s3.ap-southeast-2.amazonaws.com/owner/5cd6177559118b00244c7e8d.jpeg"
      },
      {
        id: "5cd618af59118b00244c7e8e",
        name: "Michael Mau",
        avatar:
          "https://elasticbeanstalk-ap-southeast-2-619233410441.s3.ap-southeast-2.amazonaws.com/owner/5cd618af59118b00244c7e8e.jpeg"
      },
      {
        id: "5cd619bd59118b00244c7e8f",
        name: "Lachlan Smith",
        avatar:
          "https://elasticbeanstalk-ap-southeast-2-619233410441.s3.ap-southeast-2.amazonaws.com/owner/5cd619bd59118b00244c7e8f.jpeg"
      },
      {
        id: "5cd61b1c59118b00244c7e90",
        name: "Jacky Leung",
        avatar:
          "https://elasticbeanstalk-ap-southeast-2-619233410441.s3.ap-southeast-2.amazonaws.com/owner/5cd61b1c59118b00244c7e90.jpeg"
      }
    ]
    for (let i = 0; i < owners.length; i++) {
      ownerList.push(<Option key={owners[i].avatar}>{owners[i].name}</Option>)
    }
    return e
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    const dataSource = [
      "545 St Kilda Road, Cal",
      "19 Eton St, Brisbane",
      "1300 Downing Street, Brisbane",
      "987 Wall Street, Brisbane"
    ]

    return (
      <div
        style={{
          width: "100%",
          paddingRight: "100px",
          backgroundColor: "white",
          paddingTop: 35
        }}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                Address&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "E.g. 2/545 St Kilda Road, Melbourne VIC 3004",
                  whitespace: true
                }
              ]
            })(
              <AutoComplete
                size="large"
                dataSource={dataSource}
                placeholder="E.g. 2/545 St Kilda Road, Melbourne VIC 3004"
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            )}
          </Form.Item>

          <Form.Item label={<span>Price&nbsp;</span>}>
            {getFieldDecorator("price", {
              initialValue: 10000,
              rules: [
                {
                  required: true,
                  message: "Please input house Price!"
                }
              ]
            })(
              <InputNumber
                step={1000}
                style={{ width: 150 }}
                size="large"
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            )}
          </Form.Item>

          <Form.Item label="Bed Room">
            {getFieldDecorator("bedroom", { initialValue: 1 })(
              <InputNumber size="large" min={0} max={10} />
            )}
          </Form.Item>

          <Form.Item label="Bath Room">
            {getFieldDecorator("bathroom", { initialValue: 1 })(
              <InputNumber size="large" min={0} max={10} initialValue={1} />
            )}
          </Form.Item>

          <Form.Item label="Car Park">
            {getFieldDecorator("carpark", { initialValue: 1 })(
              <InputNumber size="large" min={0} max={10} initialValue={1} />
            )}
          </Form.Item>

          <Form.Item label="Select Company">
            {getFieldDecorator("company", {
              initialValue: ["QLD", "Brisbane", "Ray White"],
              getValueFromEvent: this.selectedCompany,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your company!"
                }
              ]
            })(<Cascader options={company} />)}
          </Form.Item>

          <Form.Item label="Select Owner">
            {getFieldDecorator("owner", {
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select company first."
                }
              ]
            })(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select company first."
              >
                {ownerList}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Description">
            {getFieldDecorator("description")(<Input.TextArea />)}
          </Form.Item>

          <Form.Item label="Picture" extra="Upload Picture">
            {getFieldDecorator("upload", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: true,
                  message: "Please upload one picture at least!"
                }
              ]
            })(
              <Upload action="" name="logo" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const WrappedHorizontalHouseForm = Form.create()(HouseEditView)
export default WrappedHorizontalHouseForm
