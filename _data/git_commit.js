const axios = require('axios');
require('dotenv').config();

const gitlabRepoInfo = async () => {
  const {GITLAB_API_TOKEN: token} = process.env;
  const headers = {'PRIVATE-TOKEN': `${token}`, 'Access-Control-Allow-Origin': true}
  const request = await axios.get('https://gitlab.com/api/v4/projects/35792786/repository/commits', {
    method: 'GET',
    mode: 'cors',
    headers,
  });
  const statuscode = await request.status;
  const response = await request.data;

  return {statuscode, response};
};

const commitId = async () => {
  const data = await gitlabRepoInfo();
  return (data.response[0].short_id).toString();
};

const fetchRepoData = async fields => {
  const data = await gitlabRepoInfo();
  const object = fields.reduce((acc, key) => {
    ({...acc, ...({[key]: data[key]})}, {});
  });

  return {object};
};

const allRepoData = async fields => {
  const data = await Promise.all(fields);
  const dataFields = {};
  data.forEach(({object}) => {
    dataFields[object] = data;
  });

  return dataFields;
}

module.exports = allRepoData([
  fetchRepoData(['id']),
  fetchRepoData(['short_id']),
  fetchRepoData(['author_name']),
]);
