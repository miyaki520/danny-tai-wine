exports.handler = async function (event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Serverless function is working!" }),
    };
  };
  

  const fetch = require("node-fetch");

  exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    const { name, email, whatsapp } = JSON.parse(event.body);
  
    const mailchimpApiKey = "93a15174df7035496fe8e252ab406fed-us17"; // Replace with your Mailchimp API key
    const audienceId = "d5b027300c"; // Replace with your Audience ID
    const dataCenter = "us17"; // Replace with your Mailchimp data center (e.g., "us1")
  
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;
  
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        PHONE: whatsapp
      },
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from("anystring:" + mailchimpApiKey).toString("base64")}`,
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.status === "subscribed") {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Successfully subscribed!" }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to subscribe.", error: result }),
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
  