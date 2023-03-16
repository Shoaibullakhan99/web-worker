let socketInstance = null;

function createSocketInstance() {
    let socket = new WebSocket("ws://192.168.0.45:8080");

    return socket;
}

function socketManagement() {
    if(socketInstance) {
        socketInstance.onopen = function (e) {
            console.log("[open] Connection established");
            postMessage("[SOCKET] Connection established");
            socketInstance.send(JSON.stringify({socketStatus: true}));
            postMessage({disableStartButton: true});
        };

        socketInstance.onmessage = function (event) {
            console.log(`[message] Data recieved from server: ${event.data}`);
            postMessage(event.data);
        };

        socketInstance.onclose = function(event) {
            if(event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code}`);
                postMessage(`[SOCKET] Connection closed cleanly, code=${event.code}`);
            }else {
                console.log(`[close] Connection died`);
                postMessage(`[SOCKET] Connection died, code=${event.code}`)
            }
            postMessage({disableStartButton: false});
        };

        socketInstance.onerror = function (error) {
            console.log(`[error] ${error.message}`);
            postMessage(`[SOCKET] ${error.message}`);
            socketInstance.close();
        };
  }
}


//SWITCH CASE: SOCKET MANAGEMENT:
// eslint-disable-next-line no-restricted-globals
self.onmessage = function(e) {
    const workerData = e.data;
    postMessage("[WORKER] Web worker onmessage established");
    switch(workerData.connectionStatus) {
        case "init":
            socketInstance = createSocketInstance();
            socketManagement();
            break;

            case "stop":
                socketInstance.close();
                break;

                default:
                    socketManagement();
    }
}