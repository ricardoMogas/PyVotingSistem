import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb
import base64

class Partido(conexiondb):
    def __init__(self):
        super().__init__()  # Call the constructor of the parent class
        self.create_Partido_table()  # Create the "Partido" table

    def create_Partido_table(self):
        # SQL statement to create the "Partido" table
        fields = [
            '"Id_Part" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"nombre" TEXT',
            '"siglas" TEXT',
            '"imagen" BLOB'
        ]
        self.create_table("Partido", fields)
    
    def check_Partido_exists(self, id_partido):
        query = 'SELECT * FROM "Partido" WHERE "Id_Part" = ?'
        result = self.fetch_one(query, (id_partido,))
        return result is not None
    
    def get_one_Partido(self, id_partido):
        query = 'SELECT * FROM "Partido" WHERE "Id_Part" = ?'
        result = self.fetch_one(query, (id_partido,))
        return result

    def create_Partido(self, nombre, siglas, imagen):
        if self.check_Partido_exists(nombre):
            return f"Partido with nombre {nombre} already exists."
        # Convert base64 image to blob
        imagen_blob = base64.b64decode(imagen)
        query = 'INSERT INTO "Partido" ("nombre", "siglas", "imagen") VALUES (?, ?, ?)'
        self.execute_query(query, (nombre, siglas, imagen_blob))
        return True
    
    def delete_Partido(self, id_partido):
        if not self.check_Partido_exists(id_partido):
            return f"Partido with Id_Partido {id_partido} does not exist."
        query = 'DELETE FROM "Partido" WHERE "Id_Partido" = ?'
        self.execute_query(query, (id_partido,))
        return True
    
    def update_Partido(self, id_partido, nombre, siglas, imagen):
        if not self.check_Partido_exists(id_partido):
            return f"Partido with Id_Partido {id_partido} does not exist."
        # Convert base64 image to blob
        imagen_blob = base64.b64decode(imagen)
        query = 'UPDATE "Partido" SET "nombre" = ?, "siglas" = ?, "imagen" = ? WHERE "Id_Partido" = ?'
        self.execute_query(query, (nombre, siglas, imagen_blob, id_partido))
        return True
    
    def get_Partidos(self):
        query = 'SELECT * FROM "Partido"'
        result = self.fetch_all_as_dict(query)
        # Convert the 'imagen' field from bytes to base64 string
        for partido in result:
            partido['imagen'] = base64.b64encode(partido['imagen']).decode('utf-8')
        return result

"""
if __name__ == '__main__':
    partido = Partido()
    print(partido.create_Partido("Morena", "MORENA", "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"))
    print(partido.get_Partidos)
"""
