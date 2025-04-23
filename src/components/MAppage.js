// src/pages/MapPage.js
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MAppage.css";

const data = {
  nodes: {
    Bhimtal: [29.3422, 79.5668],
    Bhowali: [29.3922, 79.524],
    ParkingLot1: [29.4005, 79.5192],
    Mandir_Entry: [29.4022, 79.5185],
    Khairna: [29.4142, 79.5805],
    Almora: [29.5892, 79.6462],
  },
  edges: [
    { from: "Bhimtal", to: "Bhowali", weight: 1 },
    { from: "Bhowali", to: "ParkingLot1", weight: 1 },
    { from: "ParkingLot1", to: "Mandir_Entry", weight: 1 },
    { from: "Mandir_Entry", to: "Khairna", weight: 1 },
    { from: "Khairna", to: "Almora", weight: 1 },
  ],
};

function dijkstra(start, end) {
  const distances = {};
  const prev = {};
  const pq = new Set(Object.keys(data.nodes));

  for (const node of pq) distances[node] = Infinity;
  distances[start] = 0;

  while (pq.size > 0) {
    let minNode = null;
    for (const node of pq) {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    }

    if (minNode === end || distances[minNode] === Infinity) break;

    pq.delete(minNode);

    for (const edge of data.edges) {
      if (edge.from === minNode || edge.to === minNode) {
        const neighbor = edge.from === minNode ? edge.to : edge.from;
        if (!pq.has(neighbor)) continue;

        const alt = distances[minNode] + edge.weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          prev[neighbor] = minNode;
        }
      }
    }
  }

  const path = [];
  let u = end;
  while (u) {
    path.unshift(u);
    u = prev[u];
  }
  return path[0] === start ? path : null;
}

const FitBounds = ({ path }) => {
  const map = useMap();
  useEffect(() => {
    if (path.length > 0) {
      const bounds = path.map((n) => data.nodes[n]);
      map.fitBounds(bounds);
    }
  }, [path, map]);
  return null;
};

const MapPage = () => {
  const [start, setStart] = useState("Bhimtal");
  const [end, setEnd] = useState("Almora");
  const [shortestPath, setShortestPath] = useState([]);

  const handleFindPath = () => {
    const path = dijkstra(start, end);
    if (!path) return alert("No path found!");
    setShortestPath(path);
  };

  return (
    <div className="map-wrapper">
      <h2>Shortest Route Map (Kainchi Dham)</h2>
      <div className="form-container">
        <label>Start Node:</label>
        <select value={start} onChange={(e) => setStart(e.target.value)}>
          {Object.keys(data.nodes).map((node) => (
            <option key={node} value={node}>
              {node}
            </option>
          ))}
        </select>

        <label>End Node:</label>
        <select value={end} onChange={(e) => setEnd(e.target.value)}>
          {Object.keys(data.nodes).map((node) => (
            <option key={node} value={node}>
              {node}
            </option>
          ))}
        </select>

        <button onClick={handleFindPath}>Find Shortest Path</button>
      </div>

      <MapContainer center={[29.4, 79.55]} zoom={12} style={{ height: "600px", width: "90%", margin: "20px auto" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.entries(data.nodes).map(([name, coords]) => (
          <Marker key={name} position={coords} />
        ))}
        {data.edges.map((edge, i) => (
          <Polyline
            key={i}
            positions={[data.nodes[edge.from], data.nodes[edge.to]]}
            color="#ccc"
            weight={3}
          />
        ))}
        {shortestPath.length > 1 &&
          shortestPath.map((_, i) =>
            i < shortestPath.length - 1 ? (
              <Polyline
                key={`highlight-${i}`}
                positions={[data.nodes[shortestPath[i]], data.nodes[shortestPath[i + 1]]]}
                color="#e74c3c"
                weight={5}
              />
            ) : null
          )}
        <FitBounds path={shortestPath} />
      </MapContainer>
    </div>
  );
};

export default MapPage;
