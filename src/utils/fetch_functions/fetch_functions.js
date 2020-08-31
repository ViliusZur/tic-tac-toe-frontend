const retrieveLogs = async () => {
  // retrieves logs and game state from API
  const query = 'http://localhost:8080/api/getLogs';
  let getData = await fetch(query, {
    credentials: 'include',
    method: "GET",
    headers:
    {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  let json = await getData.json();
  return json;
}

const closeSession = async () => {
  // sends a request to the API to close the session
  const query = 'http://localhost:8080/api/closeSession';
  await fetch(query, {
    credentials: 'include',
    method: 'POST',
    headers:
    {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
}

const postData = async (data) => {
  // send a request to API to log an event
  const query = 'http://localhost:8080/api/log';
  await fetch(query, {
    credentials: 'include',
    method: "POST",
    headers:
    {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export default {retrieveLogs, closeSession, postData};
