import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb

class Estado(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_estado_table()

    def create_estado_table(self):
        fields = [
            '"Id_Estado" INTEGER PRIMARY KEY',
            '"nombre" TEXT'
        ]
        self.create_table("Estado", fields)

    def check_estado_exists(self, id_estado):
        query = 'SELECT * FROM "Estado" WHERE "Id_Estado" = ?'
        result = self.fetch_one(query, (id_estado,))
        return result is not None

    def create_estado(self, id_estado, nombre):
        if self.check_estado_exists(id_estado):
            print(f"Estado with Id_Estado {id_estado} already exists.")
            return
        query = 'INSERT INTO "Estado" ("Id_Estado", "nombre") VALUES (?, ?)'
        self.execute_query(query, (id_estado, nombre))
        print(f"Estado with Id_Estado {id_estado} created.")

    def get_estados(self):
        query = 'SELECT * FROM "Estado"'
        result = self.fetch_all(query)
        return result

"""
if __name__ == '__main__':
    estado = Estado()
    estado.create_estado(1, "Campeche")
    estado.create_estado(2, "CDMX")
    estado.create_estado(3, "EdoMex")
    estado.create_estado(4, "Veracruz")
    estado.create_estado(5, "Yucatan")
    listaEstados = estado.get_estados()
    print(listaEstados[0])
"""



