--Below commands are used to replicate foreign schema via FDW.

--https://thoughtbot.com/blog/postgres-foreign-data-wrapper

--https://postgis.net/install/
CREATE EXTENSION IF NOT EXISTS postgis; --sometimes(maybe always) this appears to install extension but needs to be reinstalled through dbeaver/pgadmin to actually worked
CREATE EXTENSION IF NOT EXISTS postgres_fdw;
--extensions below are unlikely to be needed but good to be aware f
CREATE EXTENSION IF NOT EXISTS postgis_raster;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS address_standardizer;
CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;
CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;

--------------------LOCAL-------------------
--Install postgres_fdw extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

--Create a Server (foreign data origin)
CREATE SERVER foreign_test_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'localhost', dbname 'postgres');


--Create a User Mapping
--CREATE A READ ONLY USER TO AVOID ACCIDENTAL CRUD OPERATIONS
CREATE USER MAPPING FOR CURRENT_USER
  SERVER foreign_test_server
  OPTIONS (user 'postgres', password 'password');

CREATE SCHEMA IF NOT EXISTS foreign_test;

--Importing Foreign Schema / Creating Foreign Table (foreign data destination)
IMPORT FOREIGN SCHEMA public
FROM SERVER foreign_test_server
INTO foreign_test;
--the above creates foreign tables for all of the tables from the public schema into the foreign schema "app". 
--This approach requires ALTER FOREIGN TABLE for each table (probably)

--------------------------------------------
--------------------LIVE--------------------
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

CREATE SERVER IF NOT EXISTS saeon_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'spatialdb.saeon.int', dbname 'BEA');

CREATE USER MAPPING IF NOT EXISTS FOR CURRENT_USER
  SERVER saeon_server
  OPTIONS (user 'datascience_user', password 'Eu28&Zrz^a');  

CREATE SCHEMA IF NOT EXISTS saeon_fdw;

IMPORT FOREIGN SCHEMA public
FROM SERVER saeon_server
INTO saeon_fdw;
--------------------------------------------

-- select 'ALTER TABLE '||'"'||tablename||'"'||' RENAME TO ' ||
-- lower(tablename)||';' from pg_tables where schemaname = 'public';
--https://www.postgresql.org/message-id/1231632010.31174.15.camel%40jd-laptop.pragmaticzealot.org
--https://docs.huihoo.com/postgresql/9.1/sql-alterforeigntable.html
--https://github.com/tds-fdw/tds_fdw/issues/107
--above links use above segment of code. creates list of sql commands within go_to_lower then executes them.
--find a better way to execute list of commands
--the above may need to be changed to a ALTER FOREIGN TABLE query


/*
AGGREGATION EXAMPLE
GIVE ALL DATA FOR THIS VARIABLE FOR THIS AREA (AGGREGATE QUERY)
Hayden can give a good shape file to work for(probably provincial/municipal level)
*/


