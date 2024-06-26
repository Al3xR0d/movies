// import { Input } from 'antd';
// import { MovieApi } from '../MovieApi/MovieApi';
// import debounce from 'debounce';
// import { useState } from 'react';

// export function SearchInput() {
//   // const searchMovies = (e) => {
//   //   trimUserRequest = e.target.value.replace(/ +/g, ' ').trim();
//   // };

//   const [result, setResult] = useState<string>('');

//   // const search = (e: any) => {
//   //   // console.log(e);
//   //   setResult(e.target.value);
//   //   console.log(result);
//   // };

//   const movieaApi = new MovieApi();

//   const search = (e: any) => movieaApi.searchMovies(e.target.value).then((item) => setResult(item));

//   // const searchDebounce = () => {
//   //   debounce(search, 1000);
//   //   console.log(result);
//   // };

//   return <Input placeholder="Type to search..." onChange={debounce(search, 1000)} />;
// }
