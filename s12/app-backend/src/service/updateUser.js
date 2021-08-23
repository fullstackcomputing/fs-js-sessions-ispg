
async function updateUser(document, fields = {} ) {
  // fields = { name: 'foo', email: 'qeq' };
  try {
     const fieldKeys = Object.keys(fields); // ['name', 'email', 'virus'];
     fieldKeys.forEach((fieldKey) => {
        document[fieldKey] = fields[fieldKey];
     }); 

     await document.validate();
     await document.save();

     return document;

  } catch(err) {

    throw err;
  }

}

export default updateUser;
