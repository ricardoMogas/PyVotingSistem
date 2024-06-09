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
    print(partido.create_Partido("TE", "TEST", "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVR42mNkAAJjY2Bg"))
    print(partido.get_Partidos)
"""
