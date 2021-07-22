import 'package:KidsTracker/main.dart';
import 'package:flutter/material.dart';
import 'package:splashscreen/splashscreen.dart';

class SplashScreenScene extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return (SplashScreen(
        seconds: 10,
        // the widget to run after running your splashscreen for 1 sec
        navigateAfterSeconds: HomeScreen(),
        title: Text('My splashscreen'),
        image: Image.asset('assets/splashscreen.png'),
        backgroundColor: Colors.white,
        styleTextUnderTheLoader: TextStyle(),
        photoSize: 100.0,
        loaderColor: Colors.white));
  }
}
