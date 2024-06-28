import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './Tabs.css';
import { TabsType } from '../../types/types';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

export function TopTabs({ onKeyChange }: TabsType) {
  const handleKey = (key: string) => {
    onKeyChange(key);
  };

  return <Tabs centered defaultActiveKey="1" items={items} onChange={handleKey} />;
}
