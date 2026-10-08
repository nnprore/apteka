const CACHE='dorixona-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||r.url.includes('supabase.co'))return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(ch=>ch.put(r,c));return res;}).catch(()=>caches.match(r)));
});
