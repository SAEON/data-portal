export default preparedTables =>
  `select
		c.table_schema,
		c.table_name,
		c.column_name,
		c.data_type,
		c.ordinal_position

	from information_schema."columns" c 

	where
		c.table_schema = $1
		or (
			c.table_schema = 'public'
			and c.table_name in (${preparedTables.map((t, i) => `$${i + 2}`).join(',')})
		)

		order by
			ordinal_position asc,
			table_name asc
	`

// -- select
// -- 	c.table_schema,
// -- 	c.table_name,
// -- 	c.column_name ,
// -- 	c.data_type

// -- from information_schema."columns" c

// -- where
// -- 	c.table_schema = $1

// -- select
// -- 	ns.nspname as table_schema,
// -- 	cls.relname as table_name,
// -- 	attr.attname as column_name,
// -- 	trim(
// -- 	  leading '_'
// -- 	  from
// -- 	    tp.typname
// -- 	) as data_type,
// -- 	pg_catalog.col_description(attr.attrelid, attr.attnum) as column_description

// -- from pg_catalog.pg_attribute as attr
// -- join pg_catalog.pg_class as cls on cls.oid = attr.attrelid
// -- join pg_catalog.pg_namespace as ns on ns.oid = cls.relnamespace
// -- join pg_catalog.pg_type as tp on tp.typelem = attr.atttypid

// -- where
// -- 	cls.relkind in ('r', 'v', 'm')
// --   and ns.nspname = $1
// -- 	and not attr.attisdropped
// -- 	and attr.attnum > 0

// -- order by
// -- 	ns.nspname,
// -- 	cls.relname,
// -- 	attr.attnum
