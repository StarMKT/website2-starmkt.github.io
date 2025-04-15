// backwards-rendering.js

let allowScrollToBottom = true;

function scrollToBottom() {
    if (allowScrollToBottom) {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    allowScrollToBottom = true;
    setTimeout(scrollToBottom, 100);
});

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        allowScrollToBottom = true;
        setTimeout(scrollToBottom, 100);
    } else {
        scrollToBottom();
    }
});

window.onload = function () {
    allowScrollToBottom = true;
    setTimeout(scrollToBottom, 100);
};

// Optional: expose a helper to toggle scroll behavior
function disableScrollToBottom() {
    allowScrollToBottom = false;
}

function enableScrollToBottom() {
    allowScrollToBottom = true;
}
