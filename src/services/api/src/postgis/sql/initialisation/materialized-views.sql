--https://www.enterprisedb.com/blog/materialized-views-and-foreign-data-wrappers

--The below commands are samples for creating materialized views based on the foreign schema that has been replicated in our fdw script

CREATE MATERIALIZED VIEW meso_dm_mv
	AS
	SELECT 
	"MESO_ID_1" AS meso_id_1
	,"MESO_ID_2" AS meso_id_2
	,"LAT_1" AS lat_1
	,"LON_1" AS lon_1
	,"LAT_2" AS lat_2
	,"LON_2" AS lon_2
	,"DIST" AS dist
	FROM saeon_fdw."meso_DM"; --saeon_fdw houses both the fdw tables and the materialized views
	
CREATE MATERIALIZED VIEW meso_point_mv
	AS
	SELECT 
	"MESO_ID" AS meso_id
	,"LAT" AS lat
	,"LON" AS lon
	FROM saeon_fdw."meso_point";