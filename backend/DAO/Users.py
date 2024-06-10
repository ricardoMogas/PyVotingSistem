import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Database.conexiondb import conexiondb
class Users(conexiondb):
    def __init__(self):
        super().__init__()
        self.create_table("users", [
            '"id_user" INTEGER PRIMARY KEY AUTOINCREMENT',
            '"name" TEXT',
            '"rol" INTEGER',
            '"password" TEXT',
            '"Id_Casilla" INTEGER'
        ])

    def get_all_users(self):
        return self.fetch_all("SELECT * FROM users")

    def get_user_by_id(self, user_id):
        return self.fetch_one("SELECT * FROM users WHERE id_user = ?", (user_id,))
    
    def get_user_exist(self, name, password):
        result = self.fetch_one("SELECT * FROM users WHERE name = ? AND password = ?", (name, password))
        return result

    def insert_user(self, name, rol, password, Id_Casilla):
        try:
            self.execute_query("INSERT INTO users (name, rol, password, Id_Casilla) VALUES (?, ?, ?, ?)",
                               (name, rol, password, Id_Casilla))
            return True
        except Exception as e:
            return str(e)

    def update_user(self, user_id, name, rol, password, Id_Casilla):
        try:
            self.execute_query("UPDATE users SET name = ?, rol = ?, password = ?, Id_Casilla = ? WHERE id_user = ?",
                               (name, rol, password, Id_Casilla, user_id))
            return True
        except Exception as e:
            return str(e)

    def delete_user(self, user_id):
        try:
            self.execute_query("DELETE FROM users WHERE id_user = ?", (user_id,))
            return True
        except Exception as e:
            return str(e)
"""
if __name__ == '__main__':
    users = Users()
    users.insert_user("adm1", 0, "1234", 0) # ADMINISTRADOR
    # users.insert_user("test2", 1, "1234", 2) # FUNCIONARIO DE CASILLA
    print(users.get_user_by_id(3))
"""
