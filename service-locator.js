/**
 * Paul Serby <paul.serby@clock.co.uk>
 *
 * New BSD Licensed
 *
 * Thursday 12 Jan 2012
 *
 */
module.exports = function createServiceLocator() {
  var self = {}

  /**
   * Registers a service and make it read only
   * @param {String} name To get the service by
   * @param {Object} service What you want to register
   */
  function register(name, service) {
    if (!name) {
      throw new Error('You must provide a valid name for this service.')
    }

    if (self[name] !== undefined) {
      throw new Error("Service '" + name + "' already registered")
    }

    if (!service) {
      throw new Error("You must provide a valid service for '" + name + "'")
    }

    Object.defineProperty(self, name, {
      configurable: false,
      get: function() {
        return service
      },
      set: function() {
        throw new Error("You can not alter a registered service '" + name + "'")
      }
    })

    return self
  }

  self.register = register
  return self
}
