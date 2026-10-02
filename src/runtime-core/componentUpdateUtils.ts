export function shouldUpdateComponent(n1, n2) {
  const { props: prevProps } = n1;
  const { props: nextProps } = n2;
  for (let k in nextProps) {
    if (nextProps[k] !== prevProps[k]) {
      return true;
    }
  }
  return false;
}
