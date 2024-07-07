import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './Tabs.css';
import { TabKeys } from '../../types/types';

export interface TabsType {
  onKeyChange: (key: string) => void;
}

const items: TabsProps['items'] = [
  {
    key: TabKeys.Search,
    label: 'Search',
  },
  {
    key: TabKeys.Rated,
    label: 'Rated',
  },
];

export function TopTabs({ onKeyChange }: TabsType) {
  return <Tabs centered defaultActiveKey="1" items={items} onChange={onKeyChange} />;
}
