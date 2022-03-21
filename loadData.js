// loadData.js
const Typesense = require('typesense');
module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: 'fkute4jm109ndpzvp-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
        port: '443', // For Typesense Cloud use 443
        protocol: 'https', // For Typesense Cloud use https
      },
    ],
    apiKey: 'bedDkEF82GRvdduCt3RaLVoWxKi2ynRT',
    connectionTimeoutSeconds: 2,
  };
  console.log('Config: ', TYPESENSE_CONFIG);
  const typesense = new Typesense.Client(TYPESENSE_CONFIG);
  const schema = {
    name: 'books',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'authors', type: 'string[]', facet: true },

      { name: 'publication_year', type: 'int32', facet: true },
      { name: 'ratings_count', type: 'int32' },
      { name: 'average_rating', type: 'float' },
    ],
    default_sorting_field: 'ratings_count',
  };
  const books = require('./dataset/books.json');
  try {
    const collection = await typesense.collections('books').retrieve();
    console.log('Found existing collection of books');
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== books.length) {
      console.log('Collection has diff number of docs than data');
      console.log('Deleting collection');
      await typesense.collections('books').delete();
    }
  } catch (err) {
    console.error(err);
  }
  console.log('Creating schema...');
  console.log(JSON.stringify(schema, null, 2));
  await typesense.collections().create(schema);
  console.log('Populating collection data...');
  try {
    const returnData = await typesense
      .collections('books')
      .documents()
      .import(books);

    console.log('Return data: ', returnData);
  } catch (err) {
    console.error(err);
  }
})();
