exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Serverless function subscribe.js is working!",
    }),
  };
};

exports.handler = async function (event, context) {
  const fetch = (await import("node-fetch")).default;

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Parse the payload
  const { name, email, whatsapp } = JSON.parse(event.body);

  // Check that email is present
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email is required." }),
    };
  }

  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dataCenter = process.env.MAILCHIMP_DATA_CENTER;

  // Mailchimp API endpoint
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;

  // Prepare data for Mailchimp
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: name, // First name field in Mailchimp
      WHATSAPP: whatsapp, // WhatsApp custom field tag in Mailchimp
    },
  };

  try {
    console.log("Data being sent to Mailchimp:", data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          "anystring:" + mailchimpApiKey
        ).toString("base64")}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Check the response status for success
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully subscribed!" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Failed to subscribe.",
          error: result,
        }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};
