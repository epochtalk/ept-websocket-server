var helper = module.exports = {};

helper.parseChannel = function(reqChannel) {
  try { return JSON.parse(reqChannel); }
  catch(err){ return undefined; }
};

helper.roleChannelLookup = function(channelRole) {
  return function(role) {
    return  channelRole === role.lookup;
  };
};
