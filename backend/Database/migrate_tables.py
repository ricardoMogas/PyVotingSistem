from conexiondb import conexiondb

db = conexiondb()
db.create_table("users", [
    '"id" INTEGER PRIMARY KEY AUTOINCREMENT',
    '"name" TEXT',
    '"rol" INTEGER',
    '"distrito" INTEGER',
    '"estado" INTEGER',
    '"Field6" INTEGER',
    '"credential" TEXT'
])

# Insertar datos
# insert_query = "INSERT INTO users (name, credential) VALUES (?, ?)"
# db.execute_query(insert_query, ("Juan", "1234"))
# db.execute_query(insert_query, ("Maria", "1234"))

# Consultar datos
select_query = "SELECT * FROM users"
rows = db.fetch_all_as_dict(select_query)
if rows:
    print(rows[0]["name"])
    # print(json.dumps(rows, indent=4))

# Cerrar la conexión
db.close_connection()

