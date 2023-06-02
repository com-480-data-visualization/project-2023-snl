import pandas as pd
import sys
import operator

data = pd.read_csv(sys.argv[1], delimiter=',')
data.sort_values(["GHG emissions per kilogram (Poore & Nemecek, 2018)"],axis=0,ascending=[False], inplace=True)

print(data)

for index, row in data.iterrows():
    print("<label>" + row[0]+ ":")
    print("  <input id=\"" + row[0] + "\" name=\"" + row[0] +"\" type=\"number\" value=\"0\">")
    print("  <text>g/week</text>")
    print("</label>")
    print("<div/>")

for index, row in data.iterrows():
    print("[\"" + row[0] + "\", \"Food\"" + "],")
