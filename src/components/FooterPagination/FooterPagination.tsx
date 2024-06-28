import { Pagination } from 'antd';
import './FooterPagination.css';
import { Footer } from '../../types/types';

export function FooterPagination({ onChange, currentPage, totalPages }: Footer) {
  const total = totalPages && totalPages > 1000 ? 1000 : totalPages;

  return (
    <div className="pagination">
      <Pagination defaultPageSize={20} current={currentPage} onChange={onChange} total={total} />
    </div>
  );
}
