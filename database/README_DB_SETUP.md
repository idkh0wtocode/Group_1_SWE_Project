#  CEN 3031 – Magic Mega Marketplace Database Setup

## Requirements
- PostgreSQL 15 or higher
- VS Code (optional)
- GitHub repo cloned locally



## Install PostgreSQL
1. Download from [postgresql.org/download](https://www.postgresql.org/download/)
2. During install:
   - Keep default path
   - Set a password for user 
   - Leave port as `5432`
   - Don’t launch Stack Builder



3. Test it:
   ```bash
   psql --version

   Then set up: "git pull origin main"
                "psql -U postgres"
                "CREATE ROLE cen3031 LOGIN PASSWORD 'devpass';"
                "CREATE DATABASE magic_mega_marketplace OWNER cen3031;"
                "\q"
                "psql -U cen3031 -d magic_mega_marketplace -f database/magic_mega_marketplace_schema.sql"


## To test database

           "DROP DATABASE magic_mega_marketplace;"
           "CREATE DATABASE magic_mega_marketplace OWNER cen3031;"
           "\q"
           "psql -U cen3031 -d magic_mega_marketplace -f database/magic_mega_marketplace_schema.sql" with password "devpass""

