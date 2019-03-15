export function getFromLocalStorage(name, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(name)) || {};
    } catch (e) {
      console.error(e);
    }
  }
  return ls[key];
}

export function saveToLocalStorage(name, key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      name,
      JSON.stringify({
        [key]: value
      })
    );
  }
}