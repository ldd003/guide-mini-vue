export function emit(instance, event, ...args) {
  const { props } = instance;
  const capitalizer = (e) => {
    return e ? "on" + e.charAt(0).toUpperCase() + e.slice(1) : "";
  };
  const cEvent = capitalizer(event);
  if (props[cEvent]) {
    props[cEvent](...args);
  }
}
