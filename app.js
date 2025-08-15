const hfUrl = "https://bhh00-ai-video-editor.hf.space/run/predict";
const sessionHash = "session1";

// Helper: convert file to Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Upload Clip
async function uploadClip() {
  const file = document.getElementById("clip").files[0];
  if (!file) return alert("Select a video clip!");

  const base64Data = await fileToBase64(file);
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [base64Data],
      fn_index: 1, // function index for uploading clips
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  document.getElementById("outputText").value += `Clip uploaded: ${file.name}\n`;
}

// Upload Image
async function uploadImage() {
  const file = document.getElementById("image").files[0];
  if (!file) return alert("Select an image!");

  const base64Data = await fileToBase64(file);
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [base64Data],
      fn_index: 2, // function index for image upload
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  document.getElementById("outputText").value += `Image uploaded: ${file.name}\n`;
}

// Upload Audio
async function uploadAudio() {
  const file = document.getElementById("audio").files[0];
  if (!file) return alert("Select an audio file!");

  const base64Data = await fileToBase64(file);
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [base64Data],
      fn_index: 3, // function index for audio upload
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  document.getElementById("outputText").value += `Audio uploaded: ${file.name}\n`;
}

// Send LLM Command
async function sendCommand() {
  const command = document.getElementById("command").value;
  if (!command) return alert("Type a command!");

  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [command],
      fn_index: 0, // function index for parse_command
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  document.getElementById("outputText").value += `Command sent: ${command}\n`;
  console.log("LLM response:", data);
}

// Add Stock Image
async function addStock() {
  const query = document.getElementById("stockQuery").value;
  if (!query) return alert("Type stock query!");

  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [query],
      fn_index: 4, // function index for stock addition
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  document.getElementById("outputText").value += `Stock added: ${query}\n`;
  console.log("Stock response:", data);
}

// Generate Preview Video
async function generatePreview() {
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [],
      fn_index: 5, // function index for generating preview
      session_hash: sessionHash
    })
  });
  const data = await res.json();
  const base64Video = data.data[0];
  document.getElementById("preview").src = "data:video/mp4;base64," + base64Video;
  document.getElementById("outputText").value += "Preview generated.\n";
}

// Attach event listeners
document.getElementById("clip").addEventListener("change", uploadClip);
document.getElementById("image").addEventListener("change", uploadImage);
document.getElementById("audio").addEventListener("change", uploadAudio);
