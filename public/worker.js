// worker.js

const url = "http://localhost:5000/api/v1/data";

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

onmessage = function (e) {
  console.log(e.data);
  getData(url)
    .then((d) => {
      postMessage(d);
    })
    .catch((err) => {
      console.log(err);
    });

  this.setInterval(() => {
    getData(url)
      .then((d) => {
        postMessage(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 2000);
};
