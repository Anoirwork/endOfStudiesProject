import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';
import 'dart:io';
import 'package:adhara_socket_io/adhara_socket_io.dart';

final String _backUrl =
    Platform.isIOS ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

class MapScreen extends StatefulWidget {
  const MapScreen({Key key, this.animationController}) : super(key: key);

  final AnimationController animationController;

  @override
  _MapScreen createState() => _MapScreen();
}

class _MapScreen extends State<MapScreen> {
  var initPos = new LatLng(35.8245, 10.6346);

  @override
  void initState() {
    socketConfig();
    super.initState();
  }

  Widget build(BuildContext context) {
    return new FlutterMap(
      options: new MapOptions(
        center: new LatLng(35.8245, 10.6346),
        zoom: 13.0,
      ),
      layers: [
        new TileLayerOptions(
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: ['a', 'b', 'c']),
        new MarkerLayerOptions(
          markers: [
            new Marker(
              width: 30.0,
              height: 30.0,
              point: initPos,
              builder: (ctx) => new Container(
                child: new FlutterLogo(),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

Future<dynamic> socketConfig() async {
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
    print(json.decode(data));
  });
  socket.connect();
}

class Obj {
  double lat;
  double lng;
  Obj(double l, double ln) {
    this.lat = l;
    this.lng = ln;
  }
}
