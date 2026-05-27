fetch('https://html.duckduckgo.com/html/?q=terali+pintu+minimalis')
  .then(r => r.text())
  .then(html => {
    // try to extract images
    const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    console.log(images.slice(0,5));
  });
