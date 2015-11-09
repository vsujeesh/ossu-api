define({ "api": [
  {
    "type": "post",
    "url": "/auth/:strategy",
    "title": "Finalize Strategy",
    "name": "authFin",
    "group": "Auth",
    "description": "<p>Finalize a 3rd-party authentication strategy.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "strategy",
            "description": "<p>The name of the authentication strategy, provided in 'Get Strategies'.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>A code (provided by the authentication strategy) used to complete authentication.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>An authorization token assgned to the authenticated user.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>A user object. See api: 'User'</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500 - Token error": [
          {
            "group": "Error 500 - Token error",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "body",
            "description": "<p>Could not retreive user data from authentication provider.</p> "
          }
        ],
        "Error 500 - Database error": [
          {
            "group": "Error 500 - Database error",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "body",
            "description": "<p>Database error.</p> "
          }
        ],
        "Error 500 - Registration error": [
          {
            "group": "Error 500 - Registration error",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "body",
            "description": "<p>Could not register a new user</p> "
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found.",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Get Strategies",
    "name": "authGet",
    "group": "Auth",
    "description": "<p>Get a list of available 3rd-party authentication strategies.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>array</p> ",
            "optional": false,
            "field": "strategies",
            "description": "<p>A list of available authentication strategies.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "strategies.name",
            "description": "<p>The name of the strategy.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "strategies.auth_url",
            "description": "<p>The URL to intiate the strategy.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>mixed</p> ",
            "optional": false,
            "field": "strategies.data",
            "description": "<p>The data that should be used when initiating the strategy.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "strategies.callback",
            "description": "<p>The callback url to complete the strategy.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Create",
    "name": "CreateUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Administrator Users Only",
        "description": "<p>The authorization token must belong to an administrator. An Authorization header and with valid bearer token is required to complete this request.</p> "
      }
    ],
    "description": "<p>Creates a user profile.</p> ",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{ \"username\":\"Sam\", \"email\":\"samwise@theshire\" }' http://localhost:8080/api/users/",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Database object ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Fullname of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "github",
            "description": "<p>GitHub Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "twitter",
            "description": "<p>Twitter Profilie info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.link",
            "description": "<p>Feed link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "linkedin",
            "description": "<p>LinkedIn Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>Website Info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.link",
            "description": "<p>URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "curriculum",
            "description": "<p>Curriculum the user is enrolled in.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "account",
            "description": "<p>Internal user options</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location information.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource was not found.</p> "
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>The provided token is not allowed to consume this resource.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found.",
          "type": "json"
        },
        {
          "title": "UnauthorizedError",
          "content": "HTTP/1.1 401 Unauthorized.",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Administrator Users Only",
        "description": "<p>The authorization token must belong to an administrator. An Authorization header and with valid bearer token is required to complete this request.</p> "
      },
      {
        "name": "user",
        "title": "Bearer Token Required",
        "description": "<p>The authorization token must belong to an authenticated user.  An Authorization header and with valid bearer token is required to complete this request.</p> "
      }
    ],
    "description": "<p>Deletes a user profile.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>User's ID.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X DELETE http://localhost:8080/api/users/[id]",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "body",
            "description": "<p>No Content.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource was not found.</p> "
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>The provided token is not allowed to consume this resource.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found.",
          "type": "json"
        },
        {
          "title": "UnauthorizedError",
          "content": "HTTP/1.1 401 Unauthorized.",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get One",
    "name": "GetUser",
    "group": "User",
    "description": "<p>Fetches a user's profile data.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>User's ID.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" http://localhost:8080/api/users/[id]",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Database object ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Fullname of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "github",
            "description": "<p>GitHub Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "twitter",
            "description": "<p>Twitter Profilie info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.link",
            "description": "<p>Feed link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "linkedin",
            "description": "<p>LinkedIn Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>Website Info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.link",
            "description": "<p>URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "curriculum",
            "description": "<p>Curriculum the user is enrolled in.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "account",
            "description": "<p>Internal user options</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location information.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found.",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/user/",
    "title": "List",
    "name": "ListUsers",
    "group": "User",
    "description": "<p>Fetches a list of user profiles.</p> ",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" http://localhost:8080/api/users/",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "users",
            "description": "<p>A list of user profiles. See: 'Get User'</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "Update",
    "name": "UpdateUser",
    "group": "User",
    "permission": [
      {
        "name": "user",
        "title": "Bearer Token Required",
        "description": "<p>The authorization token must belong to an authenticated user.  An Authorization header and with valid bearer token is required to complete this request.</p> "
      }
    ],
    "description": "<p>Updates a user profile.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>User's ID.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X PUT -d '{ \"username\":\"Sam\", \"email\":\"samwise@theshire\" }' http://localhost:8080/api/users/[id]",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Database object ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Fullname of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "github",
            "description": "<p>GitHub Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "github.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "twitter",
            "description": "<p>Twitter Profilie info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "twitter.link",
            "description": "<p>Feed link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "linkedin",
            "description": "<p>LinkedIn Profile info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.nick",
            "description": "<p>User handle.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "linkedin.link",
            "description": "<p>Profile link.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>Website Info.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website.link",
            "description": "<p>URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "curriculum",
            "description": "<p>Curriculum the user is enrolled in.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "account",
            "description": "<p>Internal user options</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location information.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource was not found.</p> "
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>The provided token is not allowed to consume this resource.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found.",
          "type": "json"
        },
        {
          "title": "UnauthorizedError",
          "content": "HTTP/1.1 401 Unauthorized.",
          "type": "json"
        }
      ]
    }
  }
] });