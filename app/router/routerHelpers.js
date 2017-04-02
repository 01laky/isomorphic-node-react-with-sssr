export function getRoutePath(staticProps) {
  const BASE_PATH = '/';
  const { routes: { length } } = staticProps;
  const currentRouteIndex = length - 1;
  if (currentRouteIndex >= 0) {
    const { path } = staticProps.routes[currentRouteIndex];
    return path ? `/${path}` : BASE_PATH;
  }
  return BASE_PATH;
}

export function anotherFunction() {
  console.log('CALL ANOTHER FUNCTION');
}
