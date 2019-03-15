import studentFile1 from '../assets/files/studentFile1.csv';
import csv from 'csvtojson';


/**
 *
 * @param {String} url
 * @param secretKey
 * @return {Promise} response
 */
export const GET = ({ url, headers }) => {
  const config = {
    url,
    method: 'GET',
    headers: headers || {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};


export const POST = ({ url, body }) => {

  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };
  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};


export const PUT = ({ url, headers, body }) => {

  const config = {
    method: 'PUT',
    headers: headers || {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };
  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};

export const PATCH = ({ url, headers, body }) => {
  const config = {
    method: 'PATCH',
    headers: headers || {
    },
    body,
    mode: 'cors',
    cache: 'default',
  };
  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};

/**
 * This method returns the request parameters of the URL
 * @param {String}name
 * @param {String}url
 * @return {String}decodeURIComponent
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const fetchFile = file => new Promise((resolve, reject) => {
  fetch(`files/${file.fileName}.${file.fileType}`).then(
    (response) => {
      const clone = response.clone();
      return clone.ok ? clone.text() : Promise.reject(clone.status);
    }, (error) => {
      reject(error);
    }).then((text) => {
    resolve(text);
  }, (error) => {
    reject(error);
  });
});

export const fetchFileConfig = url => new Promise((resolve, reject) => {
  fetch('files/filesConfig.json').then(
    (response) => {
      resolve(response.json());
    }, (error) => {
      reject(error);
    });
});

