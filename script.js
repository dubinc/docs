var script = document.createElement("script");
script.defer = true;
script.src = "https://www.dubcdn.com/analytics/script.site-visit.js";
script.dataset.domains = JSON.stringify({
  refer: "refer.dub.co",
  site: "site.dub.co",
});
document.getElementsByTagName("head")[0].appendChild(script);
