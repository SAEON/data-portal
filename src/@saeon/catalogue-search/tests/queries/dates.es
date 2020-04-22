POST /saeon-odp-4-2/_search
{
  "query": {
    "match": {
      "metadata_json.subjects.subject": {
        "query": "noterm"
      }
    }
  }
}