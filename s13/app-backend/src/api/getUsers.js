import service from '../service';

async function getUsers(req, res, next) {
  console.log('req.query: ', req.query);
  try {
    const actions = listActions(req.query);
    const { users, count }= await service.getUsers({ 
      // filters: { name: 'bar'}
      filters: actions.filters,
      sorter: actions.sorter,
      page: actions.page,
      selectFields: actions.selectFields,
    });
    res.set('X-Total-Count', count);
    return res.json(users);
  } catch(err) {
    next(err);
  }

}

// high code complexity and has a high surface area for testing 
function listActionsOld(query) {
  //filters
  // <url>?_filters={"name": "foo"}
  const filters = query._filters ? JSON.parse(query._filters): {};
  // sorting
  // <url>?_sort=name&_order=ASC
  const sortField = query._sort || '_id';
  const sortOrder = query._order || 'DESC';
  const sorter = sortOrder === 'DESC' ? `-${sortField}`: sortField;
  //pagination
  // <url>?_start=1&_end=3
  const items = parseInt(query._end - query._start, 10) || 10;
  const skipItems = parseInt(query._start, 10) || 0;

  return {
    filters,
    sorter,
    page: {
      items,
      skipItems
    }
  }
}

// reduced complexity and offloading functionality to smaller functions. 
// Easy to test individual functionality.
function listActions(query)  {
  return {
    // <url>?_filters={"name": "foo"}
    filters: filter(query._filters),
    // <url>?_sort=name&_order=ASC
    sorter: sort(query._sort, query._order),
    // <url>?_start=1&_end=3
    page: paginate(query._start, query._end),
    // <url>?_select=name,email
    selectFields: select(query._select), 
  }
}

const filter = (filterFields = '{}') => JSON.parse(filterFields);
const sort = (sortField = '_id', order = 'DESC') => order === 'DESC' ? `-${sortField}`: sortField;
// const paginate = (start, end) => {
//   return {
//     items: parseInt(end - start, 10) || 10,
//     skipItems: parseInt(start, 10) || 0,
//   }
// };
const paginate = (start, end) => ({
  items: parseInt(end - start, 10) || 10,
  skipItems: parseInt(start, 10) || 0,
});
const select = (fields = null) => fields ? fields.split(',').join(' ') : fields; 
 

export default getUsers;