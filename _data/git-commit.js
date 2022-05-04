const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

function githubUrl(githubPath) {
  return `https://raw.githubusercontent.com/${githubPath}`;
}

// Get the code from GitHub given a repository and path
async function fetchCode(githubPath) {
  const response = await fetch(githubUrl(githubPath));
  const code = await response.text();
  return { githubPath, code }
}

async function createSnippetMap(snippetList) {
  const snippets = await Promise.all(snippetList);
  const snippetMap = {};
  snippets.forEach(({ githubPath, code }) => {
    snippetMap[githubPath] = code;
  });
  return snippetMap;
}

module.exports = createSnippetMap([
  fetchCode('davideast/eleventy-include-github-code/main/index.js'),
  fetchCode('davideast/eleventy-include-github-code/main/github.js'),
]);
