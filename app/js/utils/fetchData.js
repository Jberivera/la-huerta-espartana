function fetchData (request) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    const DONE = XMLHttpRequest.DONE;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.open('GET', request, true);
    xhr.send();
  });
}

export default fetchData;
