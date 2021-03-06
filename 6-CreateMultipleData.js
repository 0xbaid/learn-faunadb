const faunadb = require('faunadb');
const q = faunadb.query;
require('dotenv').config();

(async () => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  try {
    const result = await client.query(
      q.Map(
        [
          'Gatsby.js generates static and dynamic websites',
          'FaunaDB is consistent',
          'Netlify deploys static assets on the Edge',
        ],
        q.Lambda(
          'post_title',
          q.Create(q.Collection('posts'), {
            data: { title: q.Var('post_title') },
          })
        )
      )
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
