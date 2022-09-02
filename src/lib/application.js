/**
 * simple express
 */
let http = require('http');
let url = require('url');

function Application() {
    this._router = [
        {
            path: '*',
            method: '*',
            handler(req, res) {
                res.end(`ping ${req.method} ${req.url} `)
            }
        }
    ];
}
Application.prototype.get = function(path, handler) {
    this._router.push({
        path, 
        method: 'get',
        handler
    })
};
Application.prototype.listen = function() {
    let server = http.createServer((req, res) => {
        let {pathname} = url.parse(req.url);
        for (const rou of this._router) {
            let { path, method, handler} = rou;
            if (path === pathname && method === req.method.toLowerCase()) {
                return handler(req, res);
            }
            return this._router[0].handler(req, res);
        }
    });
    server.listen(... arguments);
};

module.exports = Application;


