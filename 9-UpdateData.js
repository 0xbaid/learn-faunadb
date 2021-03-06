const faunadb = require('faunadb');
const q = faunadb.query;
require('dotenv').config();

(async () => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  try {
    const result = await client.query(
      q.Update(q.Ref(q.Collection('posts'), '292327014899122695'), {
        data: { tags: ['serverless', 'scalable'] },
      })
    );
    console.log(result);
    result.data.tags.map((t) => console.log(t));
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
