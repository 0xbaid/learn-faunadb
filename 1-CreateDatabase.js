const faunadb = require('faunadb');
const q = faunadb.query;

(async () => {
  const client = new faunadb.Client({
    secret: 'fnAEDoH5ooACAZDHaYjpx48haqa1dpvS3VL_4VtZ',
  });
  try {
    const result = await client.query(
      q.CreateDatabase({ name: 'myTestDatabase' })
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
