import matplotlib.pyplot as plt
import json
import sys

corpus = sys.argv[1]
streamIndex = int(sys.argv[2])

with open('data/' + corpus) as data_file:
    streams = json.load(data_file)

stream = streams[streamIndex]

def showAttribute(stream,attributesIndex):
    label = ['x','y','z','alpha','beta','gamma'][attributesIndex]
    mono_stream = [x[attributesIndex] for x in stream]
    print(len(mono_stream))
    plt.plot(mono_stream, label = label)

for attr in [0,1,2]:
    showAttribute(stream,attr)

plt.ylabel('magnitude');
plt.legend()
plt.show();
