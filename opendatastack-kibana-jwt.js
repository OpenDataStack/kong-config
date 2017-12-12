module.exports = {
  "host": "localhost:8001",
  "headers": [],
  "apis": [
    {
      "name": "opendatastack_dkan_api",
      "plugins": [
        {
          "name": "jwt",
          "attributes": {
            "enabled": true,
            "config": {
              "key_claim_name": "iss",
              "cookie_names": process.env.OPENDATASTACK_DKAN_API_PLUGIN_JWT_COOKIE_NAMES === undefined ? [ "Drupal.visitor.jwt" ] : process.env.OPENDATASTACK_DKAN_API_PLUGIN_JWT_COOKIE_NAMES,
              "secret_is_base64": false,
              "anonymous": "",
              "run_on_preflight": true
            }
          }
        }
      ],
      "attributes": {
        "uris": process.env.OPENDATASTACK_DKAN_API_URIS === undefined ? [ "/analytics" ] : process.env.OPENDATASTACK_DKAN_API_URIS,
        "strip_uri": true,
        "preserve_host": false,
        "upstream_url": process.env.OPENDATASTACK_DKAN_API_UPSTREAM_URL === undefined ? "http://kibana:5601/" : process.env.OPENDATASTACK_DKAN_API_UPSTREAM_URL,
        "retries": 5,
        "upstream_connect_timeout": 60000,
        "upstream_read_timeout": 60000,
        "upstream_send_timeout": 60000,
        "https_only": false,
        "http_if_terminated": false
      }
    }
  ],
  "consumers": [
    {
      "username": "opendatastack_dkan_consumer",
      "acls": [],
      "credentials": [
        {
          "name": "jwt",
          "attributes": {
            "algorithm": "HS256",
            "key": process.env.OPENDATASTACK_DKAN_CONSUMER_JWT_KEY,
            "secret": process.env.OPENDATASTACK_DKAN_CONSUMER_JWT_SECRET
          }
        }
      ]
    }
  ],
  "plugins": [],
  "upstreams": []
};
