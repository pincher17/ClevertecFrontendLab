import { TabsProps } from "antd"

export interface TabsLoginsProps {
  onChange: (key: string) => void
  items: TabsProps['items']
  defaultActiveKey: string
}
