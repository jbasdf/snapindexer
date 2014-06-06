var client = new elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'trace'
});

export default client;