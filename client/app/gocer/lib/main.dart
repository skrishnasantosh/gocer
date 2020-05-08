import 'package:flutter/material.dart';
import 'package:gocer/schedule.dart';

void main() {
  runApp(GocerApp());
}

class GocerApp extends StatelessWidget { 
  @override
  Widget build(BuildContext context) {    
    return MaterialApp(
      title: 'Gocer',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.deepPurple,
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: DefaultTabController (
        length: 4,        
        child: Scaffold(
          appBar: AppBar(
            title: Text('CrowdControl'),            
            bottom: TabBar(      
              labelPadding: EdgeInsets.symmetric(vertical:0, horizontal:40),
              isScrollable: true,              
              tabs: <Tab> [
                  Tab(icon: Icon(Icons.home), text: 'Home'),
                  Tab(icon: Icon(Icons.calendar_today), text: 'Schedule'),
                  Tab(icon: Icon(Icons.alarm), text: 'Upcoming'),
                  Tab(icon: Icon(Icons.settings), text: 'Settings'),
              ]
            )
          ),
          body: TabBarView(
            children: <Widget>[
                SchedulePage(title: 'some'),
                SchedulePage(title: 'some'),
                SchedulePage(title: 'some'),
                SchedulePage(title: 'some'),
            ],
          ),
        )
      ),
    );
  }
}
