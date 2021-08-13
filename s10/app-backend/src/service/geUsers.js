import mongoose from 'mongoose';

async function getUsers(options) {
  const { 
    filters = {}, 
    sorter, 
    page = {}, 
    selectFields = null 
  } = options;

  try {
    const UserModel = mongoose.model('User');
    const countQuery = UserModel.countDocuments(filters);

    const listQuery = UserModel.find(filters) // filtering
      .sort(sorter) // sorting
      .skip(page.skipItems) // pagination
      .limit(page.items) // pagination
      .select(selectFields); // selection
    
    const [users, count] = await Promise.all([
      countQuery.exec(),
      listQuery.exec(),
    ])

    return { count, users };

  } catch(err) {
    throw err;
  }
}
export default getUsers;