import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb
import base64
import sqlite3

class Resultados(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_table("Resultados", [
            '"Id_RE" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"totalVotos" INTEGER',
            '"Id_Casilla" INTEGER',
            '"PDF" BLOB',
            '"date" TEXT',
            'FOREIGN KEY("Id_Casilla") REFERENCES "Casilla"("Id_Casilla")'
        ])

    def get_all_resultados(self):
        return self.fetch_all("SELECT * FROM Resultados")

    def get_resultado_by_id(self, resultado_id):
        return self.fetch_one("SELECT * FROM Resultados WHERE Id_RE = ?", (resultado_id,))

    def insert_resultado(self, totalVotos, Id_Casilla, PDF, date):
        try:
            # Convertir la cadena base64 a datos binarios
            pdf_blob = base64.b64decode(PDF)
            self.execute_query("INSERT INTO Resultados (totalVotos, Id_Casilla, PDF, date) VALUES (?, ?, ?, ?)",
                            (totalVotos, Id_Casilla, sqlite3.Binary(pdf_blob), date))
            return True
        except Exception as e:
            return str(e)

    def update_resultado(self, resultado_id, totalVotos, Id_Casilla, PDF, date):
        try:
            # Convertir la cadena base64 a datos binarios
            pdf_blob = base64.b64decode(PDF)
            self.execute_query("UPDATE Resultados SET totalVotos = ?, Id_Casilla = ?, PDF = ?, date = ? WHERE Id_RE = ?",
                            (totalVotos, Id_Casilla, sqlite3.Binary(pdf_blob), date, resultado_id))
            return True
        except Exception as e:
            return str(e)

    def delete_resultado(self, resultado_id):
        try:
            self.execute_query("DELETE FROM Resultados WHERE Id_RE = ?", (resultado_id,))
            return True
        except Exception as e:
            return str(e)

"""
if __name__ == '__main__':
    resultado = Resultados()
    # resultado.insert_resultado(100, 1, "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVR42mNkAAJjY2Bg", "2021-10-15")
    print(resultado.get_all_resultados())
"""
