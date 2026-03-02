(function () {
  "use strict";

  const EMBED_URL =
    "http://localhost:8888/embed/support-chat?variant=bubble&context=docs";

  const BUBBLE_SIZE = 100;
  const PANEL_WIDTH = 580;
  const PANEL_HEIGHT = 700;

  function init() {
    if (document.getElementById("dub-support-iframe")) return;

    const iframe = document.createElement("iframe");
    iframe.id = "dub-support-iframe";
    iframe.src = EMBED_URL;
    iframe.title = "Dub Support Chat";
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("allow", "same-origin");
    iframe.style.cssText =
      "position:fixed;bottom:0;right:0;z-index:2147483646;" +
      "width:" + BUBBLE_SIZE + "px;height:" + BUBBLE_SIZE + "px;" +
      "border:none;background:transparent;color-scheme:auto;" +
      "transition:width 0.2s ease,height 0.2s ease;";

    window.addEventListener("message", function (e) {
      if (!e.data || e.data.type !== "dub-support-chat") return;
      if (e.data.isOpen) {
        iframe.style.width = Math.min(PANEL_WIDTH, window.innerWidth) + "px";
        iframe.style.height = Math.min(PANEL_HEIGHT, window.innerHeight) + "px";
      } else {
        iframe.style.width = BUBBLE_SIZE + "px";
        iframe.style.height = BUBBLE_SIZE + "px";
      }
    });

    document.body.appendChild(iframe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 100);
  }
})();
