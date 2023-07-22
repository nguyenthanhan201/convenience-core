// import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// export function useGetOneById<T>(id: string, crudService: any): [T, Dispatch<SetStateAction<T>>] {
//   const [state, setState] = useState<T>(null);

//   useEffect(() => {
//     if (id) {
//       crudService.getOne({ id }).then(setState);
//     } else {
//       setState(null);
//     }
//   }, [id]);

//   return [state, setState];
// }
export {};
