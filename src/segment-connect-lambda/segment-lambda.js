const { Analytics } = require('@segment/analytics-node');
const analytics = new Analytics({ writeKey: '<YOUR_WRITE_KEY>' });
const profileAPISpaceID = '<YOUR UNIFTY PROFILES SPACE ID>';
const profileAPIAccessKey = '<YOUR PROFILE API ACCESS KEY>';
const segmentProfileAPIEndpoint = 'https://profiles.segment.com';
const segmentProfileAPIHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(profileAPIAccessKey + ':')}`,
  };

// TODO:  Add SSM parameter support for the Segment keys

const getUserProfileByPhone = async (phoneNumber) => {
  const profileQueryURL = `${segmentProfileAPIEndpoint + '/v1/spaces/' + profileAPISpaceID + '/collections/users/profiles/phone_number:' + phoneNumber + '/traits'}`;
  try {
    const response = await fetch(profileQueryURL, {
      method: 'GET',
      body: myBody, // string or object
      headers: segmentProfileAPIHeaders 
    });
    const responseJSON = await response.json(); //extract JSON from the http response
    return responseJSON; // do something with myJson
  } catch (e) {
    throw e;
  }
}

exports.identify = async function (event, context) {
    // Get your parameters from the Connect invocation
    let phone = event['Details']['ContactData']['CustomerEndpoint']['Address'];

    // Maybe do a lookup to Segment API here by phone number?

    // Then merge the profile from Connect back to Segment...
    analytics.identify({
        userId:'f4ca124298',
        traits: {
          name: 'Michael Bolton',
          email: 'mbolton@example.com',
          createdAt: new Date('2014-06-14T02:00:19.467Z')
        }
      });
    
    // Return the merged profile back to Connect flow
    result = {
              "AccountId": customerAccountId,
              "Balance": '$%s' % customerBalance
            };
    return result;
};

exports.track = async function (event, context) {
  // Enable this if you need to log the events coming from the Connect Flow.
  // This will be in the Lambda logs
  console.log(JSON.stringify(event));

  // Get your parameters from the Connect invocation
  // let phone = event['Details']['ContactData']['CustomerEndpoint']['Address'];

  if( 'EventName' in event['Details']['Parameters'] 
      && 'FlowName' in event['Details']['Parameters'] ) {
    let eventName = event['Details']['Parameters']['EventName'];
    let flowName = event['Details']['Parameters']['FlowName'];
    analytics.track({
        event: eventName,
        properties: {
          callFlow: flowName,
        }
      });
  }
  return {};    
};