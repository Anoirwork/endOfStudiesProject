import 'package:flutter/material.dart';
import '../utils/CustomTextField.dart';

class SignUpScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
              colors: [Colors.blue[400], Colors.blue],
              begin: Alignment.bottomCenter,
              end: Alignment.topCenter),
        ),
        child: Center(
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 80,
              ),
              Row(
                children: <Widget>[
                  SizedBox(
                    width: 40,
                  ),
                  Text(
                    'Créer un  compte',
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 35),
                  ),
                ],
              ),
              SizedBox(
                height: 60,
              ),
              CustomTextField(
                hint: 'Entre votre nom ',
                issecured: false,
              ),
              SizedBox(
                height: 15,
              ),
              CustomTextField(
                hint: 'Entre votre prénom',
                issecured: false,
              ),
              SizedBox(
                height: 15,
              ),
              CustomTextField(
                hint: 'Entrez votre numéro',
                issecured: false,
              ),
              SizedBox(
                height: 15,
              ),
              CustomTextField(
                hint: 'Votre mot de passe',
                issecured: true,
              ),
              SizedBox(
                height: 25,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 25, right: 25),
                child: ButtonTheme(
                    buttonColor: Colors.white,
                    minWidth: MediaQuery.of(context).size.width,
                    height: 55,
                    child: RaisedButton(
                      onPressed: () {},
                      child: Text(
                        'S\'inscrire',
                        style: TextStyle(color: Colors.grey, fontSize: 22),
                      ),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25)),
                    )),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
