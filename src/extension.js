const addHandleOnClick = () => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams.get("q");

  const btn = document.getElementById("google-maps-btn");

  if (btn) {
    btn.href = `${window.location.origin}/maps/?q=${searchParams}`;
    btn.style.color = "#70757a";
    btn.style.textDecoration = "none";
    btn.style.padding = "0px 10px 10px 10px";
  }
};

const loadHTML = async () => {
  if (!document.querySelector(".crJ18e")) {
    return null;
  }
  try {
    const url = chrome.runtime.getURL("src/index.html");
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const html = await response.text();

    const googleNavBarContainer = document.querySelector(".crJ18e");
    const container = document.createElement("div");
    container.innerHTML = html;

    googleNavBarContainer.append(container);

    addHandleOnClick();
  } catch (e) {
    console.error("Error loading HTML: ", e);
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", loadHTML);
  window.addEventListener("load", loadHTML);
};

init();
