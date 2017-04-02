export default (state, staticComponent) => [
  `<div id="app">${staticComponent}</div>`,
  `<script>window.__STATIC_INITIAL_STATE__ = ${state}</script>`,
  '<script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>'
];
