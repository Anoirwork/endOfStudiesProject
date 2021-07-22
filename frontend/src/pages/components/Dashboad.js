import React from "react";
import {
  Map,
  TileLayer,
  Popup,
  Tooltip,
  Polyline
} from "react-leaflet";
import { DriftMarker } from "leaflet-drift-marker";
import Spinner from "../HelperFunctions/Spinner";
import io from 'socket.io-client'
import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineCoords: [],
      pos: {
        lat: 35.8254,
        lng: 10.637
      },
      zoom: 17,
      kids : [{}]
      
    };
    if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
      localStorage.clear();
      this.props.history.push("/login");
    }
    let reqBody = {
      query: `
        query{
            kidsRelated(userId:"${localStorage.getItem('userId')}"){
              _id
              name
              number
              email
              birthDay
            }
          }`
    };
    fetch("http://localhost:4000/api", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 401) {
            localStorage.clear();
            this.props.history.push("/login");
          }
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data.kidsRelated);
        this.setState({  kids: resData.data.kidsRelated });
      })
      .catch(err => {
        throw err;
      });
    let queryBodyForPosition =  JSON.stringify({
      query: `query{
        retriveLastRoad(kidNumb: "54155122"){
          lat
          lng
        }
      }`
    });
    fetch("http://localhost:4000/api", {
      method: "POST",
      body: queryBodyForPosition,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
        }
        return res.json();
      })
      .then(json => {
        const road = json.data.retriveLastRoad;
        if(road.length !== 0){
        this.setState({
          lineCoords: road,
          pos: {
            lat: road[road.length-1].lat,
            lng: road[road.length-1].lng
          }
        });
      }
      else{
        console.log("nothing to show")
      }
      })

      .catch(err => {
        throw err;
      });
    
    
  }
  
  componentDidMount() {
    const socket = io("http://localhost:5000", {
      transports: ['websocket']
    })

    socket.on("parent", (data) => {
      let road = this.state.lineCoords;
      console.log(data, "this is what coming of the server")
      console.log(road, "this is the road")
      if(road.length > 0){
        console.log("i'm in the if")
        road.unshift({
          lat: data.lat,
          lng: data.lng
        });
        this.setState({
          pos: {
            lat: data.lat,
            lng: data.lng
          },
          lineCoords: road
        });
      }
      else {
        console.log("im here else")
        road.unshift({
          lat: data.lat,
          lng: data.lng
        })
        this.setState({
          pos: {
            lat: data.lat,
            lng: data.lng
          },
          lineCoords: road
        });
      }
      
    });

  }
    /*let queryBodyForPosition = JSON.stringify({
      query: `query{
      retrivePos(a: "alala"){
        lat
        lng
        currentTime
      }
    }`
    });
    setInterval(() => {
      fetch("http://localhost:4000/api", {
        method: "POST",
        body: queryBodyForPosition,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
          }
          return res.json();
        })
        .then(json => {
          if (this.state.pos.lat !== json.data.retrivePos[0].lat) {
            let road = this.state.lineCoords;
            road.pop();
            road.unshift({
              lat: json.data.retrivePos[0].lat,
              lng: json.data.retrivePos[0].lng
            });
            this.setState({
              pos: {
                lat: json.data.retrivePos[0].lat,
                lng: json.data.retrivePos[0].lng
              },
              posTwo: {
                lat: road[1].lat,
                lng: road[1].lng
              },
              lineCoords: road
            });
          }
        })

        .catch(err => {
          throw err;
        });
    }, 2000);*/
  

  render() {
    
    return (
      <React.Fragment>
        {this.state.loading && (
          <Spinner message="Please share your location." />
        )}

        <Map
          center={this.state.pos}
          zoom={17}
          ref={ref => {
            this.map = ref;
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Polyline
            positions={[this.state.lineCoords]}
            color="red"
            lineCap="butt"
            fillRule="evenodd"
            noClip="true"
            smoothFactor="0"
          />

          <DriftMarker position={this.state.pos} duration={3000}>
            <Popup>
              <br /> omizable.
            </Popup>
            <Tooltip>Tooltip for Marker</Tooltip>
          </DriftMarker>
        </Map>
      </React.Fragment>
    );
  }
}
export default Dashboard;


