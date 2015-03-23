define({ "api": [
  {
    "type": "delete",
    "url": "/stands/:id",
    "title": "Delete a Stand",
    "name": "DeleteStand",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Stand ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "get",
    "url": "/featured-stands",
    "title": "Featured Stands",
    "name": "GetFeaturedStands",
    "group": "Stands",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "featuredStands",
            "description": "<p>List of featured stands.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "featuredStands.id",
            "description": "<p>Stand ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "featuredStands.position",
            "description": "<p>Position.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featuredStands.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featuredStands.description",
            "description": "<p>Description.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featuredStands.image_original_url",
            "description": "<p>Image URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featuredStands.youtube",
            "description": "<p>Youtube ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "featuredStands.goal",
            "description": "<p>Goal number.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featuredStands.category",
            "description": "<p>Category name.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "featuredStands.actions_count",
            "description": "<p>Actions count.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"featuredStands\": [\n    {\n      \"id\": 123,\n      \"position\": 1,\n      \"title\": \"Save The Planet\",\n      \"description\": \"Some description\",\n      \"image_original_url\": \"http://www.mystand.herokuapp.com/img.jpg\",\n      \"youtube\": \"43T5K8D3h\",\n      \"goal\": 100,\n      \"category\": \"Planet\",\n      \"actions_count\": 95\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/FeaturedStandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "get",
    "url": "/stands/:id",
    "title": "Show Stand",
    "name": "GetStand",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Stand ID</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "stand",
            "description": "<p>Stand object</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.id",
            "description": "<p>Stand ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.description",
            "description": "<p>Description.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.image_original_url",
            "description": "<p>Image URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.youtube",
            "description": "<p>Youtube ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.goal",
            "description": "<p>Goal number.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.category",
            "description": "<p>Category name.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.actions_count",
            "description": "<p>Actions count.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"stand\": {\n    \"id\": 123,\n    \"title\": \"Save The Planet\",\n    \"description\": \"Some description\",\n    \"image_original_url\": \"http://www.mystand.herokuapp.com/img.jpg\",\n    \"youtube\": \"43T5K8D3h\",\n    \"goal\": 100,\n    \"category\": \"Planet\",\n    \"actions_count\": 95\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "get",
    "url": "/stands",
    "title": "Stands",
    "name": "GetStands",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category ID</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort type</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>Search query</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stands",
            "description": "<p>List of stands.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stands.id",
            "description": "<p>Stand ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stands.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stands.description",
            "description": "<p>Description.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stands.image_original_url",
            "description": "<p>Image URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stands.youtube",
            "description": "<p>Youtube ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stands.goal",
            "description": "<p>Goal number.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stands.category",
            "description": "<p>Category name.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stands.actions_count",
            "description": "<p>Actions count.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"stands\": [\n    {\n      \"id\": 123,\n      \"title\": \"Save The Planet\",\n      \"description\": \"Some description\",\n      \"image_original_url\": \"http://www.mystand.herokuapp.com/img.jpg\",\n      \"youtube\": \"43T5K8D3h\",\n      \"goal\": 100,\n      \"category\": \"Planet\",\n      \"actions_count\": 95\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "get",
    "url": "/trending-stands",
    "title": "Trending Stands",
    "name": "GetTrendingStands",
    "group": "Stands",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "trendingStands",
            "description": "<p>List of trending stands.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "trendingStands.id",
            "description": "<p>Stand ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trendingStands.title",
            "description": "<p>Title.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trendingStands.description",
            "description": "<p>Description.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trendingStands.image_original_url",
            "description": "<p>Image URL.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trendingStands.youtube",
            "description": "<p>Youtube ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "trendingStands.goal",
            "description": "<p>Goal number.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trendingStands.category",
            "description": "<p>Category name.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "trendingStands.actions_count",
            "description": "<p>Actions count.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"trendingStands\": [\n    {\n      \"id\": 123,\n      \"title\": \"Save The Planet\",\n      \"description\": \"Some description\",\n      \"image_original_url\": \"http://www.mystand.herokuapp.com/img.jpg\",\n      \"youtube\": \"43T5K8D3h\",\n      \"goal\": 100,\n      \"category\": \"Planet\",\n      \"actions_count\": 95\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrendingStandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "post",
    "url": "/stands",
    "title": "Create a Stand",
    "name": "PostStands",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "full_description",
            "description": "<p>Full Description</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image_original_url",
            "description": "<p>Image url</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "youtube",
            "description": "<p>Youtube video ID</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Duration in days</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goal",
            "description": "<p>Goal number</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goal_result",
            "description": "<p>Goal result</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category",
            "description": "<p>Category ID</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "petition",
            "description": "<p>Petition</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "stand",
            "description": "<p>Stand object</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.id",
            "description": "<p>Stand ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.title",
            "description": "<p>Title</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.description",
            "description": "<p>Description</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.image_original_url",
            "description": "<p>Image URL</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.youtube",
            "description": "<p>Youtube video ID</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.goal",
            "description": "<p>Goal number</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stand.category",
            "description": "<p>Category name</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stand.actions_count",
            "description": "<p>Actions count</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"stand\": {\n    \"id\": 123,\n    \"title\": \"Save The Planet\",\n    \"description\": \"Some description\",\n    \"image_original_url\": \"http://www.mystand.herokuapp.com/img.jpg\",\n    \"youtube\": \"43T5K8D3h\",\n    \"goal\": 100,\n    \"category\": \"Planet\",\n    \"actions_count\": 95\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "put",
    "url": "/stands/:id/publish",
    "title": "Publish a Stand",
    "name": "PublishStand",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Stand ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "put",
    "url": "/stands/:id/unpublish",
    "title": "Unpublish a Stand",
    "name": "UnpublishStand",
    "group": "Stands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Stand ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/StandsController.js",
    "groupTitle": "Stands"
  },
  {
    "type": "delete",
    "url": "/login",
    "title": "Sign Out",
    "name": "DeleteLogin",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SessionsController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/profile",
    "title": "Get Current User's Profile",
    "name": "GetProfile",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>First Name.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>Last Name.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"id\": 123,\n    \"email\": \"user@example.com\",\n    \"first_name\": \"Bob\",\n    \"last_name\": \"Smith\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProfilesController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Sign In",
    "name": "PostLogin",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User&#39;s email.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User&#39;s password.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>First Name.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>Last Name.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"id\": 123,\n    \"email\": \"user@example.com\",\n    \"first_name\": \"Bob\",\n    \"last_name\": \"Smith\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SessionsController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Sign Up",
    "name": "PostUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User&#39;s email.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password_confirmation",
            "description": "<p>Password confirmation</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information.</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>ID.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>First Name.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>Last Name.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"id\": 123,\n    \"email\": \"user@example.com\",\n    \"first_name\": \"Bob\",\n    \"last_name\": \"Smith\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UsersController.js",
    "groupTitle": "Users"
  }
] });