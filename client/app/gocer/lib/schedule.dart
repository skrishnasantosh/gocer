
import 'package:flutter/material.dart';
import 'package:gocer/places_autocomplete.dart';

//import 'package:geolocator/geolocator.dart';

class SchedulePage extends StatefulWidget {
  SchedulePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  SchedulePageState createState() => SchedulePageState();
}

class SchedulePageState extends State<SchedulePage> {

  String _position = "Test";

  SchedulePageState() {
  /*  Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
      .then((val) => setState(()=>{
          this._position = "Latitude : ${val.latitude}, Longitude : ${val.longitude}"
      }), onError: (e)=> {
          this._position = e.toString()
      });*/
  }
  
  @override
  Widget build(BuildContext context) {    
    
    return Scaffold(      
      body: Center(        
        child: Column(          
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            AutoComplete()
          ],
        ),
      ),
    );
  }
}
