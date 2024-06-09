import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb

class Votante(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_votante_table()

    def create_votante_table(self):
        fields = [
            '"Id_Votante" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"nombre" TEXT',
            '"CalveElec" TEXT',
            '"Id_Estado" INTEGER',
            '"bandera" INTEGER',
            '"seccion" TEXT',
            'FOREIGN KEY("Id_Estado") REFERENCES "Estado"("Id_Estado")'
        ]
        self.create_table("Votante", fields)

    def check_votante_exists(self, claveElec):
        query = 'SELECT * FROM "Votante" WHERE "CalveElec" = ?'
        result = self.fetch_one(query, (claveElec,))
        return result is not None
    
    def get_one_votante(self, claveElec):
        query = 'SELECT * FROM "Votante" WHERE "CalveElec" = ?'
        return self.fetch_one(query, (claveElec,))

    def create_votante(self, nombre, claveElec, id_estado, bandera, seccion):
        if self.check_votante_exists(claveElec):
            return f"Votante with CalveElec {claveElec} already exists."
        query = 'INSERT INTO "Votante" ("nombre", "CalveElec", "Id_Estado", "bandera", "seccion") VALUES (?, ?, ?, ?, ?)'
        self.execute_query(query, (nombre, claveElec, id_estado, bandera, seccion))
        return f"Votante with CalveElec {claveElec} created."
    
    def update_bandera(self, claveElec):
        query = 'UPDATE "Votante" SET "bandera" = 1 WHERE "CalveElec" = ?'
        self.execute_query(query, (claveElec,))
        return f"Bandera updated for Votante with CalveElec {claveElec}."

    def get_votantes(self):
        query = 'SELECT * FROM "Votante"'
        return self.fetch_all_as_dict(query)

"""
if __name__ == '__main__':
    votante = Votante()
    print(votante.create_votante("TEST", "TEST00000", 1, 0, 1))
    print(votante.get_votantes())
""" 
