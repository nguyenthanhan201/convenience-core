export {};
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { useEffect, useState } from 'react';
// import FileResizer from 'react-image-file-resizer';
// import { storage } from '../../config/firebase.config';

// export const useStorage = (file: File, _id: string) => {
//   // const [progress, setProgress] = useState(0);
//   // const [error, setError] = useState<any>();
//   const [url, setUrl] = useState<string>('');

//   // runs every time the file value changes
//   useEffect(() => {
//     if (file) {
//       const storageRef = ref(storage, `avatar/${_id}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         () => {
//           // track the upload progress
//           // const percentage = Math.round(
//           //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           // );
//           // setProgress(percentage);
//         },
//         (error) => console.log(error),
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             // console.log("File available at", downloadURL);

//             // Replace the firebase URL with ImageKit.io URL-endpoint
//             downloadURL = downloadURL.replace(
//               'https://firebasestorage.googleapis.com',
//               'https://ik.imagekit.io/ue5qe7gwv',
//             );

//             // // This can be downloaded directly:
//             // const xhr = new XMLHttpRequest();
//             // xhr.responseType = "blob";
//             // xhr.onload = function (event) {
//             //   const blob = xhr.response;
//             // };
//             // xhr.open("GET", url);
//             // xhr.send();

//             // // Or inserted into an <img> element:
//             // const img = document.getElementById("myimg");
//             // img.src = url;

//             setUrl(downloadURL);
//           });
//         },
//       );
//     }
//   }, [file]);

//   return { url };
// };

// export const resizeFile = async (file: File) => {
//   if (!file) return;

//   return new Promise((resolve) => {
//     FileResizer.imageFileResizer(
//       file,
//       750,
//       750,
//       'WEBP',
//       100,
//       0,
//       (uri) => {
//         // console.log(uri);
//         resolve(uri);
//       },
//       'file',
//     );
//   });
// };

// export const uploadImage = async (file: File, _id: string, nameFolder?: string | undefined) => {
//   if (!file) return false;
//   /* Creating a reference to the storage bucket. */
//   // if has nameFolder, then create a folder else create a file
//   const storageRef = ref(storage, nameFolder ? `${nameFolder}/${_id}` : `${_id}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);
//   return new Promise((resolve) => {
//     uploadTask.on(
//       'state_changed',
//       () => {
//         // track the upload progress
//         // const percentage = Math.round(
//         //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         // );
//         // console.log(percentage);
//       },
//       (error) => console.log(error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           // Replace the firebase URL with ImageKit.io URL-endpoint
//           downloadURL = downloadURL.replace(
//             'https://firebasestorage.googleapis.com',
//             `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_ID_IMAGEKIT}/tr:w-550,h-550`,
//           );

//           resolve(downloadURL);
//         });
//       },
//     );
//   })
//     .then((downloadURL) => {
//       return downloadURL;
//     })
//     .catch((error) => {
//       console.log(error);
//       return Promise.reject(error);
//     });
// };
