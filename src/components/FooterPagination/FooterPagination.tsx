import { Pagination } from 'antd';
import './FooterPagination.css';

export interface FooterProps {
  onChange: (e: number) => void;
  currentPage: number;
  totalPages: number | undefined;
}

export function FooterPagination({ onChange, currentPage, totalPages }: FooterProps) {
  const total = totalPages && totalPages > 1000 ? 1000 : totalPages;

  return (
    <div className="pagination">
      <Pagination defaultPageSize={20} current={currentPage} onChange={onChange} total={total} />
    </div>
  );
}
