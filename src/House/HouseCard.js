import React from "react"
import { Card, Icon, Avatar } from "antd"
import "../styles/house.css"

export default function HouseCard(props) {
  const { HouseInfo } = props
  const { Meta } = Card
  const desc = HouseInfo.desc.substring(0, 110) + "......"
  return (
    <Card
      style={{ width: 380 }}
      cover={<img alt="example" src={HouseInfo.imgSrc} />}
      bordered
      hoverable
      actions={[
        <Icon type="setting" />,
        <Icon type="edit" />,
        <Icon type="ellipsis" />
      ]}
    >
      <Meta
        avatar={<Avatar src={HouseInfo.avaSrc} />}
        title={HouseInfo.title}
        description={desc}
      />
    </Card>
  )
}
