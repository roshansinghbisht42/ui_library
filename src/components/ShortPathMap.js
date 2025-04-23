import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const ShortPathMap = () => {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [currentPath, setCurrentPath] = useState([]);
  const [map, setMap] = useState(null); // Added map state

  const data = {
    nodes: {
      "Bhimtal": [29.3422, 79.5668],
      "Bhowali": [29.3922, 79.5240],
      "ParkingLot1": [29.4005, 79.5192],
      "Mandir_Entry": [29.4022, 79.5185],
      "Khairna": [29.4142, 79.5805],
      "Almora": [29.5892, 79.6462]
    },
    edges: [
      { from: "Bhimtal", to: "Bhowali", weight: 1 },
      { from: "Bhowali", to: "ParkingLot1", weight: 1 },
      { from: "ParkingLot1", to: "Mandir_Entry", weight: 1 },
      { from: "Mandir_Entry", to: "Khairna", weight: 1 },
      { from: "Khairna", to: "Almora", weight: 1 }
    ]
  };

  useEffect(() => {
    const mapInstance = L.map('map').setView([29.4, 79.55], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapInstance);

    const markers = {};
    const allLines = [];

    // Draw nodes
    for (const [name, coords] of Object.entries(data.nodes)) {
      const marker = L.marker(coords).addTo(mapInstance).bindPopup(name);
      markers[name] = marker;
    }

    // Draw edges
    data.edges.forEach(edge => {
      const line = L.polyline([data.nodes[edge.from], data.nodes[edge.to]], {
        color: "#ccc",
        weight: 3
      }).addTo(mapInstance);
      allLines.push(line);
    });

    setMap(mapInstance); // Save map instance to state

    // Cleanup map on component unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Dijkstra's algorithm
  const dijkstra = (start, end) => {
    const distances = {};
    const prev = {};
    const pq = new Set(Object.keys(data.nodes));

    for (const node of pq) {
      distances[node] = Infinity;
    }
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
  };

  const highlightShortestPath = () => {
    setCurrentPath([]);

    const path = dijkstra(startNode, endNode);
    if (!path || path.length < 2) {
      alert("No path found!");
      return;
    }

    const newPath = path.map((node, index) => {
      if (index < path.length - 1) {
        const from = path[index];
        const to = path[index + 1];
        return L.polyline([data.nodes[from], data.nodes[to]], {
          color: "#e74c3c",
          weight: 5
        }).addTo(map); // Using map from state
      }
      return null;
    }).filter(Boolean);

    setCurrentPath(newPath);

    const latlngs = path.map(n => data.nodes[n]);
    map.fitBounds(latlngs);
  };

  return (
    <div>
      <h2>Shortest Route Map (Kainchi Dham)</h2>

      <div className="form-container">
        <label htmlFor="start">Start Node: </label>
        <select
          id="start"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
        >
          {Object.keys(data.nodes).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="end">End Node: </label>
        <select
          id="end"
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
        >
          {Object.keys(data.nodes).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button onClick={highlightShortestPath}>Find Shortest Path</button>
      </div>

      <div id="map" style={{ height: '600px', width: '90%', margin: '20px auto', border: '2px solid #333', borderRadius: '8px' }}></div>
    </div>
  );
};

export default ShortPathMap;
