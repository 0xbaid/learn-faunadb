const faunadb = require('faunadb');
const q = faunadb.query;
require('dotenv').config();

(async () => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  try {
    const result = await client.query(
      q.CreateIndex({
        name: 'all_posts',
        source: q.Collection('posts'),
        terms: [{ field: ['data', 'title'] }],
      })
    );
    console.log(result);
  } catch (error) {
    if (
      error.requestResult.statusCode === 400 &&
      error.message === 'instance already exists'
    ) {
      console.log('Database with this name already exists');
    } else {
      console.log('Unknow Error: ');
      console.log(error);
    }
  }
})();
