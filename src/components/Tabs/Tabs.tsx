import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './Tabs.css';
// import { CardList } from '../CardList/CardList';

// const onChange = (key: string) => {
//   console.log(key);
// };

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
    // children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Rated',
    // children: 'Content of Tab Pane 2',
  },
];

export function TopTabs({ onKeyChange }: any) {
  const handleKey = (key: string) => {
    onKeyChange(key);
  };

  return <Tabs centered defaultActiveKey="1" items={items} onChange={handleKey} />;
}
