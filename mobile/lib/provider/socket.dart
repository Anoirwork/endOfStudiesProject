import 'dart:io';
import 'package:adhara_socket_io/adhara_socket_io.dart';
import 'dart:convert';

final String _backUrl =
    Platform.isIOS ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

Future<void> socketConfig() async {
  SocketIOManager manager = SocketIOManager();

  SocketIO socket = await manager.createInstance(SocketOptions(_backUrl,
      transports: [Transports.WEB_SOCKET], enableLogging: true));
  socket.onConnect((data) {
    print("connected...");
    print(data);
  });
  socket.on("parent", (data) {
    //sample event
    print("parent");
    var x = json.decode(data);
    print(x);
  });
  socket.connect();
}
