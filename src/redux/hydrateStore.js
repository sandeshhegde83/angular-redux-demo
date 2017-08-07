function hydrateStore(store , $sessionStorage) {
  return (actionType, key) => {
    store.dispatch(
    {
      type: actionType,
      data: $sessionStorage[key]
    });
  }
}

module.exports = hydrateStore;
