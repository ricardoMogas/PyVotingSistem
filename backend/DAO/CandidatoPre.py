import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb
import base64

class CandidatoPre(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_candidato_pre_table()

    def create_candidato_pre_table(self):
        fields = [
            '"Id_CandPre" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"nombreComp" TEXT',
            '"Id_Part" INTEGER',
            '"descripcion" TEXT',
            '"imagen" BLOB',
            'FOREIGN KEY("Id_Part") REFERENCES "Partido"("Id_Part")'
        ]
        self.create_table("CandidatoPre", fields)
    
    def get_one_candidato_pre(self, Id_CandPre):
        query = 'SELECT * FROM "CandidatoPre" WHERE "Id_CandPre" = ?'
        return self.fetch_one(query, (Id_CandPre,))

    def create_candidato_pre(self, nombreComp, Id_Part, descripcion, imagen):
        # Convert base64 image to blob
        imagen_blob = base64.b64decode(imagen)
        query = 'INSERT INTO "CandidatoPre" ("nombreComp", "Id_Part", "descripcion", "imagen") VALUES (?, ?, ?, ?)'
        self.execute_query(query, (nombreComp, Id_Part, descripcion, imagen_blob))

    def get_all_candidato_pre(self):
        query = 'SELECT * FROM "CandidatoPre"'
        return self.fetch_all(query)

    def get_candidato_pre(self, Id_CandPre):
        query = 'SELECT * FROM "CandidatoPre" WHERE "Id_CandPre" = ?'
        return self.fetch_one(query, (Id_CandPre,))


"""
if __name__ == '__main__':
    candidato_pre = CandidatoPre()
    candidato_pre.create_candidato_pre("2", 1, "Descripcion 1", "")
    print(candidato_pre.get_all_candidato_pre())
    print(candidato_pre.get_candidato_pre(1))

"""
