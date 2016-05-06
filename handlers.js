var handlers = module.exports = {};

handlers.postprocessSubscribe = function(data) {
  console.log('SUBSCRIBED:', data.type, data.id);
  // postprocess subscriptions
};
