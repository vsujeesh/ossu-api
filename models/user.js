'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = () => {
  let userSchema = new Schema({
    name: { type: String, index: true },
    email: { type: String, index: true },
    github: {
      id: { type: Number, index: true },
      nick: { type: String, index: true },
      link: String
    },
    twitter: {
      nick: { type: String, index: true },
      link: String
    },
    linkedin: {
      nick: { type: String, index: true },
      link: String
    },
    website: {
      title: String,
      link: String
    },
    account: {
      admin: { type: Boolean, default: false },
      active: { type: Boolean, default: false },
      registered: { type: Date, default: Date.now }
    },

    // When a user enrolls in a curriculum add to this array [['Computer Science and Engineering', (monogo_object trakcing progess)]]
    // Front end can generate link to their progress page from this....
    curriculum: [ {
      id: { type: Schema.Types.ObjectId, ref: 'curriculum' },
      started: Date,
      completed: { type: Boolean, default: false },
      progress: [ {
        course: { type: Schema.Types.ObjectId, ref: 'course' },
        started: Date,
        completed: { type: Boolean, default: false },
        verified: { type: Boolean, default: false }
      } ]
    } ],

    /*
     * Store the location in a string. Let a mapping api figure out the exact location.
     * Let users choose whether or not to share a location.
    */
    location: {
      public: { type: Boolean, default: true },
      string: String
    }
  });

  /** Static Methods **/

  /**
   * Find a user record using a github id.
   */
  userSchema.static('findByGithubId', function (id, cb) {
    return this.find({ 'github.id': parseInt(id, 10) }, cb);
  });

  /**
   * Register a user using the response of a Github api.
   */
  userSchema.static('createFromGithub', function (data, cb) {
    let user = {
      name: data.name,
      email: data.email,
      github: {
        id: data.id,
        nick: data.login,
        link: data.html_url
      },
      account: {
        active: true
      }
    };

    if (data.blog.length > 0) {
      user.website = {
        title: 'Blog',
        link: data.blog
      };
    }

    if (data.location.length > 0) {
      user.location = { string: data.location };
    }

    return this.create(user, cb);
  });

  /** Instance Methods **/

  /**
   * Returns data to use in the json-web-token.
   */
  userSchema.method('tokenPayload', function () {
    return {
      _id: this._id,
      admin: this.account.admin || false
    };
  });

  return mongoose.model('user', userSchema);
};
