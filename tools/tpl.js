export default function (item,html,data,js,css) {
    const tpl=`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${item.title}</title>
                    <meta name="description" content="${item.description}">
                    <meta name="keywords" content="${item.keywords}">
                    <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revalidate" />
                    <meta http-equiv="Pragma" content="no-cache" />
                    <meta http-equiv="Expires" content="0" />
                    ${css}
                    <script >window.INITSTATE=${data}</script>
                </head>
                <body>
                <div id="app">
                    ${html}
                </div>
                ${js}
                <script >window.main()</script>
                </body>
                </html>`
    return tpl;
}