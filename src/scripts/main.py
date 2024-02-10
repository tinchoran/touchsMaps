import pandas as pd
from statsbombpy import sb
import matplotlib.pyplot as plt
from mplsoccer import VerticalPitch, Pitch
from datetime import datetime, timedelta
import os
partido = sb.events(match_id=3869685)

messi = partido[partido["player"] == "Lionel Andrés Messi Cuccittini"].copy()
messi[["x","y"]] = messi["location"].apply(pd.Series)
messi[["x", "y", "location"]]

fig, ax = plt.subplots(figsize=(16,9))
pitch = Pitch(
    pitch_color='grass', 
    line_color='white', 
    pitch_type="statsbomb",
)

pitch.draw(ax = ax)

pitch.scatter(messi["x"], messi["y"], ax = ax, c='#f7f7f7', edgecolor="#6b0002")


now = datetime.utcnow()
epoch = datetime(2000, 1, 1, 0, 0, 0, 0)
time_difference = now - epoch
ms = int(time_difference.total_seconds() * 1000)

savePath = os.getcwd() + f'/public/gen_img/{ms}'

plt.savefig(savePath)

print(f'/gen_img/{ms}.png')
