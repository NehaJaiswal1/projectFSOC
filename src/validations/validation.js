//Name

const validateName = (name) => {
    return /^([a-zA-Z ]){2,30}$/.test(name);
  };
  
  // Email
  
  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
  };
  
  //Password
  
  const validatePassword = (password) => {
    //8-12 characters, one lowercase letter and one number and maybe one UpperCase & special character:
    return /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,12}$/.test(password);
  };
  
  // const validatetitle = (title)=>{
  //   return /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{1,70}$/.test(title);
  // }

  const fileValidation = (resume) =>{
    return /^.*\.(pdf|PDF)$/.test(resume)
  }

  // function fileSizeValidate (el) {
  //   var maxfilesize = 1024 * 1024,  // 1 Mb
  //       filesize    = el.files[0].size,
  //       warningel   = document.getElementById( 'lbError' );
  
  //   if ( filesize > maxfilesize )
  //   {
  //     warningel.innerHTML = "File too large: " + filesize + ". Maximum size: " + maxfilesize;
  //     return false;
  //   }
  //   else
  //   {
  //     warningel.innerHTML = '';
  //     return true;
  //   }   
  // }


//   function Filevalidation = (resumeFile) => {
//     const fi = document.getElementById('file');
//     // Check if any file is selected.
//     if (fi.files.length > 0) {
//         for (const i = 0; i <= fi.files.length - 1; i++) {
  
//             const fsize = fi.files.item(i).size;
//             const file = Math.round((fsize / 1024));
//             // The size of the file.
//             if (file >= 4096) {
//                 alert(
//                   "File too Big, please select a file less than 4mb");
//             } else if (file < 2048) {
//                 alert(
//                   "File too small, please select a file greater than 2mb");
//             } else {
//                 document.getElementById('size').innerHTML = '<b>'
//                 + file + '</b> KB';
//             }
//         }
//     }
// }
  module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    fileValidation
    // fileSizeValidate
  };
  