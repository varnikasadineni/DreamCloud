# GuguGaga — LAN Website & API (Pinned IP 10.7.74.62)

This archive contains the AI engine (FastAPI), Node proxy, and a minimal mobile app UI.
The services are configured to bind to **10.7.74.62** so mobile devices on the same LAN can access them.

## Important note about IP retention
I cannot change your network's DHCP or router settings from here. To *keep the IP address 10.7.74.62* permanently you must either:
1. Configure a **static IP** on the laptop (Windows: network adapter properties) set to 10.7.74.62 (choose correct gateway/DNS), OR
2. Reserve the IP in your router's DHCP settings by binding the laptop's MAC address to 10.7.74.62 (DHCP reservation).

Both methods are documented later in this README.

## Quick start (AI Engine)
1. Create and activate Python 3.10 venv.
2. `pip install -r ai-engine/requirements.txt`
3. Run the API server (binds to 10.7.74.62:8000):
```sh
cd ai-engine
uvicorn app:app --host 10.7.74.62 --port 8000
```

## Node proxy (optional)
1. `cd backend && npm install`
2. Start the proxy (defaults to proxying to http://10.7.74.62:8000):
```sh
PY_SERVER=http://10.7.74.62:8000 node server.js
```
The proxy listens on port 5000 and has CORS enabled.

## Mobile app
Edit `mobile-app/screens/HomeScreen.js` if you change IPs. The example points to `http://10.7.74.62:5000` (Node).

## Ensuring IP stays 10.7.74.62
1. Static IP on Windows 10/11: Settings → Network & Internet → Change adapter options → Right-click adapter → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties → Use the following IP address. Enter IP: 10.7.74.62 and proper gateway/subnet/DNS.
2. DHCP reservation: Log into your router (usually 192.168.1.1 or router-specific), find DHCP reservation or static leases, add the laptop MAC and assign 10.7.74.62.

## Testing
- Use the shared mock JSON by creating `ai-engine/sample.wav` or modify `app.py` to return the mock during dev.
- Mobile should poll every 2 seconds. API must respond <400ms on a typical laptop.

