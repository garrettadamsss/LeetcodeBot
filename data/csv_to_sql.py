import sqlite3
import pandas as pd


# # Connect to SQLite database
# conn = sqlite3.connect('./data/problems_database.db')


# cursor = conn.cursor()

# cursor.execute('''CREATE TABLE problems (id INTEGER PRIMARY KEY AUTOINCREMENT, problemLink TEXT NOT NULL, difficulty TEXT NOT NULL)''')

# # Load CSV data into Pandas DataFrame
# problems = pd.read_csv('data/free_problems_list.csv')

# problems.to_sql('problems', conn, if_exists='append', index=False)

# rows = cursor.execute('''SELECT * FROM problems''').fetchall()
# for r in rows : 
#     print(r)

# conn.close()

# Import required libraries
import sqlite3
import pandas as pd
  
# Connect to SQLite database
conn = sqlite3.connect('./data/bot_database.db')
  
# Load CSV data into Pandas DataFrame
stud_data = pd.read_csv('./data/free_problems_list.csv')
# Write the data to a sqlite table
stud_data.to_sql('problems', conn, if_exists='replace', index=False)
  
# Create a cursor object
cur = conn.cursor()
# Fetch and display result
for row in cur.execute('SELECT problemLink FROM problems'):
    print(row)
# Close connection to SQLite database
conn.close()