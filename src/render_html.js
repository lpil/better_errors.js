'use strict';

module.exports = function renderHTML(data) {
  // method
  // requestPath
  // errorMessage
  // uri

  data.method       = data.method || 'GET';
  data.requestPath  = data.requestPath || '/foo';
  data.errorMessage = data.errorMessage || 'It go bang.';
  data.uri          = data.uri || 'http://localhost:1337/foo';

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title> Error at ${data.method} ${data.requestPath}</title>
      <style>
      /* Basic reset */
      * {
        margin: 0;
        padding: 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        vertical-align: top;
        text-align: left;
      }

      textarea {
        resize: none;
      }

      body {
        font-size: 10pt;
      }

      body, td, input, textarea {
        font-family: helvetica neue, lucida grande, sans-serif;
        line-height: 1.5;
        color: #333;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
      }

      html {
        background: #f0f0f5;
      }

      /* ---------------------------------------------------------------------
      * Basic layout
      * --------------------------------------------------------------------- */

      /* Small */
      @media screen and (max-width: 1100px) {
        html {
          overflow-y: scroll;
        }

        body {
          margin: 0 20px;
        }

        header.exception {
          margin: 0 -20px;
        }

        nav.sidebar {
          padding: 0;
          margin: 20px 0;
        }

        ul.frames {
          max-height: 200px;
          overflow: auto;
        }
      }

      /* Wide */
      @media screen and (min-width: 1100px) {
        header.exception {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }

        nav.sidebar,
        .conn_info {
          position: fixed;
          top: 95px;
          bottom: 0;

          box-sizing: border-box;

          overflow-y: auto;
          overflow-x: hidden;
        }

        nav.sidebar {
          width: 40%;
          left: 20px;
          top: 115px;
          bottom: 20px;
        }

        .conn_info {
          right: 0;
          left: 40%;

          padding: 20px;
          padding-left: 10px;
          margin-left: 30px;
        }
      }

      nav.sidebar {
        background: #d3d3da;
        border-top: solid 3px #4E2A8E;
        border-bottom: solid 3px #4E2A8E;
        border-radius: 4px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.2),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      }

      /* --------------------------------------------------------------------
      * Header
      * -------------------------------------------------------------------- */

      header.exception {
        padding: 18px 20px;

        height: 59px;
        min-height: 59px;

        overflow: hidden;

        background-color: #20202a;
        color: #aaa;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
        font-weight: 200;
        box-shadow: inset 0 -5px 3px -3px rgba(0, 0, 0, 0.05),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05);

        -webkit-text-smoothing: antialiased;
      }

      /* Heading */
      header.exception h2 {
        font-weight: 200;
        font-size: 11pt;
        padding-bottom: 2pt;
      }

      header.exception h2,
      header.exception p {
        line-height: 1.4em;
        height: 1.4em;
        overflow: hidden;
        white-space: pre;
        text-overflow: ellipsis;
      }

      header.exception h2 strong {
        font-weight: 700;
        color: #7E5ABE;
      }

      header.exception p {
        font-weight: 200;
        font-size: 18pt;
        color: white;
      }

      header.exception:hover {
        height: auto;
        overflow-y: auto;
        max-height: 60%;
        z-index: 2;
      }

      header.exception:hover h2,
      header.exception:hover p {
        padding-right: 20px;
        word-wrap: break-word;
        height: auto;
      }

      @media screen and (max-width: 1100px) {
        header.exception {
          height: auto;
        }

        header.exception h2,
        header.exception p {
          padding-right: 20px;
          overflow-y: auto;
          word-wrap: break-word;
          height: auto;
          max-height: 7em;
        }
      }

      /* ---------------------------------------------------------------------
      * Navigation
      * --------------------------------------------------------------------- */

      nav.tabs {
        border-bottom: solid 1px #ddd;

        background-color: #eee;
        text-align: center;

        padding: 6px;

        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      nav.tabs a {
        display: inline-block;

        height: 22px;
        line-height: 22px;
        padding: 0 10px;

        text-decoration: none;
        font-size: 8pt;
        font-weight: bold;

        color: #999;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
      }

      nav.tabs a.selected {
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 16px;
        box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1);
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(0, 0, 0, 0.4);
      }

      /* ---------------------------------------------------------------------
      * Sidebar
      * --------------------------------------------------------------------- */

      ul.frames {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      /* Each item */
      ul.frames li {
        background-color: #f8f8f8;
        background: -webkit-linear-gradient(top, #f8f8f8 80%, #f0f0f0);
        background: -moz-linear-gradient(top, #f8f8f8 80%, #f0f0f0);
        background: linear-gradient(top, #f8f8f8 80%, #f0f0f0);
        box-shadow: inset 0 -1px 0 #e2e2e2;
        padding: 7px 20px;

        cursor: pointer;
        overflow: hidden;
      }

      ul.frames .name,
      ul.frames .location {
        overflow: hidden;
        height: 1.5em;

        white-space: nowrap;
        word-wrap: none;
        text-overflow: ellipsis;
      }

      ul.frames .app {
        color: #4E2A8E;
      }

      ul.frames .location {
        font-size: 0.85em;
        font-weight: 400;
        color: #999;
      }

      ul.frames .line {
        font-weight: bold;
      }

      /* Selected frame */
      ul.frames li.selected {
        background: #88A;
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1),
                    inset 0 2px 0 rgba(255, 255, 255, 0.01),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
      }

      ul.frames li.selected .name,
      ul.frames li.selected .function,
      ul.frames li.selected .location {
        color: white;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
      }

      ul.frames li.selected .location {
        opacity: 0.6;
      }

      /* Iconography */
      ul.frames li {
        padding-left: 60px;
        position: relative;
      }

      ul.frames li .icon {
        display: block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 15px;

        text-align: center;

        background: white;
        border: solid 2px #ccc;

        font-size: 9pt;
        font-weight: 200;
        font-style: normal;

        position: absolute;
        top: 14px;
        left: 20px;
      }

      ul.frames .icon.app {
        background: #808090;
        border-color: #555;
      }

      ul.frames .icon.app:before {
        content: 'A';
        color: white;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
      }

      /* Responsiveness -- flow to single-line mode */
      @media screen and (max-width: 1100px) {
        ul.frames li {
          padding-top: 6px;
          padding-bottom: 6px;
          padding-left: 36px;
          line-height: 1.3;
        }

        ul.frames li .icon {
          width: 11px;
          height: 11px;
          line-height: 11px;

          top: 7px;
          left: 10px;
          font-size: 5pt;
        }

        ul.frames .name,
        ul.frames .location {
          display: inline-block;
          line-height: 1.3;
          height: 1.3em;
        }

        ul.frames .name {
          margin-right: 10px;
        }
      }

      /* ---------------------------------------------------------------------
      * Monospace
      * --------------------------------------------------------------------- */

      pre, code, textarea {
        font-family: menlo, lucida console, monospace;
        font-size: 8pt;
      }

      /* ---------------------------------------------------------------------
      * Display area
      * --------------------------------------------------------------------- */

      .trace_info {
        background: #fff;
        padding: 6px;
        border-radius: 3px;
        margin-bottom: 2px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.03),
                    1px 1px 0 rgba(0, 0, 0, 0.05),
                    -1px 1px 0 rgba(0, 0, 0, 0.05),
                    0 0 0 4px rgba(0, 0, 0, 0.04);
      }

      /* Titlebar */
      .trace_info .title {
        background: #f1f1f1;

        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        overflow: hidden;
        padding: 6px 10px;

        border: solid 1px #ccc;
        border-bottom: 0;

        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
      }

      .trace_info .title .name,
      .trace_info .title .location {
        font-size: 9pt;
        line-height: 26px;
        height: 26px;
        overflow: hidden;
      }

      .trace_info .title .location {
        float: left;
        font-weight: bold;
        font-size: 10pt;
      }

      .trace_info .title .location a {
        color:inherit;
        text-decoration:none;
        border-bottom:1px solid #aaaaaa;
      }

      .trace_info .title .location a:hover {
        border-color:#666666;
      }

      .trace_info .title .name {
        float: right;
        font-weight: 200;
      }

      .code, .unavailable {
        background: #fff;
        padding: 5px;

        box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.1),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      }

      .code {
        margin-bottom: -1px;
        padding: 10px 0;
        overflow: auto;
      }

      .code .ln {
        width: 35px;
        margin-right: 15px;
        text-align: right;
        display: inline-block;
      }

      .code .no_snippet {
        padding: 5px 15px 2px;
        font-size: 9pt;
      }

      /* Source unavailable */
      p.unavailable {
        padding: 20px 0 40px 0;
        text-align: center;
        color: #b99;
        font-weight: bold;
      }

      p.unavailable:before {
        content: '×';
        display: block;
        color: #daa;
        text-align: center;
        font-size: 40pt;
        font-weight: normal;
        margin-bottom: -10px;
      }

      @-webkit-keyframes highlight {
        0%   { background: rgba(220, 30, 30, 0.3); }
        100% { background: rgba(220, 30, 30, 0.1); }
      }
      @-moz-keyframes highlight {
        0%   { background: rgba(220, 30, 30, 0.3); }
        100% { background: rgba(220, 30, 30, 0.1); }
      }
      @keyframes highlight {
        0%   { background: rgba(220, 30, 30, 0.3); }
        100% { background: rgba(220, 30, 30, 0.1); }
      }

      .code .highlight {
        background: rgba(220, 30, 30, 0.1);
        -webkit-animation: highlight 400ms linear 1;
        -moz-animation: highlight 400ms linear 1;
        animation: highlight 400ms linear 1;
      }

      /* ---------------------------------------------------------------------
      * Variable infos
      * --------------------------------------------------------------------- */

      .sub {
        padding: 10px 0;
        margin: 10px 0;
      }

      .sub:before {
        content: '';
        display: block;
        width: 100%;
        height: 4px;

        border-radius: 2px;
        background: rgba(0, 150, 200, 0.05);
        box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.7),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.04),
                    inset 2px 2px 2px rgba(0, 0, 0, 0.07);
      }

      .sub h3 {
        color: #4E2A8E;
        font-size: 1.1em;
        margin: 10px 0;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);

        -webkit-font-smoothing: antialiased;
      }

      .sub .inset {
        overflow-y: auto;
      }

      .sub table {
        table-layout: fixed;
      }

      .sub table td {
        border-top: dotted 1px #ddd;
        padding: 7px 1px;
      }

      .sub table td.name {
        width: 150px;

        font-weight: bold;
        font-size: 0.8em;
        padding-right: 20px;

        word-wrap: break-word;
      }

      .sub table td pre {
        max-height: 15em;
        overflow-y: auto;
      }

      .sub table td pre {
        width: 100%;

        word-wrap: break-word;
        white-space: normal;
      }

      /* "(object doesn't support inspect)" */
      .sub .unsupported {
        font-family: sans-serif;
        color: #777;
      }

      /* ---------------------------------------------------------------------
      * Scrollbar
      * --------------------------------------------------------------------- */

      nav.sidebar::-webkit-scrollbar,
      .inset pre::-webkit-scrollbar,
      .code::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      .inset pre::-webkit-scrollbar-thumb,
      .code::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 5px;
      }

      nav.sidebar::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.0);
        border-radius: 5px;
      }

      nav.sidebar:hover::-webkit-scrollbar-thumb {
        background-color: #999;
        background: -webkit-linear-gradient(left, #aaa, #999);
      }

      .code:hover::-webkit-scrollbar-thumb {
        background: #888;
      }
      </style>
    </head>
    <body>
      <div class="top">
        <header class="exception">
          <h2>
            <strong>Error</strong>
            <span>at ${data.method} ${data.requestPath}</span>
          </h2>
          <p>${data.errorMessage}</p>
        </header>
      </div>

      <section class="backtrace">
        <nav class="sidebar">
          <nav class="tabs">
            <a href="#" id="app_frames">App frames</a>
            <a href="#" id="all_frames">All frames</a>
          </nav>
          <ul class="frames">
            <%= for frame <- @frames do %>
            <li class="<%= frame.context %>"
                style="display: none"
                data-context="<%= frame.context %>"
                data-index="<%= frame.index %>">
              <span class='stroke'></span>
              <i class="icon <%= frame.context %>"></i>
              <div class="info">
                <div class="name">
                  <strong><%= h(frame.info) %></strong>

                  <%= if app = frame.app do %>
                  <span class="app">(<%= app %>)</span>
                  <% end %>
                </div>
                <div class="location">
                  <span class="filename"><%= frame.file %></span>
                  <%= if frame.line do %>
                  (line <span class="line"><%= frame.line %></span>)
                  <% end %>
                </div>
              </div>
            </li>
            <% end %>
          </ul>
        </nav>

        <div class="conn_info">
          <%= for frame <- @frames do %>
          <div class="frame_info"
               id="frame_info_<%= frame.index %>"
               style="display: none;">
            <header class="trace_info">
              <div class="title">
                <h2 class="name">
                  <%= frame.info %>

                  <%= if app = frame.app do %>
                  <span class="app">(<%= app %>)</span>
                  <% end %>
                </h2>
                <div class="location">
                  <span class="filename">
                    <a href="<%= frame.link %>"><%= frame.file %></a>
                  </span>
                </div>
              </div>

              <div class="code">
                <%= if snippet = frame.snippet do %>
                <%= for {index, line, highlight} <- snippet do %>
                <pre class="<%= if highlight, do: "highlight" %>">
                  <span class="ln"><%= index %></span><span><%=h line %></span>
                </pre>
                <% end %>
                <% else %>
                <p class="no_snippet">No code snippets available.</p>
                <% end %>
              </div>
            </header>

            <div class="sub">
              <h3>Frame</h3>
              <div class="inset variables">
                <table class="var_table">
                  <tr>
                    <td class="name">Function</td>
                    <td><%= h(frame.info) %> (<%= h(frame.app) %>)</td>
                  </tr>
                  <%= if frame.args != [] do %>
                  <tr>
                    <td class="name">Args</td>
                    <td><%= h(inspect frame.args) %></td>
                  </tr>
                  <% end %>
                </table>
              </div>
            </div>
          </div>

          <% end %>

          <div class="sub">
            <h3>Request info</h3>
            <div class="inset variables">
              <table class="var_table">
                <tr>
                  <td class="name">URI</td>
                  <td>${data.uri}</td>
                </tr>
                <tr>
                  <td class="name">Query String</td>
                  <td><%= @conn.query_string %></td>
                </tr>
                <tr>
                  <td class="name">Peer</td>
                  <td><%= peer(@conn) %></td>
                </tr>
              </table>
            </div>
          </div>

          <div class="sub">
            <h3>Headers</h3>
            <div class="inset variables">
              <table class="var_table">
                <%= for {key, value} <- Enum.sort(@conn.req_headers) do %>
                <tr>
                  <td class="name"><%= key %></td>
                  <td><%= value %></td>
                </tr>
                <% end %>
              </table>
            </div>
          </div>

          <%= if @params do %>
          <div class="sub">
            <h3>Params</h3>
            <div class="inset variables">
              <table class="var_table">
                <%= for {key, value} <- @params do %>
                <tr>
                  <td class="name"><%= key %></td>
                  <td><pre><%= inspect value %></pre></td>
                </tr>
                <% end %>
              </table>
            </div>
          </div>
          <% end %>

          <%= if @session do %>
          <div class="sub">
            <h3>Session</h3>
            <div class="inset variables">
              <table class="var_table">
                <%= for {key, value} <- @session do %>
                <tr>
                  <td class="name"><%= key %></td>
                  <td><pre><%= inspect value %></pre></td>
                </tr>
                <% end %>
              </table>
            </div>
          </div>
          <% end %>
        </div>
      </section>
    </body>
    <script>

  var previousFrame = null;
  var previousFrameInfo = null;
  var allFrames = document.querySelectorAll("ul.frames li");
  var allFrameInfos = document.querySelectorAll(".frame_info");

  for(var i = 0; i < allFrames.length; i++) {
    (function(i, el) {
      var el = allFrames[i];
      el.onclick = function() {
        if(previousFrame) previousFrame.className = "";
        el.className = "selected";
        previousFrame = el;
        selectFrameInfo(el.attributes["data-index"].value);
      };
    })(i);
  };

  function selectFrameInfo(index) {
    var el = allFrameInfos[index];
    if(previousFrameInfo) previousFrameInfo.style.display = "none";
    previousFrameInfo = el;
    el.style.display = "block";
  };

  (
    document.querySelector(".frames li.app") ||
    document.querySelector(".frames li")
  ).onclick();

  var appFramesButton = document.getElementById("app_frames");
  var allFramesButton = document.getElementById("all_frames");

  appFramesButton.onclick = function() {
    allFramesButton.className = "";
    appFramesButton.className = "selected";
    for(var i = 0; i < allFrames.length; i++) {
      if(allFrames[i].attributes["data-context"].value == "app") {
        allFrames[i].style.display = "block";
        allFrames[i].setAttribute("data-display", "block");
      } else {
        allFrames[i].style.display = "none";
        allFrames[i].setAttribute("data-display", "none");
      };
    };
    return false;
  };

  allFramesButton.onclick = function() {
    appFramesButton.className = "";
    allFramesButton.className = "selected";
    for(var i = 0; i < allFrames.length; i++) {
      allFrames[i].style.display = "block";
      allFrames[i].setAttribute("data-display", "block");
    };
    return false;
  };

  appFramesButton.onclick();
  var blockItems = document.querySelectorAll(
    'ul.frames li[data-display="block"]'
  );
  if(blockItems.length == 0) {
    allFramesButton.onclick();
  }
    </script>
  </html>
  `;
  return html;
};
