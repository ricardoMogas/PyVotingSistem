import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb

class VotoDAO(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_table("Voto", [
            '"Id_Voto" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"Fecha" TEXT',
            '"Id_CandPre" INTEGER',
            '"Id_Casilla" INTEGER',
            'FOREIGN KEY("Id_CandPre") REFERENCES "CandidatoPre"("Id_CandPre")',
            'FOREIGN KEY("Id_Casilla") REFERENCES "Casilla"("Id_Casilla")'
        ])

    def get_all_votos(self):
        return self.fetch_all("SELECT * FROM Voto")

    def get_voto_by_id(self, voto_id):
        return self.fetch_one("SELECT * FROM Voto WHERE Id_Voto = ?", (voto_id,))

    def insert_voto(self, Fecha, Id_CandPre, Id_Casilla):
        try:
            self.execute_query("INSERT INTO Voto (Fecha, Id_CandPre, Id_Casilla) VALUES (?, ?, ?)",
                               (Fecha, Id_CandPre, Id_Casilla))
            return True
        except Exception as e:
            return str(e)

    def update_voto(self, voto_id, Fecha, Id_CandPre, Id_Casilla):
        try:
            self.execute_query("UPDATE Voto SET Fecha = ?, Id_CandPre = ?, Id_Casilla = ? WHERE Id_Voto = ?",
                               (Fecha, Id_CandPre, Id_Casilla, voto_id))
            return True
        except Exception as e:
            return str(e)

    def delete_voto(self, voto_id):
        try:
            self.execute_query("DELETE FROM Voto WHERE Id_Voto = ?", (voto_id,))
            return True
        except Exception as e:
            return str(e)
"""
if __name__ == '__main__':
    voto = VotoDAO()
    voto.insert_voto("2021-10-15", 1, 1)
    print(voto.get_voto_by_id(1))
    print(voto.get_all_votos())
"""

