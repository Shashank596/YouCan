import axios from "axios";

// Function to submit a batch of submissions
export const submitBatch = async (submissions) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false',
      wait: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': 'your_api_key_here',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Batch Submission Error:", error.message);
  }
};


const waiting = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

// Function to poll and fetch submission result using tokens
export const submitToken = async (resultToken) => {
  const options = {
    method: 'GET',
    url: 'https://judge0-extra-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(","),
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': 'your_api_key_here',
      'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Fetching Result Error:", error.message);
    }
  };

  while (true) {
    const result = await fetchData();

    if (!result || !result.submissions) {
      await waiting(1000);
      continue;
    }

    const isResultObtained = result.submissions.every((r) => r.status_id > 2);

    if (isResultObtained) {
      return result.submissions;
    }

    await waiting(1000);
  }
};
