import 'dart:io';

import 'package:adhara_socket_io/adhara_socket_io.dart';

final String _backUrl =
    Platform.isIOS ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
Future<void> socketConfig() async {
  SocketIOManager manager = SocketIOManager();

  SocketIO socket = await manager.createInstance(_socketOptions());
  socket.onConnect((data) {
    print("connected...");
  });
  socket.on("frontData", (data) {
    print("news");
    print(data);
  });
  socket.connect();
}

_socketOptions() {
  return SocketOptions(
    _backUrl,
    enableLogging: true,
    transports: [Transports.WEB_SOCKET],
  );
}
