module.exports = {
  "host": "localhost:8001",
  "headers": [],
  "apis": [
    {
      "name": "kibana_dkan_docker-analytics",
      "plugins": [
        {
          "name": "jwt",
          "attributes": {
            "enabled": true,
            "config": {
              "cookie_names": [
                "Drupal.visitor.jwt"
              ],
              "secret_is_base64": false,
              "key_claim_name": "iss",
              "anonymous": "",
              "run_on_preflight": true,
              "uri_param_names": [
                "jwt"
              ]
            }
          }
        }
      ],
      "attributes": {
        "hosts": process.env.KONGFIG_KIBANA_HOSTS === undefined ? [ "kibana.dkan.docker" ] : process.env.KONGFIG_KIBANA_HOSTS,
        "uris": [
          "/analytics"
        ],
        "strip_uri": true,
        "preserve_host": true,
        "upstream_url": "http://kibana:5601/",
        "retries": 5,
        "upstream_connect_timeout": 60000,
        "upstream_read_timeout": 60000,
        "upstream_send_timeout": 60000,
        "https_only": false,
        "http_if_terminated": false
      }
    },
    {
      "name": "dkan_docker-api",
      "plugins": [
        {
          "name": "rate-limiting",
          "attributes": {
            "enabled": true,
            "config": {
              "hide_client_headers": false,
              "minute": 10000,
              "policy": "cluster",
              "redis_database": 0,
              "redis_timeout": 2000,
              "redis_port": 6379,
              "limit_by": "consumer",
              "fault_tolerant": true
            }
          }
        }
      ],
      "attributes": {
        "hosts": process.env.KONGFIG_DKAN_HOSTS === undefined ? [ "dkan.docker" ] : process.env.KONGFIG_DKAN_HOSTS,
        "uris": [
          "/api"
        ],
        "strip_uri": false,
        "preserve_host": true,
        "upstream_url": "http://dkan-nginx/",
        "retries": 5,
        "upstream_connect_timeout": 60000,
        "upstream_read_timeout": 60000,
        "upstream_send_timeout": 60000,
        "https_only": false,
        "http_if_terminated": false
      }
    },
    {
      "name": "dkan_docker",
      "plugins": [],
      "attributes": {
        "hosts": process.env.KONGFIG_DKAN_HOSTS === undefined ? [ "dkan.docker" ] : process.env.KONGFIG_DKAN_HOSTS,
        "strip_uri": false,
        "preserve_host": true,
        "upstream_url": "http://dkan-nginx/",
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
            "key": process.env.KONGFIG_CONSUMER_JWT_KEY,
            "secret": process.env.KONGFIG_CONSUMER_JWT_SECRET
          }
        }
      ]
    }
  ],
  "plugins": [],
  "upstreams": []
};
