exports.render = data => {
  return `<ul>
    ${data.collections.post.map(post =>
      `<li${data.page.url === post.url ? ` aria-current="page"` : ""}>${post.data.title}</li>`
    ).join("\n")}
  </ul>`;
};