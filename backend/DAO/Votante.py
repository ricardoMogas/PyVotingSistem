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
            '"bandera" BLOB',
            '"Id_Casilla" INTEGER',
            'FOREIGN KEY("Id_Casilla") REFERENCES "Casilla"("Id_Casilla")',
            'FOREIGN KEY("Id_Estado") REFERENCES "Estado"("Id_Estado")'
        ]
        self.create_table("Votante", fields)

    def check_votante_exists(self, claveElec):
        query = 'SELECT * FROM "Votante" WHERE "CalveElec" = ?'
        result = self.fetch_one(query, (claveElec,))
        return result is not None

    def create_votante(self, nombre, claveElec, id_estado, bandera, id_casilla):
        if self.check_votante_exists(claveElec):
            return f"Votante with CalveElec {claveElec} already exists."
        query = 'INSERT INTO "Votante" ("nombre", "CalveElec", "Id_Estado", "bandera", "Id_Casilla") VALUES (?, ?, ?, ?, ?)'
        self.execute_query(query, (nombre, claveElec, id_estado, bandera, id_casilla))
        print(f"Votante with CalveElec {claveElec} created.")

    def get_votantes(self):
        query = 'SELECT * FROM "Votante"'
        return self.fetch_all_as_dict(query)

"""
if __name__ == '__main__':
    votante = Votante()
    print(votante.create_votante("TEST", "TEST00000", 1, 0, 1))
    print(votante.get_votantes())
""" 
