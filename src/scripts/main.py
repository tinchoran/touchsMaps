import pandas as pd
from statsbombpy import sb
import matplotlib.pyplot as plt
from mplsoccer import VerticalPitch, Pitch
from datetime import datetime, timedelta
import os
import sys
import re
#Rescatar id del jugador pasado como argumento
param = sys.argv[1]
# Solicitar los datos del partido
partido = sb.events(match_id=3869685)

# Encontrar el jugador de interés 
jugador = partido[partido["player_id"] == float(param)].copy()
jugador[["x","y"]] = jugador["location"].apply(pd.Series)
jugador[["x", "y", "location"]]

# Obtener los toques que fueron goles
goals = jugador[jugador["shot_outcome"] == "Goal"]


fig, ax = plt.subplots(figsize=(16,9))
fig.patch.set_facecolor('white')
ax.set_facecolor('white')
pitch = Pitch(
    pitch_color='grass', 
    line_color='white',
    stripe=True, 
    pitch_type="statsbomb",
)

# Dibujar los toques
pitch.scatter(jugador["x"], jugador["y"], ax = ax, c='#f7f7f7', edgecolor="#6b0002")

# Dibujar los goles con un color diferente
pitch.scatter(goals["x"], goals["y"], ax=ax, c='blue', edgecolor="white", label="Goles")

# Poner Leyenda
ax.legend(facecolor='#22312b', edgecolor='None', fontsize=15, loc='upper left', fancybox=False)

#Dibujar
pitch.draw(ax = ax)

# Obtener nombre del archivo mediante una funcion que le asigna un número relacionado con la cantidad de milisegundos que pasaron desde el 2000
now = datetime.utcnow()
epoch = datetime(2000, 1, 1, 0, 0, 0, 0)
time_difference = now - epoch
ms = int(time_difference.total_seconds() * 1000)

# Obtener la ruta donde se va a guardar el archivo
savePath = os.getcwd() + f'/public/gen_img/{ms}'



# Guardar el archivo png generado
plt.savefig(savePath, bbox_inches='tight', pad_inches=0)

print(f'/gen_img/{ms}.png')
