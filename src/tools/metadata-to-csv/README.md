# metadata-to-csv
First download the metadata records from catalogue.saeon.ac.za (not .dvn, and not localhost as the IDs may be incorrect). The JSON download should be put into the root of this tool's directory `./metadata-records.json`.

```sh
npm run
```

# TODO
This might be a generally useful too, but the headers need to be pulled from the SAEON JSON schema since not every JSON record has every header