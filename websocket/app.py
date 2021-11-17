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


</body>
  <body>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
          <a class="navbar-brand" href="index.html">Exotismes</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto py-4 py-lg-0">
              <li class="nav-item">
                <a class="nav-link px-lg-3 py-3 py-lg-4" href="index.html"
                  >Accueil</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-3 py-3 py-lg-4" href="about.html"
                  >À propos</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-3 py-3 py-lg-4" href="contact.html"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- Page Header-->
      <header
        class="masthead"
        style="background-image: url('assets/img/home-bg.jpg')"
      >
        <div class="container position-relative px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <div class="site-heading">
                <h1>Demi-Pension</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Main Content-->
      Client1
      <button onclick="sendMsg()">Send Msg</button>
      <div>
        <table>
          <tr style="font-weight: bold">
            <td>Date</td>
            <td>Température CPU</td>
            <td>Utilisation du CPU</td>
            <td>Utilisation de la RAM</td>
          </tr>
          <tr>
            <td id="date">0</td>
            <td id="temp">0</td>
            <td id="cpu">0</td>
            <td id="ram">0</td>
          </tr>
        </table>
      </div>
      <script>
        const socket = new WebSocket("ws://192.168.3.219:5000");

        socket.addEventListener("open", function (event) {
          console.log("Connecté WS serveur");
        });

        socket.addEventListener("close", function (event) {
          console.log("Déconnecté WS serveur");
        });

        socket.addEventListener("message", function (event) {
          console.log("Serveur : Data receive");
          UpdateData(JSON.parse(event.data));
        });

        function UpdateData(CpuJson) {
          console.log(CpuJson);
          document.getElementById("date").innerText =
            CpuJson["CPUdata"][0]["Date"];
          document.getElementById("temp").innerText =
            CpuJson["CPUdata"][0]["Temperature"] + "°C";
          document.getElementById("cpu").innerText =
            CpuJson["CPUdata"][0]["CpuUsage"].toFixed(2) + "%";
          document.getElementById("ram").innerText =
            CpuJson["CPUdata"][0]["RAMUsage"] + "/3.7Go";
        }
      </script>

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
            <div id="top_x_div" style="width: 800px; height: 600px"></div>
          </div>
        </div>
      </div>

      <!-- Footer-->
      <footer class="border-top">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <ul class="list-inline text-center">
                <li class="list-inline-item">
                  <a href="https://www.exotismes.fr/">
                    <span class="fa-stack fa-lg">
                      <i class="fas fa-circle fa-stack-2x"></i>
                      <i class="fa fa-plane fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </li>
              </ul>
              <div class="small text-center text-muted fst-italic">
                Copyright &copy; Institut G4 - 2021
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- Bootstrap core JS-->
      <!-- Core theme JS-->
      <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
      <script src="js/scripts.js"></script>
      <script src="js/app.js"></script>
    </div>
  </body>