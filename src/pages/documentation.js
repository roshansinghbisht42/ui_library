import React from 'react';
import '../styles/base/Documentation.css';

const Documentation = () => {
  return (
    <div className="doc-body">
      <header className="doc-header">
        <h1>UI Library Docs</h1>
        <nav>
     <a href="#grid">Grid</a>
    <a href="#margin">Margin</a>
          <a href="#typography">Typography</a>
          <a href="#padding">Padding</a>
    <a href="#size">Size</a>
          <a href="#styles">Buttons</a>  
                 <a href="#background">Background</a>
<a href="#darkmode">Dark Mode</a>
          <a href="#react">React</a>
        </nav>
      </header>

      <main>
        <section id="grid">
          <h2>Grid System</h2>
       <p>         Our layout uses a 12-column grid built with CSS Grid. You can control how wide a column spans by adding a class like <code>.col-span-4</code>.
          </p>
          <pre>
{`.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.col-span-4 {
  grid-column: span 4;
}`}
          </pre>
        </section>

        <section id="margin">
          <h2>Margin Utilities</h2>
     <p>Use these utility classes to add spacing around elements.</p>
          <pre>
{`.margin-small {
  margin: 8px;
}

.margin-large {
  margin: 32px;
}`}
          </pre>
        </section>

        <section id="typography">
       <h2>Typography</h2>
       <p>Basic text formatting like size and weight can be applied with these classes:</p>
          <pre>
{`.text-small {
  font-size: 14px;
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: bold;
}`}
          </pre>
        </section>

        <section id="padding">
    <h2>Padding</h2>
       <p>Padding adds space inside elements. These are our standard padding classes:</p>
       <pre>
{`.padding-small {
  padding: 10px;
}

.padding-large {
  padding: 40px;
}`}
          </pre>
  </section>

      <section id="size">
  <h2>Responsive Behavior</h2>
          <p>The grid adjusts based on screen size using media queries. Here's a quick example:</p>
       <pre>
{`@media (max-width: 1024px) {
  .col-span-4 {
    grid-column: span 6;
  }
}`}
          </pre>
        </section>

     <section id="styles">
          <h2>Button Styles</h2>
         <p>We keep buttons simple but flexible. Here's the core style:</p>
          <pre>
{`.button {
  padding: 10px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`}
          </pre>
     </section>

        <section id="background">
          <h2>Background Utilities</h2>
        <p>Change background colors using these classes:</p>
          <pre>
{`.background-primary {
  background-color: #e91e63;
  color: white;
}

.background-light {
  background-color: #f9f9f9;
}`}
          </pre>
        </section>

        <section id="darkmode">
       <h2>Dark Mode Support</h2>
          <p>Dark mode is toggled by adding a <code>dark-mode</code> class to the <code>&lt;body&gt;</code>.</p>
          <pre>
{`body.dark-mode {
  background-color: #121212;
  color: #f5f5f5;
}`}
          </pre>
        </section>

        <section id="react">     <h2>Using with React</h2>
   <p>This library works great in React. You can wrap utility classes inside components for reuse.</p>

          <h3>Directory Structure Example</h3>
          <pre>
{`src/
├── components/      # Reusable UI pieces
├── styles/          # Custom styles
├── pages/           # Routes or views
├── App.jsx          # Root component
└── index.js         # App entry point`}
          </pre>

          <h3>Sample Button Component</h3>
          <pre>
{`import './styles/button.css';

function Button({ label }) {
  return <button className="button">{label}</button>;
}

export default Button;`}
          </pre>

          <h3>Running Locally</h3>
          <pre>
{`# Install project dependencies
npm install

# Start dev server
npm start`}
          </pre>

        <h3>Deploying (e.g., with Vercel)</h3>
        <p>You can deploy the project easily with platforms like Vercel or Netlify. Just connect your GitHub repo and push!</p>
    </section>
      </main>

   <footer>
    <p>2025 UI Library By Debug  Demons©</p>
  </footer>
    </div>
  );
};

export default Documentation;
