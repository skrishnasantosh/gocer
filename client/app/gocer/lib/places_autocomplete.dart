import 'package:flutter/material.dart';
import 'package:autocomplete_textfield/autocomplete_textfield.dart';

class AutoComplete extends StatefulWidget {

  @override
  AutoCompleteState createState() => new AutoCompleteState();
}

class Organization { 
  String id, name, street, country, province, city, category;
  int distanceRank;
  int latitude, longitude, rating;

  Organization({
    this.id, this.name, this.street, this.country, this.province, this.city, this.category,
    this.distanceRank, this.latitude, this.longitude, this.rating
  }) {

  }
}

class AutoCompleteState extends State<AutoComplete> {
  AutoCompleteTextField _searchTextField;
  static List<Organization> _organizations;
  GlobalKey<AutoCompleteTextFieldState<Organization>> key = new GlobalKey();
  TextEditingController controller = new TextEditingController();

  AutoCompleteState() {

  }

  @override
  Widget build(BuildContext context) {

    _searchTextField = AutoCompleteTextField<Organization>(
      style: new TextStyle(color: Colors.black87, fontSize: 16),      
      decoration: new InputDecoration(
        suffixIcon: Container(width: 85, height: 60)
      ),
      controller: controller,            
      itemBuilder: (context, item) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,          
          children: <Widget>[
            Text(item.name, 
              style: TextStyle(fontSize: 16, ),),
            Padding(padding: EdgeInsets.all(25.0)),
            Text(item.street)
          ],
        );
      },
      itemSorter: (a, b) {
        return (a.distanceRank < b.distanceRank) ? -1 : (a.distanceRank == b.distanceRank) ? 0 : 1;
      },
      itemFilter: (item, query){
        return item.name.toLowerCase().startsWith(query.toLowerCase());
      },
      itemSubmitted: (item){
        setState(()=>{
          _searchTextField.textField.controller.text = item.name
        });
      },
      key: key,
      suggestions: <Organization>[
        Organization(name: "Sheng Siong", street: "Tanglin Halt Drive", distanceRank: 1),
        Organization(name: "Rubiya Stores", street: "Commonwealth Wet Market", distanceRank: 2),
      ],
    );

    return Container(
        height: 80,
        child: Padding(
            padding: EdgeInsets.all(8),
            child: Column(
                children: <Widget>[
                  _searchTextField
                ]
              )
        )
      );
  }
}