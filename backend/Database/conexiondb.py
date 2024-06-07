import sqlite3
from sqlite3 import Error
import os
import json

class conexiondb:
    def __init__(self):
        # Obtener la ruta del directorio del script actual
        script_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(script_dir, "database.db")
        
        try:
            self.conn = sqlite3.connect(db_path)
            print(f"Conexión establecida")
        except Error as e:
            print(f"Error al conectar a la base de datos: {e}")
            self.conn = None

    def close_connection(self):
        """Cierra la conexión con la base de datos."""
        if self.conn:
            self.conn.close()
            print("Conexión cerrada")

    def execute_query(self, query, params=None):
        """Ejecuta una consulta SQL."""
        if not self.conn:
            print("No hay conexión a la base de datos.")
            return None
        try:
            cur = self.conn.cursor()
            if params:
                cur.execute(query, params)
            else:
                cur.execute(query)
            self.conn.commit()
            return cur
        except Error as e:
            print(f"Error al ejecutar la consulta: {e}")
            return None

    def fetch_all(self, query, params=None):
        """Ejecuta una consulta SELECT y retorna todos los resultados."""
        cur = self.execute_query(query, params)
        if cur:
            return cur.fetchall()
        return None

    def fetch_one(self, query, params=None):
        """Ejecuta una consulta SELECT y retorna un único resultado."""
        cur = self.execute_query(query, params)
        if cur:
            return cur.fetchone()
        return None
    
    def fetch_all_as_dict(self, query, params=None):
        """Ejecuta una consulta SELECT y retorna todos los resultados como lista de diccionarios."""
        cur = self.execute_query(query, params)
        if cur:
            columns = [column[0] for column in cur.description]
            results = [dict(zip(columns, row)) for row in cur.fetchall()]
            return results
        return None

    def migrate_data(self, insert_query, data):
        """Migra datos a la base de datos."""
        if not self.conn:
            print("No hay conexión a la base de datos.")
            return
        try:
            cur = self.conn.cursor()
            cur.executemany(insert_query, data)
            self.conn.commit()
            print(f"{cur.rowcount} filas insertadas.")
        except Error as e:
            print(f"Error al migrar datos: {e}")

    def create_table(self, table_name, fields):
        field_definitions = ', '.join(fields)
        create_table_query = f"""
        CREATE TABLE IF NOT EXISTS "{table_name}" (
            {field_definitions}
        );"""
        self.execute_query(create_table_query)
