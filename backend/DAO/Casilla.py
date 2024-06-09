import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb

class Casilla(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_casilla_table()

    def create_casilla_table(self):
        fields = [
            '"Id_Casilla" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"seccion" TEXT',
            '"ubicacion" TEXT',
            '"Id_Estado" INTEGER',
            'FOREIGN KEY("Id_Estado") REFERENCES "Estado"("Id_Estado")'
        ]
        self.create_table("Casilla", fields)

    def check_casilla_exists(self, seccion, id_estado):
        query = 'SELECT * FROM "Casilla" WHERE "seccion" = ? AND "Id_Estado" = ?'
        result = self.fetch_one(query, (seccion, id_estado))
        return result

    def create_casilla(self, seccion, ubicacion, id_estado):
        if not seccion.isdigit() or len(seccion) != 4:
            return "Seccion must be a 4-digit number."
        # seccion = int(seccion)  # No convert the string to an integer
        if self.check_casilla_exists(id_estado):
            return f"Casilla with Id_Casilla {id_estado} already exists."
        query = 'INSERT INTO "Casilla" ("seccion", "ubicacion", "Id_Estado") VALUES (?, ?, ?)'
        self.execute_query(query, (seccion, ubicacion, id_estado))
        return True
    
    def delete_casilla(self, id_casilla):
        if not self.check_casilla_exists(id_casilla):
            return f"Casilla with Id_Casilla {id_casilla} does not exist."
        query = 'DELETE FROM "Casilla" WHERE "Id_Casilla" = ?'
        self.execute_query(query, (id_casilla,))
        return True

    def update_casilla(self, id_casilla, seccion, ubicacion, id_estado):
        if not self.check_casilla_exists(id_casilla):
            return f"Casilla with Id_Casilla {id_casilla} does not exist."
        query = 'UPDATE "Casilla" SET "seccion" = ?, "ubicacion" = ?, "Id_Estado" = ? WHERE "Id_Casilla" = ?'
        self.execute_query(query, (seccion, ubicacion, id_estado, id_casilla))
        return True
    
    def get_casillas(self):
        query = 'SELECT * FROM "Casilla"'
        return self.fetch_all_as_dict(query)

"""
if __name__ == '__main__':
    casilla = Casilla()
    print(casilla.create_casilla("0001", "CALLE 1 NUMERO 12 CARMELO", 1))
    print(casilla.create_casilla("0002", "CALLE 2 NUMERO 24 CARMELO", 1))
    print(casilla.create_casilla("0003", "Avenida Ficticia 456", 3))
    print(casilla.check_casilla_exists(1))
    print(casilla.get_casillas())
"""

