export async function Ping() {
  return await fetch('http://naveo.local:2376/_ping').then(
    (response) => response.status
  );
}

export async function ContainersEndpoint() {
  return await fetch('http://naveo.local:2376/v1.41/containers/json').then(
    (response) => response.json()
  );
}

export async function ImagesEndpoint() {
  return await fetch('http://naveo.local:2376/v1.41/images/json').then(
    (response) => response.json()
  );
}

export async function VolumesEndpoint() {
  return await fetch('http://naveo.local:2376/volumes').then((response) =>
    response.json()
  );
}
