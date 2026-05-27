const q = "terali pintu minimalis";
fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(q)}`)
  .then(r => r.text())
  .then(html => {
    const matches = [...html.matchAll(/murl&quot;:&quot;(http.*?)&quot;/g)];
    const urls = matches.map(m => m[1]).slice(0, 4);
    console.log(urls);
  });
