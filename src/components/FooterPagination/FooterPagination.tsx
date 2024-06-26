import { Pagination } from 'antd';
import './FooterPagination.css';

export function FooterPagination({ onChange, currentPage, totalPages }: any) {
  //   console.log(typeof totalPages);
  return (
    <div className="pagination">
      <Pagination
        defaultPageSize={20}
        current={currentPage}
        onChange={onChange}
        total={totalPages > 1000 ? 1000 : totalPages}
      />
    </div>
  );
}
