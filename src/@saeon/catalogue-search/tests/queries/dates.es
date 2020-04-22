// Issued refers to the metadata data stamp (It shouldn’t be important to users). The publication date should be under “PublicationYear”


POST /saeon-odp-4-2/_search
{
  "_source": {
    "includes": [
      "metadata_json.dates.*"
    ]
  },
  "query": {
    "range": {
      "metadata_json.dates.date": {
        "gte" : "2001-01-01",
        "lte" : "20019-12-31",
        "relation" : "within"
      }
    }
  }
}


POST /saeon-odp-4-2/_search
{
  "_source": {
    "includes": [
      "metadata_json.dates.*"
    ]
  },
  "query": {
    "range": {
      "metadata_json.dates.date.gte": {
        "lte":  "2005"
      }
    }
  }
}




POST /saeon-odp-4-2/_search
{
  "_source": {
    "includes": ["metadata_json.dates.*"]
  },
  "query": {
    "terms": {
      "metadata_json.dates.dateType": ["valid", "Collected"]
      }
    }
  }
}


POST /saeon-odp-4-2/_search
{
  "_source": {
    "includes": ["metadata_json.dates.*"]
  },
  "query": {
    "match": {
      "metadata_json.dates.dateType": {
        "query": "Valid"
      }
    }
  }
}



POST /saeon-odp-4-2/_search
{
  "_source": {
    "includes": ["metadata_json.dates.*"]
  },
  "query": {
    "exists": {
      "field": "metadata_json.dates.dateType*"
      }
    }
  }
}