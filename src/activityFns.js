export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function people(location) {
  return prefix(location, "people");
}

export function planets(location) {
  return prefix(location, "planets");
}

export function metalK8s(location) {
  return prefix(location, "metalK8s");
}
