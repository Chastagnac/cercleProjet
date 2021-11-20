# import asyncio
# import websockets
# from methods import methods



# async def server(websocket, path):
#     data = await websocket.recv()
#     reply = f"Data received as: {data}!"
#     await websocket.send(reply)
# start_server = websockets.serve(server, "192.168.3.219", 5000)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio. get_event_loop().run_forever()

import asyncio
import datetime
import random
import websockets
import json
import threading

from CPUdata import CPUdata

async def echo(websocket):
    async for message in websocket:
        await websocket.send("Pong")

async def wsJson(websocket):
   while True:
        CpuData = CPUdata.getJsonData(CPUdata)
        await websocket.send(json.dumps(CpuData, default=str))
        await asyncio.sleep(1)

async def main():
    async with websockets.serve(wsJson, "192.168.3.219", 5000):
        await asyncio.Future()  # run forever

asyncio.run(main())
