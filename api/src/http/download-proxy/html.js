export default `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAEON resource download notice</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        width: 100%'
      }

      div {
        text-align: center;
        padding: 20px;
        margin: auto;
      }

      h1 {
        margin-bottom: 64px;
      }

      pre {
        padding: 32px 0;
        background-color: lightgrey;
        overflow: auto;
      }

      p {
        text-align: left;
        line-height: 1.5;
      }

      /**
       * MUI breakpoints
       * https://mui.com/customization/breakpoints/
       * 
       * xs: >= 0px
       * sm: >= 600px
       * md: >= 900px
       * lg: >= 1200px
       * xl: >= 1536px
       */

      /* md */
      @media only screen and (min-width: 900px) {
        div {
          max-width: 80%;
        }
      }

      /* lg */
      @media only screen and (min-width: 1200px) {
        div {
          max-width: 80%;
        }
      }

      /* xl */
      @media only screen and (min-width: 1536px) {
        div {
          max-width: 40%;
        }
      }

    </style>
  </head>
  <body>
    <div>
      <h1>SAEON RESOURCE DOWNLOAD</h1>
      <p><b>$hostname</b> is served on an insecure connection. Many browsers disallow linking to content served from non-HTTPS addresses from sites served on secure connections (such as the SAEON Data Portal).</p>

      <p>Please manually copy and paste the link below to a new tab to view/download this resource.</p>

      <pre>$uri</pre>

      <p>Contact the SAEON curation team at <b>$CURATOR_CONTACT</b> to request that this resource be made available at a secure address in the future. If you think this message is in error, or have any other technical requests / feedback, please let us know at <b>$TECHNICAL_CONTACT</b>.</p>
    </div>
  </body>
  </html>`
