const { Analytics } = require('@segment/analytics-node');

const analytics = new Analytics({ writeKey: '<YOUR_WRITE_KEY>' });
 
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
    // result = {
    //         "AccountId": customerAccountId,
    //         "Balance": '$%s' % customerBalance
    //     };
    // return result;
};

exports.track = async function (event, context) {
    console.log(JSON.stringify(event));

    return {};
    // Get your parameters from the Connect invocation
    // let phone = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    // let eventName = event['Details']['EventName'];

    // analytics.track({
    //     event: eventName,
    //     userId: '',
    //     properties: {
    //       callFlow: 'Michael Bolton',
    //       email: 'mbolton@example.com'
    //     }
    //   });    
};