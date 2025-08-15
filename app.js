const hfUrl = "https://bhh00-ai-video-editor.hf.space/run/predict";

async function sendCommand() {
  const command = document.getElementById("command").value;
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [command], fn_index: 0, session_hash: "session1" })
  });
  const data = await res.json();
  alert(JSON.stringify(data));
}

async function addStock() {
  const query = document.getElementById("stockQuery").value;
  const res = await fetch(hfUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [query], fn_index: 2, session_hash: "session1" })
  });
  const data = await res.json();
  alert(JSON.stringify(data));
}
