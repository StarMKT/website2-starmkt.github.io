let allowScrollToBottom = true;

function forceScrollToBottom() {
  if (!allowScrollToBottom) return;

  // Force it twice to beat layout shifts (e.g. image load)
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 50);
  }, 0);
}

// 1. Run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  forceScrollToBottom();
});

// 2. Run again after full page load (ensures all layout is resolved)
window.addEventListener("load", () => {
  forceScrollToBottom();
});

// 3. Also handle back/forward navigation properly
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    forceScrollToBottom();
  }
});

// 4. Helpers if needed
function disableScrollToBottom() {
  allowScrollToBottom = false;
}
function enableScrollToBottom() {
  allowScrollToBottom = true;
}
