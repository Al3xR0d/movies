import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './Tabs.css';
import { TabKeys } from '../../types/types';

interface Props {
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

export const TopTabs = ({ onKeyChange }: Props) => {
  return <Tabs centered defaultActiveKey={TabKeys.Search} items={items} onChange={onKeyChange} />;
}
