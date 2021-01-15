module.exports = {
    extends: ["react-app", "react-app/jest"],
    overrides: [
      {
        "files": ["**/*.js?(x)"],
        "rules": {
            "no-unused-vars": [1, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
        }
      }
    ]
  }