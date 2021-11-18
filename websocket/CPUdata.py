from gpiozero import CPUTemperature
import os
import time
import json
import datetime
import pytz

class CPUdata:
    def init(self):
        self.Temp = self.getTemp()
        self.Usage = self.getUsage()

    def getJsonData(self):
        date = datetime.datetime.now()
        date = self.utcToLocalTime(date).strftime("%d/%m/%Y, %H:%M:%S")
        with open('/home/pi/tmp/deepspeech-venv/mic_vad_streaming/test.txt') as f:
            lines = f.readlines()
        CPUJsonData = { 
            'CPUdata' : [{
                'Temperature' : self.getTemp(),
                'CpuUsage' : self.getUsage(),
                'RAMUsage' : self.getRAM(2),
                'Date' : date,
                'Text' : lines
            }]
        }
        return CPUJsonData
    # commande linux => free -h
    def getRAM(option):
        p = os.popen('free -h')
        i = 0
        while 1:
            i = i + 1
            line = p.readline()
            print(line)
            if i==2:
                infos = line.split()[1:4]
                #return line.split()[1:4]
                return(infos[option].replace("i", "o")) 
    def getTemp():
        return CPUTemperature().temperature 
    def getUsage():
        return 100 - float(os.popen("top -n1 | awk '/Cpu(s):/ {print $8}'").readline().replace(",", ".").format())
    def utcToLocalTime(utcDateTime):
        localTz = pytz.timezone('Europe/Paris')
        localTime = utcDateTime.replace(tzinfo=pytz.utc).astimezone(localTz)
        return localTz.normalize(localTime)