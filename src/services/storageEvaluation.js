function getSavedComents(id) {
  return JSON.parse(localStorage.getItem(id));
}

function saveComent(obj, id) {
  const data = getSavedComents(id) || [];
  localStorage.setItem(id, JSON.stringify([...data, obj]));
}

export { getSavedComents, saveComent };
