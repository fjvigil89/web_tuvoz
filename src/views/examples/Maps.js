/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components

import SpecialistHeader from "components/Specialist/Headers/SpecialistHeader";
import AdminHeader from "components/Admin/Headers/AdminHeader";
import useBaseURL from "../../Hooks/useBaseURL";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const cookie = new Cookies();

const MapWrapper = () => {
  const baseURL = useBaseURL(null);
  const mapRef = React.useRef(null);

  const [user, setUser] = useState([]);

  //metodo Sincronico para el consumo del login en la api
  const getAllUser = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      axios
        .get(baseURL + "api/user")
        .then((response) => {
          setUser(response.data.data);
          initMap();

          console.log(user);
        })
        .catch((err) => {
          Swal.fire({
            title: "Oops!!",
            text: "there is a problem connecting with  the API server!",
            icon: "warning",
            footer: '<span style="color: red">server with error!<span/>',
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 4000,
          });
        });
    });
  };

  const initMap = async () => {
    let google = window.google;
    let map = mapRef.current;

    var bounds = new google.maps.LatLngBounds();

    const mapOptions = {
      zoom: 13,
      //center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // Display a map on the web page

    map = new google.maps.Map(map, mapOptions);
    map.setTilt(50);

    // Add multiple markers to map
    var infoWindow = new google.maps.InfoWindow(),
      marker,
      i;

    // Place each marker on the map
    for (i = 0; i < user.length; i++) {
      if (user[i]["location"] !== null) {
        var position = new google.maps.LatLng(
          user[i]["location"]["latitude"],
          user[i]["location"]["longitude"]
        );

        var pinIcon = new google.maps.MarkerImage(
          user[i]["foto"],
          null /* size is determined at runtime */,
          null /* origin is 0,0 */,
          null /* anchor is bottom center of the scaled image */,
          new google.maps.Size(50, 50)
        );

        bounds.extend(position);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: user[i]["name"],
          icon: pinIcon,
        });

        // Add info window to marker
        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              infoWindow.setContent(
                '<div class="info_content">' +
                  "<h3>" +
                  user[i]["name"] +
                  "</h3>" +
                  "<p>" +
                  user[i]["description"] +
                  "</p>" +
                  "</div>"
              );
              infoWindow.open(map, marker);
            };
          })(marker, i)
        );

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
      } else {
        var position = new google.maps.LatLng(
          41.68395516233397,
          -0.8889940576712089
        );
        bounds.extend(position);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: "Unizar",
        });
        const infowindow = new google.maps.InfoWindow({
          content: "<p> Aquí estamos!</p>",
        });
        // Add info window to marker
        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              infoWindow.open(map, marker);
            };
          })(marker, i)
        );

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
      }
    }

    // Set zoom level
    var boundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
      }
    );
  };
  useEffect(() => {
    getAllUser();

    if (!cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);

  return (
    <>
      <div
        style={{ height: `600px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}
      ></div>
    </>
  );
};

const Maps = () => {
  return (
    <>
      {cookie.get("role") === "Admin" ? <AdminHeader /> : <SpecialistHeader />}

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
