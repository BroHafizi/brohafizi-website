var allPosts=[];
var catColors={"Dakwah":"#1a56db","Artikel Dakwah":"#1a56db","Artikel Islam":"#059669","Kursus":"#7c3aed","Kursus Dakwah":"#7c3aed","Kursus Istitabah":"#7c3aed","Social Media":"#dc2626","Persoalan tentang Islam":"#d97706","Tips Dakwah":"#0891b2","Islam & Sains":"#059669","Dakwah Digital":"#db2777"};
var curFilter="all",curSearch="",curPage=1,perPage=9,filtered=[];

function cc(c){return catColors[c]||"#6b7280";}
function esc(s){return (s||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

function renderFeatured(){
  if(!allPosts.length) return;
  var top2=allPosts.slice(0,2);
  var el=document.getElementById("featuredGrid");
  if(!el) return;
  el.innerHTML=top2.map(function(p){
    var badges=p.cats.slice(0,2).map(function(c){return'<span class="fcat-badge">'+esc(c)+'</span>';}).join("");
    var imgTag=p.img?'<img class="featured-img" src="'+p.img+'" alt="" loading="eager">':"";
    return'<a class="featured-card" href="'+p.link+'" target="_blank" rel="noopener">'+imgTag+'<div class="featured-overlay"><div>'+badges+'</div><div class="featured-title">'+esc(p.title)+'</div><div class="featured-meta">'+p.dateDisplay+'</div></div></a>';
  }).join("");
}

function renderPosts(){
  var grid=document.getElementById("postsGrid");
  var noRes=document.getElementById("noResults");
  var countEl=document.getElementById("postsCount");
  var loadWrap=document.getElementById("loadWrap");
  var loadBtn=document.getElementById("loadBtn");
  var loadInfo=document.getElementById("loadInfo");
  var loadingMsg=document.getElementById("loadingMsg");
  if(!grid) return;
  if(loadingMsg) loadingMsg.style.display="none";
  countEl.textContent=filtered.length+" artikel";
  if(filtered.length===0){
    grid.innerHTML="";
    noRes.style.display="block";
    loadWrap.style.display="none";
    return;
  }
  noRes.style.display="none";
  var src=(curFilter==="all"&&!curSearch)?filtered.slice(2):filtered;
  var toShow=src.slice(0,curPage*perPage);
  grid.innerHTML=toShow.map(function(p){
    var cats=p.cats.slice(0,2).map(function(c){
      var col=cc(c);
      return'<span class="post-cat" style="background:'+col+'20;color:'+col+'">'+esc(c)+'</span>';
    }).join("");
    var imgEl=p.img
      ?'<div class="post-img-wrap"><img class="post-img" src="'+p.img+'" alt="" loading="lazy"></div>'
      :'<div class="post-img-ph"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
    return'<a class="post-card" href="'+p.link+'" target="_blank" rel="noopener">'+imgEl+'<div class="post-body"><div class="post-cats">'+cats+'</div><div class="post-title">'+esc(p.title)+'</div><div class="post-excerpt">'+esc(p.excerpt)+'</div><div class="post-meta"><span>'+p.dateDisplay+'</span><span class="post-read">Baca &rarr;</span></div></div></a>';
  }).join("");
  if(toShow.length<src.length){
    loadWrap.style.display="block";
    loadBtn.disabled=false;
    loadBtn.textContent="Muat Lebih Artikel";
    loadInfo.textContent="Papar "+toShow.length+" daripada "+src.length+" artikel";
  } else {
    if(src.length>perPage){
      loadWrap.style.display="block";
      loadBtn.disabled=true;
      loadBtn.textContent="Semua artikel dipaparkan";
    } else {
      loadWrap.style.display="none";
    }
  }
}

function applyFilter(){
  filtered=allPosts.filter(function(p){
    var mc=curFilter==="all"||p.cats.indexOf(curFilter)>-1;
    var ms=!curSearch||p.title.toLowerCase().indexOf(curSearch.toLowerCase())>-1||p.excerpt.toLowerCase().indexOf(curSearch.toLowerCase())>-1;
    return mc&&ms;
  });
  curPage=1;
  renderPosts();
}

function filterBy(cat,btn){
  curFilter=cat;curSearch="";curPage=1;
  document.getElementById("searchInput").value="";
  document.querySelectorAll(".fcat").forEach(function(b){b.classList.remove("active");});
  btn.classList.add("active");
  document.getElementById("featuredSection").style.display=cat==="all"?"block":"none";
  applyFilter();
}

function searchBy(val){
  curSearch=val;curFilter="all";curPage=1;
  document.querySelectorAll(".fcat").forEach(function(b){b.classList.remove("active");});
  document.querySelectorAll(".fcat")[0].classList.add("active");
  document.getElementById("featuredSection").style.display=val?"none":"block";
  applyFilter();
}

function loadMore(){
  curPage++;
  renderPosts();
  window.scrollBy({top:300,behavior:"smooth"});
}

document.addEventListener("DOMContentLoaded",function(){
  fetch("/posts.json")
    .then(function(r){return r.json();})
    .then(function(data){
      allPosts=data;
      renderFeatured();
      applyFilter();
    })
    .catch(function(e){
      var msg=document.getElementById("loadingMsg");
      if(msg) msg.textContent="Ralat memuatkan artikel.";
      console.error(e);
    });
});
