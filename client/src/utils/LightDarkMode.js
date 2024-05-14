const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

const setDark = () =>  {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  return "dark";
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  return "light";
};


export  { setLight, setDark, defaultDark };