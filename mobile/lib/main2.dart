import 'package:flutter/material.dart';
import 'Screens/Map.dart';
import 'Screens/Home.dart';
import 'navigation/bottomBarView.dart';
import 'navigation/tabIconData.dart';
import 'Screens/Login.dart';

void main() {
  runApp(MaterialApp(title: "Kids Tracker", home: MyApp()));
}

class MyApp extends StatefulWidget {
  @override
  HomePage createState() => HomePage();
}

class HomePage extends State<MyApp> with TickerProviderStateMixin {
  List<TabIconData> tabIconsList = TabIconData.tabIconsList;
  AnimationController animationController;
  Widget tabBody = LoginView();
  String screen;

  @override
  void initState() {
    tabIconsList.forEach((tab) {
      tab.isSelected = false;
    });
    tabIconsList[0].isSelected = true;
    animationController =
        AnimationController(duration: Duration(milliseconds: 600), vsync: this);
    tabBody = LoginScreen();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: tabBody,
        bottomNavigationBar: BottomBarView(
          tabIconsList: tabIconsList,
          addClick: () {
            animationController.reverse().then((data) {
              if (!mounted) return;
              setState(() {
                tabBody = Map();
              });
            });
          },
          changeIndex: (index) {
            if (index == 0) {
              animationController.reverse().then((data) {
                print(index);
                if (!mounted) return;
                setState(() {
                  tabBody = LoginScreen();
                });
              });
            } else if (index == 1) {
              animationController.reverse().then((data) {
                if (!mounted) return;
                setState(() {
                  tabBody = Container(child: Text('1'));
                });
              });
            } else if (index == 2) {
              animationController.reverse().then((data) {
                print(index);
                if (!mounted) return;
                setState(() {
                  tabBody = Container(child: Text('2'));
                });
              });
            } else if (index == 3) {
              animationController.reverse().then((data) {
                print(index);
                if (!mounted) return;
                setState(() {
                  tabBody = Container(child: Text('3'));
                });
              });
            }
          },
        ));
  }
}
