async function deleteUser(document) {
  try {
    await document.remove();
    return document;
  } catch(err) {
    throw err;
  }
}
export default deleteUser;