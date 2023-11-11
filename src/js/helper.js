import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function AJAX(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: postMessage,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} (${response.status})
      `);

    return data;
  } catch (error) {
    throw error;
  }
}

/*
export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} (${response.status})
    `);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendJSON(url, uploadData) {
  try {
    const response = await Promise.race([
      fetch(url, {
        method: postMessage,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} (${response.status})
    `);

    return data;
  } catch (error) {
    throw error;
  }
}
*/
