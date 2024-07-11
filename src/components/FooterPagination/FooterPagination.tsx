import { Pagination } from 'antd';
import './FooterPagination.css';

interface Props {
  onChange: (e: number) => void;
  currentPage: number;
  totalPages: number | undefined;
}

export const FooterPagination = ({ onChange, currentPage, totalPages }: Props) => {
  const total = totalPages && totalPages > 1000 ? 1000 : totalPages;

  return (
    <div className="pagination">
      <Pagination defaultPageSize={20} current={currentPage} onChange={onChange} total={total} />
    </div>
  );
}
