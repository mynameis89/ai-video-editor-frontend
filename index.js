<!DOCTYPE html>
<html>
<head>
  <title>AI Video Editor</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>AI Video Editor</h1>
  
  <input type="file" id="clip" accept=".mp4"><br>
  <input type="file" id="image" accept=".png,.jpg"><br>
  <input type="file" id="audio" accept=".mp3,.wav"><br>
  
  <input type="text" id="command" placeholder="Type command">
  <button onclick="sendCommand()">Send Command</button><br><br>
  
  <input type="text" id="stockQuery" placeholder="Stock search">
  <button onclick="addStock()">Add Stock</button><br><br>
  
  <video id="preview" controls></video>
  
  <script src="app.js"></script>
</body>
</html>
