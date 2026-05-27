fetch('https://images.search.yahoo.com/search/images?p=' + encodeURIComponent('terali pintu minimalis'))
  .then(r => r.text())
  .then(html => {
    // Yahoo puts images in <img src='...'> or data-src
    const matches = [...html.matchAll(/<img[^>]+src='([^']+)'/g)].map(m => m[1]);
    console.log("Yahoo SRC:", matches.slice(0, 5));
    const dataSrc = [...html.matchAll(/data-src='([^']+)'/g)].map(m => m[1]);
    console.log("Yahoo DATA-SRC:", dataSrc.slice(0, 5));
  }).catch(console.error);
